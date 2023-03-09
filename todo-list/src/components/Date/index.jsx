import React, { useEffect, useState } from "react";
import { IconIc24FillArrowheadLeft } from "@gapo_ui/icon";
import { IconIc24FillArrowheadRight } from "@gapo_ui/icon";

import "./style.css";
import {
  convertDay,
  convertValueDate,
  validateDate,
} from "../../helpers/validatorDate";
import { InputField } from "@gapo_ui/components";

const Calendar = ({ setFullDate }) => {
  const [day, setDay] = useState(new Date().getDay());
  const [date, setDate] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [valuePicker, setValuePicker] = useState(
    convertValueDate(date, month, year)
  );
  useEffect(() => {
    setFullDate({ date, month, year });
    setValuePicker(convertValueDate(date, month, year));
  }, [date, month, setFullDate, year]);

  const handleDayBefore = () => {
    const time = validateDate(day - 1, date - 1, month, year);
    setCalendar(time);
  };

  const handleDayAfter = () => {
    const time = validateDate(day + 1, date + 1, month, year);
    setCalendar(time);
  };

  const onChangeDatePicker = (e) => {
    setValuePicker(e.target.value);
    const valueInput = e.target.value.split("-");
    const dayPicker = new Date(e.target.value).getDay();
    setCalendar({
      day: dayPicker,
      date: Number(valueInput[2]),
      month: Number(valueInput[1]),
      year: Number(valueInput[0]),
    });
  };

  const setCalendar = (time) => {
    setDay(time.day);
    setDate(time.date);
    setMonth(time.month);
    setYear(time.year);
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
        {/* {convertDay(day)}, {date}/{month}/{year} */}
        {convertDay(day)},{" "}
        <InputField
          variant="invisible"
          type="date"
          value={valuePicker}
          className="datePicker"
          onChange={onChangeDatePicker}
        />
      </div>
    </>
  );
};

export default Calendar;
