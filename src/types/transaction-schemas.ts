// Transaction field schemas for different FI types

export interface TransactionFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'datetime' | 'select' | 'boolean';
  required: boolean;
  options?: string[];
  pattern?: string;
}

// Deposit (default banking transaction schema)
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

// Equities
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

// ETF
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

// General Insurance
export const generalInsuranceTransactionFields: TransactionFieldConfig[] = [
  { name: 'txnId', label: 'Transaction ID', type: 'text', required: true },
  { name: 'txnDate', label: 'Transaction Date', type: 'date', required: true },
  { name: 'narration', label: 'Narration', type: 'text', required: false },
  { name: 'type', label: 'Type', type: 'select', required: false, options: ['PREMIUM_PAYMENT', 'CLAIM', 'REFUND', 'TRANSFER_FEES', 'ENDORSEMENT_PREMIUM', 'OTHER'] },
  { name: 'amount', label: 'Amount', type: 'number', required: true },
];

// IDR
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

// InvIT
export const invitTransactionFields: TransactionFieldConfig[] = [
  { name: 'txnId', label: 'Transaction ID', type: 'text', required: true },
  { name: 'isin', label: 'ISIN', type: 'text', required: true },
  { name: 'isinDescription', label: 'ISIN Description', type: 'text', required: true },
  { name: 'issuerName', label: 'Issuer Name', type: 'text', required: true },
  { name: 'transactionDescription', label: 'Transaction Description', type: 'text', required: false },
  { name: 'transactionDateTime', label: 'Transaction DateTime', type: 'datetime', required: true },
  { name: 'units', label: 'Units', type: 'number', required: true },
];

// Mutual Funds
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

// Transaction schema map
export const transactionSchemaMap: Record<string, TransactionFieldConfig[]> = {
  'Deposit': depositTransactionFields,
  'Equities': equitiesTransactionFields,
  'ETF': etfTransactionFields,
  'General Insurance': generalInsuranceTransactionFields,
  'IDR': idrTransactionFields,
  'InvIT': invitTransactionFields,
  'Mutual Funds': mutualFundsTransactionFields,
  // Life Insurance and NPS have empty transaction schemas
  'Life Insurance': [],
  'NPS': [],
  // GST is complex, using deposit as default for now
  'GST': depositTransactionFields,
};
