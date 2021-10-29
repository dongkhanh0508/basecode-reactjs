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
import newsApi from 'api/newsApi';
import { useAppDispatch } from 'app/hooks';
import { CustomTypography } from 'components/custom';
import GridList from 'components/custom/GridList';
import EmptyContent from 'components/EmptyContent';
import Markdown from 'components/Markdown';
import Images from 'constants/image';
import { Campaign, News } from 'models';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { campaignActions } from '../campaignSlice';

interface NewsProps {
  campaign: Campaign;
}

export default function CampaignNews({ campaign }: NewsProps) {
  const { t } = useTranslation();
  const [popup, setPopup] = useState(false);
  const [selected, setSelected] = useState<News>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useAppDispatch();
  const handelViewClick = (id: number | string) => {
    const news = campaign.news.find((x) => x.id === id);
    if (news !== undefined) {
      setSelected(news);
      setPopup(true);
    }
  };
  const handelDeleteClick = (id: number | string) => {
    const news = campaign.news.find((x) => x.id === id);
    if (news !== undefined) {
      setSelected(news);
      setConfirmDelete(true);
    }
  };
  const handelConfirmRemoveClick = async () => {
    try {
      await newsApi.remove(selected?.id || 0);
      enqueueSnackbar(`${selected?.title} ${t('common.deleteSuccess')}`, {
        variant: 'success',
      });
      setSelected(undefined);
      setConfirmDelete(false);
      dispatch(campaignActions.setRefresh());
    } catch (error) {
      enqueueSnackbar(`${selected?.title} ${t('common.error')}`, { variant: 'error' });
    }
  };
  return (
    <Box mt={2}>
      <CardHeader
        title={''}
        action={
          <Button
            component={RouterLink}
            to={`${PATH_DASHBOARD.news.add}/${campaign?.id}`}
            startIcon={<Icon icon={plusFill} />}
          >
            {t('pages.news.add')}
          </Button>
        }
        style={{ margin: '0px', padding: '0px' }}
      />
      {campaign.news.length === 0 ? (
        <EmptyContent
          title={t('common.noData')}
          sx={{
            width: '100%',
          }}
        />
      ) : (
        <GridList
          products={campaign.news.map((x) => ({
            id: x.id,
            name: x.title,
            description: x.content,
          }))}
          isLoad={false}
          onSelectProduct={handelDeleteClick}
          onViewProduct={handelViewClick}
          isShowAdd={false}
          onAddProduct={() => {
            navigate(`${PATH_DASHBOARD.package.add}/${campaign?.id}`);
          }}
          lg={4}
          md={4}
          sm={6}
          xs={6}
          isCardContent={false}
          defaultImage={Images.NEWS}
        />
      )}

      <Dialog open={popup} onClose={() => setPopup(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{selected?.title}</DialogTitle>
        <DialogContent style={{ marginTop: '15px' }}>
          <DialogContentText>
            <Paper
              sx={{
                p: 3,
                width: 1,
                bgcolor: 'background.neutral',
              }}
            >
              <CustomTypography title={t('pages.news.name')} content={selected?.title} />
              <Box sx={{ p: 3 }}>
                <Markdown children={selected?.content || ''} />
              </Box>
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
            {`${selected?.title} ${t('common.titleRemoveEnd')}`}
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
