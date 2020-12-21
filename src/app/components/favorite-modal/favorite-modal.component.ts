import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HelpersService } from 'app/@core/services/helpers.service';
import { Ads } from 'app/shared/models/ads.model';

@Component({
  selector: 'app-favorite-modal',
  templateUrl: './favorite-modal.component.html',
  styleUrls: ['./favorite-modal.component.scss'],
})
export class FavoriteModalComponent implements OnInit {
  @Output() close = new EventEmitter();
  favorites: any = [];
  emptyInput: string | undefined;
  list = true;

  constructor(private HelpersService: HelpersService, private route: Router) {}

  ngOnInit() {}

  closeModal(): void {
    this.close.emit();
  }

  create(favoriteList: string): void {
    this.emptyInput = '';
    this.list = false;
    this.HelpersService.getFavorites(favoriteList);
    this.route.navigate(['/favorite']);
  }
}
