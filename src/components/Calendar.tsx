import { DateRangePicker, type Range } from "react-date-range";

interface CalendarProps {
  range: Range[];
  setRange: React.Dispatch<React.SetStateAction<Range[]>>;
}
export function CalendarPicker({ range, setRange }: CalendarProps) {
  return (
    <div>
      <DateRangePicker
        onChange={(item) => setRange([item.selection])}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={range}
        direction="horizontal"
      />
    </div>
  );
}
