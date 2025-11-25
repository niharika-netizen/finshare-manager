import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccountData } from "@/types/fi-types";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface AccountTabProps {
  onDataChange: () => void;
}

const AccountTab = ({ onDataChange }: AccountTabProps) => {
  const [accountData, setAccountData] = useState<AccountData>({
    type: "SAVINGS",
    maskedAccNumber: "XXXX1234",
    version: "2.0.0",
    linkedAccRef: "ACC-REF-001",
  });

  const handleChange = (field: keyof AccountData, value: string) => {
    setAccountData((prev) => ({ ...prev, [field]: value }));
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
          <Label htmlFor="type">Account Type *</Label>
          <Input
            id="type"
            value={accountData.type}
            onChange={(e) => handleChange("type", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maskedAccNumber">Masked Account Number *</Label>
          <Input
            id="maskedAccNumber"
            value={accountData.maskedAccNumber}
            onChange={(e) => handleChange("maskedAccNumber", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="version">Schema Version *</Label>
          <Input
            id="version"
            value={accountData.version}
            disabled
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedAccRef">Linked Account Reference *</Label>
          <Input
            id="linkedAccRef"
            value={accountData.linkedAccRef}
            onChange={(e) => handleChange("linkedAccRef", e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
