import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, FileText } from "lucide-react";
import FIEditModal from "@/components/FIEditModal";
import { FIType } from "@/types/fi-types";

const FI_TYPES: FIType[] = [
  { id: "term-deposit", name: "Term Deposit", description: "Fixed term deposit accounts", filterCount: 3 },
  { id: "salaried-account", name: "Salaried Account", description: "Regular salary accounts", filterCount: 2 },
  { id: "emi-account", name: "EMI-ed Account", description: "Accounts with EMI payments", filterCount: 3 },
  { id: "deposit", name: "Deposit", description: "General deposit accounts", filterCount: 2 },
  { id: "recurring-deposit", name: "Recurring Deposit", description: "Recurring deposit schemes", filterCount: 3 },
  { id: "sip", name: "Systematic Investment Plan (SIP)", description: "Regular investment plans", filterCount: 4 },
  { id: "equity-shares", name: "Equity Shares", description: "Stock holdings", filterCount: 2 },
  { id: "mutual-funds", name: "Mutual Fund Units", description: "Mutual fund investments", filterCount: 3 },
  { id: "etf", name: "Exchange Traded Funds (ETF)", description: "ETF holdings", filterCount: 2 },
  { id: "idr", name: "Indian Depository Receipts (IDR)", description: "IDR securities", filterCount: 2 },
  { id: "cis", name: "Collective Investment Schemes (CIS)", description: "CIS investments", filterCount: 2 },
  { id: "aif", name: "Alternative Investment Funds (AIF) Units", description: "AIF holdings", filterCount: 3 },
  { id: "invit", name: "Infrastructure Investment Trusts (INVIT)", description: "InvIT units", filterCount: 2 },
  { id: "reit", name: "Real Estate Investment Trusts (REIT)", description: "REIT units", filterCount: 2 },
  { id: "gstr", name: "GST Returns (GSTR 1 & 3B)", description: "GST filing records", filterCount: 4 },
  { id: "general-insurance", name: "General Insurance", description: "General insurance policies", filterCount: 3 },
  { id: "life-insurance", name: "Life Insurance", description: "Life insurance policies", filterCount: 3 },
  { id: "nps", name: "National Pension System (NPS)", description: "NPS account balances", filterCount: 2 },
];

const FITypesList = () => {
  const [selectedFI, setSelectedFI] = useState<FIType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (fi: FIType) => {
    setSelectedFI(fi);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-foreground">Financial Information Manager</h1>
            <Badge variant="secondary" className="text-sm">
              <span className="font-semibold">FIP:</span> Finshare
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Manage and edit your financial institution data across multiple FI types
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FI_TYPES.map((fi) => (
            <Card
              key={fi.id}
              className="hover:shadow-md transition-shadow duration-200 border-border"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{fi.name}</CardTitle>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">{fi.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <span>{fi.filterCount} filters available</span>
                  </div>
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleEdit(fi)}
                    className="gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <FIEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fiType={selectedFI}
      />
    </div>
  );
};

export default FITypesList;
