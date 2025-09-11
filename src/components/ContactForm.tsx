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
export default function ContactForm({ className = "" }: { className?: string }) {
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
      toast({ title: "Message sent", description: "I'll get back to you soon." });
    } catch (err: any) {
      toast({
        title: "Something went wrong",
        description: err?.message ?? "Please try again in a moment.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className={`p-8 max-w-xl ${className}`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-slate-900 p-8 rounded-2xl">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell me about your project..." className="min-h-[140px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-3">
            <Button className="bg-slate-600" type="submit">Send</Button>
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