import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface DateRangePickerProps {
  onStartDateChange: (date: string | null) => void;
  onEndDateChange: (date: string | null) => void;
  minDate?: string,
  maxDate?: string
}

const DateRangePicker = ({ onStartDateChange,  onEndDateChange, minDate }: DateRangePickerProps) => {
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
        minDate={dayjs(minDate)}
      />
      <DatePicker
        label="Кінцева дата"
        onChange={setEndDateHandler}
        minDate={dayjs(minDate)}
      />
    </LocalizationProvider>
  );
}

export default DateRangePicker;
