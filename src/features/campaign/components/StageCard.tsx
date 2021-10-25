import dollarCircleFilled from '@iconify/icons-ant-design/dollar-circle-filled';
import { Icon } from '@iconify/react';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Button, CardHeader, Paper, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stage } from 'models';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { fDateTimeSuffix3 } from 'utils/formatTime';

interface StageProps {
  stage: Stage;
  idx: number;
  onView: (stage: Stage) => void;
  onDelete: (stage: Stage) => void;
}

export default function StageCard({ stage, idx, onDelete, onView }: StageProps) {
  const { t } = useTranslation();
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: 'auto 0' }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {`${fDateTimeSuffix3(stage?.startTime)} ${t('common.to')} ${fDateTimeSuffix3(
          stage?.endTime
        )}`}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot>
          <Icon icon={dollarCircleFilled} />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '12px', px: 2 }}>
        <Paper
          sx={{
            p: 3,
            width: 1,
            bgcolor: 'background.neutral',
          }}
        >
          <CardHeader title={stage?.stageName} style={{ margin: '0px', padding: '0px' }} />
          <Typography>{`${t('pages.stage.percents')} : ${stage?.percents} %`}</Typography>
          <Typography>{`${t('common.description')} : ${stage?.stageName} `}</Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box
              style={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: `${idx % 2 === 0 ? 'flex-start' : 'flex-end'}`,
                alignContent: 'center',

                width: '100%',
                height: '100%',
              }}
            >
              <Button type="submit" size="small" onClick={() => onView(stage)}>
                {t('common.details')}
              </Button>
              <Button color={'error'} size="small" onClick={() => onDelete(stage)}>
                {t('common.btnDelete')}
              </Button>
            </Box>
          </Stack>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
}
