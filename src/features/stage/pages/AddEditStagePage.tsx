import { Box, Container, Grid } from '@mui/material';
import stageApi from 'api/stageApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import Page from 'components/Page';
import useSettings from 'hooks/useSettings';
import { Stage } from 'models';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { campaignActions, selectFilter } from 'features/campaign/campaignSlice';
import StageForm from '../components/StageForm';

export default function AddEditStagePage() {
  const { stageId, campaignId } = useParams();
  const isEdit = Boolean(stageId);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const [stage, setStage] = useState<Stage>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const filter = useAppSelector(selectFilter);
  useEffect(() => {
    if (!stageId) return;

    // IFFE
    (async () => {
      try {
        const data: Stage = await stageApi.getById(stageId);
        data.dateRange = [data?.startTime, data?.endTime];
        setStage(data);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    })();
  }, [stageId]);
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
  const handelFormSubmit = async (formValues: Stage) => {
    if (!isEdit) {
      try {
        formValues.startTime = formValues.dateRange[0] || new Date();
        formValues.endTime = formValues.dateRange[1] || new Date();
        await stageApi.add(formValues);
        enqueueSnackbar(`${formValues?.stageName} ${t('common.addSuccess')}`, {
          variant: 'success',
        });
        dispatch(campaignActions.setRefresh());
        navigate(`${PATH_DASHBOARD.campaign.details}/${formValues.campaignId}/4`);
      } catch (error) {
        enqueueSnackbar(`${formValues?.stageName} ${t('common.error')}`, { variant: 'error' });
      }
    } else {
      try {
        formValues.startTime = formValues.dateRange[0] || new Date();
        formValues.endTime = formValues.dateRange[1] || new Date();
        await stageApi.update(stageId, formValues);
        enqueueSnackbar(`${formValues.stageName} ${t('common.updateSuccess')}`, {
          variant: 'success',
        });
        dispatch(campaignActions.setRefresh());
        navigate(`${PATH_DASHBOARD.campaign.details}/${formValues.campaignId}/4`);
      } catch (error) {
        enqueueSnackbar(`${formValues?.stageName} ${t('common.v')}`, { variant: 'error' });
      }
    }
  };
  const initialValues: Stage = {
    percents: '',
    description: '',
    stageName: '',
    dateRange: [null, null],
    campaignId: campaignId || '',
    ...stage,
  } as Stage;
  return (
    <Page
      title={`${t('common.title')} ${isEdit ? t('pages.stage.update') : t('pages.stage.update')}`}
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={isEdit ? t('pages.stage.update') : t('pages.stage.add')}
          links={[
            { name: t('common.dashboard'), href: PATH_DASHBOARD.root },
            { name: t('pages.campaign.title'), href: PATH_DASHBOARD.stage.root },
            {
              name: isEdit ? stage?.stageName || '' : t('pages.stage.add'),
            },
          ]}
        />
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              {(!isEdit || Boolean(stage)) && (
                <StageForm
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
