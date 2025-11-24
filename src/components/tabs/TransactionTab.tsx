import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransactionData } from "@/types/fi-types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TransactionTabProps {
  onDataChange: () => void;
}

const TransactionTab = ({ onDataChange }: TransactionTabProps) => {
  const [transactions, setTransactions] = useState<TransactionData[]>([
    {
      id: "1",
      date: "2024-01-15",
      narration: "Salary Credit",
      amount: "50000",
      type: "CREDIT",
      mode: "NEFT",
      balance: "150000",
    },
    {
      id: "2",
      date: "2024-01-10",
      narration: "Electricity Bill Payment",
      amount: "2500",
      type: "DEBIT",
      mode: "UPI",
      balance: "100000",
    },
    {
      id: "3",
      date: "2024-01-05",
      narration: "Online Purchase",
      amount: "5000",
      type: "DEBIT",
      mode: "UPI",
      balance: "102500",
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleEdit = (id: string, field: string, value: string) => {
    setEditingId(id);
    setEditingField(field);
    setTempValue(value);
    if (field === "date") {
      setSelectedDate(new Date(value));
    }
  };

  const handleSave = (id: string, field: keyof TransactionData, value: string) => {
    // Validation
    if (field === "amount" && !/^\d+$/.test(value)) {
      toast.error("Only numeric values are allowed. Please enter an integer amount.");
      return;
    }

    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id ? { ...tx, [field]: value } : tx
      )
    );
    setEditingId(null);
    setEditingField(null);
    onDataChange();
  };

  const handleDateSave = (id: string, date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      handleSave(id, "date", formattedDate);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <Input placeholder="Search by narration..." className="max-w-xs" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="CREDIT">Credit</SelectItem>
            <SelectItem value="DEBIT">Debit</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by mode" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="UPI">UPI</SelectItem>
            <SelectItem value="NEFT">NEFT</SelectItem>
            <SelectItem value="RTGS">RTGS</SelectItem>
            <SelectItem value="IMPS">IMPS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Narration</TableHead>
              <TableHead>Amount (₹)</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Balance (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleEdit(tx.id, "date", tx.date)}
                >
                  {editingId === tx.id && editingField === "date" ? (
                    <Popover open={true} onOpenChange={(open) => !open && setEditingId(null)}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            setSelectedDate(date);
                            handleDateSave(tx.id, date);
                          }}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    format(new Date(tx.date), "dd/MM/yyyy")
                  )}
                </TableCell>
                <TableCell
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleEdit(tx.id, "narration", tx.narration)}
                >
                  {editingId === tx.id && editingField === "narration" ? (
                    <Input
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      onBlur={() => handleSave(tx.id, "narration", tempValue)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave(tx.id, "narration", tempValue);
                      }}
                      autoFocus
                    />
                  ) : (
                    tx.narration
                  )}
                </TableCell>
                <TableCell
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleEdit(tx.id, "amount", tx.amount)}
                >
                  {editingId === tx.id && editingField === "amount" ? (
                    <Input
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value.replace(/\D/g, ""))}
                      onBlur={() => handleSave(tx.id, "amount", tempValue)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave(tx.id, "amount", tempValue);
                      }}
                      autoFocus
                    />
                  ) : (
                    `₹${parseInt(tx.amount).toLocaleString("en-IN")}`
                  )}
                </TableCell>
                <TableCell
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleEdit(tx.id, "type", tx.type)}
                >
                  {editingId === tx.id && editingField === "type" ? (
                    <Select
                      value={tempValue}
                      onValueChange={(value) => {
                        setTempValue(value);
                        handleSave(tx.id, "type", value);
                      }}
                      open={true}
                      onOpenChange={(open) => !open && setEditingId(null)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="CREDIT">Credit</SelectItem>
                        <SelectItem value="DEBIT">Debit</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant={tx.type === "CREDIT" ? "default" : "secondary"}>
                      {tx.type}
                    </Badge>
                  )}
                </TableCell>
                <TableCell
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleEdit(tx.id, "mode", tx.mode)}
                >
                  {editingId === tx.id && editingField === "mode" ? (
                    <Select
                      value={tempValue}
                      onValueChange={(value) => {
                        setTempValue(value);
                        handleSave(tx.id, "mode", value);
                      }}
                      open={true}
                      onOpenChange={(open) => !open && setEditingId(null)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="UPI">UPI</SelectItem>
                        <SelectItem value="NEFT">NEFT</SelectItem>
                        <SelectItem value="RTGS">RTGS</SelectItem>
                        <SelectItem value="IMPS">IMPS</SelectItem>
                        <SelectItem value="CASH">Cash</SelectItem>
                        <SelectItem value="CHEQUE">Cheque</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    tx.mode
                  )}
                </TableCell>
                <TableCell>₹{parseInt(tx.balance).toLocaleString("en-IN")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTab;
