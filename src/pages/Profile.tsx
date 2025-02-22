import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, MapPin, Activity, User2, Edit2 } from "lucide-react";
import { useState, useRef } from "react";

const FAKE_USER = {
  email: "yossefehab@gmail.com",
  password: "1234",
  avatar: "https://i.pravatar.cc/100?u=zz",
  name: "yossef",
  age: "56",
  Gender: "male",
  medHistory: {
    Epigastric_pain: "",
    Jaundice: "",
    bone_ache: "",
    Diarrhea: "",
    Headache: "",
    Nausea: "",
    Fever: "",
  },
  previousSubmits: {
    package: {
      submitImg: "",
      report: "",
    },
  },
};

const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: FAKE_USER.name,
    email: FAKE_USER.email,
    age: FAKE_USER.age,
    Gender: FAKE_USER.Gender,
    avatar: FAKE_USER.avatar,
    medHistory: FAKE_USER.medHistory,
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
        {isEditing && typeof formData[field] === "string" ? (
          <Input
            value={formData[field] as string}
            onChange={(e) =>
              setFormData({ ...formData, [field]: e.target.value })
            }
            className="max-w-[250px]"
          />
        ) : (
          <span className="text-sm">{formData[field] as string}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="mx-auto">
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
                <Activity className="w-5 h-5 text-primary flex-shrink-0" />,
                "Age",
                "age"
              )}
              {renderField(
                <User2 className="w-5 h-5 text-primary flex-shrink-0" />,
                "Gender",
                "Gender"
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Medical History Section */}
      <Card className="mt-8 p-6">
        <h2 className="text-2xl font-bold mb-6">Medical History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData.medHistory).map(([condition, value]) => (
            <div
              key={condition}
              className="flex items-center justify-between p-4 border rounded"
            >
              <span className="text-sm font-medium">
                {condition.replace(/_/g, " ")}
              </span>
              <Input
                value={value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medHistory: {
                      ...formData.medHistory,
                      [condition]: e.target.value,
                    },
                  })
                }
                disabled={!isEditing}
                className="max-w-[200px]"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Previous Submissions */}
      <Card className="mt-8 p-6">
        <h2 className="text-2xl font-bold mb-6">Previous Submissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button variant="outline" className="h-24 flex flex-col gap-2">
            <span className="text-lg">View Reports</span>
            <span className="text-sm text-gray-500">
              Access your previous reports
            </span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2">
            <span className="text-lg">Submitted Images</span>
            <span className="text-sm text-gray-500">
              View your submitted images
            </span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
