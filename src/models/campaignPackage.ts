import { DateRange } from '@mui/lab';

export interface CampaignPackage {
  id: number;
  campaignId: number;
  price: number;
  quantity: number;
  maxQuantity: number;
  name: string;
  reward: string;
  startDate: Date;
  endDate: Date;
  status: string;
  createAt: Date;
  createBy: string;
  dateRange: DateRange<Date>;
}
