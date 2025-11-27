export interface FIType {
  id: string;
  name: string;
  description: string;
  availableFilters: string[];
  accountNumber: string;
  schemaVersion: string;
  accountType: string;
}

export interface AccountData {
  type: string;
  maskedAccNumber: string;
  version: "2.0.0";
  linkedAccRef: string;
}

export interface HolderData {
  name: string;
  dob: string;
  mobile: string;
  nominee: "REGISTERED" | "NOT-REGISTERED";
  landline: string;
  address: string;
  email: string;
  pan: string;
  ckycRegistered: "YES" | "NO" | "NO_DATA_AVAILABLE";
}

export interface ProfileData {
  holdersType: "SINGLE" | "JOINT";
  holders: HolderData[];
}

export interface PendingTxn {
  transactionType: "CREDIT" | "DEBIT";
  amount: string;
}

export interface SummaryData {
  currentBalance: string;
  currency: string;
  balanceDateTime: string;
  accountType: "REGULAR" | "NRE" | "NRO" | "RFC";
  accountSubType: "SAVINGS" | "CURRENT";
  branch: string;
  facility: "OVERDRAFT" | "CASH_CREDIT" | "NO_FACILITY_GRANTED";
  ifsc: string;
  micrCode: string;
  openingDate: string;
  currentODLimit: string;
  drawingLimit: string;
  status: "ACTIVE" | "INACTIVE";
  pendingTxns: PendingTxn[];
}

export interface TransactionData {
  type: "CREDIT" | "DEBIT";
  mode: "CASH" | "UPI" | "IMPS" | "NEFT" | "RTGS" | "CARD" | "ATM" | "CHEQUE" | "DEMAND_DRAFT" | "AUTO_DEBIT" | "INTEREST_CREDIT" | "NACH" | "ECS" | "REMITTANCE" | "OTHERS";
  amount: string;
  transactionalBalance: string;
  transactionTimestamp: string;
  valueDate: string;
  txnId: string;
  narration: string;
  reference: string;
}

export interface FormFieldError {
  field: string;
  message: string;
}
