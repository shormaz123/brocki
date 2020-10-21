import {Tags} from '../../shared/models/tags.model';

export class Ads {
  id: number;
  productName: string;
  description: string;
  price: number;
  image: string[];
  status: string;
  userId: number;
  adsSubGroupId: number;
  adsGroupId: number;
  adsDate: string;
  favourite: boolean;
  soldDate: string;
  adsLocation: string;
  visibleAds: true;
  tags:Array<Tags>;
}
