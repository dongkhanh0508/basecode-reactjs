import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from '@mui/material';
import { CustomTypography, ShopProductList } from 'components/custom';
import { Campaign, CampaignPackage } from 'models';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import editFill from '@iconify/icons-eva/edit-fill';
import { Icon } from '@iconify/react';
import { PATH_DASHBOARD } from 'routes/paths';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { fDateTimeSuffix3 } from 'utils/formatTime';
import packageApi from 'api/packageApi';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from 'app/hooks';
import { campaignActions } from '../campaignSlice';

interface PackagesProps {
  campaign: Campaign;
}

export default function Packages({ campaign }: PackagesProps) {
  const { t } = useTranslation();
  const [popup, setPopup] = useState(false);
  const [selected, setSelected] = useState<CampaignPackage>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useAppDispatch();
  const handelViewClick = (template: CampaignPackage) => {
    setSelected(template);
    setPopup(true);
  };
  const handelDeleteClick = (template: CampaignPackage) => {
    setSelected(template);
    setConfirmDelete(true);
  };
  const handelConfirmRemoveClick = async () => {
    try {
      await packageApi.remove(Number(selected?.id) || 0);
      enqueueSnackbar(`${selected?.name} ${t('common.deleteSuccess')}`, {
        variant: 'success',
      });
      setSelected(undefined);
      setConfirmDelete(false);
      dispatch(campaignActions.setRefresh());
    } catch (error) {
      enqueueSnackbar(`${selected?.name} ${t('common.error')}`, { variant: 'error' });
    }
  };
  return (
    <Box mt={2}>
      <ShopProductList
        products={campaign.campaignPackages}
        isLoad={false}
        onSelectProduct={handelDeleteClick}
        onViewProduct={handelViewClick}
        isShowAdd={true}
        onAddProduct={() => {
          navigate(`${PATH_DASHBOARD.package.add}/${campaign?.id}`);
        }}
      />
      <Dialog open={popup} onClose={() => setPopup(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selected?.name}</DialogTitle>
        <DialogContent style={{ marginTop: '15px' }}>
          <DialogContentText>
            <Paper
              sx={{
                p: 3,
                width: 1,
                bgcolor: 'background.neutral',
              }}
            >
              <CustomTypography title={t('common.id')} content={selected?.id} />
              <CustomTypography title={t('pages.campaign.name')} content={selected?.name} />
              <CustomTypography
                title={t('pages.campaign.packageQuantity')}
                content={selected?.quantity}
              />
              <CustomTypography
                title={t('pages.campaign.packagePrice')}
                content={selected?.price}
              />
              <CustomTypography
                title={t('pages.campaign.startDay')}
                content={fDateTimeSuffix3(selected?.startDate || '').toString()}
              />
              <CustomTypography
                title={t('pages.campaign.endDay')}
                content={fDateTimeSuffix3(selected?.endDate || '').toString()}
              />
            </Paper>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() =>
              navigate(`${PATH_DASHBOARD.package.edit}/${selected?.id}/${campaign.id}`)
            }
          >
            {t('common.btnEdit')}
          </Button>
          <Button color="inherit" onClick={() => setPopup(false)}>
            {t('common.btnClose')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>{t('common.titleConfirm')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${selected?.name} ${t('common.titleRemoveEnd')}`}
            <br />
            {t('common.canRevert')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={() => setConfirmDelete(false)}>
            {t('common.btnClose')}
          </Button>
          <Button onClick={handelConfirmRemoveClick} autoFocus>
            {t('common.confirmBtn')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
