import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private settings: SettingsService, private siderbarService: SidebarService) {

  }

  ngOnInit(): void {
    customInitFunctions();
    this.siderbarService.cargarMenu();
  }

}