import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, MapPin, Calendar, Edit2 } from "lucide-react";
import { useState, useRef } from "react";

const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Health Street, Medical City",
    joinDate: "January 2024",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // TODO: Implement API call to update user data
    setIsEditing(false);
  };

  const renderField = (
    icon: React.ReactNode,
    label: string,
    field: keyof typeof formData
  ) => (
    <div className="flex items-center gap-3 py-3">
      {icon}
      <div className="flex justify-between items-center w-full">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        {isEditing ? (
          <Input
            value={formData[field]}
            onChange={(e) =>
              setFormData({ ...formData, [field]: e.target.value })
            }
            className="max-w-[250px]"
          />
        ) : (
          <span className="text-sm">{formData[field]}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className=" mx-auto">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={formData.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-primary/10 object-cover"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 rounded-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                if (isEditing) {
                  handleSubmit();
                } else {
                  setIsEditing(true);
                }
              }}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>

          {/* Profile Information */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
            <div className="space-y-4 divide-y divide-gray-100">
              {renderField(
                <User className="w-5 h-5 text-primary flex-shrink-0" />,
                "Full Name",
                "name"
              )}
              {renderField(
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />,
                "Email",
                "email"
              )}
              {renderField(
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />,
                "Phone",
                "phone"
              )}
              {renderField(
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />,
                "Address",
                "address"
              )}
              {renderField(
                <Calendar className="w-5 h-5 text-primary flex-shrink-0" />,
                "Member Since",
                "joinDate"
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Health Records Section */}
      <Card className="mt-8 p-6">
        <h2 className="text-2xl font-bold mb-6">Health Records</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button variant="outline" className="h-24 flex flex-col gap-2">
            <span className="text-lg">Medical History</span>
            <span className="text-sm text-gray-500">
              View your medical records
            </span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2">
            <span className="text-lg">Test Results</span>
            <span className="text-sm text-gray-500">
              Access your test results
            </span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
