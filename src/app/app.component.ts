

import { Component, OnInit } from '@angular/core';
import {  isEnabled, enableLocationRequest, getCurrentLocation } from '@nativescript/geolocation';
import { openUrl } from '@nativescript/core/utils';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.checkLocationEnabled();
  }

  // Check if location services are enabled
  async checkLocationEnabled() {
    const isLocationEnabled = await isEnabled();
    if (!isLocationEnabled) {
      // Request to enable location services
      await enableLocationRequest();
    }
  }

  // Get the current location and open Google Maps with the path
  getDirectionsToDestination(destinationLat: number,destinationLng: number) {
    getCurrentLocation({ timeout: 5000 })
      .then((location) => {
        const currentLat = location.latitude;
        const currentLng = location.longitude;

        // Construct the Google Maps URL
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;

        // Open Google Maps
        openUrl(googleMapsUrl);
      })
      .catch((error) => {
        console.error('Error getting location', error);
      });
  }
}
