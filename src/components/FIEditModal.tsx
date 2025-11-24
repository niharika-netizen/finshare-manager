import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink, RotateCcw, Save, Undo2 } from "lucide-react";
import { FIType } from "@/types/fi-types";
import ProfileTab from "./tabs/ProfileTab";
import SummaryTab from "./tabs/SummaryTab";
import TransactionTab from "./tabs/TransactionTab";
import { useState } from "react";
import { toast } from "sonner";

interface FIEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  fiType: FIType | null;
}

const FIEditModal = ({ isOpen, onClose, fiType }: FIEditModalProps) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [hasChanges, setHasChanges] = useState(false);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-hidden flex flex-col p-0">
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

        <div className="flex-1 overflow-hidden px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="transaction">Transaction</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-auto pb-4">
              <TabsContent value="profile" className="mt-0 h-full">
                <ProfileTab onDataChange={() => setHasChanges(true)} />
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="link"
                    onClick={handleRBIGuidelines}
                    className="gap-2 text-primary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View RBI Guidelines
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="summary" className="mt-0 h-full">
                <SummaryTab onDataChange={() => setHasChanges(true)} />
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="link"
                    onClick={handleRBIGuidelines}
                    className="gap-2 text-primary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View RBI Guidelines
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="transaction" className="mt-0 h-full">
                <TransactionTab onDataChange={() => setHasChanges(true)} />
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="link"
                    onClick={handleRBIGuidelines}
                    className="gap-2 text-primary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View RBI Guidelines
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FIEditModal;
