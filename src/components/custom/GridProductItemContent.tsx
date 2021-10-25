// material
import { Box, Button, Card, CardHeader, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Images from 'constants/image';
import { GridItemObj } from 'models';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

type GridProductItemContentProps = {
  product: GridItemObj;
  onSelect?: (id: number | string) => void;
  onView?: (id: number | string) => void;
  defaultImage?: string;
};

export default function GridProductItemContent({
  product,
  onSelect,
  onView,
  defaultImage,
}: GridProductItemContentProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader title={product.name} />
      <Grid container spacing={2}>
        <Grid item xs={4} md={4}>
          <Box sx={{ pt: '100%', position: 'relative' }}>
            <ProductImgStyle alt="error" src={product?.image || defaultImage || Images.PACKAGE} />
          </Box>
        </Grid>
        <Grid item xs={8} md={8}>
          <Typography variant="body1">{product?.description}</Typography>
        </Grid>
      </Grid>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box
            style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'flex-end',
              alignContent: 'center',
              backgroundColor: '#fff',
              width: '100%',
              height: '100%',
            }}
          >
            <Button
              type="submit"
              size="small"
              onClick={() => {
                if (onView) onView(product.id);
              }}
            >
              {t('common.details')}
            </Button>
            <Button
              color={'error'}
              size="small"
              onClick={() => {
                if (onSelect) onSelect(product.id);
              }}
            >
              {t('common.btnDelete')}
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
