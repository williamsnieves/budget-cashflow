const STORAGE_KEY = 'forge-ledger-promo-dismissed';

export function isPromoDismissed(): boolean {
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

export function dismissPromo(): void {
  localStorage.setItem(STORAGE_KEY, 'true');
}