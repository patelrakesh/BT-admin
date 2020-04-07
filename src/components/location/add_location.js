/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchOrganizationData,
  fetchLocationTypesData,
  addLocation,
  fetchPropertyData
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
import AddOrganization from "./add_organization";
import AddProperty from "./add_property";
import BusinessHours from "./business_hours";
import Select from "react-select";
import SimpleReactValidator from "simple-react-validator";
import Notification from "../../library/notification";
class AddLocation extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.validator = new SimpleReactValidator({
      element: (message, className) => (
        <div className="required_message">{message}</div>
      )
    });
  }
  state = {
    addorgmodal: false,
    addpropertymodal: false,
    nextmodal: false,
    addnextmodal: false,
    business_hours: [],
    organization: "",
    property: "",
    locationtype: "",
    label: "",
    firststepData: [],
    nextclick: false,
    page: "",
    close:false,
    messageForOraganization: false,
    messageForProperty:false,
    messageForLocationType:false

    
  };
  componentDidMount = async () => {
    const { fetchOrganizationData, fetchLocationTypesData } = this.props;
    fetchOrganizationData();
    fetchLocationTypesData();
    this.validator.hideMessageFor('label');
    this.validator.hideMessages();
  };
  toggle = () => {
    this.props.isaddlocatiionmodal();
    this.setState({
      organization: "",
      property: "",
      locationtype: "",
      label: "",
      messageForOraganization:false,
      messageForProperty:false,
      messageForLocationType:false

    });
    this.validator.hideMessageFor('label');
    this.validator.hideMessages();
    this.forceUpdate();
  };

  isaddpropertymodal = val => {
    this.setState({ addpropertymodal: val });
    if(val === false) {
      this.props.isLocationOpenmodal();
    }
  };

  isaddorgmodal = val => {
    this.setState({ addorgmodal: val });
    if(val === false) {
      this.props.isLocationOpenmodal();
    }
  };
  isaddnextmodal = () => {
    this.setState({ addnextmodal: !this.state.addnextmodal });
    this.setState({ nextmodal: !this.state.nextmodal });
    this.props.isaddlocatiionmodal();
  };
  isaddmodacancle = () => {
    this.setState({ nextmodal: !this.state.nextmodal });
    this.setState({ addnextmodal: !this.state.addnextmodal });
  };
  isclosemodals = () => {
    this.setState({ addnextmodal: !this.state.addnextmodal });
    this.setState({ nextmodal: !this.state.nextmodal });
  };
  onLabelChange = e => {
    this.setState({ label: e.target.value });
    this.validator.showMessageFor("label");
  };
  next = () => {
    this.validator.showMessageFor("organization");
    this.validator.showMessageFor("property");
    this.validator.showMessageFor("locationtype");
    this.validator.showMessageFor("label");
    this.validator.showMessageFor("Zone");
    this.validator.showMessageFor("AggregationId");
    if (this.validator.allValid() && this.state.organization !== '' && this.state.property !== ''  && this.state.locationtype !== '') {
      this.setState({ nextmodal: !this.state.nextmodal });
      this.setState({ addnextmodal: !this.state.addnextmodal });
      this.props.isaddlocatiionmodal();
      let data = {
        entities: {
          id: this.state.organization.value
        },
        propertyId: this.state.property.value,
        label: this.state.label,
        locationType: this.state.locationtype.value,
        locationBusinessHoursList: []
      };
      this.setState({ firststepData: data });
    }else{
      this.state.organization === '' && this.setState({ messageForOraganization: true });
      this.state.property === '' && this.setState({ messageForProperty: true });
      this.state.locationtype === '' && this.setState({ messageForLocationType: true });
      this.validator.showMessages();
      this.forceUpdate();
    }
    
    this.setState({ nextclick: true });
    this.props.shownoti("");
  };
  business_hours = val => {
    this.setState({ business_hours: val });
    let firststepData = this.state.firststepData;
    firststepData.locationBusinessHoursList = val;
    const { addLocation } = this.props;
    addLocation(firststepData);
    this.setState({
      organization: "",
      property: "",
      locationtype: "",
      label: "",
      nextclick: false,
      messageForOraganization:false,
      messageForProperty:false,
      messageForLocationType:false
    });
    this.props.shownoti("addlocation");
    this.validator.hideMessageFor('label');
    this.validator.hideMessages();
  };
  onChngOrg = organization => {
    const { fetchPropertyData } = this.props;
    this.setState({ organization, property: "", messageForOraganization: false });
    fetchPropertyData(organization.value);
    this.setState({ organization });
    this.validator.showMessageFor("organization");
    // this.props.changeOrg(organization.value);
  };
  onOraganizationModal = () => {
    this.props.isaddlocatiionmodal();
    this.setState({ addorgmodal: !this.state.addorgmodal });
    this.setState({
      close: false
    });
  };
  onPropertyModal = () => {
    this.props.isaddlocatiionmodal();
    this.setState({ addpropertymodal: !this.state.addpropertymodal })
    //  this.props.isaddlocatiionmodal();
  };
  render() {
    const { Location, Status } = this.props.data;
    let orgnizationdata = Location.orgnizationdata.map(function(item) {
      return { value: item.id, label: item.name };
    });
    let propertydata = Location.propertydata.map(function(item) {
      return { value: item.id, label: item.value };
    });
    let locationdata = Location.locationtypedata.map(function(item) {
      return { value: item.id, label: item.value };
    });

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
            {Status.status !== "" &&
              Status.page === "addlocation" &&
              this.props.notitype === "addlocation" && (
                <Fragment>
                  <Notification
                    msg={Status.notificationMsg}
                    status={Status.status}
                    show={this.props.addlocationmodal}
                  />
                </Fragment>
              )}
            <Modal
              isOpen={this.props.addlocationmodal}
              toggle={() => this.toggle()}
              className={this.props.className}
              id="add_location"
            >
              <ModalHeader toggle={() => this.toggle()}>
                Add Location
              </ModalHeader>
              <ModalBody>
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="organization">Organization *</Label>
                        <Select
                          value={this.state.organization}
                      
                          onChange={organization =>
                            this.onChngOrg(organization)
                          }
                          onBlur={() => this.state.organization === '' ? this.setState({messageForOraganization: true}) : this.setState({messageForOraganization: false})}                         
                          options={orgnizationdata}
                          placeholder="Select Organization"
                        />
                       
                        <a
                          style={{ cursor: "pointer" }} show={this.state.close}
                          onClick={() => this.onOraganizationModal()}
                        >
                          <i className="pe-7s-plus"> </i> Add New Organization
                        </a>
                        {this.state.messageForOraganization && <p className="required_message">organization is required.</p>}
                      </FormGroup>
                    </Col>
                   
                    <Col md="6">
                      <FormGroup>
                        <Label for="property">Property *</Label>
                        <Select
                          value={this.state.property}
                       
                          onChange={property => this.setState({ property: property, messageForProperty: false })}
                          onBlur={() => this.state.property === '' ? this.setState({messageForProperty: true}) : this.setState({messageForProperty: false})}
                          options={propertydata}
                          placeholder="Select property"
                        />
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => this.onPropertyModal()}
                        >
                          <i className="pe-7s-plus"> </i> Add New Property
                        </a>
                        {this.state.messageForProperty && <p className="required_message">Property is required.</p>}
                      </FormGroup>
                    </Col>
                   
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="location_types">Location Type*</Label>
                        <Select
                          value={this.state.locationtype}
                         
                          onChange={locationtype => this.setState({ locationtype: locationtype, messageForLocationType: false })}
                          onBlur={() => this.state.locationtype === '' ? this.setState({messageForLocationType: true}) : this.setState({messageForLocationType: false})}
                          options={locationdata}
                          placeholder="Select Location Type"
                        />
                          {this.state.messageForLocationType && <p className="required_message">Locationtype is required.</p>}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="label">Label *</Label>
                        <Input
                          type="text"
                          id="label"
                          placeholder="label"
                          value={this.state.label}
                          className="form-control"
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
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="light" onClick={() => this.toggle()}>
                  Cancel
                </Button>
                <Button color="success" onClick={() => this.next()}>
                  Next
                </Button>{" "}
              </ModalFooter>
            </Modal>
            {this.state.addpropertymodal && (
                      <AddProperty
                        requiredMessage={this.props.requiredMessage}
                        addpropertymodal={this.state.addpropertymodal}
                        isaddpropertymodal={this.isaddpropertymodal}
                      />
                    )}
            {this.state.addorgmodal && (
                      <AddOrganization
                        requiredMessage={this.props.requiredMessage}
                        addorgmodal={this.state.addorgmodal}
                        isaddorgmodal={this.isaddorgmodal}
                      />
                    )}

            {this.state.nextmodal && (
              <BusinessHours
                requiredMessage={this.props.requiredMessage}
                addnextmodal={this.state.addnextmodal}
                isaddnextmodal={this.isaddnextmodal}
                isclosemodals={this.isclosemodals}
                business_hours={this.business_hours}
                isaddmodacancle={this.isaddmodacancle}
              />
            )}
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // fetchLocationItemData: fetchLocationItemData,
      fetchOrganizationData: fetchOrganizationData,
      fetchLocationTypesData: fetchLocationTypesData,
      addLocation: addLocation,
      fetchPropertyData: fetchPropertyData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddLocation);
