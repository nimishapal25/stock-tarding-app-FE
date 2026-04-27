import type { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "text";
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  onButtonHandle?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
}

const variantsClass = {
  primary:
    "bg-emerald-400 hover:bg-[#00B88A] shadow-black/5 shadow-xl px-6 py-4 rounded-2xl w-full font-semibold text-white transition-all hover:-translate-y-0.5 duration-200 cursor-pointer transform",
  secondary:
    "bg-white hover:bg-gray-50 shadow-sm px-6 py-4 border border-slate-100 rounded-2xl w-full font-semibold text-gray-900 transition-all duration-200 cursor-pointer",
  text: "font-medium text-emerald-400 hover:text-emerald-400/80 text-sm transition-colors cursor-pointer",
};

export const ButtonComponent = ({
  type = "button",
  variant,
  children,
  onButtonHandle,
  loading,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={variantsClass[variant]}
      onClick={onButtonHandle}
    >
      {!loading ? children : "Loading..."}
    </button>
  );
};
