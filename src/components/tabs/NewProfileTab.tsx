import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileData, HolderData } from "@/types/fi-types";
import { Button } from "@/components/ui/button";
import { ExternalLink, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface NewProfileTabProps {
  onDataChange: () => void;
}

const NewProfileTab = ({ onDataChange }: NewProfileTabProps) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    holdersType: "SINGLE",
    holders: [
      {
        name: "John Doe",
        dob: "1990-01-15",
        mobile: "9876543210",
        nominee: "REGISTERED",
        landline: "022-12345678",
        address: "123 Main Street, Mumbai, Maharashtra 400001",
        email: "john.doe@example.com",
        pan: "ABCDE1234F",
        ckycRegistered: "YES",
      },
    ],
  });

  const handleHoldersTypeChange = (value: "SINGLE" | "JOINT") => {
    setProfileData((prev) => ({ ...prev, holdersType: value }));
    onDataChange();
  };

  const handleHolderChange = (index: number, field: keyof HolderData, value: string) => {
    const updatedHolders = [...profileData.holders];
    updatedHolders[index] = { ...updatedHolders[index], [field]: value };
    setProfileData((prev) => ({ ...prev, holders: updatedHolders }));
    onDataChange();
  };

  const handleDateChange = (index: number, date: Date | undefined) => {
    if (date) {
      handleHolderChange(index, "dob", format(date, "yyyy-MM-dd"));
    }
  };

  const addHolder = () => {
    setProfileData((prev) => ({
      ...prev,
      holders: [
        ...prev.holders,
        {
          name: "",
          dob: "",
          mobile: "",
          nominee: "NOT-REGISTERED",
          landline: "",
          address: "",
          email: "",
          pan: "",
          ckycRegistered: "NO_DATA_AVAILABLE",
        },
      ],
    }));
    onDataChange();
  };

  const removeHolder = (index: number) => {
    if (profileData.holders.length > 1) {
      setProfileData((prev) => ({
        ...prev,
        holders: prev.holders.filter((_, i) => i !== index),
      }));
      onDataChange();
    }
  };

  const handleRBIGuidelines = () => {
    window.open("https://www.rbi.org.in/", "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Label htmlFor="holdersType">Holders Type *</Label>
          <Select value={profileData.holdersType} onValueChange={handleHoldersTypeChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="SINGLE">SINGLE</SelectItem>
              <SelectItem value="JOINT">JOINT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" onClick={handleRBIGuidelines} className="gap-2">
          <ExternalLink className="h-4 w-4" />
          View RBI Guidelines
        </Button>
      </div>

      {profileData.holders.map((holder, index) => (
        <div key={index} className="border rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Holder {index + 1}</h3>
            {profileData.holders.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeHolder(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`name-${index}`}>Full Name *</Label>
              <Input
                id={`name-${index}`}
                value={holder.name}
                onChange={(e) => handleHolderChange(index, "name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`dob-${index}`}>Date of Birth *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !holder.dob && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {holder.dob ? format(new Date(holder.dob), "dd/MM/yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={holder.dob ? new Date(holder.dob) : undefined}
                    onSelect={(date) => handleDateChange(index, date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`mobile-${index}`}>Mobile Number *</Label>
              <Input
                id={`mobile-${index}`}
                value={holder.mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  handleHolderChange(index, "mobile", value);
                }}
                maxLength={10}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`nominee-${index}`}>Nominee</Label>
              <Select
                value={holder.nominee}
                onValueChange={(value) => handleHolderChange(index, "nominee", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="REGISTERED">REGISTERED</SelectItem>
                  <SelectItem value="NOT-REGISTERED">NOT-REGISTERED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`landline-${index}`}>Landline</Label>
              <Input
                id={`landline-${index}`}
                value={holder.landline}
                onChange={(e) => handleHolderChange(index, "landline", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`email-${index}`}>Email Address</Label>
              <Input
                id={`email-${index}`}
                type="email"
                value={holder.email}
                onChange={(e) => handleHolderChange(index, "email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`pan-${index}`}>PAN Number</Label>
              <Input
                id={`pan-${index}`}
                value={holder.pan}
                onChange={(e) => handleHolderChange(index, "pan", e.target.value.toUpperCase())}
                maxLength={10}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`ckycRegistered-${index}`}>CKYC Registered *</Label>
              <Select
                value={holder.ckycRegistered}
                onValueChange={(value) => handleHolderChange(index, "ckycRegistered", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="YES">YES</SelectItem>
                  <SelectItem value="NO">NO</SelectItem>
                  <SelectItem value="NO_DATA_AVAILABLE">NO DATA AVAILABLE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor={`address-${index}`}>Address</Label>
              <Input
                id={`address-${index}`}
                value={holder.address}
                onChange={(e) => handleHolderChange(index, "address", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      {profileData.holdersType === "JOINT" && (
        <Button onClick={addHolder} variant="outline" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add Another Holder
        </Button>
      )}
    </div>
  );
};

export default NewProfileTab;
