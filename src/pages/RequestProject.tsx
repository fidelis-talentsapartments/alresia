import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";

const projectTypes = [
  { id: "web", label: "Web Application" },
  { id: "mobile", label: "Mobile App" },
  { id: "ai", label: "AI/ML Solution" },
  { id: "design", label: "UI/UX Design" },
  { id: "other", label: "Other" },
];

const budgetRanges = [
  { id: "10-25", label: "$10,000 - $25,000" },
  { id: "25-50", label: "$25,000 - $50,000" },
  { id: "50-100", label: "$50,000 - $100,000" },
  { id: "100+", label: "$100,000+" },
  { id: "unsure", label: "Not sure yet" },
];

const timelines = [
  { id: "1-2", label: "1-2 months" },
  { id: "3-4", label: "3-4 months" },
  { id: "5-6", label: "5-6 months" },
  { id: "6+", label: "6+ months" },
  { id: "flexible", label: "Flexible" },
];

export default function RequestProject() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    projectType: [] as string[],
    title: "",
    description: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
    phone: "",
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleProjectType = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      projectType: prev.projectType.includes(id)
        ? prev.projectType.filter((t) => t !== id)
        : [...prev.projectType, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Project request submitted!",
      description:
        "We'll review your request and get back to you within 24 hours.",
    });
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.projectType.length > 0;
      case 2:
        return formData.title && formData.description;
      case 3:
        return formData.budget && formData.timeline;
      case 4:
        return formData.name && formData.email;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Seo
          title="Request a Project"
          description="Your project request has been submitted to Alresia Technologies. We will review the details and respond within 24 hours."
          path="/request-project"
        />
        <Layout>
          <section className="pt-32 pb-24 min-h-screen flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl mx-auto text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Request Submitted!</h1>
                <p className="text-muted-foreground mb-8">
                  Thank you for your interest in working with DevForge. Our team
                  will review your project requirements and reach out within 24
                  hours with an AI-generated project scope and next steps.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/">
                    <Button variant="outline">Back to Home</Button>
                  </Link>
                  <Link to="/projects">
                    <Button variant="hero">View Our Work</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Request a Project"
        description="Tell Alresia Technologies about your project and receive a scoped proposal, timeline, and technology recommendations."
        path="/request-project"
        keywords={[
          "project request",
          "proposal",
          "estimation",
          "digital product scope",
        ]}
      />
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">AI-Powered Scoping</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Request a Project
              </h1>
              <p className="text-xl text-muted-foreground">
                Tell us about your project and we'll provide an AI-generated
                scope, timeline, and tech recommendations within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Progress Bar */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`flex items-center ${s < 4 ? "flex-1" : ""}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        s <= step
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s}
                    </div>
                    {s < 4 && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded transition-colors ${
                          s < step ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Type</span>
                <span>Details</span>
                <span>Budget</span>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-8 pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Project Type */}
                {step === 1 && (
                  <div className="space-y-6 animate-fade-up">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        What type of project?
                      </h2>
                      <p className="text-muted-foreground">
                        Select all that apply to your project needs.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {projectTypes.map((type) => (
                        <label
                          key={type.id}
                          className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                            formData.projectType.includes(type.id)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Checkbox
                            checked={formData.projectType.includes(type.id)}
                            onCheckedChange={() => toggleProjectType(type.id)}
                          />
                          <span className="font-medium">{type.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Project Details */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-up">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        Tell us about your project
                      </h2>
                      <p className="text-muted-foreground">
                        The more details you provide, the better our AI can
                        scope your project.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Project Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g., E-Commerce Platform Redesign"
                          value={formData.title}
                          onChange={(e) =>
                            updateFormData("title", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Project Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your project goals, target users, key features, and any technical requirements..."
                          rows={8}
                          value={formData.description}
                          onChange={(e) =>
                            updateFormData("description", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Budget & Timeline */}
                {step === 3 && (
                  <div className="space-y-8 animate-fade-up">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        Budget & Timeline
                      </h2>
                      <p className="text-muted-foreground">
                        Help us understand your constraints.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Label>Budget Range</Label>
                      <RadioGroup
                        value={formData.budget}
                        onValueChange={(value) =>
                          updateFormData("budget", value)
                        }
                        className="grid sm:grid-cols-2 gap-3"
                      >
                        {budgetRanges.map((range) => (
                          <label
                            key={range.id}
                            className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                              formData.budget === range.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <RadioGroupItem value={range.id} />
                            <span className="font-medium">{range.label}</span>
                          </label>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label>Expected Timeline</Label>
                      <RadioGroup
                        value={formData.timeline}
                        onValueChange={(value) =>
                          updateFormData("timeline", value)
                        }
                        className="grid sm:grid-cols-2 gap-3"
                      >
                        {timelines.map((timeline) => (
                          <label
                            key={timeline.id}
                            className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                              formData.timeline === timeline.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <RadioGroupItem value={timeline.id} />
                            <span className="font-medium">
                              {timeline.label}
                            </span>
                          </label>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact Info */}
                {step === 4 && (
                  <div className="space-y-6 animate-fade-up">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        Contact Information
                      </h2>
                      <p className="text-muted-foreground">
                        How can we reach you with our proposal?
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) =>
                              updateFormData("name", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) =>
                              updateFormData("email", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company (Optional)</Label>
                          <Input
                            id="company"
                            placeholder="Company Inc."
                            value={formData.company}
                            onChange={(e) =>
                              updateFormData("company", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone (Optional)</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) =>
                              updateFormData("phone", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 1}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  {step < 4 ? (
                    <Button
                      type="button"
                      variant="hero"
                      onClick={() => setStep(step + 1)}
                      disabled={!canProceed()}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="hero"
                      disabled={!canProceed() || isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
