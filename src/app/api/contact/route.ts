// src/app/api/contact/route.ts - FIXED TYPESCRIPT ERRORS
import { NextRequest, NextResponse } from "next/server";
import {
  contactFormSchema,
  createRateLimiter,
  type ContactFormData,
} from "@/lib/validations";
import { z } from "zod";
import { headers } from "next/headers";

// Rate limiter instance
const rateLimiter = createRateLimiter();

// Security headers
const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
} as const;

export async function POST(request: NextRequest) {
  try {
    // Security: Get client IP for rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIP = headersList.get("x-real-ip");
    const clientIP = forwardedFor?.split(",")[0] || realIP || "unknown";

    // Security: Rate limiting (5 requests per minute per IP)
    if (!rateLimiter.checkLimit(clientIP, 5, 60000)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many requests. Please wait a minute before trying again.",
        },
        {
          status: 429,
          headers: securityHeaders,
        }
      );
    }

    // Security: Check Content-Type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid content type",
        },
        {
          status: 400,
          headers: securityHeaders,
        }
      );
    }

    // Security: Limit request size (prevent DoS)
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10000) {
      // 10KB limit
      return NextResponse.json(
        {
          success: false,
          message: "Request too large",
        },
        {
          status: 413,
          headers: securityHeaders,
        }
      );
    }

    const body = await request.json();

    // Security: Validate and sanitize input
    const validatedData: ContactFormData = contactFormSchema.parse(body);

    // Security: Additional server-side checks
    if (isSpamSubmission(validatedData)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Submission flagged as spam. Please contact us directly if this is an error.",
        },
        {
          status: 400,
          headers: securityHeaders,
        }
      );
    }

    // Log sanitized data (safe to log)
    console.log("=== NEW CONTACT FORM SUBMISSION ===");
    console.log("IP Address:", clientIP);
    console.log("Company:", validatedData.companyName);
    console.log("Contact Person:", validatedData.contactPerson);
    console.log("Email:", validatedData.email);
    console.log("Phone:", validatedData.phone);
    console.log("Message Length:", validatedData.message.length);
    console.log(
      "Message Preview:",
      validatedData.message.substring(0, 100) + "..."
    );
    console.log("Timestamp:", new Date().toLocaleString("id-ID"));
    console.log("User Agent:", request.headers.get("user-agent"));
    console.log("=====================================");

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your message has been received. We'll contact you within 2 hours during business hours.",
      },
      {
        status: 200,
        headers: securityHeaders,
      }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check your form data and try again.",
          errors: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        {
          status: 400,
          headers: securityHeaders,
        }
      );
    }

    // Don't expose internal errors
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again or contact us directly via WhatsApp.",
      },
      {
        status: 500,
        headers: securityHeaders,
      }
    );
  }
}

// Security: Spam detection (now properly typed)
function isSpamSubmission(data: ContactFormData): boolean {
  const spamIndicators = [
    // Check for repeated characters
    /(.)\1{10,}/.test(data.message),

    // Check for excessive caps
    data.message.length > 50 &&
      (data.message.match(/[A-Z]/g) || []).length / data.message.length > 0.5,

    // Check for suspicious patterns
    data.message.toLowerCase().includes("cheap"),
    data.message.toLowerCase().includes("free money"),
    data.companyName.toLowerCase().includes("test"),

    // Check for invalid email patterns
    data.email.includes("+"),
    /\d{4,}/.test(data.email), // emails with long numbers
  ];

  return spamIndicators.filter(Boolean).length >= 2;
}

// CORS and other methods
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin":
        process.env.NODE_ENV === "development"
          ? "*"
          : "https://mederikaryaindonesia.com",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      ...securityHeaders,
    },
  });
}
