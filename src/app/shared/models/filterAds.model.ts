export interface FilterAds {
  fromPrice?: number;
  toPrice?: number;
  fixedPrice?: boolean;
  hasImage: boolean;
  location: string;
  // freeDelivery: boolean;
  // productWarranty: boolean;
  // urgentSales?: boolean;
  adsGroupId: any;
  subCategory: number;
  pageNumber: number;
  pageSize: number;
}
