import { DateRange } from '@mui/lab/DateRangePicker/RangeTypes';
import { CampaignPackage } from 'models';
import { Stage } from './stage';
import { CampaignRisk } from './campaignRisk';

export interface Campaign {
  id: number;
  name: string;
  maxTarget: number;
  minTarget: number;
  kickoffDate: Date;
  maturity: number;
  endDate: Date;
  investmentMultiple: number;
  status: number;
  businessId: number;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
  description: string;
  rejectReason: string;
  imageUrl: string;
  ImageFile: any;
  previewImage: any;
  dateRange: DateRange<Date>;
  campaignRisks: CampaignRisk[];
  campaignPackages: CampaignPackage[];
  campaignStages: Stage[];
}
