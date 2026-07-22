import { ButtonHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "outline";

const variantClasses: Record<Variant, string> = {
  primary: "bg-gradient-teal-blue text-white shadow-[0_0_15px_rgba(19,84,146,0.25)] hover:shadow-[0_0_20px_rgba(19,84,146,0.4)] hover:scale-[1.02]",
  secondary: "bg-secondary text-white hover:bg-secondary-hover hover:scale-[1.02]",
  outline: "border border-border-strong text-text-primary hover:border-primary hover:bg-primary-tint hover:text-primary",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: string;
};

export function Button({ variant = "primary", className = "", href, children, ...props }: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold min-h-11 transition-all duration-200 ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
