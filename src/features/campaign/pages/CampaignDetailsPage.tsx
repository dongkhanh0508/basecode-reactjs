import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Tab } from '@mui/material';
import campaignApi from 'api/campaignApi';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import Page from 'components/Page';
import useSettings from 'hooks/useSettings';
import { Campaign } from 'models';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { selectRefresh } from '../campaignSlice';
// eslint-disable-next-line import/no-named-as-default
import CampaignDetails from '../components/CampaignDetails';
import CampaignStage from '../components/CampaignStage';
import Locations from '../components/Locations';
import CampaignNews from '../components/CampaignNews';
import Packages from '../components/Packages';
import Risks from '../components/Risks';

export default function CampaignDetailsPage() {
  const { campaignId, tag } = useParams();
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const [campaign, setCampaign] = useState<Campaign>();
  const [value, setValue] = useState(tag || '1');
  const refresh = useSelector(selectRefresh);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!campaignId) return;
    // IFFE
    (async () => {
      try {
        const data: Campaign = await campaignApi.getById(campaignId);
        setCampaign(data);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    })();
  }, [campaignId, refresh]);
  return (
    <Page title={`${t('common.title')} ${t('pages.campaign.details')}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={t('pages.campaign.details')}
          links={[
            { name: t('common.dashboard'), href: PATH_DASHBOARD.root },
            { name: t('pages.campaign.title'), href: PATH_DASHBOARD.campaign.root },
            {
              name: campaign?.name || '-',
            },
          ]}
        />
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label={t('pages.campaign.info')} value="1" />
                <Tab label={t('pages.campaign.package')} value="2" />
                <Tab label={t('pages.campaign.location')} value="3" />
                <Tab label={t('pages.campaign.stage')} value="4" />
                <Tab label={t('pages.campaign.news')} value="5" />
                <Tab label={t('pages.campaign.risk')} value="6" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {Boolean(campaign) && <CampaignDetails campaign={campaign as Campaign} />}
            </TabPanel>
            <TabPanel value="2">
              {Boolean(campaign) && <Packages campaign={campaign as Campaign} />}
            </TabPanel>
            <TabPanel value="3">
              {Boolean(campaign) && <Locations campaign={campaign as Campaign} />}
            </TabPanel>
            <TabPanel value="4">
              {Boolean(campaign) && <CampaignStage campaign={campaign as Campaign} />}
            </TabPanel>
            <TabPanel value="5">
              {Boolean(campaign) && <CampaignNews campaign={campaign as Campaign} />}
            </TabPanel>
            <TabPanel value="6">
              {Boolean(campaign) && <Risks campaign={campaign as Campaign} />}
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Page>
  );
}
