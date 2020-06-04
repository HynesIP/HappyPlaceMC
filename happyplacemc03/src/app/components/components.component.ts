import { Component, OnInit, Renderer2, OnDestroy, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import * as Rellax from 'rellax';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { 
    Element as StripeElement,
    ElementOptions,
    ElementsOptions,
    StripeService,
    LazyStripeAPILoader,
    DocumentRef,
    PlatformService,

} from "@nomadreservations/ngx-stripe";
import { StripeCheckout, OnetimeCheckoutOptions, RecurringCheckoutOptions } from 'ngx-stripe-checkout';



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
    

    stripeKey = '';
    error: any;
    complete = false;
    element: StripeElement;
    
    cardOptions: ElementOptions = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: '#276fd3',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                    color: '#CFD7E0'
                }
            },
            invalid: {
              iconColor: '#FFC7EE',
              color: '#FFC7EE',
            }
        }
    };
  
    elementsOptions: ElementsOptions = {
      locale: 'en'
    };

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


    constructor( 
        private renderer : Renderer2, 
        config: NgbAccordionConfig,
        private _stripe: StripeService,
        public stripe: StripeCheckout
        ) {
        config.closeOthers = true;
        config.type = 'info';

        this.stripe.initializeStripe(`pk_test_gEBsCSok1NfVPeBLfBRQCtPz00KQpcBsbt`)
            .then((res) => console.log(res))	// Stripe Initialized
            .catch((err) => console.log(err));	// Error message
        
    }
 
    cardUpdated(result) {
        this.element = result.element;
        this.complete = result.card.complete;
        this.error = undefined;
    }

  keyUpdated() {
    this._stripe.changeKey(this.stripeKey);
  }

  getCardToken() {

    var checkoutOptions: RecurringCheckoutOptions = {
        items: [{
          plan: "price_1Gq4dEBgmwEPLtY9FKbHOGIE",
          quantity: 1
        }],
        successUrl: 'https://me.happyplacemc.com/payment/success',
        cancelUrl: 'https://me.happyplacemc.com/payment/failure'
      }
      this.stripe.openRecurringCheckout(checkoutOptions);

    /*
    this._stripe.createToken(this.element, {
      name: 'tested_ca',
      address_line1: '123 A Place',
      address_line2: 'Suite 100',
      address_city: 'Irving',
      address_state: 'BC',
      address_zip: 'VOE 1H0',
      address_country: 'CA'
    }).subscribe(result => {
      // Pass token to service for purchase.
      console.log(result);
    });
    */
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
        

    }
    showSuccess: boolean;
    showCancel: boolean;
    showError: boolean;
    resetStatus(){}


       




    ngOnDestroy(){
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }

    
}
