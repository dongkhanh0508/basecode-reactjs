import { Box, Container, Grid } from '@mui/material';
import packageApi from 'api/packageApi';
import fileApi from 'api/fileApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import Page from 'components/Page';
import useSettings from 'hooks/useSettings';
import { CampaignPackage } from 'models';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { getCurrentUser } from 'utils/common';
import { campaignActions } from 'features/campaign/campaignSlice';
import { packageActions, selectFilter } from '../packageSlice';
import CampaignPackageForm from '../components/PackageForm';

export default function AddEditCampaignPackagePage() {
  const { packageId, campaignId } = useParams();
  const isEdit = Boolean(packageId);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const [campaignPackage, setCampaignPackage] = useState<CampaignPackage>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const filter = useAppSelector(selectFilter);
  const user = getCurrentUser();
  console.log(campaignId);
  useEffect(() => {
    if (!packageId) return;

    // IFFE
    (async () => {
      try {
        const data: CampaignPackage = await packageApi.getById(packageId);
        data.dateRange = [data.startDate, data.endDate];
        setCampaignPackage(data);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    })();
  }, [packageId]);
  useEffect(() => {
    dispatch(
      campaignActions.fetchList({
        page: undefined,
        colName: undefined,
        keySearch: undefined,
        pageSize: undefined,
        sortType: undefined,
      })
    );
  }, [dispatch, filter]);
  const handelFormSubmit = async (formValues: CampaignPackage) => {
    if (!isEdit) {
      try {
        formValues.startDate = formValues.dateRange[0] || new Date();
        formValues.endDate = formValues.dateRange[1] || new Date();
        await packageApi.add(formValues);
        enqueueSnackbar(`${formValues?.name} ${t('common.addSuccess')}`, { variant: 'success' });
        dispatch(campaignActions.setRefresh());
        navigate(`${PATH_DASHBOARD.campaign.details}/${formValues.campaignId}/2`);
      } catch (error) {
        enqueueSnackbar(`${formValues?.name} ${t('common.error')}`, { variant: 'error' });
      }
    } else {
      try {
        formValues.startDate = formValues.dateRange[0] || new Date();
        formValues.endDate = formValues.dateRange[1] || new Date();
        await packageApi.update(packageId, formValues);
        enqueueSnackbar(`${formValues.name} ${t('common.updateSuccess')}`, { variant: 'success' });
        dispatch(campaignActions.setRefresh());
        navigate(`${PATH_DASHBOARD.campaign.details}/${formValues.campaignId}/2`);
      } catch (error) {
        enqueueSnackbar(`${formValues?.name} ${t('common.v')}`, { variant: 'error' });
      }
    }
  };
  const initialValues: CampaignPackage = {
    endDate: '',
    quantity: 1,
    price: '',
    startDate: '',
    name: '',
    dateRange: [null, null],
    campaignId: campaignId || '',
    ...campaignPackage,
  } as CampaignPackage;
  return (
    <Page
      title={`${t('common.title')} ${
        isEdit ? t('pages.package.update') : t('pages.package.update')
      }`}
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={isEdit ? t('pages.package.update') : t('pages.package.add')}
          links={[
            { name: t('common.dashboard'), href: PATH_DASHBOARD.root },
            { name: t('pages.campaign.title'), href: PATH_DASHBOARD.package.root },
            {
              name: isEdit ? campaignPackage?.name || '' : t('pages.package.add'),
            },
          ]}
        />
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              {(!isEdit || Boolean(campaignPackage)) && (
                <CampaignPackageForm
                  initialValue={initialValues}
                  onSubmit={handelFormSubmit}
                  isEdit={isEdit}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}
