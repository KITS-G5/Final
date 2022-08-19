
import { GoogleComponent } from 'react-google-location'
//...
import React, { Component } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


const API_KEY = "AIzaSyBz2UzmnHIJgJyGJbZ6kmtR9Kzd1p7K8uU";  // how to get key - step are below

const GooglePlacesInput = () => {
  return (
      <>
          return (
          <GooglePlacesAutocomplete
              placeholder='Search'
              onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(data, details);
              }}
              query={{
                  key: API_KEY,
                  language: 'en',
              }}
          />
          );
      </>
  )

};



export default GooglePlacesInput;
