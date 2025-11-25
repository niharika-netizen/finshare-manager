import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Filter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import FIEditModal from "@/components/FIEditModal";
import FilterSelectionDialog from "@/components/FilterSelectionDialog";
import { FIType } from "@/types/fi-types";

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
  const [selectedFI, setSelectedFI] = useState<FIType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleEdit = (fi: FIType) => {
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

        <div className="bg-card rounded-lg border shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Number</TableHead>
                <TableHead>FI Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    Schema Version
                    <span className="text-muted-foreground text-xs cursor-help" title="ReBIT FI Data Schema Version">
                      ⓘ
                    </span>
                  </div>
                </TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead className="text-center">Available Filters</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FI_TYPES.map((fi) => (
                <TableRow key={fi.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono">{fi.accountNumber}</TableCell>
                  <TableCell className="font-medium">{fi.name}</TableCell>
                  <TableCell className="text-muted-foreground">{fi.description}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {fi.schemaVersion}
                    </span>
                  </TableCell>
                  <TableCell>{fi.accountType}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFilterClick(fi)}
                      className="gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      {selectedFilters[fi.id]?.length || 0} / {fi.availableFilters.length}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleEdit(fi)}
                      className="gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
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
