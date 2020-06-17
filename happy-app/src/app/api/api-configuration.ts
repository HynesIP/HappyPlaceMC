/* tslint:disable */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})

export class ApiConfiguration {
  constructor(public router: Router ) {}
  rootUrl: string = '/vcdus01'; 
  targetShape: any = [];
  targetData: any = [];
  targetName: string = "";
  sessionInit: boolean = false;
  loading: boolean = false;
  pageviewInit: boolean = false;
  //(this.router.url == "/link")?'/vcd' : (this.router.url == "/workflows")?'/vco' : '/catalog-service';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
