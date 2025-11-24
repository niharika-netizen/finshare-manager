export interface FIType {
  id: string;
  name: string;
  description: string;
  filterCount: number;
}

export interface ProfileData {
  fullName: string;
  mobileNumber: string;
  email: string;
  pan: string;
  address: string;
  dateOfBirth: string;
}

export interface SummaryData {
  fipName: string;
  accountType: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  accountStatus: string;
  openingDate: string;
  currentBalance: string;
}

export interface TransactionData {
  id: string;
  date: string;
  narration: string;
  amount: string;
  type: "CREDIT" | "DEBIT";
  mode: "UPI" | "NEFT" | "RTGS" | "IMPS" | "CASH" | "CHEQUE";
  balance: string;
}

export interface FormFieldError {
  field: string;
  message: string;
}
