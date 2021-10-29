import { Box, Container, Grid } from '@mui/material';
import newsApi from 'api/newsApi';
import fileApi from 'api/fileApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import Page from 'components/Page';
import useSettings from 'hooks/useSettings';
import { News } from 'models';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { getCurrentUser } from 'utils/common';
import { campaignActions, selectFilter } from 'features/campaign/campaignSlice';
import NewsForm from '../components/NewsForm';

export default function AddEditNewsPage() {
  const { newsId, campaignId } = useParams();
  const isEdit = Boolean(newsId);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const [campaignPackage, setNews] = useState<News>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const filter = useAppSelector(selectFilter);
  const user = getCurrentUser();
  console.log(campaignId);
  useEffect(() => {
    if (!newsId) return;

    // IFFE
    (async () => {
      try {
        const data: News = await newsApi.getById(newsId);
        setNews(data);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    })();
  }, [newsId]);
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
  const handelFormSubmit = async (formValues: News) => {
    if (!isEdit) {
      try {
        await newsApi.add(formValues);
        enqueueSnackbar(`${formValues?.title} ${t('common.addSuccess')}`, { variant: 'success' });
        dispatch(campaignActions.setRefresh());
        navigate(`${PATH_DASHBOARD.campaign.details}/${formValues.campaignId}/5`);
      } catch (error) {
        enqueueSnackbar(`${formValues?.title} ${t('common.error')}`, { variant: 'error' });
      }
    } else {
      try {
        await newsApi.update(newsId, formValues);
        enqueueSnackbar(`${formValues.title} ${t('common.updateSuccess')}`, { variant: 'success' });
        dispatch(campaignActions.setRefresh());
        navigate(`${PATH_DASHBOARD.campaign.details}/${formValues.campaignId}/5`);
      } catch (error) {
        enqueueSnackbar(`${formValues?.title} ${t('common.v')}`, { variant: 'error' });
      }
    }
  };
  const initialValues: News = {
    content: '',
    title: '',
    campaignId: campaignId || '',
    ...campaignPackage,
  } as News;
  return (
    <Page
      title={`${t('common.title')} ${isEdit ? t('pages.news.update') : t('pages.news.update')}`}
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={isEdit ? t('pages.news.update') : t('pages.news.add')}
          links={[
            { name: t('common.dashboard'), href: PATH_DASHBOARD.root },
            { name: t('pages.campaign.title'), href: PATH_DASHBOARD.news.root },
            {
              name: isEdit ? campaignPackage?.title || '' : t('pages.news.add'),
            },
          ]}
        />
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              {(!isEdit || Boolean(campaignPackage)) && (
                <NewsForm
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
