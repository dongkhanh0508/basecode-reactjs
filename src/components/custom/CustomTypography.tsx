import { Typography } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

interface CustomTypographyProps {
  title: string;
  content?: string | number;
}

export default function CustomTypography({ title, content }: CustomTypographyProps) {
  const { t } = useTranslation();
  return (
    <Typography variant="body1" gutterBottom>
      <Typography variant="body1" component="span" sx={{ color: 'text.secondary' }}>
        {title}&nbsp;:&nbsp;
      </Typography>
      {content === undefined || content === '' ? t('common.noData') : content}
    </Typography>
  );
}
