import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';

interface UploadStepProps {
  onFileSelected: (file: File) => void;
}

export default function UploadStep({ onFileSelected }: UploadStepProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
      onFileSelected(file);
    }
  }, [onFileSelected]);

  const handleClick = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = () => {
      const file = (input.files?.[0]);
      if (file) onFileSelected(file);
    };
    input.click();
  }, [onFileSelected]);

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        backgroundColor: isDragOver ? 'rgba(34, 197, 94, 0.04)' : 'var(--color-bg-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        border: `2px dashed ${isDragOver ? 'var(--color-accent-green)' : 'var(--color-border)'}`,
        padding: '60px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
    >
      <Upload size={40} style={{ color: isDragOver ? 'var(--color-accent-green)' : 'var(--color-text-secondary)' }} />
      <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
        Upload your CSV file
      </p>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: 0 }}>
        Drag and drop or click to browse
      </p>
    </div>
  );
}