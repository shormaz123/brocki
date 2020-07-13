import {
  Component,
  OnInit,
  ErrorHandler,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { CreateAd } from "src/app/shared/models/create-ad.model";
import { AdsService } from "src/app/@core/services/ads.service";
import {
  UploadChangeParam,
  UploadFile,
  UploadXHRArgs,
  NzNotificationService,
} from "ng-zorro-antd";
import {
  HttpHeaders,
  HttpRequest,
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from "@angular/common/http";
import { adsGroup } from "src/app/shared/models/adsGroup.model";
import { adsSubGroup } from "src/app/shared/models/adsSubGroup.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-ad",
  templateUrl: "./create-ad.component.html",
  styleUrls: ["./create-ad.component.scss"],
})
export class CreateAdComponent implements OnInit {
  customReq = (item: UploadXHRArgs) => {
    console.log(JSON.stringify(item));
    const formData = new FormData();
    formData.append("file", item.file as any);

    const req = new HttpRequest("POST", item.action!, formData, {
      reportProgress: true,
      withCredentials: true,
    });
    // Always returns a `Subscription` object. nz-upload would automatically unsubscribe it at correct time.
    return this.http.request(req).subscribe(
      // tslint:disable-next-line no-any
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
        }
      },
      (err) => {
        item.onError!(err, item.file!);
      }
    );
  };

  uploadImageUrl =
    "https://mybrocki-be.herokuapp.com/mybrocki/auth/image/upload";

  fileList: string[] = [];

  used: boolean;
  new: boolean;
  fixedPrice: boolean;
  freeDelivery: boolean;
  productWarranty: boolean;
  urgentSales: boolean;
  adsDate = new Date();
  public newAd = <CreateAd>{};
  errorMessage: string = "Please, complete every field in this form!";
  errorBoolean: boolean;
  mySelect = -1;

  previewImage: string | undefined = "";
  previewVisible = false;
  selectedCategory: number;

  adsGroupName;

  adsGroup: adsGroup[];
  adsSubGroup: adsSubGroup[];

  category: string = null;

  listOfGroups = [
    { label: "Jack", value: "jack" },
    { label: "Lucy", value: "lucy" },
    { label: "disabled", value: "disabled", disabled: true },
  ];
  listOfSubGroups = [];

  constructor(
    private adsService: AdsService,
    private http: HttpClient,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.newButton();
    this.newAd.fixedPrice = false;
    this.newAd.freeDelivery = false;
    this.newAd.productWarrant = false;
    this.newAd.urgentSales = false;
    this.newAd.image = [];
    this.errorBoolean = false;
    this.selectedCategory = 1;
    this.newAd.adsGroupId = null;
    this.newAd.adsSubGroupId = null;

    this.adsService.getAllAdsGroups().subscribe((x) => {
      // this.adsGroup = x;
      // console.log(this.adsGroup);
      // this.getSubGroup(1);
    });
    this.getSubGroup(1);
  }

  onChange(deviceValue) {
    console.log(deviceValue);
    this.getSubGroup(deviceValue);
  }

  getSubGroup(id: number) {
    this.adsService.getAllAdsSubGroup(id).subscribe((x) => {
      // this.adsSubGroup = x;
    });
  }

  usedButton() {
    this.new = false;
    this.used = true;
    this.newAd.adsType = "NEW";
  }

  newButton() {
    this.new = true;
    this.used = false;
    this.newAd.adsType = "USED";
  }

  saveChanges() {
    this.adsService.newAd(this.newAd).subscribe(
      (x) => {
        console.log(this.newAd),
          this.notification.success("", "Ad successfully created!"),
          this.router.navigateByUrl("/site");
      },
      (error) => {
        this.errorBoolean = true;
      }
    );
    console.log(this.newAd);
  }

  public getImagesList(data: any): void {
    this.newAd.image = data;
    console.log(this.newAd.image);
  }
}
