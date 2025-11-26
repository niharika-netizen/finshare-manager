import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Check, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TransactionFieldConfig } from "@/types/transaction-schemas";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DynamicTransactionTabProps {
  onDataChange: () => void;
  transactionFields: TransactionFieldConfig[];
  fiTypeName: string;
}

const DynamicTransactionTab = ({ onDataChange, transactionFields, fiTypeName }: DynamicTransactionTabProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [transactions, setTransactions] = useState<any[]>([
    // Mock transaction data
    ...Array(5).fill(null).map((_, idx) => {
      const mockData: any = { id: idx + 1 };
      transactionFields.forEach(field => {
        if (field.type === 'number') {
          mockData[field.name] = Math.floor(Math.random() * 10000);
        } else if (field.type === 'date') {
          mockData[field.name] = new Date().toISOString().split('T')[0];
        } else if (field.type === 'datetime') {
          mockData[field.name] = new Date().toISOString();
        } else if (field.type === 'select' && field.options) {
          mockData[field.name] = field.options[0];
        } else if (field.type === 'boolean') {
          mockData[field.name] = false;
        } else {
          mockData[field.name] = `Sample ${field.label} ${idx + 1}`;
        }
      });
      return mockData;
    })
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<any>(null);

  const handleEdit = (id: number, field: string, value: any) => {
    setEditingId(id);
    setEditingField(field);
    setTempValue(value);
  };

  const handleSave = () => {
    if (editingId && editingField) {
      setTransactions(transactions.map(txn => 
        txn.id === editingId ? { ...txn, [editingField]: tempValue } : txn
      ));
      setEditingId(null);
      setEditingField(null);
      setTempValue(null);
      onDataChange();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingField(null);
    setTempValue(null);
  };

  const renderEditableCell = (transaction: any, field: TransactionFieldConfig) => {
    const isEditing = editingId === transaction.id && editingField === field.name;
    const value = transaction[field.name];

    if (isEditing) {
      switch (field.type) {
        case 'select':
          return (
            <div className="flex items-center gap-2">
              <Select value={tempValue} onValueChange={setTempValue}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="sm" variant="ghost" onClick={handleSave}>
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          );
        case 'date':
          return (
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {tempValue ? format(new Date(tempValue), "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={tempValue ? new Date(tempValue) : undefined}
                    onSelect={(date) => setTempValue(date?.toISOString().split('T')[0])}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <Button size="sm" variant="ghost" onClick={handleSave}>
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          );
        case 'datetime':
          return (
            <div className="flex items-center gap-2">
              <Input
                type="datetime-local"
                value={tempValue ? new Date(tempValue).toISOString().slice(0, 16) : ''}
                onChange={(e) => setTempValue(new Date(e.target.value).toISOString())}
                className="w-full"
              />
              <Button size="sm" variant="ghost" onClick={handleSave}>
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          );
        case 'boolean':
          return (
            <div className="flex items-center gap-2">
              <Select value={tempValue?.toString()} onValueChange={(val) => setTempValue(val === 'true')}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="ghost" onClick={handleSave}>
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          );
        default:
          return (
            <div className="flex items-center gap-2">
              <Input
                type={field.type === 'number' ? 'number' : 'text'}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full"
              />
              <Button size="sm" variant="ghost" onClick={handleSave}>
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          );
      }
    }

    return (
      <div
        className="cursor-pointer hover:bg-muted/50 p-2 rounded"
        onClick={() => handleEdit(transaction.id, field.name, value)}
      >
        {field.type === 'date' && value ? format(new Date(value), "PPP") :
         field.type === 'datetime' && value ? format(new Date(value), "PPP p") :
         field.type === 'boolean' ? (value ? 'Yes' : 'No') :
         value || '-'}
      </div>
    );
  };

  if (transactionFields.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No transaction schema available for {fiTypeName}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-4 p-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">End Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex-1 overflow-auto border rounded-md">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              {transactionFields.map((field) => (
                <TableHead key={field.name} className="whitespace-nowrap min-w-[200px]">
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                {transactionFields.map((field) => (
                  <TableCell key={field.name} className="min-w-[200px]">
                    {renderEditableCell(transaction, field)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DynamicTransactionTab;
