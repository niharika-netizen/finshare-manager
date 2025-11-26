// Transaction field schemas for different FI types

export interface TransactionFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'datetime' | 'select' | 'boolean';
  required: boolean;
  options?: string[];
  pattern?: string;
}

// 1. Deposit (Banking)
export const depositTransactionFields: TransactionFieldConfig[] = [
  { name: 'type', label: 'Type', type: 'select', required: true, options: ['CREDIT', 'DEBIT'] },
  { name: 'mode', label: 'Mode', type: 'select', required: true, options: ['CASH', 'UPI', 'IMPS', 'NEFT', 'RTGS', 'CARD', 'ATM', 'CHEQUE', 'DEMAND_DRAFT', 'AUTO_DEBIT', 'INTEREST_CREDIT', 'NACH', 'ECS', 'REMITTANCE', 'OTHERS'] },
  { name: 'amount', label: 'Amount', type: 'number', required: true },
  { name: 'transactionalBalance', label: 'Transactional Balance', type: 'number', required: true },
  { name: 'transactionTimestamp', label: 'Transaction Timestamp', type: 'datetime', required: true },
  { name: 'valueDate', label: 'Value Date', type: 'datetime', required: true },
  { name: 'txnId', label: 'Transaction ID', type: 'text', required: true },
  { name: 'narration', label: 'Narration', type: 'text', required: true },
  { name: 'reference', label: 'Reference', type: 'text', required: false },
];

// 2. Term Deposits
export const termDepositTransactionFields: TransactionFieldConfig[] = [
  { name: 'txnId', label: 'Transaction ID', type: 'text', required: true },
  { name: 'amount', label: 'Amount', type: 'number', required: true },
  { name: 'transactionalBalance', label: 'Transactional Balance', type: 'number', required: true },
  { name: 'narration', label: 'Narration', type: 'text', required: true },
  { name: 'type', label: 'Type', type: 'select', required: true, options: ['CREDIT', 'DEBIT'] },
  { name: 'mode', label: 'Mode', type: 'select', required: true, options: ['CASH', 'UPI', 'IMPS', 'NEFT', 'RTGS', 'CARD', 'ATM', 'CHEQUE', 'DEMAND_DRAFT', 'AUTO_DEBIT', 'INTEREST_CREDIT', 'NACH', 'ECS', 'REMITTANCE', 'OTHERS'] },
  { name: 'transactionDateTime', label: 'Transaction DateTime', type: 'datetime', required: true },
  { name: 'valueDate', label: 'Value Date', type: 'datetime', required: true },
  { name: 'reference', label: 'Reference', type: 'text', required: false },
];

// 3. Recurring Deposit
export const recurringDepositTransactionFields: TransactionFieldConfig[] = [
  { name: 'txnId', label: 'Transaction ID', type: 'text', required: true },
  { name: 'amount', label: 'Amount', type: 'number', required: true },
  { name: 'transactionalBalance', label: 'Transactional Balance', type: 'number', required: true },
  { name: 'narration', label: 'Narration', type: 'text', required: true },
  { name: 'type', label: 'Type', type: 'select', required: true, options: ['CREDIT', 'DEBIT'] },
  { name: 'mode', label: 'Mode', type: 'select', required: true, options: ['CASH', 'UPI', 'IMPS', 'NEFT', 'RTGS', 'CARD', 'ATM', 'CHEQUE', 'DEMAND_DRAFT', 'AUTO_DEBIT', 'INTEREST_CREDIT', 'NACH', 'ECS', 'REMITTANCE', 'OTHERS'] },
  { name: 'transactionDateTime', label: 'Transaction DateTime', type: 'datetime', required: true },
  { name: 'valueDate', label: 'Value Date', type: 'datetime', required: true },
  { name: 'reference', label: 'Reference', type: 'text', required: false },
];

// 4. Equities
export const equitiesTransactionFields: TransactionFieldConfig[] = [
  { name: 'txnId', label: 'Transaction ID', type: 'text', required: true },
  { name: 'orderId', label: 'Order ID', type: 'text', required: false },
  { name: 'companyName', label: 'Company Name', type: 'text', required: true },
  { name: 'transactionDateTime', label: 'Transaction DateTime', type: 'datetime', required: true },
  { name: 'exchange', label: 'Exchange', type: 'select', required: false, options: ['BSE', 'NSE', 'OTHERS'] },
  { name: 'isin', label: 'ISIN', type: 'text', required: true },
  { name: 'isinDescription', label: 'ISIN Description', type: 'text', required: true },
  { name: 'equityCategory', label: 'Equity Category', type: 'select', required: true, options: ['EQUITY'] },
  { name: 'narration', label: 'Narration', type: 'text', required: false },
  { name: 'rate', label: 'Rate', type: 'text', required: false },
  { name: 'type', label: 'Type', type: 'select', required: true, options: ['BUY', 'SELL', 'BONUS', 'SPLIT', 'DIVIDEND', 'RIGHTS', 'OTHERS'] },
  { name: 'units', label: 'Units', type: 'number', required: true },
];

// 5. ETF
export const etfTransactionFields: TransactionFieldConfig[] = [
  { name: 'txnId', label: 'Transaction ID', type: 'text', required: true },
  { name: 'isin', label: 'ISIN', type: 'text', required: true },
  { name: 'isinDescription', label: 'ISIN Description', type: 'text', required: true },
  { name: 'transactionDateTime', label: 'Transaction DateTime', type: 'datetime', required: true },
  { name: 'units', label: 'Units', type: 'number', required: true },
  { name: 'amount', label: 'Amount', type: 'number', required: false },
  { name: 'nav', label: 'NAV', type: 'number', required: false },
  { name: 'type', label: 'Type', type: 'select', required: true, options: ['BUY', 'SELL', 'BOUNS', 'SPLIT', 'OTHERS'] },
  { name: 'narration', label: 'Narration', type: 'text', required: false },
  { name: 'brokerCode', label: 'Broker Code', type: 'text', required: false },
];

// 6. General Insurance
export const generalInsuranceTransactionFields: TransactionFieldConfig[] = [
  { name: 'txnId', label: 'Transaction ID', type: 'text', required: true },
  { name: 'txnDate', label: 'Transaction Date', type: 'date', required: true },
  { name: 'narration', label: 'Narration', type: 'text', required: false },
  { name: 'type', label: 'Type', type: 'select', required: false, options: ['PREMIUM_PAYMENT', 'CLAIM', 'REFUND', 'TRANSFER_FEES', 'ENDORSEMENT_PREMIUM', 'OTHER'] },
  { name: 'amount', label: 'Amount', type: 'number', required: true },
];

// 7. Life Insurance
export const lifeInsuranceTransactionFields: TransactionFieldConfig[] = [];

// 8. IDR
export const idrTransactionFields: TransactionFieldConfig[] = [
  { name: 'txnId', label: 'Transaction ID', type: 'text', required: true },
  { name: 'transactionDateTime', label: 'Transaction DateTime', type: 'datetime', required: true },
  { name: 'orderId', label: 'Order ID', type: 'text', required: true },
  { name: 'isin', label: 'ISIN', type: 'text', required: true },
  { name: 'isinDescription', label: 'ISIN Description', type: 'text', required: true },
  { name: 'companyName', label: 'Company Name', type: 'text', required: true },
  { name: 'type', label: 'Type', type: 'select', required: true, options: ['BUY', 'SELL', 'OTHERS'] },
  { name: 'units', label: 'Units', type: 'number', required: true },
  { name: 'narration', label: 'Narration', type: 'text', required: false },
];

// 9. InvIT
export const invitTransactionFields: TransactionFieldConfig[] = [
  { name: 'txnId', label: 'Transaction ID', type: 'text', required: true },
  { name: 'isin', label: 'ISIN', type: 'text', required: true },
  { name: 'isinDescription', label: 'ISIN Description', type: 'text', required: true },
  { name: 'issuerName', label: 'Issuer Name', type: 'text', required: true },
  { name: 'transactionDescription', label: 'Transaction Description', type: 'text', required: false },
  { name: 'transactionDateTime', label: 'Transaction DateTime', type: 'datetime', required: true },
  { name: 'units', label: 'Units', type: 'number', required: true },
];

// 10. Mutual Funds
export const mutualFundsTransactionFields: TransactionFieldConfig[] = [
  { name: 'txnId', label: 'Transaction ID', type: 'text', required: true },
  { name: 'amc', label: 'AMC', type: 'text', required: true },
  { name: 'registrar', label: 'Registrar', type: 'text', required: true },
  { name: 'schemeCode', label: 'Scheme Code', type: 'text', required: false },
  { name: 'schemePlan', label: 'Scheme Plan', type: 'select', required: false, options: ['DIRECT', 'REGULAR'] },
  { name: 'isin', label: 'ISIN', type: 'text', required: false },
  { name: 'amfiCode', label: 'AMFI Code', type: 'text', required: false },
  { name: 'ucc', label: 'UCC', type: 'text', required: false },
  { name: 'amount', label: 'Amount', type: 'text', required: false },
  { name: 'nav', label: 'NAV', type: 'number', required: true },
  { name: 'navDate', label: 'NAV Date', type: 'date', required: true },
  { name: 'type', label: 'Type', type: 'select', required: true, options: ['BUY', 'SELL', 'OTHERS'] },
  { name: 'lock-inFlag', label: 'Lock-in Flag', type: 'text', required: false },
  { name: 'lock-inDays', label: 'Lock-in Days', type: 'text', required: true },
  { name: 'mode', label: 'Mode', type: 'select', required: true, options: ['DEMAT', 'PHYSICAL'] },
  { name: 'narration', label: 'Narration', type: 'text', required: false },
  { name: 'isinDescription', label: 'ISIN Description', type: 'text', required: false },
  { name: 'units', label: 'Units', type: 'text', required: false },
  { name: 'transactionDate', label: 'Transaction Date', type: 'text', required: false },
];

// 11. SIP (Systematic Investment Plan)
export const sipTransactionFields: TransactionFieldConfig[] = [];

// 12. REIT
export const reitTransactionFields: TransactionFieldConfig[] = [
  { name: 'txnId', label: 'Transaction ID', type: 'text', required: true },
  { name: 'isin', label: 'ISIN', type: 'text', required: true },
  { name: 'isinDescription', label: 'ISIN Description', type: 'text', required: true },
  { name: 'issuerName', label: 'Issuer Name', type: 'text', required: true },
  { name: 'exchange', label: 'Exchange', type: 'text', required: false },
  { name: 'transactionDescription', label: 'Transaction Description', type: 'text', required: false },
  { name: 'transactionDateTime', label: 'Transaction DateTime', type: 'datetime', required: true },
  { name: 'units', label: 'Units', type: 'number', required: true },
  { name: 'narration', label: 'Narration', type: 'text', required: false },
];

// 13. CIS (Collective Investment Scheme)
export const cisTransactionFields: TransactionFieldConfig[] = [
  { name: 'txnId', label: 'Transaction ID', type: 'text', required: true },
  { name: 'transactionDateTime', label: 'Transaction DateTime', type: 'datetime', required: true },
  { name: 'schemeCode', label: 'Scheme Code', type: 'text', required: false },
  { name: 'isin', label: 'ISIN', type: 'text', required: true },
  { name: 'isinDescription', label: 'ISIN Description', type: 'text', required: true },
  { name: 'dividendType', label: 'Dividend Type', type: 'select', required: false, options: ['INTERIM-DIVIDENT', 'FINAL-DIVIDENT'] },
  { name: 'ucc', label: 'UCC', type: 'text', required: false },
  { name: 'amount', label: 'Amount', type: 'number', required: false },
  { name: 'units', label: 'Units', type: 'number', required: true },
  { name: 'nav', label: 'NAV', type: 'number', required: true },
  { name: 'navDate', label: 'NAV Date', type: 'date', required: true },
  { name: 'type', label: 'Type', type: 'select', required: true, options: ['AMALGAMATION', 'BONUS', 'BUY-BACK', 'CAPITAL-REDUCTION_or_CONSOLIDATION-OF-SHARES', 'CONVERSION-OF-DEBENTURES-INTO-SHARES', 'DEMERGER', 'DIVIDEND', 'OPEN-OFFER', 'RIGHTS-ISSUE', 'STOCK-SPLIT', 'OTHERS'] },
  { name: 'mode', label: 'Mode', type: 'select', required: false, options: ['DEMAT', 'PHYSICAL'] },
  { name: 'narration', label: 'Narration', type: 'text', required: false },
];

// 14. AIF (Alternative Investment Fund)
export const aifTransactionFields: TransactionFieldConfig[] = [
  { name: 'txnId', label: 'Transaction ID', type: 'text', required: true },
  { name: 'nameofAsset', label: 'Name of Asset', type: 'text', required: true },
  { name: 'investmentValue', label: 'Investment Value', type: 'number', required: false },
  { name: 'redemptionDate', label: 'Redemption Date', type: 'date', required: false },
  { name: 'units', label: 'Units', type: 'number', required: true },
  { name: 'narration', label: 'Narration', type: 'text', required: false },
];

// 15. NPS (National Pension System)
export const npsTransactionFields: TransactionFieldConfig[] = [];

// 16. GST (Goods and Services Tax)
export const gstTransactionFields: TransactionFieldConfig[] = [];

// Transaction schema map
export const transactionSchemaMap: Record<string, TransactionFieldConfig[]> = {
  'Deposit': depositTransactionFields,
  'Term Deposits': termDepositTransactionFields,
  'Recurring Deposit': recurringDepositTransactionFields,
  'Equities': equitiesTransactionFields,
  'ETF': etfTransactionFields,
  'General Insurance': generalInsuranceTransactionFields,
  'Life Insurance': lifeInsuranceTransactionFields,
  'IDR': idrTransactionFields,
  'InvIT': invitTransactionFields,
  'Mutual Funds': mutualFundsTransactionFields,
  'SIP': sipTransactionFields,
  'REIT': reitTransactionFields,
  'CIS': cisTransactionFields,
  'AIF': aifTransactionFields,
  'NPS': npsTransactionFields,
  'GST': gstTransactionFields,
};
