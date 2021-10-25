import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import Images from 'constants/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CustomImageProps {
  imageUrl: string;
}

export default function CustomImage({ imageUrl }: CustomImageProps) {
  const [isErrorImage, setIsErrorImage] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <ImageList rowHeight={180} style={{ height: '370px' }}>
      <ImageListItem key="no-img" cols={2} style={{ height: '100%' }}>
        <Box
          style={{ width: '100%', height: '100%' }}
          sx={{ position: 'relative', pt: 'calc(100% / 16 * 9)' }}
        >
          <Box
            component="img"
            alt="error"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = Images.ERROR_IMG;
              setIsErrorImage(true);
            }}
            src={imageUrl}
            sx={{
              top: 0,
              width: 1,
              height: 1,
              borderRadius: 1,
              objectFit: 'cover',
              position: 'absolute',
            }}
          />
        </Box>
        <ImageListItemBar
          title={t('common.image')}
          subtitle={isErrorImage ? <span>{t('common.errorImage')}</span> : ''}
          style={{ borderRadius: '5px' }}
        />
      </ImageListItem>
    </ImageList>
  );
}
