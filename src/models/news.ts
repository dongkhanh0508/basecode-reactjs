export interface News {
  id: number;
  title: string;
  campaignId: number;
  content: string;
  status: number;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
}
