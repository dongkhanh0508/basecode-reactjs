import { DateRange, DateRangePicker, LocalizationProvider } from '@mui/lab';
import { TextField, Box, Stack, FormHelperText } from '@mui/material';
import { values } from 'lodash';
import { Control, useController } from 'react-hook-form';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from 'react';
// eslint-disable-next-line import/no-duplicates
import vi from 'date-fns/locale/vi';
// eslint-disable-next-line import/no-duplicates
import enLocale from 'date-fns/locale/en-US';
import useLocales from 'hooks/useLocales';
import { Block } from './Block';
import InputField from './InputField';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  labelStartDay?: string;
  labelEndDay?: string;
  maxDate?: Date;
  minDate?: Date;
}

export default function DateRangePickerField({
  name,
  control,
  labelEndDay,
  labelStartDay,
  maxDate,
  minDate,
  ...inputProps
}: TextFieldProps) {
  const { currentLang, onChangeLang } = useLocales();
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={currentLang === 'vi' ? vi : enLocale}
    >
      <DateRangePicker
        startText={labelStartDay}
        endText={labelEndDay}
        value={value}
        inputRef={ref}
        inputFormat={'dd/MM/yyyy'}
        onChange={onChange}
        maxDate={maxDate}
        minDate={minDate}
        renderInput={(startProps, endProps) => (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 2 }}
            style={{ width: '100%' }}
          >
            <TextField {...startProps} fullWidth />
            <TextField {...endProps} fullWidth />
            {Boolean(error?.message) && <FormHelperText>{error?.message}</FormHelperText>}
          </Stack>
        )}
      />
    </LocalizationProvider>
  );
}
