import { ArrowRight } from "lucide-react";

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

export function Button({ onClick, children, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-lime-300 text-lime-950 rounded-lg p-5 gap-2 font-medium flex items-center">
      {children ?? <ArrowRight />}
    </button>
  );
}
