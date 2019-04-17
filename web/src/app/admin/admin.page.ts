import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, Storage } from './../services/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.storageService.removeItem(Storage.CURRENT_USER);
    this.router.navigateByUrl('/login');
  }

  goTo(path: string) {
    this.router.navigateByUrl(`${path}`);
  }
}
