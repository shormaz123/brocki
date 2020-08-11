import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { AdsService } from '../@core/services/ads.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  @Output() onImagePicked: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;

  files = [];
  pending: boolean = false;
  status: string = 'init';
  imagesList = [];
  imagePreview;
  imagesPreview = [];
  spinner: boolean;

  constructor(private imageService: AdsService) {}

  ngOnInit() {}

  public pickImages() {
    this.onImagePicked.emit(this.imagesList);
  }

  uploadFile(formData) {
    this.imageService.uploadImageInStorage(formData).subscribe((response) => {
      this.imagesList = [...this.imagesList, ...response];
      this.pickImages();
    });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;

    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        const formData = new FormData();
        formData.append('file', file);
        this.uploadFile(formData);
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      // this.uploadFiles();
    };
    fileUpload.click();
  }
}
