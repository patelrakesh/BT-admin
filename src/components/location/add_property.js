import React, { Component, Fragment, createRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchOrganizationData,
  fetchPropertyTypesData,
  addPropertyData,
  fetchCityRegionData
} from "../../services/Location";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Input,
  FormGroup
} from "reactstrap";
import Select from "react-select";
import SimpleReactValidator from "simple-react-validator";
import Autocomplete from "react-google-autocomplete";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker
} from "react-google-maps";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDQAwNqjxL0L2-5X8yqNLEfpsZj6Z1B_Is");
Geocode.enableDebug();

class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.autocomplet = React.createRef();
    this.validator = new SimpleReactValidator({
      element: (message, className) => (
        <div className="required_message">{message}</div>
      )
    });
  }
  state = {
    addlocationmodal: false,
    addorganizationmodal: false,
    addpropertymodal: false,
    orgnization: "",
    propertytypedata: "",
    selectedPlace: {},
    label: "",
    country: {},
    address: "",
    city: "",
    area: "",
    state: "",
    postalCode: 0,
    mapPosition: { lat: 18.5204, lng: 73.8567 },
    markerPosition: { lat: 18.5204, lng: 73.8567 },
    center: { lat: 18.5204, lng: 73.8567 },
    cityId: 0,
    messageForOraganization: false,
    messageForPropertyData: false,
  
  };

  componentDidMount = async () => {
    const { fetchOrganizationData, fetchPropertyTypesData } = this.props;
    fetchOrganizationData();
    fetchPropertyTypesData();
    Geocode.fromLatLng(
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then(
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray),
          postalCode = this.getPostalCode(addressArray);

        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
          postalCode: postalCode ? postalCode : 0
        });
        let selectedPlace = {
          cityId: this.state.city.value, //this.getCity(addressArray),
          areaAcres: null, //this.state.area, //this.getArea(addressArray),
          // state: this.getState(addressArray),
          postalCode: this.getPostalCode(addressArray),
          latitude: this.state.mapPosition.lat,
          longitude: this.state.mapPosition.lng,
          address: address
        };
        this.setState({ selectedPlace: selectedPlace });
        // this.props.getSelectedPlace(selectedPlace);
      },
      error => {
        console.error(error);
      }
    );
  };

  onSave = () => {
    if (this.validator.allValid() && this.state.orgnization !== '' && this.state.propertytypedata !== '' ) {
      let selectedPlace = this.state.selectedPlace;
      selectedPlace.cityId = this.state.cityId;
      selectedPlace.entityId = this.state.orgnization.value;
      selectedPlace.propertyType = this.state.propertytypedata.value;
      selectedPlace.label = this.state.label;
      const { addPropertyData } = this.props;
      addPropertyData(selectedPlace);
      this.props.isaddpropertymodal(!this.props.addpropertymodal);
      this.setState({
        messageForOraganization: false,
        messageForPropertyData: false,
      
      });
    }
    else{
        this.state.orgnization === '' && this.setState({ messageForOraganization: true });
        this.state.propertytypedata === '' && this.setState({ messageForPropertyData: true });    
        this.validator.showMessages();
        this.forceUpdate();
      }
  };

  toggle = () => {
    this.props.isaddpropertymodal(!this.props.addpropertymodal);
    this.setState({
      messageForOraganization: false,
      messageForPropertyData: false,
   
    });
  };

  ChngCountry = country => {
    this.setState({ country: country });
    const { fetchCityRegionData } = this.props;
    fetchCityRegionData(country.value);
  };
  onLabelChange = e => {
    this.setState({ label: e.target.value });
    this.validator.showMessageFor("label");
  };
  ChngCity = city => {
    this.setState({ city: city, });
    this.setState({ cityId: city.value });
    Geocode.fromAddress(city.label).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        let pos = {
          lat: lat,
          lng: lng
        };
        this.setState({ markerPosition: pos, mapPosition: pos });
        Geocode.fromLatLng(pos.lat, pos.lng).then(response => {
          const address = response.results[0].formatted_address,
            addressArray = response.results[0].address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray),
            postalCode = this.getPostalCode(addressArray);

          this.setState({
            address: address ? address : "",
            area: area ? area : "",
            city: city ? city : "",
            state: state ? state : "",
            postalCode: postalCode ? postalCode : 0
          });
          let selectedPlace = {
            cityId: city.value, //this.getCity(addressArray),
            areaAcres: null, //this.state.area, //this.getArea(addressArray),
            // state: this.getState(addressArray),
            postalCode: this.getPostalCode(addressArray),
            latitude: pos.lat,
            longitude: pos.lng,
            address: address
          };
          // this.props.getSelectedPlace(selectedPlace);
          this.setState({ selectedPlace: selectedPlace });
        });
      },
      error => {
        console.error(error);
      }
    );
  };

  getState = addressArray => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  getPostalCode = addressArray => {
    let postal_code = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "postal_code" === addressArray[i].types[0]
        ) {
          postal_code = addressArray[i].long_name;
          return postal_code;
        }
      }
    }
  };

  getArea = addressArray => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  getCity = addressArray => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onAddOragChange = orgnization => {
    this.setState({ orgnization });
    this.validator.showMessageFor("orgnization");
  };
  onLabelChange = e => {
    this.setState({ label: e.target.value });
    this.validator.showMessageFor("label");
  };

  onPlaceSelected = place => {
    const address = place.formatted_address,
      place_id = place.place_id,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      postalCode = this.getPostalCode(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.setState({
      address: address ? address : "",
      area: area ? area : "",
      city: city ? city : "",
      state: state ? state : "",
      place_id: place_id ? place_id : "",
      postalCode: postalCode ? postalCode : 0,
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      }
    });
    let selectedPlace = {
      cityId: this.state.city.value, //this.getCity(addressArray),
      areaAcres: null, //this.state.area, //this.getArea(addressArray),
      // state: this.getState(addressArray),
      postalCode: this.getPostalCode(addressArray),
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
      address: address
    };
    // this.props.getSelectedPlace(selectedPlace);
    this.setState({ selectedPlace });
  };

  onMarkerDragEnd = event => {
    // this.setState({ cityData: '' });
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray),
          postalCode = this.getPostalCode(addressArray);
        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
          postalCode: postalCode ? postalCode : 0,
          markerPosition: {
            lat: newLat,
            lng: newLng
          },
          mapPosition: {
            lat: newLat,
            lng: newLng
          }
        });
        let selectedPlace = {
          cityId: this.state.city.value, //this.getCity(addressArray),
          areaAcres: null, //this.state.area, //this.getArea(addressArray),
          // state: this.getState(addressArray),
          postalCode: this.getPostalCode(addressArray),
          latitude: event.latLng.lat(),
          longitude: event.latLng.lng(),
          address: address
        };
        // this.props.getSelectedPlace(selectedPlace);
        this.setState({ selectedPlace });
      },
      error => {
        console.error(error);
      }
    );
  };

  onInfoWindowClose = event => {};

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextState.country === this.state.country) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    const { Location } = this.props.data;
    let orgnizationdata = Location.orgnizationdata.map(function(item) {
      return { value: item.id, label: item.name };
    });
    let propertytypedata = Location.propertytypedata.map(function(item) {
      return { value: item.id, label: item.value };
    });
    let citydata =
      Location.regiondata.length > 0
        ? Location.regiondata.map(function(item) {
            return { value: item.id, label: item.value };
          })
        : [];
    let countrydata = [
      { value: "USA", label: "USA", code: "us" },
      { value: "IND", label: "India", code: "in" },
      { value: "CANADA", label: "Canada", code: "CA" }
    ];
    const AsyncMap = withScriptjs(
      withGoogleMap(props => (
        <Fragment>
          <GoogleMap
            google={this.props.google}
            defaultZoom={15}
            defaultCenter={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng
            }}
          >
            {/* InfoWindow on top of marker */}
            <InfoWindow
              onClose={this.onInfoWindowClose}
              position={{
                lat: this.state.markerPosition.lat + 0.0018,
                lng: this.state.markerPosition.lng
              }}
            >
              <div>
                <span style={{ padding: 0, margin: 0 }}>
                  {this.state.address}
                </span>
              </div>
            </InfoWindow>
            {/*Marker*/}
            <Marker
              google={this.props.google}
              name={"Dolores park"}
              draggable={true}
              onDragEnd={this.onMarkerDragEnd}
              position={{
                lat: this.state.markerPosition.lat,
                lng: this.state.markerPosition.lng
              }}
            />
            <Marker />
            {/* For Auto complete Search Box */}
          </GoogleMap>
        </Fragment>
      ))
    );
    let map;
    // if (this.state.center.lat !== undefined) {
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div>
            <Modal
              isOpen={this.props.addpropertymodal}
              toggle={() => this.toggle()}
              className={this.props.className}
              id="add_property"
            >
              <ModalHeader toggle={() => this.toggle()}>
                Add Property
              </ModalHeader>
              <ModalBody style={{ overflow: "auto" }}>
                <p>
                  <a href="#">Add Property </a> / New Property
                </p>
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="organization">Organization*</Label>
                        <Select
                          value={this.state.orgnization}
                          options={orgnizationdata}
                          onChange={orgnization =>
                            this.setState({
                              orgnization: orgnization,
                              messageForOraganization: false
                            })
                          }
                          onBlur={() =>
                            this.state.orgnization === ""
                              ? this.setState({ messageForOraganization: true })
                              : this.setState({
                                  messageForOraganization: false
                                })
                          }
                          placeholder="Select organization"
                        />
                        {this.state.messageForOraganization && (
                          <p className="required_message">Oraganization is required.</p>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="label">Label*</Label>
                        <Input
                          type="text"
                          id="label"
                          placeholder="label"
                          onChange={e => this.onLabelChange(e)}
                          onBlurCapture={e => this.onLabelChange(e)}
                        />

                        {this.validator.message(
                          "label",
                          this.state.label,
                          "required"
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="type">Type*</Label>
                        <Select
                          value={this.state.propertytypedata}
                          onChange={propertytypedata =>
                            this.setState({ propertytypedata, messageForPropertyData: false})

                          }
                          onBlur={() =>
                            this.state.propertytypedata === ""
                              ? this.setState({ messageForPropertyData: true })
                              : this.setState({
                                  messageForPropertyData: false
                                })
                          }
                          options={propertytypedata}
                          placeholder="Select Type"
                        />
                        {this.state.messageForPropertyData && (
                          <p className="required_message">Type is required.</p>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="country">Country</Label>
                        <Select
                          value={this.state.country}
                          onChange={country => this.ChngCountry(country)}
                          options={countrydata}
                          placeholder="country"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="city">City</Label>
                        <Select
                          value={this.state.city}
                          onChange={city => this.ChngCity(city)}
                          options={citydata}
                          placeholder="Select City"
                        />
                        {/* {this.state.messageForCountryData && (
                          <p className="required_message">
                            Country is required.
                          </p>
                        )} */}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="search">Search Location For Property</Label>
                        <Autocomplete
                          style={{
                            width: "100%",
                            height: "40px",
                            paddingLeft: "16px",
                            marginTop: "2px"
                          }}
                          className="form-control"
                          onPlaceSelected={this.onPlaceSelected}
                          types={["(regions)"]}
                          placeholder="Enter a Location For Property"
                          componentRestrictions={{
                            country:
                              this.state.country.code !== undefined &&
                              this.state.country.code
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="type">Area</Label>
                        <Input
                          type="text"
                          name="area"
                          placeholder="area"
                          className="form-control"
                          onChange={e =>
                            this.setState({ area: e.target.value })
                          }
                          value={this.state.area}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="type">Address</Label>
                        <Input
                          type="text"
                          name="address"
                          placeholder="address"
                          className="form-control"
                          onChange={this.onChange}
                          readOnly="readOnly"
                          value={this.state.address}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="type">Postal Code</Label>
                        <Input
                          type="text"
                          name="postalCode"
                          placeholder="postal code"
                          className="form-control"
                          onChange={this.onChange}
                          readOnly="readOnly"
                          value={this.state.postalCode}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <AsyncMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDQAwNqjxL0L2-5X8yqNLEfpsZj6Z1B_Is&libraries=places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: "100%" }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                      />
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="light" onClick={() => this.toggle()}>
                  Cancel
                </Button>
                <Button color="dark" onClick={() => this.onSave()}>
                  Save
                </Button>{" "}
              </ModalFooter>
            </Modal>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
      // } else {
      // map = <div style={{ height: '100%' }} />
      // }
    );
    // return (map)
  }
}
const mapStateToProps = state => ({
  data: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOrganizationData: fetchOrganizationData,
      fetchPropertyTypesData: fetchPropertyTypesData,
      addPropertyData: addPropertyData,
      fetchCityRegionData: fetchCityRegionData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddProperty);
