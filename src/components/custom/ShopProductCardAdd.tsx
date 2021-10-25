// material
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Images from 'constants/image';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { PATH_DASHBOARD } from 'routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
}));
type ShopProductCardAddProps = {
  onSelect?: () => void;
};

export default function ShopProductCardAdd({ onSelect }: ShopProductCardAddProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt="error" src={Images.ADD} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap textAlign={'center'}>
          {'Thêm mới gói đầu tư'}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box
            style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'center',
              alignContent: 'center',
              backgroundColor: '#fff',
              width: '100%',
              height: '100%',
            }}
          >
            <Button
              type="submit"
              size="small"
              startIcon={<Icon icon={plusFill} />}
              onClick={() => {
                if (onSelect) onSelect();
              }}
            >
              {t('pages.campaign.addPackage')}
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
