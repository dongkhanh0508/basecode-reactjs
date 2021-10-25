import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import Timeline from '@mui/lab/Timeline';
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
import stageApi from 'api/stageApi';
import { useAppDispatch } from 'app/hooks';
import { CustomTypography } from 'components/custom';
import EmptyContent from 'components/EmptyContent';
import { Campaign, Stage } from 'models';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { fDateTimeSuffix3 } from 'utils/formatTime';
import { campaignActions } from '../campaignSlice';
import StageCard from './StageCard';

interface CampaignStageProps {
  campaign: Campaign;
}

export default function CampaignStage({ campaign }: CampaignStageProps) {
  const { t } = useTranslation();
  const [popup, setPopup] = useState(false);
  const [selected, setSelected] = useState<Stage>();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handelViewClick = (template: Stage) => {
    setSelected(template);
    setPopup(true);
  };
  const handelDeleteClick = (template: Stage) => {
    setSelected(template);
    setConfirmDelete(true);
  };
  const handelConfirmRemoveClick = async () => {
    try {
      await stageApi.remove(Number(selected?.id) || 0);
      enqueueSnackbar(`${selected?.stageName} ${t('common.deleteSuccess')}`, {
        variant: 'success',
      });
      setSelected(undefined);
      setConfirmDelete(false);
      dispatch(campaignActions.setRefresh());
    } catch (error) {
      enqueueSnackbar(`${selected?.stageName} ${t('common.error')}`, { variant: 'error' });
    }
  };
  return (
    <Box mt={2}>
      <CardHeader
        title={''}
        action={
          <Button
            component={RouterLink}
            to={`${PATH_DASHBOARD.stage.add}/${campaign?.id}`}
            startIcon={<Icon icon={plusFill} />}
          >
            {t('pages.stage.add')}
          </Button>
        }
        style={{ margin: '0px', padding: '0px' }}
      />
      <Timeline position="alternate">
        {campaign.campaignStages.length === 0 && (
          <EmptyContent
            title={t('common.noData')}
            sx={{
              width: '100%',
            }}
          />
        )}
        {campaign?.campaignStages?.map((e, idx) => (
          <StageCard
            stage={e}
            key={`stage${e.id}`}
            idx={idx}
            onDelete={handelDeleteClick}
            onView={handelViewClick}
          />
        ))}
      </Timeline>
      <Dialog open={popup} onClose={() => setPopup(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selected?.stageName}</DialogTitle>
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
              <CustomTypography title={t('pages.stage.name')} content={selected?.stageName} />
              <CustomTypography
                title={t('pages.stage.percents')}
                content={`${selected?.percents} %`}
              />
              <CustomTypography title={t('common.description')} content={selected?.description} />
              <CustomTypography
                title={t('pages.campaign.startDay')}
                content={fDateTimeSuffix3(selected?.startTime || '').toString()}
              />
              <CustomTypography
                title={t('pages.campaign.endDay')}
                content={fDateTimeSuffix3(selected?.endTime || '').toString()}
              />
            </Paper>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => navigate(`${PATH_DASHBOARD.stage.edit}/${selected?.id}/${campaign.id}`)}
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
            {`${selected?.stageName} ${t('common.titleRemoveEnd')}`}
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
