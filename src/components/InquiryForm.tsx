"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";

export function InquiryForm({
  preselectedService,
}: {
  preselectedService?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.currentTarget;
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(formElement);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      company: form.get("company"),
      subject: form.get("subject"),
      service: preselectedService,
      message: form.get("message"),
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) {
        setErrorMessage(data.message || "Submission failed.");
        setStatus("error");
        return;
      }
      setStatus("success");
      formElement.reset();
    } catch (error: any) {
      setErrorMessage(`Error: ${error.message || "Network error"}`);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Card className="text-center py-10">
        <p className="text-primary font-bold text-lg">
          Thank you!
        </p>
        <p className="text-sm text-text-secondary mt-2">
          Your inquiry has been received. Our compliance officer will contact you shortly.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Field label="Full Name" name="name" required />
        <Field label="Email Address" name="email" type="email" required />
        <Field label="Phone Number" name="phone" />
        <Field label="Company / Organization" name="company" />
        <Field label="Subject" name="subject" />
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1">
            Message
          </label>
          <textarea
            name="message"
            required
            rows={4}
            className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/40 text-text-primary rounded-xl px-4 py-3 text-sm min-h-24 transition-colors outline-none"
            placeholder="Describe your consulting or training needs..."
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-danger font-medium" role="alert">
            {errorMessage}
          </p>
        )}

        <Button type="submit" disabled={status === "submitting"} className="w-full">
          {status === "submitting" ? "Submitting..." : "Submit Inquiry"}
        </Button>
      </form>
    </Card>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-text-primary mb-1" htmlFor={name}>
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/40 text-text-primary rounded-xl px-4 py-3 text-sm min-h-11 transition-colors outline-none"
      />
    </div>
  );
}
