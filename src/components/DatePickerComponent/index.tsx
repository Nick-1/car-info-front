import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from 'dayjs';
import {FC} from "react";

interface DatePickerComponentProps {
  date: Dayjs;
  setDate: (date: string) => void;
}

const DatePickerComponent: FC<DatePickerComponentProps> = ({ setDate }) => {
  const changeHandler = (newValue: Dayjs | null) => {
    const formattedDate = newValue ? newValue.format('DD/MM/YYYY') : '';
    setDate(`${formattedDate}-10:00`);

   /// console.info(`${formattedDate}-10:00`);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker onChange={changeHandler} />
      </LocalizationProvider>
    </>
  );
};

export default DatePickerComponent;
