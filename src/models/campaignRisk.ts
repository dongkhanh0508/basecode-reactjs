export interface CampaignRisk {
  campaignId: number;
  riskId: number;
  risk: Risk;
}

export interface Risk {
  id: number;
  name: string;
  riskType: string;
  createBy: number;
  createAt: Date;
  description: string;
  status: number;
}
