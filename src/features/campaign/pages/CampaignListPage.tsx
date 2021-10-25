import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import {
  Avatar,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';
import campaignApi from 'api/campaignApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { SelectField } from 'components/form';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import Label from 'components/Label';
// @types
// components
import Page from 'components/Page';
import ResoTable from 'components/table/ResoTable';
// hooks
import useSettings from 'hooks/useSettings';
import { Campaign } from 'models';
import { CampaignEnum } from 'models/enum';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// redux
// routes
import { PATH_DASHBOARD } from 'routes/paths';
import { enumToOptions, getColorEnum } from 'utils/common';
import { fDateTimeSuffix3 } from 'utils/formatTime';
import { campaignActions, selectCampaignList, selectFilter, selectLoading } from '../campaignSlice';

// ----------------------------------------------------------------------

export default function CampaignListPage() {
  const { themeStretch } = useSettings();
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const loading = useAppSelector(selectLoading);
  const rs = useAppSelector(selectCampaignList);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [campaignSelected, setCampaignSelected] = useState<Campaign>();

  // effect
  useEffect(() => {
    dispatch(campaignActions.fetchList(filter));
  }, [dispatch, filter]);
  // functions
  // header
  const { t } = useTranslation();

  const onPageChange = (page: number) => {
    dispatch(
      campaignActions.setFilter({
        ...filter,
        page: page + 1,
      })
    );
  };
  const onRowPerPageChange = (perPage: number) => {
    dispatch(
      campaignActions.setFilter({
        ...filter,
        pageSize: perPage,
      })
    );
  };
  const handelDetailsClick = (campaign: Campaign) => {
    navigate(`${PATH_DASHBOARD.campaign.details}/${campaign.id}`);
  };
  const handelRemoveClick = (team: Campaign) => {
    setCampaignSelected(team);
    setConfirmDelete(true);
  };
  const handelConfirmRemoveClick = async () => {
    try {
      await campaignApi.remove(Number(campaignSelected?.id) || 0);
      const newFilter = { ...filter };
      dispatch(campaignActions.setFilter(newFilter));
      enqueueSnackbar(`${campaignSelected?.name} ${t('common.deleteSuccess')}`, {
        variant: 'success',
      });
      setCampaignSelected(undefined);
      setConfirmDelete(false);
    } catch (error) {
      enqueueSnackbar(`${campaignSelected?.name} ${t('common.error')}`, { variant: 'error' });
    }
  };

  const orderColumns = [
    {
      title: t('common.index'),
      dataIndex: 'index',
      hideInSearch: true,
    },
    {
      title: t('common.image'),
      dataIndex: 'imageUrl',
      hideInSearch: true,
      render: (src) => (
        <Avatar
          alt={'error'}
          src={src}
          variant="square"
          style={{ width: '54px', height: '54px' }}
        />
      ),
    },
    {
      title: t('pages.campaign.name'),
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: t('pages.campaign.minTarget'),
      dataIndex: 'minTarget',
      hideInSearch: true,
    },
    {
      title: t('pages.campaign.maxTarget'),
      dataIndex: 'maxTarget',
      hideInSearch: true,
    },
    {
      title: t('pages.campaign.invested'),
      dataIndex: 'invested',
      hideInSearch: true,
    },
    {
      title: t('pages.campaign.startDay'),
      dataIndex: 'kickoffDate',
      hideInSearch: true,
      render: (_: any, campaign: Campaign) => <>{fDateTimeSuffix3(campaign?.kickoffDate)}</>,
    },
    {
      title: t('pages.campaign.endDay'),
      dataIndex: 'endDate',
      hideInSearch: true,
      render: (_: any, campaign: Campaign) => <>{fDateTimeSuffix3(campaign?.endDate)}</>,
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      render: (_: any, campaign: Campaign) => (
        <Label color={getColorEnum(CampaignEnum[campaign?.status || 1])}>
          {t(`enum.${CampaignEnum[campaign?.status || 1]}`)}
        </Label>
      ),
      renderFormItem: () => (
        <SelectField
          fullWidth
          sx={{ minWidth: '150px' }}
          options={enumToOptions(Object.values(CampaignEnum) as [], true)}
          name="is-available"
          size="small"
          label={t('common.status')}
        />
      ),
    },
  ];

  return (
    <Page title={`${t('common.title')} ${t('pages.campaign.title')}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={t('pages.campaign.title')}
          links={[
            { name: t('common.dashboard'), href: PATH_DASHBOARD.root },

            { name: t('pages.campaign.title') },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.campaign.add}
              startIcon={<Icon icon={plusFill} />}
            >
              {t('pages.campaign.add')}
            </Button>
          }
        />

        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <ResoTable
              rowKey="campaign_id"
              dataSource={rs.results}
              columns={orderColumns}
              showAction={true}
              pagination={true}
              onPageChange={onPageChange}
              onRowPerPageChange={onRowPerPageChange}
              loading={loading}
              totalNumberOfRecord={rs.totalNumberOfRecords}
              pageNumber={rs.pageNumber}
              onDelete={handelRemoveClick}
              onEdit={handelDetailsClick}
            />
          </Stack>
        </Card>
      </Container>
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>{t('common.titleConfirm')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${campaignSelected?.name} ${t('common.titleRemoveEnd')}`}
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
    </Page>
  );
}
