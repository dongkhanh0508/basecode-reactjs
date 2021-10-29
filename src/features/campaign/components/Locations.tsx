import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from '@mui/material';
import locationApi from 'api/locationApi';
import { useAppDispatch } from 'app/hooks';
import { CustomTypography } from 'components/custom';
import GridList from 'components/custom/GridList';
import EmptyContent from 'components/EmptyContent';
import Images from 'constants/image';
import { Campaign, Location } from 'models';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { campaignActions } from '../campaignSlice';

interface CampaignLocationsProps {
  campaign: Campaign;
}

export default function Locations({ campaign }: CampaignLocationsProps) {
  const { t } = useTranslation();
  const [popup, setPopup] = useState(false);
  const [selected, setSelected] = useState<Location>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useAppDispatch();
  const handelViewClick = (id: number | string) => {
    const location = campaign.campaignLocations.find((x) => x.location.id === id);
    if (location !== undefined) {
      setSelected(location.location);
      setPopup(true);
    }
  };
  const handelDeleteClick = (id: number | string) => {
    const location = campaign.campaignLocations.find((x) => x.location.id === id);
    if (location !== undefined) {
      setSelected(location.location);
      setConfirmDelete(true);
    }
  };
  const handelConfirmRemoveClick = async () => {
    try {
      await locationApi.remove(campaign.id, selected?.id || 0);
      enqueueSnackbar(`${selected?.address} ${t('common.deleteSuccess')}`, {
        variant: 'success',
      });
      setSelected(undefined);
      setConfirmDelete(false);
      dispatch(campaignActions.setRefresh());
    } catch (error) {
      enqueueSnackbar(`${selected?.address} ${t('common.error')}`, { variant: 'error' });
    }
  };
  return (
    <Box mt={2}>
      <CardHeader
        title={''}
        action={
          <Button
            component={RouterLink}
            to={`${PATH_DASHBOARD.location.add}/${campaign?.id}`}
            startIcon={<Icon icon={plusFill} />}
          >
            {t('pages.location.add')}
          </Button>
        }
        style={{ margin: '0px', padding: '0px' }}
      />
      {campaign.campaignLocations.length === 0 ? (
        <EmptyContent
          title={t('common.noData')}
          sx={{
            width: '100%',
          }}
        />
      ) : (
        <GridList
          products={campaign.campaignLocations.map((x) => ({
            id: x.location.id,
            name: x.location.address,
            description: `${x.location.address}, ${x.location.ward}, ${x.location.district}, ${x.location.city}`,
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
          defaultImage={Images.LOCATION}
        />
      )}

      <Dialog open={popup} onClose={() => setPopup(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selected?.address}</DialogTitle>
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
              <CustomTypography title={t('pages.location.name')} content={selected?.address} />
              <CustomTypography title={t('common.description')} content={selected?.city} />
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
            {`${selected?.address} ${t('common.titleRemoveEnd')}`}
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
