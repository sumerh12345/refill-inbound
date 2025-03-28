
import React from "react";
import { PhoneCall, Search, User, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex flex-col">
        {/* Hero Section - Modified to reduce repetition */}
        <section className="pt-32 pb-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 animate-fade-in">
              <div className="inline-block pill bg-accent text-accent-foreground font-medium mb-4 px-4 py-2 rounded-full">
                Inbound Call Medication Verification
              </div>
              <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-6">
                Streamlining Medicare medication verification for inbound calls.
                Quick, accurate, and efficient.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/patient">
                    <User className="h-5 w-5" />
                    Patient Info
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 md:px-8 bg-accent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Designed to make your Medicare medication verification process smooth and efficient
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <PhoneCall className="h-8 w-8 text-primary" />,
                  title: "Inbound Call Management",
                  description: "Efficiently manage incoming calls with a clear dashboard and patient information display."
                },
                {
                  icon: <Search className="h-8 w-8 text-primary" />,
                  title: "Medicare Verification",
                  description: "Quickly verify if medications are covered by Medicare with our comprehensive database."
                },
                {
                  icon: <User className="h-8 w-8 text-primary" />,
                  title: "Patient Information",
                  description: "Access patient details instantly including insurance eligibility and medication history."
                }
              ].map((feature, index) => (
                <div key={index} className="glass-card p-6 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A simple three-step process to verify medication coverage
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              {[
                {
                  step: "01",
                  title: "Receive Call",
                  description: "Receive inbound calls from patients requesting Medicare coverage information."
                },
                {
                  step: "02",
                  title: "Search Medication",
                  description: "Quickly search for the medication in our comprehensive Medicare database."
                },
                {
                  step: "03",
                  title: "Verify Coverage",
                  description: "Instantly see if the medication is covered, including any restrictions or requirements."
                }
              ].map((step, index) => (
                <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="glass-card p-6 h-full">
                    <div className="text-4xl font-bold text-primary/20 mb-4">{step.step}</div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-8 w-8 text-primary/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 md:px-8 bg-primary/5">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                    Ready to streamline your medication verification?
                  </h2>
                  <p className="text-muted-foreground max-w-xl">
                    Get started with our dashboard to efficiently manage inbound calls and verify Medicare coverage.
                  </p>
                </div>
                <Button asChild size="lg">
                  <Link to="/patient">
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
