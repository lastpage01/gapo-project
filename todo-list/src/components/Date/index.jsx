import React, { useEffect, useState } from "react";
import { IconIc24FillArrowheadLeft } from "@gapo_ui/icon";
import { IconIc24FillArrowheadRight } from "@gapo_ui/icon";

import "./style.css";
import { convertDay, validateDate } from "../../helpers/validatorDate";
const Calendar = ({ setFullDate }) => {
  const [day, setDay] = useState(new Date().getDay());
  const [date, setDate] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    setFullDate({ date, month, year });
  }, [date, month, setFullDate, year]);
  const handleDayBefore = () => {
    const time = validateDate(day - 1, date - 1, month, year);
    setDate(time.date);
    setMonth(time.month);
    setYear(time.year);
    setDay(time.day);
  };
  const handleDayAfter = () => {
    const time = validateDate(day + 1, date + 1, month, year);
    setDate(time.date);
    setMonth(time.month);
    setYear(time.year);
    setDay(time.day);
  };
  return (
    <>
      <div className="top-date">
        <div className="icon-left" onClick={handleDayBefore}>
          <IconIc24FillArrowheadLeft size={32} />
        </div>
        <div className="date">
          {new Date(`${year}-${month}-${date}`).toDateString() ===
          new Date().toDateString()
            ? "Today"
            : convertDay(day)}
        </div>
        <div className="icon-right" onClick={handleDayAfter}>
          <IconIc24FillArrowheadRight size={32} />
        </div>
      </div>
      <div className="bottom-date">
        {convertDay(day)}, {date}/{month}/{year}
      </div>
    </>
  );
};

export default Calendar;
