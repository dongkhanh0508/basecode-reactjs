import { Box, FormHelperText, styled, TextField, Typography } from '@mui/material';
import { QuillEditor } from 'components/editor';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';
import typography from 'theme/typography';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function EditorField({ name, control, label, ...inputProps }: TextFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <Box>
      <LabelStyle>{label}</LabelStyle>
      <QuillEditor id="post-content" value={value} onChange={onChange} error={invalid} />
      {error?.message && (
        <FormHelperText error sx={{ px: 2 }}>
          {error?.message}
        </FormHelperText>
      )}
    </Box>
  );
}
