import { Component, OnInit } from '@angular/core';
import { UploadFile, UploadChangeParam } from 'ng-zorro-antd/upload';
import { User } from 'src/app/shared/models/user.model';
import { AuthConst } from 'src/app/@core/consts/auth.const';
import { UserService } from 'src/app/@core/services/user.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-info-bussines',
  templateUrl: './update-info-bussines.component.html',
  styleUrls: ['./update-info-bussines.component.scss']
})
export class UpdateInfoBussinesComponent implements OnInit {
currentUser: User;
newUser: User;
companyImage;




  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  fileList = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfRegions: Array<{ label: string; value: string }> = [
    {label: 'Zurich Region', value: 'Zurich Region'},
    {label: 'Bern Region', value: 'Bern Region'},
    {label: 'Graubünden Region', value: 'Graubünden Region'},
    {label: 'Valais Region', value: 'Valais Region'},
    {label: 'Lucerne Region', value: 'Lucerne Region'},
    {label: 'Geneva Region', value: 'Geneva Region'},
    {label: 'Lake Geneva Region', value: 'Lake Geneva Region'},
    {label: 'Ticino', value: 'Ticino'},
    {label: 'Eastern Switzerland', value: 'Eastern Switzerland'},
    {label: 'Basel', value: 'Basel'},
    {label: 'Aargau Region', value: 'Aargau Region'},
    {label: 'Jura & Three-Lakes', value: 'Jura & Three-Lakes'},
    {label: 'Fribourg Region', value: 'Fribourg Region'},
    {label: 'Principality of Liechtenstein', value: 'Principality of Liechtenstein'},
  ];
  listOfTagOptions = [];


  constructor(private notification: NzNotificationService,
    private userService: UserService,
    private modal: NzModalService,
    private router: Router) { }

  ngOnInit() {
    // this.userService.getUserById(49).subscribe(response => {
    //   this.newUser = response;
    //   console.log(this.newUser)
    // })

    this.userService.getUser().subscribe( response => {
      this.newUser = response;
     console.log(this.newUser)
    })
  }

  getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  handlePreview = async (file: UploadFile) => {
    console.log(file)

      file.preview = await this.getBase64(file.originFileObj!);
      this.newUser.companyImage = file.preview;
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  handleChange(info: UploadChangeParam): void {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        this.newUser.companyImage = file.response.url;
        console.log(this.newUser.companyImage)
      }
      return file;
    });

    this.fileList = fileList;
  }

  setMediaUploadHeaders = (file: UploadFile) => {
    return {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
    }
  };

  onSubmit(){
    const formData = new FormData();

    this.modal.confirm({
      nzTitle:'Are you sure you want to change your info?',
      nzContent: '',
      nzOnOk: () =>
      this.userService.updateUser(this.newUser).subscribe( user =>
        {
          this.notification.success('', 'User updated')
          this.router.navigate(['/site'])
          console.log('User updated')


        },
        error => {
          this.modal.error({
            nzTitle: "Ops, something went wrong!"
          })
        }),

    })
    console.log(this.newUser)
  }

}
