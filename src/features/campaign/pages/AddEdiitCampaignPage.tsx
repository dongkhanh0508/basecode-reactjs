import { Box, Container, Grid } from '@mui/material';
import campaignApi from 'api/campaignApi';
import fileApi from 'api/fileApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import Page from 'components/Page';
import useSettings from 'hooks/useSettings';
import { Campaign } from 'models';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { getCurrentUser } from 'utils/common';
import { campaignActions, selectFilter } from '../campaignSlice';
import CampaignForm from '../components/CampaignForm';

export default function AddEditCampaignPage() {
  const { campaignId } = useParams();
  const isEdit = Boolean(campaignId);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const [campaign, setCampaign] = useState<Campaign>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const filter = useAppSelector(selectFilter);
  useEffect(() => {
    if (!campaignId) return;

    // IFFE
    (async () => {
      try {
        const data: Campaign = await campaignApi.getById(campaignId);
        data.dateRange = [data.kickoffDate, data.endDate];
        setCampaign(data);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    })();
  }, [campaignId]);
  const handelStoreFormSubmit = async (formValues: Campaign) => {
    if (!isEdit) {
      try {
        formValues.kickoffDate = formValues.dateRange[0] || new Date();
        formValues.endDate = formValues.dateRange[1] || new Date();
        const imageUrl = await fileApi.add(formValues);
        console.log(imageUrl);
        formValues.imageUrl = imageUrl;

        await campaignApi.add(formValues);
        enqueueSnackbar(`${formValues?.name} ${t('common.addSuccess')}`, { variant: 'success' });
        const newFilter = { ...filter };
        dispatch(campaignActions.setFilter(newFilter));
        navigate(PATH_DASHBOARD.campaign.root);
      } catch (error) {
        enqueueSnackbar(`${formValues?.name} ${t('common.error')}`, { variant: 'error' });
      }
    } else {
      try {
        formValues.kickoffDate = formValues.dateRange[0] || new Date();
        formValues.endDate = formValues.dateRange[1] || new Date();
        await campaignApi.update(campaignId, formValues);
        enqueueSnackbar(`${formValues.name} ${t('common.updateSuccess')}`, { variant: 'success' });
        const newFilter = { ...filter };
        dispatch(campaignActions.setFilter(newFilter));
        navigate(PATH_DASHBOARD.campaign.root);
      } catch (error) {
        enqueueSnackbar(`${formValues?.name} ${t('common.v')}`, { variant: 'error' });
      }
    }
  };
  const initialValues: Campaign = {
    description: '',
    endDate: '',
    imageUrl: '',
    maxTarget: '',
    minTarget: '',
    investmentMultiple: 1,
    name: '',
    dateRange: [null, null],
    ...campaign,
  } as Campaign;
  return (
    <Page
      title={`${t('common.title')} ${
        isEdit ? t('pages.campaign.update') : t('pages.campaign.update')
      }`}
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={isEdit ? t('pages.campaign.update') : t('pages.campaign.add')}
          links={[
            { name: t('common.dashboard'), href: PATH_DASHBOARD.root },
            { name: t('pages.campaign.title'), href: PATH_DASHBOARD.campaign.root },
            {
              name: isEdit ? campaign?.name || '' : t('pages.campaign.add'),
            },
          ]}
        />
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              {(!isEdit || Boolean(campaign)) && (
                <CampaignForm
                  initialValue={initialValues}
                  onSubmit={handelStoreFormSubmit}
                  isEdit={isEdit}
                  isView={false}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}
