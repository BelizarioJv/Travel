type inputProps = {
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function Input({ disabled, value, onChange, placeholder }: inputProps) {
  return (
    <input
      className="p-2 mt-2 outline-0 font-bold text-2xl"
      type="text"
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
