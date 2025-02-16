
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Map, Stethoscope, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-sage-50 opacity-50"></div>
        <div className="relative container mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Find the Right Doctor,{" "}
              <span className="text-primary">Right Now</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Connect with qualified healthcare professionals in your area.
              Schedule appointments and receive personalized care that fits your
              needs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/appointment">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything You Need in One Place
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Simple, intuitive, and designed for your healthcare journey
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon
                      className="h-5 w-5 flex-none text-primary"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    name: "Find Nearby Doctors",
    description:
      "Locate qualified healthcare professionals in your area with our interactive map and comprehensive search tools.",
    icon: Map,
  },
  {
    name: "Easy Scheduling",
    description:
      "Book appointments that fit your schedule with our intuitive calendar system.",
    icon: Calendar,
  },
  {
    name: "Expert Care",
    description:
      "Connect with experienced healthcare providers specializing in your specific needs.",
    icon: Stethoscope,
  },
];

export default Index;
