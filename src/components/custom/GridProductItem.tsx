// material
import { Box, Button, Card, Stack, Typography } from '@mui/material';
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

type GridProductItemProps = {
  product: GridItemObj;
  onSelect?: (id: number | string) => void;
  onView?: (id: number | string) => void;
  defaultImage?: string;
};

export default function GridProductItem({
  product,
  onSelect,
  onView,
  defaultImage,
}: GridProductItemProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt="error" src={product?.image || defaultImage || Images.PACKAGE} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap textAlign={'center'}>
          {product.name}
        </Typography>

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
