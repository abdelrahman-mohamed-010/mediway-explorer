import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Calendar, Map, Stethoscope, Heart, ChartLine, Bell, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/75 backdrop-blur-md fixed w-full z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-primary">LiverCare</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-gray-600 hover:text-primary px-3 py-2">Features</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-primary px-3 py-2">How it Works</a>
                <a href="#about" className="text-gray-600 hover:text-primary px-3 py-2">About</a>
                <Link to="/appointment" className="text-primary hover:text-primary/90 px-3 py-2">Find Doctors</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-sage-50 opacity-50"></div>
        <div className="relative container mx-auto px-4 pt-24 pb-32 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Monitor Your Liver Health,{" "}
              <span className="text-primary">Live Better</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Take control of your liver health with our comprehensive tracking system.
              Connect with specialists and receive personalized insights for a healthier life.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/appointment">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Start Monitoring
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#how-it-works" className="text-sm font-semibold leading-6 text-gray-900 flex items-center">
                Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Complete Liver Health Monitoring
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Track, understand, and improve your liver health with our comprehensive tools
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

      {/* How It Works Section */}
      <div id="how-it-works" className="py-24 sm:py-32 bg-sage-50/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How LiverCare Works
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Simple steps to better liver health monitoring
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-white p-6 rounded-lg shadow-sm"
                >
                  <div className="absolute -top-4 left-4 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose LiverCare?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're dedicated to making liver health monitoring accessible, understandable,
              and actionable for everyone. Our platform combines medical expertise with
              user-friendly technology to help you maintain optimal liver health.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-sage-50/30 border-t">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-600 hover:text-primary">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-primary">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-primary">Contact</a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-600">
              &copy; {new Date().getFullYear()} LiverCare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    name: "Track Health Metrics",
    description:
      "Monitor key liver health indicators, symptoms, and lifestyle factors that affect your liver function.",
    icon: Activity,
  },
  {
    name: "Expert Consultation",
    description:
      "Connect with liver specialists and healthcare providers for professional guidance and care.",
    icon: Stethoscope,
  },
  {
    name: "Progress Analysis",
    description:
      "View detailed analytics and trends of your liver health metrics over time.",
    icon: ChartLine,
  },
];

const steps = [
  {
    title: "Track Your Metrics",
    description: "Input your liver health indicators and symptoms regularly to establish baseline data.",
  },
  {
    title: "Get Insights",
    description: "Receive personalized analysis and recommendations based on your health data.",
  },
  {
    title: "Connect with Doctors",
    description: "Easily share your health data with specialists and schedule consultations when needed.",
  },
];

export default Index;
