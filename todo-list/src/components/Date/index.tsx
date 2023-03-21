import React, { useEffect, useState } from "react";
import { IconIc24FillArrowheadLeft } from "@gapo_ui/icon";
import { IconIc24FillArrowheadRight } from "@gapo_ui/icon";

import "./style.css";
import {
  convertDayToString,
  convertValueDateToString,
  validateDate,
} from "../../helpers/validatorDate";
import { InputField } from "@gapo_ui/components";

interface Props {
  setFullDate: (val: { date: number; month: number; year: number }) => void;
}
interface Time {
  day: number;
  date: number;
  month: number;
  year: number;
}
const Calendar = ({ setFullDate }: Props): JSX.Element => {
  const [day, setDay] = useState(new Date().getDay());
  const [date, setDate] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [valuePicker, setValuePicker] = useState(
    convertValueDateToString(date, month, year)
  );
  useEffect(() => {
    setFullDate({ date, month, year });
    setValuePicker(convertValueDateToString(date, month, year));
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
    const dayPicker = new Date(e.target.value).getDay();
    const valueInput = e.target.value.split("-");
    setCalendar({
      day: dayPicker,
      date: Number(valueInput[2]),
      month: Number(valueInput[1]),
      year: Number(valueInput[0]),
    });
  };

  const setCalendar = (time: Time) => {
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
            : convertDayToString(day)}
        </div>
        <div className="icon-right" onClick={handleDayAfter}>
          <IconIc24FillArrowheadRight size={32} />
        </div>
      </div>
      <div className="bottom-date">
        {convertDayToString(day)},{" "}
        <InputField
          variant="invisible"
          type="date"
          value={valuePicker}
          className="datePicker"
          onChange={(e) => onChangeDatePicker(e)}
        />
      </div>
    </>
  );
};

export default Calendar;
