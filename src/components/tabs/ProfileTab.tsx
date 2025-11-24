import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileData } from "@/types/fi-types";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ProfileTabProps {
  onDataChange: () => void;
}

const ProfileTab = ({ onDataChange }: ProfileTabProps) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "John Doe",
    mobileNumber: "9876543210",
    email: "john.doe@example.com",
    pan: "ABCDE1234F",
    address: "123 Main Street, Mumbai, Maharashtra 400001",
    dateOfBirth: "1990-01-15",
  });

  const [dob, setDob] = useState<Date>(new Date(profileData.dateOfBirth));

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
    onDataChange();
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDob(date);
      handleChange("dateOfBirth", format(date, "yyyy-MM-dd"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={profileData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input
            id="mobileNumber"
            value={profileData.mobileNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 10);
              handleChange("mobileNumber", value);
            }}
            maxLength={10}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={profileData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pan">PAN Number</Label>
          <Input
            id="pan"
            value={profileData.pan}
            onChange={(e) => handleChange("pan", e.target.value.toUpperCase())}
            maxLength={10}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dob && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dob ? format(dob, "dd/MM/yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
              <Calendar
                mode="single"
                selected={dob}
                onSelect={handleDateChange}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={profileData.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
