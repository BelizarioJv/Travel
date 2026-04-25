import { DateRangePicker } from "react-date-range";
import { useDateRange } from "../hooks/useDateRange";

export function CalendarPicker() {
  const { range, setRange } = useDateRange();

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
