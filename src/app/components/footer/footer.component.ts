import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../@core/services/user.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  userId: number;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe((res) => {
      this.userId = res.id;
    });
  }

  goTo(route: string): void {
    this.router.navigate([route]);
  }
}
