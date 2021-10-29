import { yupResolver } from '@hookform/resolvers/yup';
import arrowCircleLeftOutline from '@iconify/icons-eva/arrow-circle-left-outline';
import saveFill from '@iconify/icons-eva/save-fill';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import InputAreaField from 'components/FormField/InputAreaField';
import InputField from 'components/FormField/InputField';
import { selectCampaignOptions } from 'features/campaign/campaignSlice';
import { Risk } from 'models';
import * as React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import * as yup from 'yup';

interface RiskFormProps {
  initialValue: Risk;
  onSubmit?: (formValue: Risk) => void;
  isEdit: boolean;
}

export default function RiskForm({ initialValue, onSubmit, isEdit }: RiskFormProps) {
  const { t } = useTranslation();
  // schema
  const schema = yup.object().shape({
    name: yup.string().required(t('team.errorName')),
    riskType: yup.string().required(t('team.errorName')),
    description: yup.string().required(t('team.errorName')),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<any>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });
  const { isDirty } = useFormState({ control });
  const navigate = useNavigate();
  const handelFormSubmit = (formValues: Risk) => {
    if (onSubmit) onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit(handelFormSubmit)}>
      <Stack spacing={3}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Typography variant="h6" gutterBottom marginBottom={2}>
              {t('pages.risk.info')}
            </Typography>
            <InputField name="name" label={`${t('pages.risk.name')}*`} control={control} />
            <InputField name="riskType" label={`${t('pages.risk.riskType')}*`} control={control} />
            <InputAreaField
              name="description"
              label={`${t('common.description')}*`}
              control={control}
            />
          </Stack>
          <Box
            style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'flex-end',
              alignContent: 'center',
              backgroundColor: '#fff',
              marginTop: '15px',
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={() => {
                navigate(`${PATH_DASHBOARD.risk.root}`);
              }}
              startIcon={<Icon icon={arrowCircleLeftOutline} />}
              style={{ marginRight: '15px' }}
            >
              {t('common.back')}
            </Button>
            <LoadingButton
              disabled={!isDirty}
              loading={isSubmitting}
              type="submit"
              variant="contained"
              size="medium"
              startIcon={<Icon icon={saveFill} />}
            >
              {isEdit ? t('common.btnUpdate') : t('common.btnSubmit')}
            </LoadingButton>
          </Box>
        </Card>
      </Stack>
    </form>
  );
}
