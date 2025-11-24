import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FIType } from "@/types/fi-types";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

interface FilterSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fiType: FIType | null;
  selectedFilters: string[];
  onSave: (filters: string[]) => void;
}

const FilterSelectionDialog = ({
  isOpen,
  onClose,
  fiType,
  selectedFilters,
  onSave,
}: FilterSelectionDialogProps) => {
  const [tempFilters, setTempFilters] = useState<string[]>(selectedFilters);
  const maxFilters = 3;

  useEffect(() => {
    setTempFilters(selectedFilters);
  }, [selectedFilters, isOpen]);

  const handleToggleFilter = (filter: string) => {
    setTempFilters((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((f) => f !== filter);
      } else {
        if (prev.length >= maxFilters) {
          toast.error(`You can select a maximum of ${maxFilters} filters`);
          return prev;
        }
        return [...prev, filter];
      }
    });
  };

  const handleSave = () => {
    onSave(tempFilters);
    toast.success(`Filters applied successfully for ${fiType?.name}`);
    onClose();
  };

  const handleReset = () => {
    setTempFilters([]);
    toast.info("All filters cleared");
  };

  if (!fiType) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Select Filters</DialogTitle>
          <DialogDescription>
            Choose up to {maxFilters} filters for <span className="font-semibold">{fiType.name}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4 p-3 bg-muted/50 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Selected filters will modify the sample data to match your chosen scenarios.
            </p>
          </div>

          <div className="space-y-3">
            {fiType.availableFilters.map((filter) => (
              <div
                key={filter}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={filter}
                  checked={tempFilters.includes(filter)}
                  onCheckedChange={() => handleToggleFilter(filter)}
                  disabled={
                    !tempFilters.includes(filter) && tempFilters.length >= maxFilters
                  }
                />
                <Label
                  htmlFor={filter}
                  className="flex-1 cursor-pointer font-normal"
                >
                  {filter}
                </Label>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-muted-foreground text-center">
            {tempFilters.length} of {maxFilters} filters selected
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleReset}>
            Clear All
          </Button>
          <Button onClick={handleSave}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterSelectionDialog;
