import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RotateCcw, Save, Undo2 } from "lucide-react";
import { FIType } from "@/types/fi-types";
import AccountTab from "./tabs/AccountTab";
import NewProfileTab from "./tabs/NewProfileTab";
import NewSummaryTab from "./tabs/NewSummaryTab";
import DynamicTransactionTab from "./tabs/DynamicTransactionTab";
import { useState } from "react";
import { toast } from "sonner";
import { transactionSchemaMap } from "@/types/transaction-schemas";

interface FIEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  fiType: FIType | null;
}

const FIEditModal = ({ isOpen, onClose, fiType }: FIEditModalProps) => {
  const [activeTab, setActiveTab] = useState("account");
  const [hasChanges, setHasChanges] = useState(false);

  const handleDataChange = () => {
    setHasChanges(true);
  };

  const handleSave = () => {
    toast.success("Changes saved successfully");
    setHasChanges(false);
  };

  const handleReset = () => {
    toast.info("All changes have been reset");
    setHasChanges(false);
  };

  const handleUndo = () => {
    toast.info("Last change undone");
  };

  const handleRBIGuidelines = () => {
    window.open("https://www.rbi.org.in/", "_blank");
  };

  if (!fiType) return null;

  const transactionFields = transactionSchemaMap[fiType.name] || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-hidden flex p-0">
        <div className="flex-1 flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">{fiType.name}</DialogTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUndo}
                  disabled={!hasChanges}
                >
                  <Undo2 className="h-4 w-4 mr-2" />
                  Undo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  disabled={!hasChanges}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button size="sm" onClick={handleSave} disabled={!hasChanges}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-hidden flex">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex" orientation="vertical">
              <TabsList className="flex flex-col h-auto w-48 bg-muted p-2 gap-2 rounded-none border-r">
                <TabsTrigger value="account" className="w-full justify-start">Account</TabsTrigger>
                <TabsTrigger value="profile" className="w-full justify-start">Profile</TabsTrigger>
                <TabsTrigger value="summary" className="w-full justify-start">Summary</TabsTrigger>
                <TabsTrigger value="transactions" className="w-full justify-start">Transactions</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-auto p-6">
                <TabsContent value="account" className="mt-0 h-full">
                  <AccountTab onDataChange={handleDataChange} />
                </TabsContent>

                <TabsContent value="profile" className="mt-0 h-full">
                  <NewProfileTab onDataChange={handleDataChange} />
                </TabsContent>

                <TabsContent value="summary" className="mt-0 h-full">
                  <NewSummaryTab onDataChange={handleDataChange} />
                </TabsContent>

                <TabsContent value="transactions" className="mt-0 h-full">
                  <DynamicTransactionTab 
                    onDataChange={handleDataChange} 
                    transactionFields={transactionFields}
                    fiTypeName={fiType.name}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FIEditModal;
