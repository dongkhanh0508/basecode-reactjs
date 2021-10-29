export interface CampaignLocation {
  campaignId: number;
  locationId: number;
  location: Location;
}

export interface Location {
  id: number;
  city: string;
  district: string;
  ward: string;
  address: string;
  status: number;
  businessId: number;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
}
