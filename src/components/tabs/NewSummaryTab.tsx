import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SummaryData, PendingTxn } from "@/types/fi-types";
import { Button } from "@/components/ui/button";
import { ExternalLink, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface NewSummaryTabProps {
  onDataChange: () => void;
}

const NewSummaryTab = ({ onDataChange }: NewSummaryTabProps) => {
  const [summaryData, setSummaryData] = useState<SummaryData>({
    currentBalance: "150000.00",
    currency: "INR",
    balanceDateTime: new Date().toISOString(),
    accountType: "REGULAR",
    accountSubType: "SAVINGS",
    branch: "Mumbai Main Branch",
    facility: "NO_FACILITY_GRANTED",
    ifsc: "SBIN0001234",
    micrCode: "400002001",
    openingDate: "2020-01-15",
    currentODLimit: "0.00",
    drawingLimit: "0.00",
    status: "ACTIVE",
    pendingTxns: [],
  });

  const handleChange = (field: keyof SummaryData, value: string) => {
    setSummaryData((prev) => ({ ...prev, [field]: value }));
    onDataChange();
  };

  const handleDateChange = (field: "openingDate" | "balanceDateTime", date: Date | undefined) => {
    if (date) {
      const value = field === "balanceDateTime" ? date.toISOString() : format(date, "yyyy-MM-dd");
      handleChange(field, value);
    }
  };

  const addPendingTxn = () => {
    setSummaryData((prev) => ({
      ...prev,
      pendingTxns: [
        ...prev.pendingTxns,
        {
          transactionType: "DEBIT",
          amount: "0.00",
        },
      ],
    }));
    onDataChange();
  };

  const removePendingTxn = (index: number) => {
    setSummaryData((prev) => ({
      ...prev,
      pendingTxns: prev.pendingTxns.filter((_, i) => i !== index),
    }));
    onDataChange();
  };

  const handlePendingTxnChange = (index: number, field: keyof PendingTxn, value: string) => {
    const updated = [...summaryData.pendingTxns];
    updated[index] = { ...updated[index], [field]: value };
    setSummaryData((prev) => ({ ...prev, pendingTxns: updated }));
    onDataChange();
  };

  const handleRBIGuidelines = () => {
    window.open("https://www.rbi.org.in/", "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={handleRBIGuidelines} className="gap-2">
          <ExternalLink className="h-4 w-4" />
          View RBI Guidelines
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="currentBalance">Current Balance *</Label>
          <Input
            id="currentBalance"
            type="number"
            step="0.01"
            value={summaryData.currentBalance}
            onChange={(e) => handleChange("currentBalance", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Currency *</Label>
          <Input
            id="currency"
            value={summaryData.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="balanceDateTime">Balance Date Time *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(new Date(summaryData.balanceDateTime), "dd/MM/yyyy HH:mm")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
              <Calendar
                mode="single"
                selected={new Date(summaryData.balanceDateTime)}
                onSelect={(date) => handleDateChange("balanceDateTime", date)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountType">Account Type *</Label>
          <Select value={summaryData.accountType} onValueChange={(value) => handleChange("accountType", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="REGULAR">REGULAR</SelectItem>
              <SelectItem value="NRE">NRE</SelectItem>
              <SelectItem value="NRO">NRO</SelectItem>
              <SelectItem value="RFC">RFC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountSubType">Account Sub Type *</Label>
          <Select value={summaryData.accountSubType} onValueChange={(value) => handleChange("accountSubType", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="SAVINGS">SAVINGS</SelectItem>
              <SelectItem value="CURRENT">CURRENT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="branch">Branch *</Label>
          <Input
            id="branch"
            value={summaryData.branch}
            onChange={(e) => handleChange("branch", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="facility">Facility *</Label>
          <Select value={summaryData.facility} onValueChange={(value) => handleChange("facility", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="OVERDRAFT">OVERDRAFT</SelectItem>
              <SelectItem value="CASH_CREDIT">CASH_CREDIT</SelectItem>
              <SelectItem value="NO_FACILITY_GRANTED">NO_FACILITY_GRANTED</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ifsc">IFSC Code *</Label>
          <Input
            id="ifsc"
            value={summaryData.ifsc}
            onChange={(e) => handleChange("ifsc", e.target.value.toUpperCase())}
            maxLength={11}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="micrCode">MICR Code *</Label>
          <Input
            id="micrCode"
            value={summaryData.micrCode}
            onChange={(e) => handleChange("micrCode", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="openingDate">Opening Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(new Date(summaryData.openingDate), "dd/MM/yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
              <Calendar
                mode="single"
                selected={new Date(summaryData.openingDate)}
                onSelect={(date) => handleDateChange("openingDate", date)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentODLimit">Current OD Limit</Label>
          <Input
            id="currentODLimit"
            type="number"
            step="0.01"
            value={summaryData.currentODLimit}
            onChange={(e) => handleChange("currentODLimit", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="drawingLimit">Drawing Limit</Label>
          <Input
            id="drawingLimit"
            type="number"
            step="0.01"
            value={summaryData.drawingLimit}
            onChange={(e) => handleChange("drawingLimit", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select value={summaryData.status} onValueChange={(value) => handleChange("status", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="ACTIVE">ACTIVE</SelectItem>
              <SelectItem value="INACTIVE">INACTIVE</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-lg font-semibold">Pending Transactions</Label>
          <Button onClick={addPendingTxn} variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Pending Transaction
          </Button>
        </div>

        {summaryData.pendingTxns.map((txn, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Pending Transaction {index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removePendingTxn(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Transaction Type</Label>
                <Select
                  value={txn.transactionType}
                  onValueChange={(value) => handlePendingTxnChange(index, "transactionType", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="CREDIT">CREDIT</SelectItem>
                    <SelectItem value="DEBIT">DEBIT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Amount *</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={txn.amount}
                  onChange={(e) => handlePendingTxnChange(index, "amount", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewSummaryTab;
