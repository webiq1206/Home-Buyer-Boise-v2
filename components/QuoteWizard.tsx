import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, MapPin, CheckCircle2, Home, Info, DollarSign, Clock, Phone, Mail } from "lucide-react";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { offerSubmissionSchema } from "@shared/schema";

// Step 1: Property Address
const step1Schema = z.object({
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(1, "Please select your city"),
  state: z.string().default("Idaho"),
  zip: z.string().optional(),
});

// Step 2: Property Details
const step2Schema = z.object({
  propertyType: z.enum(["single-family", "townhome", "condo", "duplex", "multi-unit", "land"]),
  beds: z.union([z.string(), z.number()]).optional(),
  baths: z.union([z.string(), z.number()]).optional(),
  squareFeet: z.union([z.string(), z.number()]).optional(),
  condition: z.enum(["excellent", "good", "fair", "needs_work", "major_repairs"]),
});

// Step 3: Situation & Timeline
const step3Schema = z.object({
  reasonForSelling: z.enum(["relocating", "inherited", "divorce", "tired_landlord", "foreclosure", "downsizing", "other"]).optional(),
  timeline: z.enum(["asap", "0-30days", "30-60days", "60+days", "exploring"]).optional(),
  message: z.string().optional(),
});

// Step 4: Contact Information
const step4Schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  consentToContact: z.boolean().refine(val => val === true, "You must consent to be contacted"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;
type Step4Data = z.infer<typeof step4Schema>;

interface OfferData {
  estimatedValue: number;
  offerLow: number;
  offerHigh: number;
  anchorOffer: number;
}

interface QuoteWizardProps {
  onClose?: () => void;
  preselectedCity?: string;
  defaultCity?: string;
  defaultAddress?: string;
}

export function QuoteWizard({ 
  onClose, 
  preselectedCity,
  defaultCity,
  defaultAddress 
}: QuoteWizardProps) {
  const [step, setStep] = useState(1);
  const [offerData, setOfferData] = useState<OfferData | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Step forms
  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      city: defaultCity || preselectedCity || "Boise",
      address: defaultAddress || "",
      state: "Idaho",
      zip: "",
    },
  });

  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      propertyType: "single-family",
      beds: "",
      baths: "",
      squareFeet: "",
      condition: "good",
    },
  });

  const form3 = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      reasonForSelling: undefined,
      timeline: undefined,
      message: "",
    },
  });

  const form4 = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      consentToContact: false,
    },
  });

  // Scroll to top on step change
  const scrollToTop = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Submit mutation
  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/property-offers", data);
      return await response.json();
    },
    onSuccess: (data) => {
      console.log("Offer submitted successfully:", data);
      setOfferData({
        estimatedValue: parseFloat(data.estimatedMarketValue || "0"),
        offerLow: parseFloat(data.offerLow || "0"),
        offerHigh: parseFloat(data.offerHigh || "0"),
        anchorOffer: parseFloat(data.anchorOffer || "0"),
      });
      setStep(5);
      scrollToTop();
      toast({
        title: "Success!",
        description: "Your property information has been submitted. We'll contact you within 24 hours with a cash offer.",
      });
    },
    onError: (error: any) => {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Step navigation handlers
  const handleStep1Next = form1.handleSubmit((data) => {
    setStep(2);
    scrollToTop();
  });

  const handleStep2Next = form2.handleSubmit((data) => {
    setStep(3);
    scrollToTop();
  });

  const handleStep3Next = form3.handleSubmit((data) => {
    setStep(4);
    scrollToTop();
  });

  const handleFinalSubmit = form4.handleSubmit((contactData) => {
    const step1Data = form1.getValues();
    const step2Data = form2.getValues();
    const step3Data = form3.getValues();

    const fullSubmission = {
      // Address
      address: step1Data.address,
      city: step1Data.city,
      state: step1Data.state || "Idaho",
      zip: step1Data.zip,
      fullAddress: `${step1Data.address}, ${step1Data.city}, ${step1Data.state} ${step1Data.zip || ""}`.trim(),
      
      // Property details
      propertyType: step2Data.propertyType,
      beds: step2Data.beds ? Number(step2Data.beds) : undefined,
      baths: step2Data.baths ? Number(step2Data.baths) : undefined,
      squareFeet: step2Data.squareFeet ? Number(step2Data.squareFeet) : undefined,
      condition: step2Data.condition,
      
      // Situation
      reasonForSelling: step3Data.reasonForSelling,
      timeline: step3Data.timeline,
      message: step3Data.message,
      
      // Contact
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      consentToContact: contactData.consentToContact,
      consentToText: true,
      consentToEmail: true,
      
      // Status
      status: "pending",
    };

    submitMutation.mutate(fullSubmission);
  });

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      scrollToTop();
    }
  };

  return (
    <div ref={formRef} className="w-full max-w-3xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    s < step
                      ? "bg-primary text-primary-foreground"
                      : s === step
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s < step ? <CheckCircle2 className="h-5 w-5" /> : s}
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">Step {step} of 4</span>
          </div>
          <CardTitle className="text-2xl">
            {step === 1 && "Property Address"}
            {step === 2 && "Property Details"}
            {step === 3 && "Your Situation"}
            {step === 4 && "Contact Information"}
            {step === 5 && "Request Received"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Tell us where your property is located"}
            {step === 2 && "Help us understand your property"}
            {step === 3 && "Tell us about your timeline and needs"}
            {step === 4 && "How can we reach you with an offer?"}
            {step === 5 && "We'll be in touch soon"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Step 1: Address */}
          {step === 1 && (
            <form onSubmit={handleStep1Next} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Property Address *</Label>
                <AddressAutocomplete
                  id="address"
                  value={form1.watch("address")}
                  onChange={(value) => form1.setValue("address", value)}
                  city={form1.watch("city")}
                  placeholder="123 Main Street"
                  data-testid="input-address"
                />
                {form1.formState.errors.address && (
                  <p className="text-sm text-destructive">{form1.formState.errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Select
                    value={form1.watch("city")}
                    onValueChange={(value) => form1.setValue("city", value)}
                  >
                    <SelectTrigger id="city" data-testid="select-city">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Boise">Boise</SelectItem>
                      <SelectItem value="Meridian">Meridian</SelectItem>
                      <SelectItem value="Eagle">Eagle</SelectItem>
                      <SelectItem value="Kuna">Kuna</SelectItem>
                      <SelectItem value="Star">Star</SelectItem>
                      <SelectItem value="Middleton">Middleton</SelectItem>
                    </SelectContent>
                  </Select>
                  {form1.formState.errors.city && (
                    <p className="text-sm text-destructive">{form1.formState.errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    {...form1.register("zip")}
                    placeholder="83702"
                    data-testid="input-zip"
                  />
                </div>
              </div>

              <Alert>
                <MapPin className="h-4 w-4" />
                <AlertDescription>
                  We buy houses in all Treasure Valley locations. Get your no-obligation cash offer in 24 hours.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="submit" size="lg" data-testid="button-next-step1">
                  Continue
                </Button>
              </div>
            </form>
          )}

          {/* Step 2: Property Details */}
          {step === 2 && (
            <form onSubmit={handleStep2Next} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type *</Label>
                <Select
                  value={form2.watch("propertyType")}
                  onValueChange={(value: any) => form2.setValue("propertyType", value)}
                >
                  <SelectTrigger id="propertyType" data-testid="select-property-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-family">Single Family Home</SelectItem>
                    <SelectItem value="townhome">Townhome</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                    <SelectItem value="multi-unit">Multi-Unit (3+)</SelectItem>
                    <SelectItem value="land">Land/Lot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="beds">Bedrooms</Label>
                  <Input
                    id="beds"
                    type="number"
                    {...form2.register("beds")}
                    placeholder="3"
                    data-testid="input-beds"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="baths">Bathrooms</Label>
                  <Input
                    id="baths"
                    type="number"
                    step="0.5"
                    {...form2.register("baths")}
                    placeholder="2"
                    data-testid="input-baths"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="squareFeet">Square Feet</Label>
                  <Input
                    id="squareFeet"
                    type="number"
                    {...form2.register("squareFeet")}
                    placeholder="1500"
                    data-testid="input-sqft"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Property Condition *</Label>
                <RadioGroup
                  value={form2.watch("condition")}
                  onValueChange={(value: any) => form2.setValue("condition", value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="excellent" data-testid="radio-excellent" />
                    <Label htmlFor="excellent" className="font-normal cursor-pointer">
                      Excellent - Move-in ready, recently updated
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="good" data-testid="radio-good" />
                    <Label htmlFor="good" className="font-normal cursor-pointer">
                      Good - Well-maintained, minor cosmetic updates needed
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fair" id="fair" data-testid="radio-fair" />
                    <Label htmlFor="fair" className="font-normal cursor-pointer">
                      Fair - Some repairs and updates needed
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="needs_work" id="needs_work" data-testid="radio-needs-work" />
                    <Label htmlFor="needs_work" className="font-normal cursor-pointer">
                      Needs Work - Significant repairs required
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="major_repairs" id="major_repairs" data-testid="radio-major-repairs" />
                    <Label htmlFor="major_repairs" className="font-normal cursor-pointer">
                      Major Repairs - Extensive renovation needed
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Alert>
                <Home className="h-4 w-4" />
                <AlertDescription>
                  Don't worry about the condition - we buy houses in any condition. No repairs needed!
                </AlertDescription>
              </Alert>

              <div className="flex justify-between gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleBack} data-testid="button-back-step2">
                  Back
                </Button>
                <Button type="submit" size="lg" data-testid="button-next-step2">
                  Continue
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Situation & Timeline */}
          {step === 3 && (
            <form onSubmit={handleStep3Next} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reasonForSelling">Why are you selling?</Label>
                <Select
                  value={form3.watch("reasonForSelling")}
                  onValueChange={(value: any) => form3.setValue("reasonForSelling", value)}
                >
                  <SelectTrigger id="reasonForSelling" data-testid="select-reason">
                    <SelectValue placeholder="Select a reason (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relocating">Relocating for Work</SelectItem>
                    <SelectItem value="inherited">Inherited Property</SelectItem>
                    <SelectItem value="divorce">Divorce Settlement</SelectItem>
                    <SelectItem value="tired_landlord">Tired of Being a Landlord</SelectItem>
                    <SelectItem value="foreclosure">Facing Foreclosure</SelectItem>
                    <SelectItem value="downsizing">Downsizing/Retirement</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">When do you need to close?</Label>
                <Select
                  value={form3.watch("timeline")}
                  onValueChange={(value: any) => form3.setValue("timeline", value)}
                >
                  <SelectTrigger id="timeline" data-testid="select-timeline">
                    <SelectValue placeholder="Select timeline (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">As Soon As Possible</SelectItem>
                    <SelectItem value="0-30days">Within 30 Days</SelectItem>
                    <SelectItem value="30-60days">30-60 Days</SelectItem>
                    <SelectItem value="60+days">60+ Days</SelectItem>
                    <SelectItem value="exploring">Just Exploring Options</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Additional Details (Optional)</Label>
                <Textarea
                  id="message"
                  {...form3.register("message")}
                  placeholder="Any additional information about your property or situation..."
                  className="min-h-[100px]"
                  data-testid="textarea-message"
                />
              </div>

              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  We can close in as little as 7 days, or work with your preferred timeline.
                </AlertDescription>
              </Alert>

              <div className="flex justify-between gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleBack} data-testid="button-back-step3">
                  Back
                </Button>
                <Button type="submit" size="lg" data-testid="button-next-step3">
                  Continue
                </Button>
              </div>
            </form>
          )}

          {/* Step 4: Contact Information */}
          {step === 4 && (
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...form4.register("name")}
                  placeholder="John Smith"
                  data-testid="input-name"
                />
                {form4.formState.errors.name && (
                  <p className="text-sm text-destructive">{form4.formState.errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form4.register("email")}
                    placeholder="john@example.com"
                    data-testid="input-email"
                  />
                  {form4.formState.errors.email && (
                    <p className="text-sm text-destructive">{form4.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...form4.register("phone")}
                    placeholder="(208) 555-0123"
                    data-testid="input-phone"
                  />
                  {form4.formState.errors.phone && (
                    <p className="text-sm text-destructive">{form4.formState.errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consentToContact"
                    checked={form4.watch("consentToContact")}
                    onCheckedChange={(checked) => form4.setValue("consentToContact", checked as boolean)}
                    data-testid="checkbox-consent"
                  />
                  <Label htmlFor="consentToContact" className="text-sm font-normal leading-relaxed cursor-pointer">
                    I consent to being contacted by Home Buyer Boise via phone, text, and email regarding my cash offer request. *
                  </Label>
                </div>
                {form4.formState.errors.consentToContact && (
                  <p className="text-sm text-destructive">{form4.formState.errors.consentToContact.message}</p>
                )}
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Your information is secure. We'll use it only to provide your cash offer and answer your questions.
                </AlertDescription>
              </Alert>

              <div className="flex justify-between gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleBack} data-testid="button-back-step4">
                  Back
                </Button>
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={submitMutation.isPending}
                  data-testid="button-submit"
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Get My Cash Offer"
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Step 5: Offer Preview (Success) */}
          {step === 5 && offerData && (
            <div className="space-y-6">
              <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Thank You!</h3>
                <p className="text-muted-foreground">
                  We've received your property information. A member of our team will contact you within 24 hours with a detailed cash offer.
                </p>
              </div>


              <div className="space-y-3 text-sm text-muted-foreground">
                <h4 className="font-semibold text-foreground">What happens next?</h4>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                  <li>A local cash buyer specialist will contact you within 24 hours</li>
                  <li>We'll schedule a brief property walk-through (optional)</li>
                  <li>Receive your final cash offer with no obligations</li>
                  <li>Choose your closing date - as fast as 7 days or on your timeline</li>
                </ol>
              </div>

              <Card className="bg-muted/50 border-muted">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <p className="text-sm font-semibold text-foreground">Questions? Contact us directly:</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                      <a href="tel:+12084052275" className="flex items-center gap-2 text-primary hover:underline" data-testid="link-phone">
                        <Phone className="h-4 w-4" />
                        (208) 405-2275
                      </a>
                      <a href="mailto:connect@buymyhouse.co" className="flex items-center gap-2 text-primary hover:underline" data-testid="link-email">
                        <Mail className="h-4 w-4" />
                        connect@buymyhouse.co
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {onClose && (
                <div className="flex justify-center pt-4">
                  <Button onClick={onClose} variant="outline" data-testid="button-close">
                    Close
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
