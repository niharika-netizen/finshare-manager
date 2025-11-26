import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import FIEditModal from "@/components/FIEditModal";
import { FIType } from "@/types/fi-types";

const FI_TYPES: FIType[] = [
  { 
    id: "deposit", 
    name: "Deposit", 
    description: "Regular savings and deposit accounts", 
    accountNumber: "XXXX1234",
    schemaVersion: "2.0.0",
    accountType: "Savings",
  },
  { 
    id: "term-deposit", 
    name: "Term Deposit", 
    description: "Fixed term deposit accounts", 
    accountNumber: "XXXX5678",
    schemaVersion: "2.0.0",
    accountType: "Fixed Deposit",
  },
  { 
    id: "recurring-deposit", 
    name: "Recurring Deposit", 
    description: "Recurring deposit schemes", 
    accountNumber: "XXXX9012",
    schemaVersion: "2.0.0",
    accountType: "Recurring Deposit",
  },
  { 
    id: "sip", 
    name: "Systematic Investment Plan (SIP)", 
    description: "Regular investment plans", 
    accountNumber: "XXXX3456",
    schemaVersion: "2.0.0",
    accountType: "SIP",
  },
  { 
    id: "equity-shares", 
    name: "Equities", 
    description: "Stock holdings and equity investments", 
    accountNumber: "XXXX7890",
    schemaVersion: "1.0.0",
    accountType: "Demat",
  },
  { 
    id: "mutual-funds", 
    name: "Mutual Funds", 
    description: "Mutual fund investments", 
    accountNumber: "XXXX2468",
    schemaVersion: "1.0.0",
    accountType: "Mutual Fund",
  },
  { 
    id: "etf", 
    name: "ETF", 
    description: "Exchange traded fund holdings", 
    accountNumber: "XXXX1357",
    schemaVersion: "1.0.0",
    accountType: "Demat",
  },
  { 
    id: "idr", 
    name: "IDR", 
    description: "IDR holdings", 
    accountNumber: "XXXX8642",
    schemaVersion: "1.0.0",
    accountType: "Demat",
  },
  { 
    id: "cis", 
    name: "Collective Investment Schemes (CIS)", 
    description: "Collective investment scheme units", 
    accountNumber: "XXXX9753",
    schemaVersion: "2.0.0",
    accountType: "Investment",
  },
  { 
    id: "aif", 
    name: "Alternative Investment Funds (AIF)", 
    description: "AIF unit holdings", 
    accountNumber: "XXXX1593",
    schemaVersion: "2.0.0",
    accountType: "AIF",
  },
  { 
    id: "invit", 
    name: "InvIT", 
    description: "Infrastructure Investment Trust units", 
    accountNumber: "XXXX7531",
    schemaVersion: "1.0.0",
    accountType: "Investment",
  },
  { 
    id: "reit", 
    name: "Real Estate Investment Trust (REIT)", 
    description: "REIT unit holdings", 
    accountNumber: "XXXX8524",
    schemaVersion: "2.0.0",
    accountType: "Investment",
  },
  { 
    id: "nps", 
    name: "NPS", 
    description: "National Pension System", 
    accountNumber: "XXXX9517",
    schemaVersion: "1.0.0",
    accountType: "Pension",
  },
  { 
    id: "gst", 
    name: "GST", 
    description: "GST registration details", 
    accountNumber: "XXXX8529",
    schemaVersion: "1.1.0",
    accountType: "GST",
  },
  { 
    id: "insurance", 
    name: "General Insurance", 
    description: "General insurance policies", 
    accountNumber: "XXXX7538",
    schemaVersion: "1.0.0",
    accountType: "Insurance",
  },
  { 
    id: "life-insurance", 
    name: "Life Insurance", 
    description: "Life insurance policies", 
    accountNumber: "XXXX6542",
    schemaVersion: "1.0.0",
    accountType: "Life Insurance",
  },
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
                <TableHead>Account Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FI_TYPES.map((fi) => (
                <TableRow key={fi.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono">{fi.accountNumber}</TableCell>
                  <TableCell className="font-medium">{fi.name}</TableCell>
                  <TableCell className="text-muted-foreground">{fi.description}</TableCell>
                  <TableCell>{fi.accountType}</TableCell>
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
    </div>
  );
};

export default FITypesList;
