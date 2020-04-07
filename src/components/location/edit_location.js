/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchLocationItemData,
  fetchOrganizationData,
  fetchLocationTypesData,
  fetchPropertyData,
  updatedLocationData
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
import AddProperty from "./add_property";
import EditBusinessHours from "./edit_business_hours";
import Select from "react-select";
import SimpleReactValidator from "simple-react-validator";
import Notification from "../../library/notification";
var diff = require("deep-diff").diff;

class EditLocation extends Component {
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
    editlocationmodal: false,
    editorgmodal: false,
    editpropertymodal: false,
    nextmodal: false,
    editnextmodal: false,
    organization: "",
    property: "",
    locationtype: "",
    label: "",
    firststepData: [],
    nextclick: false,
    errorClass: "is-invalid",
    getEditBusiness: [],
    business_hours: [],
    editid: 0,
    entityReference: "",
    propertyName: "",
    getEditData: {},
    getEdittedData: {},
    propertydatalist: []
  };

  componentWillReceiveProps = async props => {
    props.getEditData &&
      props.getEditData.id !== this.state.editid &&
      (await this.setState({
        getEditBusiness: props.getEditData,
        organization: props.getEditData.entityId && {
          value: props.getEditData.entityId,
          label: props.getEditData.entityReference
        },
        property: props.getEditData.property && {
          value: props.getEditData.propertyId,
          label: props.getEditData.property
        },
        locationtype: props.getEditData.locationType && {
          value: props.getEditData.locationType.id,
          label: props.getEditData.locationType.value
        },
        label: props.getEditData.floor,
        editid: props.geteditid,
        entityReference: props.getEditData.entityReference,
        propertyName: props.getEditData.property,
        propertydatalist:
          props.getEditData.propertydatalist &&
          props.getEditData.propertydatalist
      }));

    const getEditData = {
      id: this.props.geteditid,
      entities: this.props.getEditData.entityId && {
        id: this.props.getEditData.entityId
      },
      propertyId:
        this.props.getEditData.property && this.props.getEditData.propertyId,
      floor: this.props.getEditData.floor,
      locationType:
        this.props.getEditData.locationType &&
        this.props.getEditData.locationType.id,
      locationBusinessHoursList: this.props.getEditData
        .locationBusinessHoursList
    };
    this.setState({ getEditData });
  };

  componentDidMount = async () => {
    const {
      fetchLocationItemData,
      fetchOrganizationData,
      fetchLocationTypesData,
      fetchPropertyData
    } = this.props;
    fetchLocationItemData();
    fetchOrganizationData();
    fetchLocationTypesData();
  };
  toggle = () => {
    this.props.iseditlocatiionmodal();
  };
  iseditpropertymodal = val => {
    this.setState({ editpropertymodal: val });
    if (val === false) {
      this.props.isLocationOpenEditmodal();
    }
  };
  iseditorgmodal = val => {
    this.setState({ editorgmodal: val });
  };
  iseditnextmodal = () => {
    this.setState({ editnextmodal: !this.state.editnextmodal });
    this.setState({ nextmodal: !this.state.nextmodal });
    this.props.iseditlocatiionmodal();
  };
  iseditnextmodalcancle = () => {
    this.setState({ editnextmodal: !this.state.editnextmodal });
  };
  isclosemodals = () => {
    this.setState({ editnextmodal: !this.state.editnextmodal });
    this.setState({ nextmodal: !this.state.nextmodal });
    this.setState({ notitype: "updatelocation" });
  };
  next = () => {
    this.validator.showMessageFor("property");
    this.validator.showMessageFor("locationtype");
    this.validator.showMessageFor("label");
    if (this.validator.allValid()) {
      this.setState({ nextmodal: !this.state.nextmodal });
      this.setState({ editnextmodal: !this.state.editnextmodal });
      this.props.iseditlocatiionmodal();
      let getEdittedData = {
        id: this.state.editid,
        entities: {
          id: this.state.organization.value
        },
        propertyId: this.state.property.value,
        floor: this.state.label,
        locationType: this.state.locationtype.value,
        locationBusinessHoursList: []
      };
      this.setState({ getEdittedData });
      this.props.shownoti("");
    }
    this.validator.showMessageFor("Zone");
    this.validator.showMessageFor("AggregationId");
    this.setState({ nextclick: true });
  };

  business_hrsdata = val => {
    this.setState({ business_hours: val });
    let getEdittedData = this.state.getEdittedData;
    getEdittedData.locationBusinessHoursList = val;
    var differences = diff(this.state.getEditData, getEdittedData);
    var dif = { ...dif };
    if (differences) {
      differences.map((item, index) => {
        var value = item.rhs;
        dif[item.path[0]] = value;
      });
    }
    dif.id = this.state.editid;
    dif.locationBusinessHoursList = val;
    const { updatedLocationData } = this.props;
    updatedLocationData(this.state.editid, dif);
    this.props.shownoti("updatelocation");
    this.setState({ notitype: "" });
  };
  onChngproperty = property => {
    this.setState({ property });
  };

  onChngloctype = locationtype => {
    this.setState({ locationtype });
  };

  onchnglabel = e => {
    this.setState({ label: e.target.value });
  };
  render() {
    const { Location, Status } = this.props.data;
    let orgnizationdata = Location.orgnizationdata.map(function(item) {
      return { value: item.id, label: item.name };
    });
    let propertydata =
      this.props.getEditData.propertydatalist &&
      this.props.getEditData.propertydatalist.map(function(item) {
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
              Status.page === "updatelocation" &&
              this.props.notitype === "updatelocation" && (
                <Fragment>
                  <Notification
                    msg={Status.notificationMsg}
                    status={Status.status}
                    show={this.props.addlocationmodal}
                  />
                </Fragment>
              )}
            <Modal
              isOpen={this.props.editlocationmodal}
              toggle={() => this.toggle()}
              className={this.props.className}
              id="edit_location"
            >
              <ModalHeader toggle={() => this.toggle()}>
                Edit Location
              </ModalHeader>
              <ModalBody>
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="organization">Organization *</Label>
                        <Select
                          value={this.state.organization}
                        //   onChange={organization =>
                        //     this.onChngOrg(organization)
                        //   }
                          options={orgnizationdata}
                          isDisabled
                          placeholder="Organization"
                        />
                        <a style={{ cursor: "pointer" }}>
                          <i className="pe-7s-plus"> </i> Add New Organization
                        </a>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="property">Property *</Label>
                        <Select
                          value={this.state.property}
                          onChange={property => this.onChngproperty(property)}
                          options={propertydata}
                          placeholder="Add Property"
                        />
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            this.setState({
                              editpropertymodal: !this.state.editpropertymodal
                            })
                          }
                        >
                          <i className="pe-7s-plus"> </i> Add New Property
                        </a>
                        {this.validator.message(
                          "property",
                          this.state.property,
                          "required"
                        )}
                      </FormGroup>
                    </Col>
                    {this.state.editpropertymodal && (                     
                      <AddProperty
                        requiredMessage={this.props.requiredMessage}
                        addpropertymodal={this.state.editpropertymodal}
                        isaddpropertymodal={this.iseditpropertymodal}
                      />
                    )}
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="location_types">Location Type*</Label>
                        <Select
                          value={this.state.locationtype}
                          onChange={locationtype =>
                            this.onChngloctype(locationtype)
                          }
                          options={locationdata}
                          placeholder="Location Type"
                        />
                        {this.validator.message(
                          "locationtype",
                          this.state.locationtype,
                          "required"
                        )}
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
                          className={`form-control ${this.state.nextclick &&
                            this.state.label === "" &&
                            this.state.errorClass}`}
                          onChange={e => this.onchnglabel(e)}
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
            {this.state.nextmodal && (
              <EditBusinessHours
                requiredMessage={this.props.requiredMessage}
                getEditBusiness={this.state.getEditBusiness}
                editnextmodal={this.state.editnextmodal}
                iseditnextmodal={this.iseditnextmodal}
                isclosemodals={this.isclosemodals}
                business_hrsdata={this.business_hrsdata}
                iseditnextmodalcancle={this.iseditnextmodalcancle}
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
      fetchLocationItemData: fetchLocationItemData,
      fetchOrganizationData: fetchOrganizationData,
      fetchLocationTypesData: fetchLocationTypesData,
      fetchPropertyData: fetchPropertyData,
      updatedLocationData: updatedLocationData
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(EditLocation);
