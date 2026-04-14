import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import type { ColumnMapping, Transaction } from '../../types/transaction';
import { parseCSV } from '../../utils/CSVParser';
import type { ParsedCSV } from '../../utils/CSVParser';
import { autoMapColumns } from '../../utils/ColumnMapper';
import { validateImportData } from '../../utils/ImportValidator';
import type { ValidationResult } from '../../utils/ImportValidator';
import { addTransactions } from '../../db';
import UploadStep from './UploadStep';
import QualityPanel from './QualityPanel';
import MappingStep from './MappingStep';
import PreviewStep from './PreviewStep';

type Step = 'upload' | 'quality' | 'mapping' | 'preview' | 'confirm';

const STEP_ORDER: Step[] = ['upload', 'quality', 'mapping', 'preview', 'confirm'];
const STEP_LABELS: Record<Step, string> = {
  upload: 'Upload',
  quality: 'Quality',
  mapping: 'Mapping',
  preview: 'Preview',
  confirm: 'Confirm',
};

export default function ImportWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('upload');
  const [parsed, setParsed] = useState<ParsedCSV | null>(null);
  const [mappings, setMappings] = useState<ColumnMapping[]>([]);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [importing, setImporting] = useState(false);

  const currentStepIndex = STEP_ORDER.indexOf(step);

  async function handleFileSelected(file: File) {
    const result = await parseCSV(file);
    setParsed(result);
    const initialMappings = autoMapColumns(result.headers);
    setMappings(initialMappings);
    const dateCol = initialMappings.findIndex(m => m.targetField === 'date');
    const amountCol = initialMappings.findIndex(m => m.targetField === 'amount');
    const descCol = initialMappings.findIndex(m => m.targetField === 'description');
    const validResult = validateImportData(
      result.rows,
      dateCol,
      amountCol,
      descCol >= 0 ? descCol : undefined,
    );
    setValidation(validResult);
    setStep('quality');
  }

  function handleMappingsChange(updated: ColumnMapping[]) {
    setMappings(updated);
  }

  function handleMappingContinue() {
    setStep('preview');
  }

  async function handleConfirm() {
    if (!parsed) return;
    setImporting(true);

    const dateIdx = mappings.findIndex(m => m.targetField === 'date');
    const descIdx = mappings.findIndex(m => m.targetField === 'description');
    const amountIdx = mappings.findIndex(m => m.targetField === 'amount');
    const catIdx = mappings.findIndex(m => m.targetField === 'category');

    const transactions: Transaction[] = parsed.rows.map((row) => {
      const rawDate = dateIdx >= 0 ? row[dateIdx]?.trim() : '';
      const rawAmount = amountIdx >= 0 ? row[amountIdx]?.trim() : '';
      let amount = 0;
      if (rawAmount) {
        const parsed = parseFloat(rawAmount.replace(/[^0-9.\-()]/g, ''));
        if (!isNaN(parsed)) {
          const isNeg = rawAmount.includes('(') || rawAmount.startsWith('-');
          amount = isNeg ? -Math.abs(parsed) : parsed;
        }
      }

      return {
        id: uuidv4(),
        date: rawDate || new Date().toISOString().slice(0, 10),
        description: descIdx >= 0 ? row[descIdx]?.trim() || '' : '',
        amount,
        category: catIdx >= 0 ? row[catIdx]?.trim() || null : null,
        categorySource: catIdx >= 0 && row[catIdx]?.trim() ? 'auto' as const : null,
        status: 'pending' as const,
        source: 'import',
        importedAt: new Date().toISOString(),
        categorizedAt: null,
      };
    });

    await addTransactions(transactions);
    setImporting(false);
    navigate('/transactions');
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 28,
        }}
      >
        {STEP_ORDER.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: i <= currentStepIndex ? 'var(--color-accent-green)' : 'var(--color-border)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {i + 1}
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: i === currentStepIndex ? 600 : 400,
                color: i <= currentStepIndex ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              }}
            >
              {STEP_LABELS[s]}
            </span>
            {i < STEP_ORDER.length - 1 && (
              <div
                style={{
                  width: 24,
                  height: 2,
                  backgroundColor: i < currentStepIndex ? 'var(--color-accent-green)' : 'var(--color-border)',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {step === 'upload' && <UploadStep onFileSelected={handleFileSelected} />}

      {step === 'quality' && validation && parsed && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <QualityPanel
            totalRows={parsed.totalRows}
            validRows={validation.validRows}
            errorRows={validation.errorRows}
            warningRows={validation.warningRows}
            errors={validation.errors}
            warnings={validation.warnings}
          />
          <button
            onClick={() => setStep('mapping')}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: 8,
              backgroundColor: 'var(--color-accent-green)',
              color: '#FFFFFF',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Continue
          </button>
        </div>
      )}

      {step === 'mapping' && parsed && (
        <MappingStep
          headers={parsed.headers}
          mappings={mappings}
          onMappingsChange={handleMappingsChange}
          onContinue={handleMappingContinue}
        />
      )}

      {step === 'preview' && parsed && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <PreviewStep rows={parsed.rows} mappings={mappings} headers={parsed.headers} />
          <button
            onClick={() => setStep('confirm')}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: 8,
              backgroundColor: 'var(--color-accent-green)',
              color: '#FFFFFF',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Continue
          </button>
        </div>
      )}

      {step === 'confirm' && (
        <div
          style={{
            backgroundColor: 'var(--color-bg-card)',
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-card)',
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
            Ready to Import
          </h2>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: 0, textAlign: 'center' }}>
            {parsed
              ? `You are about to import ${parsed.totalRows} transactions. This action cannot be undone.`
              : 'No data to import.'}
          </p>
          <button
            onClick={handleConfirm}
            disabled={importing}
            style={{
              padding: '14px 48px',
              border: 'none',
              borderRadius: 8,
              backgroundColor: importing ? 'var(--color-text-secondary)' : '#0F172A',
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 700,
              cursor: importing ? 'not-allowed' : 'pointer',
            }}
          >
            {importing ? 'Importing...' : 'Confirm Import'}
          </button>
        </div>
      )}
    </div>
  );
}