import { DateRange } from '@mui/lab';
import { PaginationRequest } from 'models';

export interface Stage {
  id: number;
  campaignId: number;
  startTime: Date;
  endTime: Date;
  stageName: string;
  percents: number;
  description: string;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
  status: number;
  dateRange: DateRange<Date>;
}
export interface StagePagingRequest extends PaginationRequest {
  campaignId?: number;
}
