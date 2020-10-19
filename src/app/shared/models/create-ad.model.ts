import {Tags} from '../../shared/models/tags.model';

export class CreateAd {
  adsGroupId: number;
  adsSubGroupId: number;
  description: string;
  id: number;
  image: string[];
  price: number;
  productName: string;
  userId: number;
  visibleAds: boolean;
  tags:Array<Tags>;
}
