import React from 'react';
import { Box, Typography, FormHelperText } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateRange } from '@mui/x-date-pickers-pro';
import { motion } from 'framer-motion';
import dayjs, { Dayjs } from 'dayjs';

interface DateRangeStepProps {
  dateRange: {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  };
  updateFormData: (data: { dateRange: { startDate: Dayjs | null; endDate: Dayjs | null } }) => void;
}

const DateRangeStep: React.FC<DateRangeStepProps> = ({ dateRange, updateFormData }) => {
  const today = dayjs();
  
  const handleDateChange = (newDateRange: DateRange<Dayjs>) => {
    updateFormData({
      dateRange: {
        startDate: newDateRange[0],
        endDate: newDateRange[1],
      },
    });
  };

  const isDateRangeValid = dateRange.startDate && dateRange.endDate;

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h6" gutterBottom>
          Select rental period
        </Typography>
        
        <Typography variant="body2" color="textSecondary" paragraph>
          Choose the start and end dates for your rental
        </Typography>
        
        <Box mt={3}>
          <DateRangePicker
            calendars={1}
            value={[dateRange.startDate, dateRange.endDate]}
            onChange={handleDateChange}
            disablePast
            minDate={today}
          />
          
          {!isDateRangeValid && (
            <FormHelperText error sx={{ mt: 1 }}>
              Please select both start and end dates
            </FormHelperText>
          )}
          
          {dateRange.startDate && dateRange.endDate && (
            <Box mt={3} p={2} bgcolor="primary.50" borderRadius={2}>
              <Typography variant="body2">
                Rental duration: {dateRange.endDate.diff(dateRange.startDate, 'day')} days
              </Typography>
            </Box>
          )}
        </Box>
      </motion.div>
    </Box>
  );
};

export default DateRangeStep;