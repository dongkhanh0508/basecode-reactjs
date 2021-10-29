import { yupResolver } from '@hookform/resolvers/yup';
import arrowCircleLeftOutline from '@iconify/icons-eva/arrow-circle-left-outline';
import saveFill from '@iconify/icons-eva/save-fill';
import { Icon } from '@iconify/react';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import InputField from 'components/FormField/InputField';
import { News, Options } from 'models';
import * as React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import * as yup from 'yup';
import InputFieldNumberFormat from 'components/FormField/InputFieldNumberFormat';
import DateRangePickerField from 'components/FormField/DateRangePicker';
import SelectField from 'components/FormField/SelectField';
import { useAppSelector } from 'app/hooks';
import { selectCampaignOptions } from 'features/campaign/campaignSlice';
import InputAreaField from 'components/FormField/InputAreaField';
import EditorField from 'components/FormField/EditorField';

interface NewsFormProps {
  initialValue: News;
  onSubmit?: (formValue: News) => void;
  isEdit: boolean;
}

export default function NewsForm({ initialValue, onSubmit, isEdit }: NewsFormProps) {
  const { t } = useTranslation();
  // schema
  const schema = yup.object().shape({
    title: yup.string().required(t('team.errorName')),
    content: yup.string().required(t('team.errorName')),
    campaignId: yup
      .number()
      .typeError(t('common.isRequired'))
      .moreThan(0, t('common.isRequiredOptions'))
      .required(t('common.isRequiredOptions')),
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
  const campaignOptions = useAppSelector(selectCampaignOptions);
  const handelFormSubmit = (formValues: News) => {
    if (onSubmit) onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit(handelFormSubmit)}>
      <Stack spacing={3}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom marginBottom={2}>
            {t('pages.news.info')}
          </Typography>
          <Stack spacing={3}>
            <InputField name="title" label={`${t('pages.news.name')}*`} control={control} />

            <Box mt={2}>
              <SelectField
                name="campaignId"
                label={`${t('pages.campaign.name')}*`}
                control={control}
                options={campaignOptions as Options[]}
                size="medium"
              />
            </Box>
            <EditorField name="content" label={`${t('page.news.content')}*`} control={control} />
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
                navigate(`${PATH_DASHBOARD.campaign.root}`);
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
