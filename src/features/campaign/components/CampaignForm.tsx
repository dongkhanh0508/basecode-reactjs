import { yupResolver } from '@hookform/resolvers/yup';
import arrowCircleLeftOutline from '@iconify/icons-eva/arrow-circle-left-outline';
import saveFill from '@iconify/icons-eva/save-fill';
import { Icon } from '@iconify/react';
import { Box, Button, Card, FormHelperText, Grid, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from 'app/hooks';
import InputAreaField from 'components/FormField/InputAreaField';
import InputField from 'components/FormField/InputField';
import RadioGroupField from 'components/FormField/RadioGroupField';
import UploadAvatar from 'components/UploadAvatar';
import { Campaign } from 'models';
import { useCallback, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { fData } from 'utils/formatNumber';
import * as yup from 'yup';
import InputFieldNumberFormat from 'components/FormField/InputFieldNumberFormat';
import DateRangePickerField from 'components/FormField/DateRangePicker';

interface CampaignFormProps {
  initialValue: Campaign;
  onSubmit?: (formValue: Campaign) => void;
  isEdit: boolean;
  isView: boolean;
}
export default function CampaignForm({
  initialValue,
  onSubmit,
  isEdit,
  isView,
}: CampaignFormProps) {
  const { t } = useTranslation();
  // schema
  const schema = yup.object().shape({
    name: yup.string().required(t('common.isRequired')),
    minTarget: yup
      .number()
      .typeError(t('common.isRequired'))
      .moreThan(-1, t('common.isNumberPositive'))
      .required(t('common.isRequired')),
    maxTarget: yup
      .number()
      .typeError(t('common.isRequired'))
      .moreThan(-1, t('common.isNumberPositive'))
      .required(t('common.isRequired')),
    investmentMultiple: yup
      .number()
      .typeError(t('common.isRequired'))
      .moreThan(-1, t('common.isNumberPositive'))
      .required(t('common.isRequired')),
    dateRange: yup.array().of(yup.date().required()).required(t('common.isRequiredOptions')),
    previewImage: yup.mixed().required(t('common.isRequired')),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<any>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });
  const { isDirty } = useFormState({ control });
  const navigate = useNavigate();
  const [image, setImage] = useState<any>();
  const [imagePost, setImagePost] = useState<any>();
  const handelFormSubmit = (formValues: Campaign) => {
    formValues.ImageFile = imagePost;
    if (onSubmit) onSubmit(formValues);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'previewImage',
          {
            ...file,
            preview: URL.createObjectURL(file),
          },
          {
            shouldDirty: true,
          }
        );
      }
      try {
        setImage({ ...file, preview: URL.createObjectURL(file) });
        setImagePost(file);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    },
    [setValue]
  );

  return (
    <form onSubmit={handleSubmit(handelFormSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 3, px: 3 }}>
            <Typography variant="h6" gutterBottom marginBottom={4}>
              {t('common.image')}
            </Typography>
            <Box sx={{ mb: 5 }}>
              <UploadAvatar
                disabled={isView}
                accept="image/*"
                file={image !== undefined ? image : initialValue.imageUrl}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(errors.ImageFile?.message)}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    {t('common.allowImage')} *.jpeg, *.jpg, *.png, *.gif
                    <br /> {t('common.maxSize')} {fData(3145728)}
                  </Typography>
                }
              />
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {errors.ImageFile?.message}
              </FormHelperText>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom marginBottom={2}>
              {t('pages.campaign.info')}
            </Typography>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                <InputField
                  name="name"
                  label={`${t('pages.campaign.name')}*`}
                  control={control}
                  disabled={isView}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                <InputFieldNumberFormat
                  name="investmentMultiple"
                  label={`${t('pages.campaign.investmentCoefficient')}*`}
                  control={control}
                  disabled={isView}
                  suffix="X"
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                <InputFieldNumberFormat
                  name="minTarget"
                  label={`${t('pages.campaign.minTarget')}*`}
                  control={control}
                  disabled={isView}
                  suffix="vnd"
                />
                <InputFieldNumberFormat
                  name="maxTarget"
                  label={`${t('pages.campaign.maxTarget')}*`}
                  control={control}
                  disabled={isView}
                  suffix="vnd"
                />
              </Stack>

              <DateRangePickerField
                control={control}
                labelEndDay={`${t('pages.campaign.endDay')}*`}
                labelStartDay={`${t('pages.campaign.startDay')}*`}
                name="dateRange"
              />
              <InputAreaField
                name="description"
                label={`${t('common.description')}*`}
                control={control}
                disabled={isView}
                row={4}
              />
              {!isView && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
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
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}
