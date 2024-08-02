import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Box } from '@mui/material';
import { Moment } from 'moment';

interface DateFilterProps {
  handleFromDateChange: (date: Moment | null) => void;
  handleToDateChange: (date: Moment | null) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({
  handleFromDateChange,
  handleToDateChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box display="flex" justifyContent="space-between" gap={2}>
        <DesktopDatePicker label="From Date" onChange={handleFromDateChange} />
        <DesktopDatePicker label="To Date" onChange={handleToDateChange} />
      </Box>
    </LocalizationProvider>
  );
};
