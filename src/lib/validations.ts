import { z } from "zod";

export const contactFormSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must have be at least 2 characters")
    .max(100, "Company name must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-\.]+$/, "Invalid company name format"),
  contactPerson: z
    .string()
    .min(2, "Contact person name is required")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address").toLowerCase(),
  phone: z
    .string()
    .regex(/^[a-zA-Z0-9\s\-\.]+$/, "Invalid phone number format")
    .min(10, "phone number must be at least 10 digits"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less  than 1000 characters"),
});

export const quoteFormSchema = z.object({
  companyName: z.string().min(2).max(100),
  contactPerson: z.string().min(2).max(50),
  email: z.string().email().toLowerCase(),
  phone: z.string().regex(/^[a-zA-Z0-9\s\-\.]+$/),
  products: z
    .array(
      z.object({
        productId: z.string(),
        productname: z.string(),
        quantity: z.number().min(1),
        specifications: z.string().optional(),
      })
    )
    .min(1, "At least one product is required"),
  message: z.string().max(1000).optional(),
  urgency: z.enum(["low", "medium", "high"]).default("medium"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type QuoteFormData = z.infer<typeof quoteFormSchema>;
