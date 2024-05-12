import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import {DEFAULT_START_DATE} from "../../pages/HomePage/constants";

interface DateRangePickerProps {
  onStartDateChange: (date: string | null) => void;
  onEndDateChange: (date: string | null) => void;
}

const DateRangePicker = ({ onStartDateChange,  onEndDateChange }: DateRangePickerProps) => {
  const setStartDateHandler = (newValue:Dayjs | null) => {
    const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';

    onStartDateChange(formattedDate);
  }

  const setEndDateHandler = (newValue:Dayjs | null) => {
    const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';

    onEndDateChange(formattedDate);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Початкова дата"
        onChange={setStartDateHandler}
        minDate={dayjs(DEFAULT_START_DATE)}
      />
      <DatePicker
        label="Кінцева дата"
        onChange={setEndDateHandler}
        minDate={dayjs(DEFAULT_START_DATE)}
      />
    </LocalizationProvider>
  );
}

export default DateRangePicker;
