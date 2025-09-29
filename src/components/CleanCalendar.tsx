// CleanCalendar.tsx
import * as React from "react";
import { Calendar } from "@/components/ui/calendar"; // shadcn calendar (react-day-picker)
import { Card } from "@/components/ui/card";

export default function CleanCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    // Make the parent give it size, e.g. className="h-[420px] w-full" or "h-full w-full".
    <Card className="h-full w-full p-3 shadow-lg">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={false}
        weekStartsOn={0} // 0=Sun, 1=Mon
        className="h-full w-full p-0"
        classNames={{
          // layout
          months: "grid grid-cols-1 h-full",
          month: "flex flex-col gap-3 h-full",
          caption: "flex items-center justify-between px-2",
          caption_label: "text-base font-semibold",
          nav: "flex items-center gap-1",
          nav_button:
            "h-8 w-8 rounded-md border bg-background p-0 opacity-70 hover:opacity-100",
          // grid
          table: "w-full",
          head_row: "grid grid-cols-7 gap-2 px-2",
          head_cell:
            "text-center text-[11px] font-medium text-muted-foreground",
          row: "grid grid-cols-7 gap-2 px-2",
          cell: "relative p-0",
          // days
          day:
            // square, fills the grid cell; clean hover/selected states
            "w-full aspect-square rounded-md text-sm " +
            "hover:bg-accent hover:text-accent-foreground " +
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
            "aria-selected:bg-primary aria-selected:text-primary-foreground",
          day_today: "ring-2 ring-primary",
          day_outside: "text-muted-foreground/50",
          day_disabled: "text-muted-foreground/40",
          day_hidden: "invisible",
        }}
      />
    </Card>
  );
}
