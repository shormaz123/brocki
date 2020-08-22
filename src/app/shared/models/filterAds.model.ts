export interface FilterAds {
  region: string;
  fromPrice?: number;
  toPrice?: number;
  fixedPrice?: boolean;
  hasImage: boolean;
  freeDelivery: boolean;
  productWarranty: boolean;
  urgentSales?: boolean;
  adsGroupId: any;
  subCategory: number;
}
