import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// shadcn/ui primitives (make sure they're installed via `npx shadcn@latest add form input textarea button toast`)
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// -----------------------------
// Validation schema
// -----------------------------
const ContactSchema = z.object({
  email: z.string().email("Enter a valid email"),
  message: z
    .string()
    .min(10, "Message should be at least 10 characters")
    .max(2000, "Message is too long"),
});

type ContactValues = z.infer<typeof ContactSchema>;

// -----------------------------
// Component
// -----------------------------
export default function ContactForm({
  className = "",
}: {
  className?: string;
}) {
  const { toast } = useToast();

  const form = useForm<ContactValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { email: "", message: "" },
    mode: "onBlur",
  });

  async function onSubmit(values: ContactValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Failed to send message");
      }

      form.reset();
      toast({
        title: "Message sent",
        description: "I'll get back to you soon.",
      });
    } catch (err: any) {
      toast({
        title: "Something went wrong",
        description: err?.message ?? "Please try again in a moment.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Get In Touch</h1>
        <p className="text-slate-400">
          Let's discuss your next photography project
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 shadow-2xl"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200 text-base font-medium">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    type="email"
                    className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 h-11 rounded-xl focus:border-blue-400 transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200 text-base font-medium">
                  Your Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell me about your photography needs, vision, or any questions you have..."
                    className="min-h-[120px] bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 rounded-xl focus:border-blue-400 transition-colors resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between pt-2">
            <div className="text-slate-400 text-sm">
              I'll respond within 24 hours
            </div>
            <div className="bg-gradient-to-b from-stone-300/40 to-transparent p-[4px] rounded-[16px]">
              <div className="relative inline-flex items-center justify-center group">
                {/* Glow background */}
                <div
                  className="absolute inset-0 rounded-xl blur-lg opacity-60
               bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400
               transition-all duration-1000 group-hover:opacity-100 group-hover:duration-200"
                ></div>

                {/* Functional Send Button */}
                <button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="group relative inline-flex items-center justify-center text-base 
               rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white
               transition-all duration-200 
               hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30
               disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      Sending...
                      <svg
                        className="ml-2 w-4 h-4 animate-spin stroke-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 100 24v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 10 10"
                        height="12"
                        width="12"
                        fill="none"
                        className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                      >
                        <path
                          d="M0 5h7"
                          className="transition opacity-0 group-hover:opacity-100"
                        />
                        <path
                          d="M1 1l4 4-4 4"
                          className="transition group-hover:translate-x-[3px]"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

/* =============================================================
   BACKEND OPTIONS (pick ONE; do NOT run both)
   -------------------------------------------------------------
   1) Next.js App Router + Resend (preferred for serverless)
   2) Express server + Nodemailer (for Vite/CRA + own backend)
   ============================================================= */

/*
1) Next.js (app/api/contact/route.ts) + Resend
----------------------------------------------
Install:  npm i resend zod
Env:      RESEND_API_KEY=...  CONTACT_TO=you@yourdomain.com  CONTACT_FROM=website@yourdomain.com

// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const Body = z.object({ email: z.string().email(), message: z.string().min(10).max(2000) });
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { email, message } = Body.parse(json);

    await resend.emails.send({
      from: process.env.CONTACT_FROM!,
      to: process.env.CONTACT_TO!,
      subject: `New contact from ${email}`,
      text: message,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(err?.message || "Bad Request", { status: 400 });
  }
}

- Deploy on Vercel and map env vars. The client POST in ContactForm hits "/api/contact".
- For nicer emails, send `react` content with a simple JSX template using Resend.

2) Express + Nodemailer (Vite/CRA)
----------------------------------
Install:  npm i express nodemailer zod cors  &&  npm i -D @types/express
Env:      SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM

// server/index.ts
import */
