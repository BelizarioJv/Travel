import type { Range } from "react-date-range";
import { useState } from "react";

export function useDateRange() {
  // estados dos inputs do formulario
  const [showInviteEmail, setShowInviteEmail] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [disabledCalendar, setDisabledCalendar] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const startDate = range[0].startDate ?? new Date();
  const endDate = range[0].endDate ?? new Date();
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const handleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleShowInviteEmail = () => {
    setShowInviteEmail(true);
    setDisabledInput(true);
    setShowCalendar(false);
    setDisabledCalendar(true);
  };

  const handleHideInviteEmail = () => {
    setShowInviteEmail(false);
    setDisabledInput(false);
    setDisabledCalendar(false);
  };
  const handleShowDialog = () => {
    setShowDialog(true);
  };

  return {
    startDateFormatted: formatDate(startDate),
    endDateFormatted: formatDate(endDate),
    range,
    setRange,
    showInviteEmail,
    handleCalendar,
    showDialog,
    setShowDialog,
    showCalendar,
    disabledInput,
    handleShowInviteEmail,
    handleHideInviteEmail,
    disabledCalendar,
    handleShowDialog,
  };
}
