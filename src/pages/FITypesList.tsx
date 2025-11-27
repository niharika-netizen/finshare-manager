import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Filter, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FIEditModal from "@/components/FIEditModal";
import FilterSelectionDialog from "@/components/FilterSelectionDialog";
import { FIType } from "@/types/fi-types";
import { toast } from "sonner";

const FI_TYPES: FIType[] = [
  { 
    id: "deposit", 
    name: "Deposit", 
    description: "Regular savings and deposit accounts", 
    availableFilters: ["Salaried Account", "EMI-ed Account", "High Balance", "Zero Balance"],
    accountNumber: "XXXX1234",
    schemaVersion: "2.0.0",
    accountType: "Savings",
  },
  { 
    id: "term-deposit", 
    name: "Term Deposit", 
    description: "Fixed term deposit accounts", 
    availableFilters: ["Short Term", "Long Term", "High Interest", "Auto Renewal"],
    accountNumber: "XXXX5678",
    schemaVersion: "2.0.0",
    accountType: "Fixed Deposit",
  },
  { 
    id: "recurring-deposit", 
    name: "Recurring Deposit", 
    description: "Recurring deposit schemes", 
    availableFilters: ["Monthly", "Quarterly", "High Return", "Flexible Amount"],
    accountNumber: "XXXX9012",
    schemaVersion: "2.0.0",
    accountType: "Recurring Deposit",
  },
  { 
    id: "sip", 
    name: "Systematic Investment Plan (SIP)", 
    description: "Regular investment plans", 
    availableFilters: ["Equity", "Debt", "Hybrid", "High Risk"],
    accountNumber: "XXXX3456",
    schemaVersion: "2.0.0",
    accountType: "SIP",
  },
  { 
    id: "equity-shares", 
    name: "Equity Shares", 
    description: "Stock holdings and equity investments", 
    availableFilters: ["Large Cap", "Mid Cap", "Small Cap", "Dividend Yield"],
    accountNumber: "XXXX7890",
    schemaVersion: "2.0.0",
    accountType: "Demat",
  },
  { 
    id: "mutual-funds", 
    name: "Mutual Fund Units", 
    description: "Mutual fund investments", 
    availableFilters: ["Equity Fund", "Debt Fund", "Balanced", "Index Fund"],
    accountNumber: "XXXX2468",
    schemaVersion: "2.0.0",
    accountType: "Mutual Fund",
  },
  { 
    id: "etf", 
    name: "Exchange Traded Funds (ETF)", 
    description: "Exchange traded fund holdings", 
    availableFilters: ["Gold ETF", "Index ETF", "International", "Sector Specific"],
    accountNumber: "XXXX1357",
    schemaVersion: "2.0.0",
    accountType: "Demat",
  },
  { 
    id: "idr", 
    name: "Indian Depository Receipts (IDR)", 
    description: "IDR holdings", 
    availableFilters: ["Active", "Suspended", "High Value", "Foreign Company"],
    accountNumber: "XXXX8642",
    schemaVersion: "2.0.0",
    accountType: "Demat",
  },
  { 
    id: "cis", 
    name: "Collective Investment Schemes (CIS)", 
    description: "Collective investment scheme units", 
    availableFilters: ["Real Estate", "Infrastructure", "Commodities", "Alternative"],
    accountNumber: "XXXX9753",
    schemaVersion: "2.0.0",
    accountType: "Investment",
  },
  { 
    id: "aif", 
    name: "Alternative Investment Funds (AIF)", 
    description: "AIF unit holdings", 
    availableFilters: ["Category I", "Category II", "Category III", "Angel Fund"],
    accountNumber: "XXXX1593",
    schemaVersion: "2.0.0",
    accountType: "AIF",
  },
  { 
    id: "invit", 
    name: "Infrastructure Investment Trusts (INVIT)", 
    description: "INVIT unit holdings", 
    availableFilters: ["Power", "Roads", "Telecom", "High Dividend"],
    accountNumber: "XXXX7531",
    schemaVersion: "2.0.0",
    accountType: "INVIT",
  },
  { 
    id: "reit", 
    name: "Real Estate Investment Trusts (REIT)", 
    description: "REIT unit holdings", 
    availableFilters: ["Commercial", "Residential", "Industrial", "Retail"],
    accountNumber: "XXXX9517",
    schemaVersion: "2.0.0",
    accountType: "REIT",
  },
  { 
    id: "gst", 
    name: "GST Returns (GSTR 1 & 3B)", 
    description: "GST return records", 
    availableFilters: ["Monthly", "Quarterly", "Filed", "Pending"],
    accountNumber: "XXXX3698",
    schemaVersion: "2.0.0",
    accountType: "GST",
  },
  { 
    id: "general-insurance", 
    name: "General Insurance", 
    description: "General insurance policies", 
    availableFilters: ["Health", "Motor", "Property", "Travel"],
    accountNumber: "XXXX7412",
    schemaVersion: "2.0.0",
    accountType: "Insurance",
  },
  { 
    id: "life-insurance", 
    name: "Life Insurance", 
    description: "Life insurance policies", 
    availableFilters: ["Term", "Endowment", "ULIP", "Pension Plan"],
    accountNumber: "XXXX8523",
    schemaVersion: "2.0.0",
    accountType: "Insurance",
  },
  { 
    id: "nps", 
    name: "National Pension System (NPS)", 
    description: "NPS account balances", 
    availableFilters: ["Tier I", "Tier II", "Corporate", "Government"],
    accountNumber: "XXXX9634",
    schemaVersion: "2.0.0",
    accountType: "NPS",
  },
];

const FITypesList = () => {
  const [fiTypes, setFiTypes] = useState<FIType[]>(FI_TYPES);
  const [selectedFI, setSelectedFI] = useState<FIType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>("");

  const handleOpenModal = (fi: FIType) => {
    setSelectedFI(fi);
    setIsModalOpen(true);
  };

  const handleFilterClick = (fi: FIType) => {
    setSelectedFI(fi);
    setIsFilterDialogOpen(true);
  };

  const handleFilterSave = (filters: string[]) => {
    if (selectedFI) {
      setSelectedFilters((prev) => ({
        ...prev,
        [selectedFI.id]: filters,
      }));
    }
  };

  const handleAddAccount = () => {
    const newAccount: FIType = {
      id: `new-${Date.now()}`,
      name: "New FI Type",
      description: "Enter description",
      availableFilters: [],
      accountNumber: "XXXX0000",
      schemaVersion: "2.0.0",
      accountType: "Savings",
    };
    setFiTypes([...fiTypes, newAccount]);
    toast.success("New account added");
  };

  const handleEditField = (id: string, field: keyof FIType, value: string) => {
    setEditingId(id);
    setEditingField(field);
    setTempValue(value);
  };

  const handleSave = () => {
    if (editingId && editingField) {
      setFiTypes((prev) =>
        prev.map((fi) =>
          fi.id === editingId ? { ...fi, [editingField]: tempValue } : fi
        )
      );
      setEditingId(null);
      setEditingField(null);
    }
  };

  const renderEditableCell = (
    fiId: string,
    field: keyof FIType,
    value: string,
    type: "text" | "select" = "text",
    options?: { value: string; label: string }[]
  ) => {
    const isEditing = editingId === fiId && editingField === field;

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

      return (
        <Input
          type="text"
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
        onClick={() => handleEditField(fiId, field, value)}
      >
        {value}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Financial Information Manager</h1>
            <Badge variant="default" className="text-xl px-6 py-3 font-bold">
              FIP: FINSHARE
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Manage and edit your financial institution data across multiple FI types
          </p>
        </div>

        <div className="mb-4 flex justify-end">
          <Button onClick={handleAddAccount} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Account
          </Button>
        </div>

        <div className="bg-card rounded-lg border shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Number</TableHead>
                <TableHead>FI Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fiTypes.map((fi) => (
                <TableRow key={fi.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono">
                    {renderEditableCell(fi.id, "accountNumber", fi.accountNumber)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {renderEditableCell(fi.id, "name", fi.name)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {renderEditableCell(fi.id, "description", fi.description)}
                  </TableCell>
                  <TableCell>
                    {renderEditableCell(
                      fi.id,
                      "accountType",
                      fi.accountType,
                      "select",
                      [
                        { value: "Savings", label: "Savings" },
                        { value: "Current", label: "Current" },
                        { value: "Fixed Deposit", label: "Fixed Deposit" },
                        { value: "Recurring Deposit", label: "Recurring Deposit" },
                        { value: "Demat", label: "Demat" },
                        { value: "SIP", label: "SIP" },
                        { value: "Mutual Fund", label: "Mutual Fund" },
                        { value: "Investment", label: "Investment" },
                        { value: "AIF", label: "AIF" },
                        { value: "INVIT", label: "INVIT" },
                        { value: "REIT", label: "REIT" },
                        { value: "GST", label: "GST" },
                        { value: "Insurance", label: "Insurance" },
                        { value: "NPS", label: "NPS" },
                      ]
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFilterClick(fi)}
                        className="gap-2"
                      >
                        <Filter className="h-4 w-4" />
                        Filters ({selectedFilters[fi.id]?.length || 0})
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleOpenModal(fi)}
                        className="gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <FIEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fiType={selectedFI}
      />

      <FilterSelectionDialog
        isOpen={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        fiType={selectedFI}
        selectedFilters={selectedFI ? selectedFilters[selectedFI.id] || [] : []}
        onSave={handleFilterSave}
      />
    </div>
  );
};

export default FITypesList;
