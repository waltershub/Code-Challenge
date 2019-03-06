import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/EvilIcons';
import googleAPIKey from '../../config';

const GooglePlacesInput = ({ goToDetail }) => {
  return (
    <GooglePlacesAutocomplete
      ref={instance => {
        this.GooglePlacesRef = instance;
      }}
      placeholder="Search"
      minLength={2} // minimum length of text to search
      autoFocus
      styles={{
        textInputContainer: {
          backgroundColor: '#FFF',
          borderTopWidth: 0,
          height: verticalScale(80),
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingTop: verticalScale(20),
          paddingHorizontal: scale(20),
        },
        textInput: {
          backgroundColor: '#d3d3d3',
          color: '#696969',
          height: verticalScale(30),
          borderRadius: moderateScale(10),
          fontSize: moderateScale(15),
        },
      }}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
        console.log(data, details);
        goToDetail({ data, details });
      }}
      getDefaultValue={() => ''}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: googleAPIKey,
        language: 'en', // language of the results
      }}
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: 'food',
        componentRestrictions: { locality: 'Louisville' },
      }}
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      renderLeftButton={() => <Icon name="search" size={30} color="#8E8E93" />}
      renderRightButton={() => (
        <TouchableOpacity
          onPress={() => this.GooglePlacesRef.setAddressText('')}
          style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#007AFF', fontSize: moderateScale(14) }}>cancel</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default GooglePlacesInput;

const styles = {
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: '#C9C9CE',
    height: 44,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',

    flexDirection: 'row',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
    flex: 1,
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  powered: {},
  listView: {},
  row: {
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    backgroundColor: '#c8c7cc',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  androidLoader: {
    marginRight: -15,
  },
};
