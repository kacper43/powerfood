import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adress-autocomplete',
  templateUrl: './adress-autocomplete.component.html',
  styleUrls: ['./adress-autocomplete.component.css']
})
export class AdressAutocompleteComponent implements OnInit {

  pizzeriaLocation = {
    lat: '50.068296',
    lng: '19.9381723'
  };

  location: any;
  address = {
    lat: '',
    lng: ''
  };

  distance: any;

  options = {
    componentRestrictions : {
      country: ['PL']
    }
  };

  constructor() { }

  ngOnInit() {
  }

  public handleAddressChange(address: any) {
    /*
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < address.address_components.length; i++) {
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < address.address_components[i].types.length; j++) {
        if (address.address_components[i].types[j] == 'postal_code') {
          this.formattedAddress = address.address_components[i].long_name;

        }
      }
    }
  */
    this.location = address.geometry.location + '';
    this.location = this.location.split(', ');
    this.address.lat = this.location[0].substr(1);
    this.address.lng = this.location[1].substr(0, this.location[1].length - 1);
    console.log(this.address);
    this.calculateDistance(this.pizzeriaLocation.lat, this.pizzeriaLocation.lng, this.address.lat, this.address.lng);

  }

  calculateDistance(pizzeriaLat, pizzeriaLng, addressLat, addressLng) {
    const p = Math.PI / 180;
    const a = 0.5 - Math.cos((addressLat - pizzeriaLat) * p) / 2 +
            Math.cos(pizzeriaLat * p) * Math.cos(addressLat * p) * (1 - Math.cos((addressLng - pizzeriaLng) * p)) / 2;
    this.distance = 12742 * Math.asin(Math.sqrt(a));
    this.distance = this.distance.toFixed(2);
  }
}
