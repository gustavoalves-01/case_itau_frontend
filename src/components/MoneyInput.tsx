import { ControllerRenderProps } from "react-hook-form";
import { NumericFormat } from "react-number-format";

export const MoneyInput = ({ref, onChange, ...rest}: ControllerRenderProps) => {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      decimalScale={2}
      getInputRef={ref}
      fixedDecimalScale={true}
      onValueChange={({ floatValue }) => {
        onChange(floatValue);
      }}
      className="focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
      {...rest}
    />
  );
}