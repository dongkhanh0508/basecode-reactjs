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
import plusFill from '@iconify/icons-eva/plus-fill';
import { CustomTypography, ShopProductList } from 'components/custom';
import { Campaign, CampaignRisk, Risk } from 'models';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import editFill from '@iconify/icons-eva/edit-fill';
import { Icon } from '@iconify/react';
import { PATH_DASHBOARD } from 'routes/paths';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { fDateTimeSuffix3 } from 'utils/formatTime';
import riskApi from 'api/riskApi';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from 'app/hooks';
import { riskActions } from 'features/risk/riskSlice';
import GridList from 'components/custom/GridList';
import Images from 'constants/image';
import EmptyContent from 'components/EmptyContent';
import { campaignActions } from '../campaignSlice';

interface CampaignRisksProps {
  campaign: Campaign;
}

export default function Risks({ campaign }: CampaignRisksProps) {
  const { t } = useTranslation();
  const [popup, setPopup] = useState(false);
  const [selected, setSelected] = useState<Risk>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useAppDispatch();
  const handelViewClick = (id: number | string) => {
    const risk = campaign.campaignRisks.find((x) => x.risk.id === id);
    if (risk !== undefined) {
      setSelected(risk.risk);
      setPopup(true);
    }
  };
  const handelDeleteClick = (id: number | string) => {
    const risk = campaign.campaignRisks.find((x) => x.risk.id === id);
    if (risk !== undefined) {
      setSelected(risk.risk);
      setConfirmDelete(true);
    }
  };
  const handelConfirmRemoveClick = async () => {
    try {
      await riskApi.remove(campaign.id, selected?.id || 0);
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
      <CardHeader
        title={''}
        action={
          <Button
            component={RouterLink}
            to={`${PATH_DASHBOARD.risk.add}/${campaign?.id}`}
            startIcon={<Icon icon={plusFill} />}
          >
            {t('pages.risk.add')}
          </Button>
        }
        style={{ margin: '0px', padding: '0px' }}
      />
      {campaign.campaignRisks.length === 0 ? (
        <EmptyContent
          title={t('common.noData')}
          sx={{
            width: '100%',
          }}
        />
      ) : (
        <GridList
          products={campaign.campaignRisks.map((x) => ({
            id: x.risk.id,
            name: x.risk.name,
            description: x.risk.description,
          }))}
          isLoad={false}
          onSelectProduct={handelDeleteClick}
          onViewProduct={handelViewClick}
          isShowAdd={false}
          onAddProduct={() => {
            navigate(`${PATH_DASHBOARD.package.add}/${campaign?.id}`);
          }}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          isCardContent={true}
          defaultImage={Images.RISK}
        />
      )}

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
              <CustomTypography title={t('pages.risk.name')} content={selected?.name} />
              <CustomTypography title={t('common.description')} content={selected?.description} />
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
