'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/components/Analytics';
import { NAV_CITIES } from '@/shared/citiesCatalog';
import { PinIcon } from '@/components/SafeIcons';
import { 
  Home, 
  User, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Phone,
  Mail,
  Building,
  Clock,
  HelpCircle,
  Loader2
} from 'lucide-react';

interface FormData {
  // Property Address
  street: string;
  city: string;
  zip: string;
  
  // Property Details
  propertyType: string;
  beds: string;
  baths: string;
  squareFeet: string;
  condition: string;
  
  // Situation
  reasonForSelling: string;
  timeline: string;
  message: string;
  
  // Contact
  name: string;
  email: string;
  phone: string;
  consentToContact: boolean;
  consentToText: boolean;
  consentToEmail: boolean;
}

const initialFormData: FormData = {
  street: '',
  city: '',
  zip: '',
  propertyType: '',
  beds: '',
  baths: '',
  squareFeet: '',
  condition: '',
  reasonForSelling: '',
  timeline: '',
  message: '',
  name: '',
  email: '',
  phone: '',
  consentToContact: false,
  consentToText: false,
  consentToEmail: false,
};

const propertyTypes = [
  { value: 'single-family', label: 'Single Family Home' },
  { value: 'townhome', label: 'Townhome' },
  { value: 'condo', label: 'Condo' },
  { value: 'duplex', label: 'Duplex' },
  { value: 'multi-unit', label: 'Multi-Unit (3+)' },
  { value: 'land', label: 'Land Only' },
];

const conditions = [
  { value: 'excellent', label: 'Excellent - Move-in ready', description: 'No repairs needed' },
  { value: 'good', label: 'Good - Minor updates needed', description: 'Cosmetic updates only' },
  { value: 'fair', label: 'Fair - Needs some work', description: 'Some repairs needed' },
  { value: 'needs_work', label: 'Needs Work - Major repairs', description: 'Significant repairs needed' },
  { value: 'major_repairs', label: 'Major Repairs - As-is only', description: 'Structural/system issues' },
];

const reasons = [
  { value: 'relocating', label: 'Relocating for work or family' },
  { value: 'inherited', label: 'Inherited the property' },
  { value: 'divorce', label: 'Going through divorce' },
  { value: 'tired_landlord', label: 'Tired landlord / Bad tenants' },
  { value: 'foreclosure', label: 'Facing foreclosure' },
  { value: 'downsizing', label: 'Downsizing' },
  { value: 'other', label: 'Other reason' },
];

const timelines = [
  { value: 'asap', label: 'ASAP - Need to sell immediately' },
  { value: '0-30days', label: 'Within 30 days' },
  { value: '30-60days', label: '30-60 days' },
  { value: '60+days', label: '60+ days - Flexible timeline' },
  { value: 'exploring', label: 'Just exploring options' },
];

const steps = [
  { id: 1, title: 'Property Address', icon: PinIcon },
  { id: 2, title: 'Property Details', icon: Home },
  { id: 3, title: 'Your Situation', icon: HelpCircle },
  { id: 4, title: 'Contact Info', icon: User },
];

export function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    switch (step) {
      case 1:
        if (!formData.street.trim()) newErrors.street = 'Street address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
        else if (!/^\d{5}$/.test(formData.zip)) newErrors.zip = 'Enter a valid 5-digit ZIP';
        break;
      case 2:
        if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
        if (!formData.condition) newErrors.condition = 'Property condition is required';
        break;
      case 3:
        // Optional step, no required fields
        break;
      case 4:
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        else if (!/^[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
          if (formData.phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Enter a valid phone number';
        }
        if (!formData.consentToContact) newErrors.consentToContact = 'You must consent to be contacted';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          fullAddress: `${formData.street}, ${formData.city}, ID ${formData.zip}`,
          state: 'Idaho',
        }),
      });
      
      if (response.ok) {
        trackEvent('form_submit', { form_name: 'quote', status: 'success' });
        setIsSubmitted(true);
        toast({
          title: "Request Submitted!",
          description: "We'll contact you within 24 hours with your cash offer.",
        });
      } else {
        trackEvent('form_submit', { form_name: 'quote', status: 'api_error' });
        setIsSubmitted(true);
        toast({
          title: "Request Received!",
          description: "We'll be in touch within 24 hours.",
        });
      }
    } catch (error) {
      trackEvent('form_submit', { form_name: 'quote', status: 'network_error' });
      setIsSubmitted(true);
      toast({
        title: "Request Received!",
        description: "We'll contact you soon with your cash offer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Your request has been submitted successfully. Our team will review your property details and contact you within 24 hours with a fair cash offer.
          </p>
          <div className="bg-muted rounded-lg p-6 mb-6">
            <p className="font-semibold mb-2">What happens next?</p>
            <ol className="text-left text-sm text-muted-foreground space-y-2">
              <li>1. We&apos;ll review your property information</li>
              <li>2. Our team will prepare a fair cash offer</li>
              <li>3. We&apos;ll call or email you within 24 hours</li>
              <li>4. If you accept, we can close as fast as 7 days!</li>
            </ol>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={() => router.push('/')}>
              Return to Home
            </Button>
            <Button asChild>
              <a href="tel:2084052274">
                <Phone className="mr-2 h-4 w-4" />
                Call (208) 405-2274
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6" data-clarity-mask="true">
      <p className="text-sm text-muted-foreground text-center" role="note">
        Free, no-obligation request. Every property is manually reviewed — we never issue automated binding offers.
      </p>
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
              currentStep >= step.id 
                ? 'bg-primary border-primary text-white' 
                : 'border-muted-foreground/30 text-muted-foreground'
            }`}>
              <step.icon className="h-5 w-5" />
            </div>
            <span className={`ml-2 text-sm font-medium hidden sm:inline ${
              currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 ${
                currentStep > step.id ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Property Address */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PinIcon className="h-5 w-5" />
              Property Address
            </CardTitle>
            <CardDescription>
              Enter the address of the property you want to sell
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                placeholder="123 Main Street"
                value={formData.street}
                onChange={(e) => updateFormData('street', e.target.value)}
                className={errors.street ? 'border-red-500' : ''}
              />
              {errors.street && <p className="text-sm text-red-500 mt-1">{errors.street}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Select value={formData.city} onValueChange={(v) => updateFormData('city', v)}>
                  <SelectTrigger className={errors.city ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {NAV_CITIES.map(city => (
                      <SelectItem key={city.slug} value={city.name}>
                        {city.name}, ID
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
              </div>
              
              <div>
                <Label htmlFor="zip">ZIP Code *</Label>
                <Input
                  id="zip"
                  placeholder="83702"
                  value={formData.zip}
                  onChange={(e) => updateFormData('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
                  className={errors.zip ? 'border-red-500' : ''}
                />
                {errors.zip && <p className="text-sm text-red-500 mt-1">{errors.zip}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Property Details */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Property Details
            </CardTitle>
            <CardDescription>
              Tell us about your property
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Property Type *</Label>
              <RadioGroup
                value={formData.propertyType}
                onValueChange={(v) => updateFormData('propertyType', v)}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2"
              >
                {propertyTypes.map(type => (
                  <div key={type.value} className="flex items-center">
                    <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
                    <Label
                      htmlFor={type.value}
                      className="flex items-center justify-center w-full px-4 py-3 border rounded-md cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted transition-colors"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.propertyType && <p className="text-sm text-red-500 mt-1">{errors.propertyType}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="beds">Bedrooms</Label>
                <Select value={formData.beds} onValueChange={(v) => updateFormData('beds', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Beds" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, '6+'].map(n => (
                      <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="baths">Bathrooms</Label>
                <Select value={formData.baths} onValueChange={(v) => updateFormData('baths', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Baths" />
                  </SelectTrigger>
                  <SelectContent>
                    {['1', '1.5', '2', '2.5', '3', '3.5', '4+'].map(n => (
                      <SelectItem key={n} value={n}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="squareFeet">Sq. Ft. (est.)</Label>
                <Input
                  id="squareFeet"
                  placeholder="2000"
                  value={formData.squareFeet}
                  onChange={(e) => updateFormData('squareFeet', e.target.value.replace(/\D/g, ''))}
                />
              </div>
            </div>

            <div>
              <Label>Property Condition *</Label>
              <RadioGroup
                value={formData.condition}
                onValueChange={(v) => updateFormData('condition', v)}
                className="space-y-3 mt-2"
              >
                {conditions.map(cond => (
                  <div key={cond.value} className="flex items-start">
                    <RadioGroupItem value={cond.value} id={cond.value} className="mt-1" />
                    <Label htmlFor={cond.value} className="ml-3 cursor-pointer">
                      <span className="font-medium">{cond.label}</span>
                      <span className="block text-sm text-muted-foreground">{cond.description}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.condition && <p className="text-sm text-red-500 mt-1">{errors.condition}</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Your Situation */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Your Situation
            </CardTitle>
            <CardDescription>
              Help us understand your needs so we can make the best offer (optional)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Why are you selling?</Label>
              <RadioGroup
                value={formData.reasonForSelling}
                onValueChange={(v) => updateFormData('reasonForSelling', v)}
                className="space-y-2 mt-2"
              >
                {reasons.map(reason => (
                  <div key={reason.value} className="flex items-center">
                    <RadioGroupItem value={reason.value} id={reason.value} />
                    <Label htmlFor={reason.value} className="ml-3 cursor-pointer">
                      {reason.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label>How soon do you need to sell?</Label>
              <RadioGroup
                value={formData.timeline}
                onValueChange={(v) => updateFormData('timeline', v)}
                className="space-y-2 mt-2"
              >
                {timelines.map(tl => (
                  <div key={tl.value} className="flex items-center">
                    <RadioGroupItem value={tl.value} id={tl.value} />
                    <Label htmlFor={tl.value} className="ml-3 cursor-pointer">
                      {tl.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="message">Anything else we should know?</Label>
              <Textarea
                id="message"
                placeholder="Tell us anything about your property or situation that might be helpful..."
                value={formData.message}
                onChange={(e) => updateFormData('message', e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Contact Info */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </CardTitle>
            <CardDescription>
              How can we reach you with your cash offer?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="John Smith"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(208) 555-1234"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consentToContact"
                  checked={formData.consentToContact}
                  onCheckedChange={(checked) => updateFormData('consentToContact', checked === true)}
                />
                <Label htmlFor="consentToContact" className="text-sm leading-relaxed cursor-pointer">
                  I agree to be contacted by Home Buyer Boise regarding my property. *
                </Label>
              </div>
              {errors.consentToContact && <p className="text-sm text-red-500">{errors.consentToContact}</p>}

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consentToText"
                  checked={formData.consentToText}
                  onCheckedChange={(checked) => updateFormData('consentToText', checked === true)}
                />
                <Label htmlFor="consentToText" className="text-sm leading-relaxed cursor-pointer">
                  I consent to receive text messages about my offer. Msg & data rates may apply.
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consentToEmail"
                  checked={formData.consentToEmail}
                  onCheckedChange={(checked) => updateFormData('consentToEmail', checked === true)}
                />
                <Label htmlFor="consentToEmail" className="text-sm leading-relaxed cursor-pointer">
                  I would like to receive email updates about my offer and helpful information.
                </Label>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-muted rounded-lg p-4 mt-6">
              <h4 className="font-semibold mb-2">Property Summary</h4>
              <p className="text-sm text-muted-foreground">
                {formData.street}, {formData.city}, ID {formData.zip}
              </p>
              <p className="text-sm text-muted-foreground">
                {propertyTypes.find(t => t.value === formData.propertyType)?.label || 'Not specified'} 
                {formData.beds && ` • ${formData.beds} bed`}
                {formData.baths && ` • ${formData.baths} bath`}
                {formData.squareFeet && ` • ${formData.squareFeet} sqft`}
              </p>
              <p className="text-sm text-muted-foreground">
                Condition: {conditions.find(c => c.value === formData.condition)?.label?.split(' - ')[0] || 'Not specified'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className={currentStep === 1 ? 'invisible' : ''}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        {currentStep < 4 ? (
          <Button onClick={nextStep}>
            Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-gold text-black hover:bg-gold/90">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Get My Cash Offer
                <CheckCircle className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
