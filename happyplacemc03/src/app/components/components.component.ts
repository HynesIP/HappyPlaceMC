import { Component, OnInit, Renderer2, OnDestroy, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import * as Rellax from 'rellax';
import {
    IPayPalConfig,
    ICreateOrderRequest 
} from 'ngx-paypal';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `]
})

export class ComponentsComponent implements OnInit, OnDestroy {
    data : Date = new Date();

    page = 4;
    page1 = 5;
    page2 = 3;
    focus;
    focus1;
    focus2;

    date: {year: number, month: number};
    model: NgbDateStruct;

    public isCollapsed = true;
    public isCollapsed1 = true;
    public isCollapsed2 = true;

    state_icon_primary = true;

   
        public payPalConfig?: IPayPalConfig

    constructor( 
        private renderer : Renderer2, 
        config: NgbAccordionConfig
        ) {
        config.closeOthers = true;
        config.type = 'info';

    }
 

    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;



    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }

    ngOnInit() {
      var rellaxHeader = new Rellax('.rellax-header');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('index-page');
        
        this.initConfig();

    }
    showSuccess: boolean;
    showCancel: boolean;
    showError: boolean;
    resetStatus(){}

    private initConfig(): void {
        this.payPalConfig = {
            currency: 'USD',
            clientId: 'AWoynf1N8S6VZs8jiFTRfj6YYNtBpbr0tOhlaw_62GxFxCtWN24iYYW7dtPUHJfWJdVg4DQ-N-NKPuw8',
            createOrderOnClient: (data) => < ICreateOrderRequest > {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: '0.99',
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: '0.99'
                            }
                        }
                    },
                    items: [{
                        name: 'Happy Place Subscription',
                        quantity: '1',
                        category: 'DIGITAL_GOODS',
                        unit_amount: {
                            currency_code: 'USD',
                            value: '0.99',
                        },
                    }]
                }]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then(details => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
                });

            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
                this.showSuccess = true;
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
                this.showCancel = true;

            },
            onError: err => {
                console.log('OnError', err);
                this.showError = true;
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
                this.resetStatus();
            }
        };
    }




    ngOnDestroy(){
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }

    
}
