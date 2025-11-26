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
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

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
        <div className="flex-1 flex flex-col overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b flex-shrink-0">
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            <div className="border-b bg-muted/30 px-6 flex-shrink-0">
              <TabsList className="h-auto bg-transparent p-0 gap-0">
                <TabsTrigger value="account" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm px-6 py-3">
                  Account
                </TabsTrigger>
                <TabsTrigger value="profile" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm px-6 py-3">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="summary" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm px-6 py-3">
                  Summary
                </TabsTrigger>
                <TabsTrigger value="transactions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm px-6 py-3">
                  Transactions
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-x-auto overflow-y-auto min-h-0">
              <TabsContent value="account" className="mt-0 h-full p-6 min-w-full">
                <div className="flex justify-end mb-4">
                  <Button variant="outline" size="sm" onClick={handleRBIGuidelines}>
                    View RBI Guidelines
                  </Button>
                </div>
                <AccountTab onDataChange={handleDataChange} />
              </TabsContent>

              <TabsContent value="profile" className="mt-0 h-full p-6 min-w-full">
                <div className="flex justify-end mb-4">
                  <Button variant="outline" size="sm" onClick={handleRBIGuidelines}>
                    View RBI Guidelines
                  </Button>
                </div>
                <NewProfileTab onDataChange={handleDataChange} />
              </TabsContent>

              <TabsContent value="summary" className="mt-0 h-full p-6 min-w-full">
                <div className="flex justify-end mb-4">
                  <Button variant="outline" size="sm" onClick={handleRBIGuidelines}>
                    View RBI Guidelines
                  </Button>
                </div>
                <NewSummaryTab onDataChange={handleDataChange} />
              </TabsContent>

              <TabsContent value="transactions" className="mt-0 h-full overflow-x-auto overflow-y-auto flex flex-col p-6 min-w-full">
                {/* Date Range Filter */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Start Date</label>
                    <span className="text-red-500">*</span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">End Date</label>
                    <span className="text-red-500">*</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex-1"></div>

                  <Button variant="outline" size="sm" onClick={handleRBIGuidelines}>
                    View RBI Guidelines
                  </Button>
                </div>

                {/* Transaction Table */}
                <div className="flex-1 overflow-auto border border-gray-200 rounded-lg">
                  <table className="w-full border-collapse text-sm">
                    <thead className="sticky top-0 bg-gray-100 border-b border-gray-300">
                      <tr>
                        {transactionFields.length > 0 ? (
                          transactionFields.map((field) => (
                            <th
                              key={field.name}
                              className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-300 last:border-r-0 whitespace-nowrap"
                            >
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </th>
                          ))
                        ) : (
                          <th className="px-4 py-3 text-center text-gray-500 font-medium">
                            No transaction fields configured for this FI type
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {transactionFields.length > 0 ? (
                        // Sample rows - Replace with actual transaction data
                        [
                          {
                            type: "CREDIT",
                            mode: "UPI",
                            amount: "5000.00",
                            transactionalBalance: "₹150,000",
                            transactionTimestamp: "20/11/2024 16:00",
                            valueDate: "20/11/2024 16:00",
                            txnId: "TXN001",
                            narration: "Salary Credit",
                            reference: "-",
                          },
                          {
                            type: "DEBIT",
                            mode: "NEFT",
                            amount: "2000.00",
                            transactionalBalance: "₹148,000",
                            transactionTimestamp: "21/11/2024 19:45",
                            valueDate: "21/11/2024 19:45",
                            txnId: "TXN002",
                            narration: "Bill Payment",
                            reference: "-",
                          },
                        ].map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            {transactionFields.map((field) => {
                              const value = row[field.name as keyof typeof row] || "";
                              return (
                                <td
                                  key={field.name}
                                  className="px-4 py-3 border-r border-gray-200 last:border-r-0 text-gray-700"
                                >
                                  {field.type === "select" ? (
                                    <select
                                      value={value}
                                      onChange={(e) => handleDataChange()}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                      <option value="">{value || "Select..."}</option>
                                      {field.options?.map((opt) => (
                                        <option key={opt} value={opt}>
                                          {opt}
                                        </option>
                                      ))}
                                    </select>
                                  ) : field.type === "date" ? (
                                    <input
                                      type="date"
                                      value={value}
                                      onChange={(e) => handleDataChange()}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                  ) : field.type === "datetime" ? (
                                    <input
                                      type="datetime-local"
                                      value={value}
                                      onChange={(e) => handleDataChange()}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                  ) : field.type === "number" ? (
                                    <input
                                      type="number"
                                      value={value}
                                      onChange={(e) => handleDataChange()}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                  ) : field.type === "boolean" ? (
                                    <input
                                      type="checkbox"
                                      checked={value === "true" || value === true}
                                      onChange={(e) => handleDataChange()}
                                      className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
                                    />
                                  ) : (
                                    <input
                                      type="text"
                                      value={value}
                                      onChange={(e) => handleDataChange()}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="px-4 py-8 text-center text-gray-500">
                            No transaction fields configured
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls (Optional) */}
                {transactionFields.length > 0 && (
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-600">Showing 2 of 2 transactions</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled>
                        ← Previous
                      </Button>
                      <Button variant="outline" size="sm" disabled>
                        Next →
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FIEditModal;
