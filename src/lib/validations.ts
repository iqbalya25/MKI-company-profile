// src/lib/validations.ts - FIXED TYPESCRIPT ERRORS
import { z } from "zod";

// Simple and effective sanitization function
const sanitizeString = (str: string): string => {
  return str
    .trim()
    .replace(/[<>\"']/g, '') // Remove potential XSS characters
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''); // Remove script tags
};

// Spam detection function
const containsSpam = (text: string): boolean => {
  const spamPatterns = [
    /\b(viagra|casino|lottery|winner|congratulations)\b/i,
    /\b(click here|visit now|act now)\b/i,
    /http[s]?:\/\/[^\s]+/i, // Block URLs in messages
    /(.)\1{10,}/i, // Repeated characters
  ];
  return spamPatterns.some(pattern => pattern.test(text));
};

export const contactFormSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-\.&,]+$/, "Company name contains invalid characters")
    .transform(sanitizeString)
    .refine((val) => val.length >= 2, {
      message: "Company name is required after sanitization"
    }),

  contactPerson: z
    .string()
    .min(2, "Contact person name is required")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s\-\.]+$/, "Name can only contain letters, spaces, hyphens, and dots")
    .transform(sanitizeString)
    .refine((val) => val.length >= 2, {
      message: "Contact person name is required after sanitization"
    }),

  email: z
    .string()
    .email("Invalid email address")
    .toLowerCase()
    .max(100, "Email is too long")
    .refine((email) => {
      // Block some known temporary email domains
      const blockedDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];
      const domain = email.split('@')[1];
      return domain && !blockedDomains.includes(domain);
    }, "Please use a valid business email"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number is too long")
    .regex(/^[\+]?[0-9\s\-\(\)]{10,20}$/, "Invalid phone number format")
    .transform(sanitizeString),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .transform(sanitizeString)
    .refine((msg) => msg.length >= 10, {
      message: "Message is required after sanitization"
    })
    .refine((msg) => !containsSpam(msg), {
      message: "Message contains prohibited content"
    }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Quote form schema (for future use)
export const quoteFormSchema = z.object({
  companyName: z.string().min(2).max(100).transform(sanitizeString),
  contactPerson: z.string().min(2).max(50).transform(sanitizeString),
  email: z.string().email().toLowerCase(),
  phone: z.string().regex(/^[\+]?[0-9\s\-\(\)]{10,20}$/).transform(sanitizeString),
  products: z
    .array(
      z.object({
        productId: z.string(),
        productName: z.string().min(1, "Product name is required").transform(sanitizeString),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        specifications: z.string().optional().transform((val) => val ? sanitizeString(val) : val),
      })
    )
    .min(1, "At least one product is required"),
  message: z.string().max(1000).optional().transform((val) => val ? sanitizeString(val) : val),
  urgency: z.enum(["low", "medium", "high"]),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

// Rate limiting helper (simplified)
interface RateLimitEntry {
  count: number;
  lastAttempt: number;
}

export const createRateLimiter = () => {
  const attempts = new Map<string, RateLimitEntry>();
  
  return {
    checkLimit: (identifier: string, maxAttempts = 5, windowMs = 60000): boolean => {
      const now = Date.now();
      const userAttempts = attempts.get(identifier);
      
      if (!userAttempts) {
        attempts.set(identifier, { count: 1, lastAttempt: now });
        return true;
      }
      
      // Reset if window expired
      if (now - userAttempts.lastAttempt > windowMs) {
        attempts.set(identifier, { count: 1, lastAttempt: now });
        return true;
      }
      
      // Check if under limit
      if (userAttempts.count >= maxAttempts) {
        return false;
      }
      
      // Increment attempts
      userAttempts.count++;
      userAttempts.lastAttempt = now;
      
      return true;
    }
  };
};