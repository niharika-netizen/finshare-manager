import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TransactionData } from "@/types/fi-types";
import { Button } from "@/components/ui/button";
import { ExternalLink, CalendarIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface NewTransactionTabProps {
  onDataChange: () => void;
}

const NewTransactionTab = ({ onDataChange }: NewTransactionTabProps) => {
  const [startDate, setStartDate] = useState<Date>(new Date(2024, 0, 1));
  const [endDate, setEndDate] = useState<Date>(new Date());
  
  const [transactions, setTransactions] = useState<(TransactionData & { id: string })[]>([
    {
      id: "1",
      type: "CREDIT",
      mode: "UPI",
      amount: "5000.00",
      transactionalBalance: "150000.00",
      transactionTimestamp: "2024-11-20T10:30:00Z",
      valueDate: "2024-11-20T10:30:00Z",
      txnId: "TXN001",
      narration: "Salary Credit",
      reference: "REF001",
    },
    {
      id: "2",
      type: "DEBIT",
      mode: "NEFT",
      amount: "2000.00",
      transactionalBalance: "148000.00",
      transactionTimestamp: "2024-11-21T14:15:00Z",
      valueDate: "2024-11-21T14:15:00Z",
      txnId: "TXN002",
      narration: "Bill Payment",
      reference: "REF002",
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>("");

  const handleEdit = (id: string, field: string, value: string) => {
    setEditingId(id);
    setEditingField(field);
    setTempValue(value);
  };

  const handleSave = () => {
    if (editingId && editingField) {
      setTransactions((prev) =>
        prev.map((txn) =>
          txn.id === editingId ? { ...txn, [editingField]: tempValue } : txn
        )
      );
      setEditingId(null);
      setEditingField(null);
      onDataChange();
    }
  };

  const handleRBIGuidelines = () => {
    window.open("https://www.rbi.org.in/", "_blank");
  };

  const renderEditableCell = (
    txnId: string,
    field: keyof TransactionData,
    value: string,
    type: "text" | "number" | "select" | "datetime" = "text",
    options?: { value: string; label: string }[]
  ) => {
    const isEditing = editingId === txnId && editingField === field;

    if (isEditing) {
      if (type === "select" && options) {
        return (
          <Select
            value={tempValue}
            onValueChange={(val) => {
              setTempValue(val);
              setTimeout(handleSave, 100);
            }}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }

      if (type === "datetime") {
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-8 w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(new Date(tempValue), "dd/MM/yyyy HH:mm")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-popover z-50">
              <Calendar
                mode="single"
                selected={new Date(tempValue)}
                onSelect={(date) => {
                  if (date) {
                    setTempValue(date.toISOString());
                    setTimeout(handleSave, 100);
                  }
                }}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        );
      }

      return (
        <Input
          type={type}
          step={type === "number" ? "0.01" : undefined}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") {
              setEditingId(null);
              setEditingField(null);
            }
          }}
          className="h-8"
          autoFocus
        />
      );
    }

    return (
      <div
        className="cursor-pointer hover:bg-muted/50 rounded px-2 py-1 min-h-[32px] flex items-center"
        onClick={() => handleEdit(txnId, field, value)}
      >
        {type === "datetime" ? format(new Date(value), "dd/MM/yyyy HH:mm") : value}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="space-y-2">
            <Label>Start Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(startDate, "dd/MM/yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-popover z-50">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => date && setStartDate(date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>End Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(endDate, "dd/MM/yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-popover z-50">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => date && setEndDate(date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={handleRBIGuidelines} className="gap-2">
          <ExternalLink className="h-4 w-4" />
          View RBI Guidelines
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Transaction Time</TableHead>
              <TableHead>Value Date</TableHead>
              <TableHead>Txn ID</TableHead>
              <TableHead>Narration</TableHead>
              <TableHead>Reference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>
                  {renderEditableCell(
                    txn.id,
                    "type",
                    txn.type,
                    "select",
                    [
                      { value: "CREDIT", label: "CREDIT" },
                      { value: "DEBIT", label: "DEBIT" },
                    ]
                  )}
                </TableCell>
                <TableCell>
                  {renderEditableCell(
                    txn.id,
                    "mode",
                    txn.mode,
                    "select",
                    [
                      { value: "CASH", label: "CASH" },
                      { value: "UPI", label: "UPI" },
                      { value: "IMPS", label: "IMPS" },
                      { value: "NEFT", label: "NEFT" },
                      { value: "RTGS", label: "RTGS" },
                      { value: "CARD", label: "CARD" },
                      { value: "ATM", label: "ATM" },
                      { value: "CHEQUE", label: "CHEQUE" },
                      { value: "DEMAND_DRAFT", label: "DEMAND_DRAFT" },
                      { value: "AUTO_DEBIT", label: "AUTO_DEBIT" },
                      { value: "INTEREST_CREDIT", label: "INTEREST_CREDIT" },
                      { value: "NACH", label: "NACH" },
                      { value: "ECS", label: "ECS" },
                      { value: "REMITTANCE", label: "REMITTANCE" },
                      { value: "OTHERS", label: "OTHERS" },
                    ]
                  )}
                </TableCell>
                <TableCell>{renderEditableCell(txn.id, "amount", txn.amount, "number")}</TableCell>
                <TableCell className="font-mono">₹{parseFloat(txn.transactionalBalance).toLocaleString()}</TableCell>
                <TableCell>{renderEditableCell(txn.id, "transactionTimestamp", txn.transactionTimestamp, "datetime")}</TableCell>
                <TableCell>{renderEditableCell(txn.id, "valueDate", txn.valueDate, "datetime")}</TableCell>
                <TableCell>{renderEditableCell(txn.id, "txnId", txn.txnId)}</TableCell>
                <TableCell>{renderEditableCell(txn.id, "narration", txn.narration)}</TableCell>
                <TableCell>{renderEditableCell(txn.id, "reference", txn.reference)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NewTransactionTab;
