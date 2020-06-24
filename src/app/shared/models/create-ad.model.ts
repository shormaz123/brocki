export interface CreateAd {

  adsType: string,
  adsGroupId: number,
  adsSubGroupId: number,
  description: string,
  id: number,
  image: string[],
  price: number,
  productName: string,
  userId: number,
  visibleAds: boolean,
  fixedPrice: boolean,
  freeDelivery: boolean,
  productWarrant: boolean,
  urgentSales: boolean

}
