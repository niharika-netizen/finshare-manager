import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SummaryData } from "@/types/fi-types";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SummaryTabProps {
  onDataChange: () => void;
}

const SummaryTab = ({ onDataChange }: SummaryTabProps) => {
  const [summaryData, setSummaryData] = useState<SummaryData>({
    fipName: "Finshare",
    accountType: "SAVINGS",
    accountNumber: "1234567890",
    ifscCode: "FINS0001234",
    branchName: "Mumbai Main Branch",
    accountStatus: "ACTIVE",
    openingDate: "2020-01-15",
    currentBalance: "150000",
  });

  const [openingDate, setOpeningDate] = useState<Date>(new Date(summaryData.openingDate));

  const handleChange = (field: keyof SummaryData, value: string) => {
    setSummaryData((prev) => ({ ...prev, [field]: value }));
    onDataChange();
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setOpeningDate(date);
      handleChange("openingDate", format(date, "yyyy-MM-dd"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fipName">FIP Name</Label>
          <Input
            id="fipName"
            value={summaryData.fipName}
            onChange={(e) => handleChange("fipName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountType">Account Type</Label>
          <Select
            value={summaryData.accountType}
            onValueChange={(value) => handleChange("accountType", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="SAVINGS">Savings</SelectItem>
              <SelectItem value="CURRENT">Current</SelectItem>
              <SelectItem value="FIXED_DEPOSIT">Fixed Deposit</SelectItem>
              <SelectItem value="RECURRING_DEPOSIT">Recurring Deposit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input
            id="accountNumber"
            value={summaryData.accountNumber}
            onChange={(e) => handleChange("accountNumber", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ifscCode">IFSC Code</Label>
          <Input
            id="ifscCode"
            value={summaryData.ifscCode}
            onChange={(e) => handleChange("ifscCode", e.target.value.toUpperCase())}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="branchName">Branch Name</Label>
          <Input
            id="branchName"
            value={summaryData.branchName}
            onChange={(e) => handleChange("branchName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountStatus">Account Status</Label>
          <Select
            value={summaryData.accountStatus}
            onValueChange={(value) => handleChange("accountStatus", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
              <SelectItem value="DORMANT">Dormant</SelectItem>
              <SelectItem value="CLOSED">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="openingDate">Opening Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !openingDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {openingDate ? format(openingDate, "dd/MM/yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
              <Calendar
                mode="single"
                selected={openingDate}
                onSelect={handleDateChange}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentBalance">Current Balance (₹)</Label>
          <Input
            id="currentBalance"
            value={summaryData.currentBalance}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              handleChange("currentBalance", value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryTab;
