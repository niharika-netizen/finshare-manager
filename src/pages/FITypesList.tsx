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
    id: "term-deposit", 
    name: "Term Deposit", 
    description: "Fixed term deposit accounts", 
    availableFilters: ["High Balance", "Maturity This Month", "Auto Renewal Enabled"]
  },
  { 
    id: "deposit", 
    name: "Deposit", 
    description: "General deposit accounts", 
    availableFilters: ["Salaried Account", "EMI-ed Account", "High Transaction Volume", "Dormant Accounts"]
  },
  { 
    id: "recurring-deposit", 
    name: "Recurring Deposit", 
    description: "Recurring deposit schemes", 
    availableFilters: ["Active", "Matured", "Defaulted Payment"]
  },
  { 
    id: "sip", 
    name: "Systematic Investment Plan (SIP)", 
    description: "Regular investment plans", 
    availableFilters: ["Active SIP", "Paused SIP", "High Returns", "Equity Based", "Debt Based"]
  },
  { 
    id: "equity-shares", 
    name: "Equity Shares", 
    description: "Stock holdings", 
    availableFilters: ["Profit Making", "Loss Making", "High Dividend Yield"]
  },
  { 
    id: "mutual-funds", 
    name: "Mutual Fund Units", 
    description: "Mutual fund investments", 
    availableFilters: ["Equity Funds", "Debt Funds", "Hybrid Funds", "Index Funds"]
  },
  { 
    id: "etf", 
    name: "Exchange Traded Funds (ETF)", 
    description: "ETF holdings", 
    availableFilters: ["Gold ETF", "Equity ETF", "Debt ETF"]
  },
  { 
    id: "idr", 
    name: "Indian Depository Receipts (IDR)", 
    description: "IDR securities", 
    availableFilters: ["Active Holdings", "Sold Holdings"]
  },
  { 
    id: "cis", 
    name: "Collective Investment Schemes (CIS)", 
    description: "CIS investments", 
    availableFilters: ["Active", "Matured", "Redeemed"]
  },
  { 
    id: "aif", 
    name: "Alternative Investment Funds (AIF) Units", 
    description: "AIF holdings", 
    availableFilters: ["Category I", "Category II", "Category III"]
  },
  { 
    id: "invit", 
    name: "Infrastructure Investment Trusts (INVIT)", 
    description: "InvIT units", 
    availableFilters: ["Active", "Redeemed"]
  },
  { 
    id: "reit", 
    name: "Real Estate Investment Trusts (REIT)", 
    description: "REIT units", 
    availableFilters: ["Residential REIT", "Commercial REIT"]
  },
  { 
    id: "gstr", 
    name: "GST Returns (GSTR 1 & 3B)", 
    description: "GST filing records", 
    availableFilters: ["Filed Returns", "Pending Returns", "Amended Returns", "Current Quarter"]
  },
  { 
    id: "general-insurance", 
    name: "General Insurance", 
    description: "General insurance policies", 
    availableFilters: ["Motor Insurance", "Health Insurance", "Property Insurance", "Active Policies"]
  },
  { 
    id: "life-insurance", 
    name: "Life Insurance", 
    description: "Life insurance policies", 
    availableFilters: ["Term Insurance", "Endowment", "ULIP", "Active Policies"]
  },
  { 
    id: "nps", 
    name: "National Pension System (NPS)", 
    description: "NPS account balances", 
    availableFilters: ["Tier I Account", "Tier II Account"]
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

        <div className="bg-card rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">FI Type</TableHead>
                <TableHead className="w-[40%]">Description</TableHead>
                <TableHead className="w-[10%] text-center">Filters</TableHead>
                <TableHead className="w-[10%] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FI_TYPES.map((fi) => (
                <TableRow key={fi.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{fi.name}</TableCell>
                  <TableCell className="text-muted-foreground">{fi.description}</TableCell>
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
                  <TableCell className="text-center">
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
