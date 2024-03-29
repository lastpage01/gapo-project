export const convertDayToString = (day: number): string => {
  switch (day) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Sunday";
  }
};
const isLeapYear = (year: number): number => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return 1;
  return 0;
};

type ValidateDate = {
  day: number;
  date: number;
  month: number;
  year: number;
};

export const validateDate = (
  day: number,
  date: number,
  month: number,
  year: number
): ValidateDate => {
  let d, m, y;
  const t = day < 0 ? 6 : day > 6 ? 0 : day;
  if (month > 12 || month < 1 || year < 0)
    return {
      day: new Date().getDay(),
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    };
  const months = [
    31,
    28 + isLeapYear(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  if (date >= 1 && date <= months[month - 1])
    return { day: t, date, month, year };
  if (date > months[month - 1]) {
    d = 1;
    m = month + 1 > 12 ? 1 : month + 1;
    y = m < month ? year + 1 : year;
  }
  if (date < 1) {
    d = month - 1 < 1 ? 31 : months[month - 2];
    m = month - 1 < 1 ? 12 : month - 1;
    y = m > month ? year - 1 : year;
  }
  return {
    day: t,
    date: d,
    month: m,
    year: y,
  };
};

export const convertValueDateToString = (
  date: number,
  month: number,
  year: number
): string => {
  const d = date < 10 ? `0${Number(date)}` : date;
  const m = month < 10 ? `0${Number(month)}` : month;
  return `${year}-${m}-${d}`;
};
