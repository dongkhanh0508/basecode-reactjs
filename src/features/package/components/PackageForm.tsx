import { yupResolver } from '@hookform/resolvers/yup';
import arrowCircleLeftOutline from '@iconify/icons-eva/arrow-circle-left-outline';
import saveFill from '@iconify/icons-eva/save-fill';
import { Icon } from '@iconify/react';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import InputField from 'components/FormField/InputField';
import { CampaignPackage, Options } from 'models';
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

interface CampaignPackageFormProps {
  initialValue: CampaignPackage;
  onSubmit?: (formValue: CampaignPackage) => void;
  isEdit: boolean;
}

export default function CampaignPackageForm({
  initialValue,
  onSubmit,
  isEdit,
}: CampaignPackageFormProps) {
  const { t } = useTranslation();
  // schema
  const schema = yup.object().shape({
    name: yup.string().required(t('team.errorName')),
    price: yup
      .number()
      .typeError(t('common.isRequired'))
      .moreThan(-1, t('common.isNumberPositive'))
      .required(t('common.isRequired')),
    quantity: yup
      .number()
      .typeError(t('common.isRequired'))
      .moreThan(-1, t('common.isNumberPositive'))
      .required(t('common.isRequired')),
    dateRange: yup.array().of(yup.date().required()).required(t('common.isRequiredOptions')),
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
  const handelFormSubmit = (formValues: CampaignPackage) => {
    if (onSubmit) onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit(handelFormSubmit)}>
      <Stack spacing={3}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom marginBottom={2}>
            {t('pages.package.info')}
          </Typography>
          <Stack spacing={3}>
            <InputField name="name" label={`${t('pages.package.name')}*`} control={control} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
              <InputFieldNumberFormat
                name="price"
                label={`${t('pages.package.totalPrice')}*`}
                control={control}
                disabled={false}
                suffix="vnd"
              />
              <InputFieldNumberFormat
                name="quantity"
                label={`${t('pages.package.quantity')}*`}
                control={control}
                disabled={false}
                suffix={t('pages.package.package')}
              />
            </Stack>
            <Box mt={2}>
              <SelectField
                name="campaignId"
                label={`${t('pages.campaign.name')}*`}
                control={control}
                options={campaignOptions as Options[]}
                size="medium"
              />
            </Box>
            <DateRangePickerField
              control={control}
              labelEndDay={`${t('pages.campaign.endDay')}*`}
              labelStartDay={`${t('pages.campaign.startDay')}*`}
              name="dateRange"
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

        {/* <LoadingButton
          disabled={!isDirty}
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          loading={isSubmitting}
        >
          {isEdit ? t('common.btnUpdate') : t('common.btnSubmit')}
        </LoadingButton> */}
      </Stack>
    </form>
  );
}
