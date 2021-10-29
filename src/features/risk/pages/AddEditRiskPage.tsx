import { Box, Container, Grid } from '@mui/material';
import riskApi from 'api/riskApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import Page from 'components/Page';
import useSettings from 'hooks/useSettings';
import { CampaignRisk, Risk } from 'models';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { campaignActions, selectFilter } from 'features/campaign/campaignSlice';
import RiskForm from '../components/RiskForm';

export default function AddEditRiskPage() {
  const { riskId, campaignId } = useParams();
  const isEdit = Boolean(riskId);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const [risk, setRisk] = useState<Risk>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    if (!riskId) return;

    // IFFE
    (async () => {
      try {
        const data: CampaignRisk = await riskApi.getById(Number(campaignId), Number(riskId));
        setRisk(data.risk);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    })();
  }, [riskId, campaignId]);

  const handelFormSubmit = async (formValues: Risk) => {
    if (!isEdit) {
      try {
        await riskApi.add(Number(campaignId), formValues);
        enqueueSnackbar(`${formValues?.name} ${t('common.addSuccess')}`, {
          variant: 'success',
        });
        dispatch(campaignActions.setRefresh());
        navigate(`${PATH_DASHBOARD.campaign.details}/${campaignId}/6`);
      } catch (error) {
        enqueueSnackbar(`${formValues?.name} ${t('common.error')}`, { variant: 'error' });
      }
    } else {
      try {
        await riskApi.update(riskId, formValues);
        enqueueSnackbar(`${formValues.name} ${t('common.updateSuccess')}`, {
          variant: 'success',
        });
        dispatch(campaignActions.setRefresh());
        navigate(`${PATH_DASHBOARD.campaign.details}/${campaignId}/4`);
      } catch (error) {
        enqueueSnackbar(`${formValues?.name} ${t('common.v')}`, { variant: 'error' });
      }
    }
  };
  const initialValues: Risk = {
    name: '',
    description: '',
    riskType: '',
    ...risk,
  } as Risk;
  return (
    <Page
      title={`${t('common.title')} ${isEdit ? t('pages.risk.update') : t('pages.risk.update')}`}
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={isEdit ? t('pages.risk.update') : t('pages.risk.add')}
          links={[
            { name: t('common.dashboard'), href: PATH_DASHBOARD.root },
            { name: t('pages.campaign.title'), href: PATH_DASHBOARD.risk.root },
            {
              name: isEdit ? risk?.name || '' : t('pages.risk.add'),
            },
          ]}
        />
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              {(!isEdit || Boolean(risk)) && (
                <RiskForm
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
