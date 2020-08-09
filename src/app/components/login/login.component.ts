import { Component, OnInit } from "@angular/core";
import { AuthConst } from "../../@core/consts/auth.const";
import { AuthService } from "../../@core/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { HelpersService } from "../../@core/services/helpers.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  password: string;
  email: string;
  values: any;
  errorBoolean: boolean;
  errorMessage: string;
  userId;

  private loginName: Subscription;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private helpers: HelpersService
  ) {}

  ngOnInit() {
    this.errorBoolean = false;
  }

  //getValuesTest

  submitForm(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response) {
          localStorage.setItem(AuthConst.roleName, response.roleName);
          localStorage.setItem(AuthConst.token, response.token);
          console.log(response);
          this.helpers.$loginName.next(response.token);
        }
        this.router.navigate(["/site"]);
      },
      (error) => {
        this.errorBoolean = true;
        this.errorMessage = "User not found!";
        console.log(this.errorMessage);
      }
    );
  }
}
