/* eslint-disable no-useless-escape */
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
  const [day, setDay] = useState<number>(new Date().getDay());
  const [date, setDate] = useState<number>(new Date().getDate());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [valuePicker, setValuePicker] = useState<string>(
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
    const regex =
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{1,4}$/;
      
    const DateStringPicker = new Date(e.target.value).toLocaleDateString();
    const dayPicker = new Date(e.target.value).getDay();
    const convertDateToArray = e.target.value.split("-");
    if (regex.test(DateStringPicker))
      setCalendar({
        day: dayPicker,
        date: Number(convertDateToArray[2]),
        month: Number(convertDateToArray[1]),
        year: Number(convertDateToArray[0]),
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
