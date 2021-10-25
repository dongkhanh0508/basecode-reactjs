import { Box, Typography } from '@mui/material';
import Label, { LabelColor } from 'components/Label';
import { useTranslation } from 'react-i18next';

interface CustomTypographyStatusProps {
  title: string;
  content?: string;
  color?: string;
}

export default function CustomTypographyStatus({
  title,
  content,
  color,
}: CustomTypographyStatusProps) {
  const { t } = useTranslation();
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'row',
      }}
    >
      <Typography variant="body1" sx={{ color: 'text.secondary' }} component="span">
        {title}&nbsp;:&nbsp;
      </Typography>
      {/* <Typography variant="h5" sx={{ color: 'text.secondary' }}>
        {content === undefined || content === '' ? t('common.noData') : content}
      </Typography> */}
      <Label color={color as LabelColor}>
        {/* {content === undefined || content === '' ? t('common.noData') : content} */}
        <Typography variant="body1">
          {content === undefined || content === '' ? t('common.noData') : content}
        </Typography>
      </Label>
    </Box>
  );
}
