/* eslint-disable react/no-unescaped-entities */
// src/components/forms/QuoteForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Plus,
  Trash2,
  Package,
  Info,
} from "lucide-react";
import { quoteFormSchema, type QuoteFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PRODUCT_CATEGORIES } from "@/lib/contants";

type FormStatus = "idle" | "loading" | "success" | "error";

const QuoteForm = () => {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const searchParams = useSearchParams();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      products: [
        { productId: "", productName: "", quantity: 1, specifications: "" },
      ],
      urgency: "medium", // Remove the optional nature - it's required now
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  // Pre-fill product if coming from product page
  useEffect(() => {
    const productSlug = searchParams.get("product");
    if (productSlug) {
      setValue("products.0.productName", `Product: ${productSlug}`);
      setValue("products.0.productId", productSlug);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: QuoteFormData) => {
    try {
      setStatus("loading");

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send quote request");
      }

      setStatus("success");
      setSubmitMessage(
        "Thank you! Your quote request has been received. We'll send you a detailed quote within 2 hours."
      );
      reset();

      // Track successful quote submission
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "quote_request", {
          event_category: "engagement",
          event_label: "quote_form",
          value: data.products.length,
        });
      }
    } catch (error) {
      console.error("Quote form error:", error);
      setStatus("error");
      setSubmitMessage(
        "Sorry, there was an error sending your quote request. Please try again or contact us directly."
      );
    }
  };

  const resetStatus = () => {
    setStatus("idle");
    setSubmitMessage("");
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const urgencyLevel = watch("urgency");

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Quote Request Received!
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{submitMessage}</p>
        <div className="space-y-4">
          <Button onClick={resetStatus} className="w-full sm:w-auto">
            Submit Another Quote Request
          </Button>
          <div className="text-sm text-gray-500">
            <p className="mb-2">
              Reference Number: #QR{Date.now().toString().slice(-6)}
            </p>
            <p>
              Need immediate assistance?{" "}
              <a
                href="https://wa.me/6285210067755"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                WhatsApp us
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step <= currentStep
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step}
            </div>
            <div className="ml-3 hidden sm:block">
              <div
                className={`text-sm font-medium ${
                  step <= currentStep ? "text-teal-600" : "text-gray-500"
                }`}
              >
                {step === 1 && "Company Info"}
                {step === 2 && "Product Details"}
                {step === 3 && "Additional Info"}
              </div>
            </div>
            {step < 3 && (
              <div
                className={`w-12 h-0.5 ml-4 ${
                  step < currentStep ? "bg-teal-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Company Information */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="border-l-4 border-teal-500 pl-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Company Information
            </h3>
            <p className="text-sm text-gray-600">
              Tell us about your company and contact details
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="companyName">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                type="text"
                placeholder="PT. Your Company Name"
                {...register("companyName")}
                className={errors.companyName ? "border-red-500" : ""}
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.companyName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="contactPerson">
                Contact Person <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactPerson"
                type="text"
                placeholder="Your full name"
                {...register("contactPerson")}
                className={errors.contactPerson ? "border-red-500" : ""}
              />
              {errors.contactPerson && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.contactPerson.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@company.com"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+62 812 3456 7890"
                {...register("phone")}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="button" onClick={nextStep}>
              Next: Product Details
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Product Details */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="border-l-4 border-teal-500 pl-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Product Requirements
            </h3>
            <p className="text-sm text-gray-600">
              Add the products you need quotes for
            </p>
          </div>

          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="bg-gray-50 p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Package className="h-5 w-5 text-teal-600" />
                    Product {index + 1}
                  </h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`products.${index}.productName`}>
                      Product Name / Model{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="e.g., Mitsubishi FX5U-32MR/ES-A"
                      {...register(`products.${index}.productName` as const)}
                      className={
                        errors.products?.[index]?.productName
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {errors.products?.[index]?.productName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.products[index]?.productName?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`products.${index}.quantity`}>
                      Quantity <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="1"
                      {...register(`products.${index}.quantity` as const, {
                        valueAsNumber: true,
                      })}
                      className={
                        errors.products?.[index]?.quantity
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {errors.products?.[index]?.quantity && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.products[index]?.quantity?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor={`products.${index}.specifications`}>
                    Specifications / Requirements (Optional)
                  </Label>
                  <Textarea
                    placeholder="Specific requirements, voltage, application details..."
                    rows={3}
                    {...register(`products.${index}.specifications` as const)}
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  productId: "",
                  productName: "",
                  quantity: 1,
                  specifications: "",
                })
              }
              className="w-full border-dashed border-2 border-gray-300 hover:border-teal-500 hover:bg-teal-50"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Product
            </Button>
          </div>

          {/* Product Categories Helper */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">
                  Popular Categories:
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  {PRODUCT_CATEGORIES.slice(0, 6).map((category) => (
                    <span key={category.slug} className="text-blue-700">
                      • {category.name.split("(")[0].trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
            <Button type="button" onClick={nextStep}>
              Next: Additional Info
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Additional Information */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="border-l-4 border-teal-500 pl-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Additional Information
            </h3>
            <p className="text-sm text-gray-600">
              Project details and urgency level
            </p>
          </div>

          <div>
            <Label htmlFor="message">
              Project Details / Additional Requirements
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project, application, timeline, or any specific requirements..."
              rows={5}
              {...register("message")}
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.message.message}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Include application details, installation timeline, or technical
              requirements for better quote accuracy.
            </p>
          </div>

          <div>
            <Label htmlFor="urgency">Priority Level</Label>
            <select
              id="urgency"
              {...register("urgency")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-2 border"
            >
              <option value="low">Low - Standard quote (24-48 hours)</option>
              <option value="medium">
                Medium - Priority quote (2-4 hours)
              </option>
              <option value="high">High - Urgent quote (within 1 hour)</option>
            </select>
            {urgencyLevel === "high" && (
              <p className="mt-2 text-sm text-orange-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                For urgent quotes, consider calling us directly: +62
                852-1006-7755
              </p>
            )}
          </div>

          {/* Error Message */}
          {status === "error" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {submitMessage}
              </p>
            </div>
          )}

          {/* Submit Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">
              Before you submit:
            </h4>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li>
                • We'll respond within the timeframe based on your selected
                priority
              </li>
              <li>
                • Our quotes include technical consultation and parameter
                setting assistance
              </li>
              <li>• All pricing is competitive with quality assurance</li>
              <li>
                • Additional engineering services can be discussed during
                follow-up
              </li>
            </ul>
          </div>

          <div className="flex justify-between items-center">
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700"
              disabled={isSubmitting || status === "loading"}
            >
              {isSubmitting || status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending Quote Request...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Quote Request
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default QuoteForm;
