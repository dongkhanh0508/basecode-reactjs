import { Button, CardHeader, Grid, ImageList, ImageListItem, Paper } from '@mui/material';
import { CustomImage, CustomTypography, CustomTypographyStatus } from 'components/custom';
import { Campaign } from 'models';
import { CampaignEnum } from 'models/enum';
import { useTranslation } from 'react-i18next';
import { getColorEnum } from 'utils/common';
import { fDateTimeSuffix3 } from 'utils/formatTime';
import { Link as RouterLink } from 'react-router-dom';
import editFill from '@iconify/icons-eva/edit-fill';
import { Icon } from '@iconify/react';
import { PATH_DASHBOARD } from 'routes/paths';

interface CampaignDetailsProps {
  campaign: Campaign;
}

export default function CampaignDetails({ campaign }: CampaignDetailsProps) {
  const { t } = useTranslation();
  return (
    <>
      <Paper
        sx={{
          p: 3,
          width: 1,
          bgcolor: 'background.neutral',
        }}
      >
        <CardHeader
          title={''}
          action={
            <Button
              component={RouterLink}
              to={`${PATH_DASHBOARD.campaign.edit}/${campaign?.id}`}
              startIcon={<Icon icon={editFill} />}
            >
              {t('common.btnEdit')}
            </Button>
          }
          style={{ margin: '0px', padding: '0px' }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={5} lg={5}>
            <CustomImage imageUrl={campaign?.imageUrl} />
          </Grid>
          <Grid item xs={12} md={7} lg={7}>
            {Boolean(campaign) && (
              <>
                <CustomTypography title={t('common.id')} content={campaign?.id} />
                <CustomTypography title={t('pages.campaign.name')} content={campaign?.name} />
                <CustomTypography
                  title={t('pages.campaign.minTarget')}
                  content={campaign?.minTarget}
                />
                <CustomTypography
                  title={t('pages.campaign.maxTarget')}
                  content={campaign?.maxTarget}
                />
                <CustomTypography
                  title={t('pages.campaign.investmentCoefficient')}
                  content={campaign?.investmentMultiple}
                />
                <CustomTypography title={t('pages.campaign.invested')} content={' - '} />
                <CustomTypography
                  title={t('pages.campaign.startDay')}
                  content={fDateTimeSuffix3(campaign?.kickoffDate).toString()}
                />
                <CustomTypography
                  title={t('pages.campaign.endDay')}
                  content={fDateTimeSuffix3(campaign?.kickoffDate).toString()}
                />
                <CustomTypographyStatus
                  title={t('common.status')}
                  content={t(`enum.${CampaignEnum[campaign?.status || 1]}`)}
                  color={getColorEnum(CampaignEnum[campaign?.status || 1])}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
