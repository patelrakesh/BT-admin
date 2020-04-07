import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "react-select";
import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";
// import { fetchSectorTypeData, fetchEntitiTypeData, addEntitiy } from '../../services/Entities';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Table,
  CardHeader,
  Button,
  DropdownToggle,
  DropdownMenu,
  Nav,
  NavItem,
  NavLink,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Input,
  FormGroup,
  DropdownItem
} from "reactstrap";
import SimpleReactValidator from "simple-react-validator";
import Notification from "../../library/notification";
import { fetchOrganizationData } from "../../services/Location";
import {
  fetchIOTDeviceData,
  fetchManufactureData,
  fetchParameterData,
  addSensor
} from "../../services/Sensors";
import { fetchLocationData } from "../../services/IOTDevice";

class Addsensor extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.validator = new SimpleReactValidator(
      {
        element: (message, className) => (
          <div className="required_message">{message}</div>
        )
      },
      { autoForceUpdate: this }
    );
  }
  state = {
    organization: "",
    iotdevices: "",
    channelno: "",
    sensorType: "",
    locations: "",
    modelNo: "",
    manufacturer: "",
    parameters: [],
    messageForOraganization: false,
    messageForIotDevice: false,
    messageForLocation: false,
    messageForSensorType: false,
    messageForManufacture: false
  };

  componentWillReceiveProps = props => {};

  componentDidMount = async () => {
    const { fetchOrganizationData, fetchManufactureData } = this.props;
    fetchOrganizationData();
    fetchManufactureData();
    this.validator.hideMessageFor("Modalno");
    this.validator.hideMessages();
  };

  toggle = () => {
    this.props.isaddsensoemodalcancle();
    this.setState({
      organization: "",
      iotdevices: "",
      channelno: "",
      sensorType: "",
      locations: "",
      modelNo: "",
      manufacturer: "",
      parameters: [],
      messageForOraganization: false,
      messageForIotDevice: false,
      messageForLocation: false,
      messageForSensorType: false,
      messageForManufacture: false
    });
    this.validator.hideMessageFor("Modalno");
    this.validator.hideMessages();
    this.forceUpdate();
  };

  onorganization = async organization => {
    this.setState({ organization });
    const { fetchIOTDeviceData, fetchLocationData } = this.props;
    await fetchIOTDeviceData(organization.value);
    await fetchLocationData(organization.value);
    this.setState({
      iotdevices: "",
      locations: "",
      messageForOraganization: false
    });
    this.validator.showMessageFor("organization");
  };
  onModalChange = e => {
    this.setState({ modelNo: e.target.value });
    this.validator.showMessageFor("Modalno");
  };

  onsave = async () => {
    if (this.validator.allValid() && this.state.organization !== '' && this.state.iotdevices !== ''  && this.state.locations !== '' && this.state.sensorType !== '' && this.state.manufacturer !== '') {
      let paras = [];
      this.state.parameters &&
        this.state.parameters.map((item, index) => {
          return paras.push(item.value);
        });
      let data = {
        parameters: paras,
        iotDevices: { id: this.state.iotdevices.value },
        channelNo: this.state.channelno,
        sensorType: { id: this.state.sensorType.value },
        locations: { id: this.state.locations.value },
        modelNo: this.state.modelNo,
        manufacturer: { id: this.state.manufacturer.value }
      };
      let { addSensor } = this.props;
      await addSensor(data);
      this.props.isaddsensoemodal();
      this.setState({
        organization: "",
        iotdevices: "",
        channelno: "",
        sensorType: "",
        locations: "",
        modelNo: "",
        manufacturer: "",
        parameters: [],
        messageForOraganization: false,
        messageForIotDevice: false,
        messageForLocation: false,
        messageForSensorType: false,
        messageForManufacture: false
      });
      this.validator.hideMessageFor("Modalno");
      this.validator.hideMessages();
    } else {
      this.state.organization === '' && this.setState({ messageForOraganization: true });
      this.state.iotdevices === '' && this.setState({ messageForIotDevice: true });
      this.state.locations === '' && this.setState({ messageForLocation: true });
      this.state.sensorType === '' && this.setState({ messageForSensorType: true });
      this.state.manufacturer === '' && this.setState({ messageForManufacture: true });
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  onChangeModelNo = async val => {
    await this.setState({ modelNo: val });
    this.validator.showMessageFor("Modalno");
    if (this.state.manufacturer !== "") {
      this.parameterData();
    }
  };

  onChangeManufacture = async manufacturer => {
    await this.setState({ manufacturer });
    this.validator.showMessageFor("Manufacture");
    if (this.state.modelNo !== "") {
      this.parameterData();
    }
  };

  parameterData = async () => {
    let { fetchParameterData } = this.props;
    await fetchParameterData(this.state.manufacturer.value, this.state.modelNo);
  };

  render() {
    const { Sensors, IOTDevice, Location, Status } = this.props.data;
    let orgnizationdata = Location.orgnizationdata.map(function(item) {
      return { value: item.id, label: item.name };
    });
    let sensoriotdata =
      Sensors.iotdevicedata &&
      Sensors.iotdevicedata.map(function(item) {
        return { value: item.id, label: item.reference };
      });
    let locationdata =
      IOTDevice.locationdata &&
      IOTDevice.locationdata.map(function(item) {
        return { value: item.id, label: item.value };
      });
    let sensortypedata =
      Sensors.sensortypedata &&
      Sensors.sensortypedata.map(function(item) {
        return { value: item.id, label: item.value };
      });
    let manufacturerdata =
      Sensors.manufacturedata &&
      Sensors.manufacturedata.map(function(item) {
        return { value: item.id, label: item.value };
      });
    let parameterdata =
      Sensors.parameterdata &&
      Sensors.parameterdata.map(function(item) {
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
              Status.page === "addsensor" &&
              this.props.notitype === "addsensor" && (
                <Fragment>
                  <Notification
                    msg={Status.notificationMsg}
                    status={Status.status}
                    show={this.props.addsensormodal}
                  />
                </Fragment>
              )}
            <Modal
              isOpen={this.props.addsensormodal}
              toggle={() => this.toggle()}
              className={this.props.className}
              id="add_location"
            >
              <ModalHeader toggle={() => this.toggle()}>Add Sensor</ModalHeader>
              <ModalBody>
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="type">Organization *</Label>
                        <Select
                          value={this.state.organization}
                          onChange={organization =>
                            this.onorganization(organization)
                          }
                          onBlur={() =>
                            this.state.organization === ""
                              ? this.setState({ messageForOraganization: true })
                              : this.setState({
                                  messageForOraganization: false
                                })
                          }
                          options={orgnizationdata}
                          placeholder="Select Organization"
                        />
                        {this.state.messageForOraganization && (
                          <p className="required_message">
                            Oraganization is required.
                          </p>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="type">IOT Devices*</Label>
                        <Select
                          value={this.state.iotdevices}
                          onChange={iotdevices =>
                            this.setState({
                              iotdevices: iotdevices,
                              messageForIotDevice: false
                            })
                          }
                          onBlur={() =>
                            this.state.iotdevices === ""
                              ? this.setState({ messageForIotDevice: true })
                              : this.setState({ messageForIotDevice: false })
                          }
                          options={sensoriotdata}
                          placeholder="Select IOT Device"
                        />
                        {this.state.messageForIotDevice && (
                          <p className="required_message">
                            Iotdevice is required.
                          </p>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="location">Locations*</Label>
                        <Select
                          value={this.state.locations}
                          onChange={locations =>
                            this.setState({
                              locations: locations,
                              messageForLocation: false
                            })
                          }
                          onBlur={() =>
                            this.state.locations === ""
                              ? this.setState({ messageForLocation: true })
                              : this.setState({ messageForLocation: false })
                          }
                          options={locationdata}
                          placeholder="Select Location"
                        />
                        {this.state.messageForLocation && (
                          <p className="required_message">
                            Location is required.
                          </p>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="name">Channel No</Label>
                        <Input
                          type="number"
                          id="Channel No"
                          placeholder="Channel No"
                          onChange={e =>
                            this.setState({ channelno: e.target.value })
                          }
                          value={this.state.channelno}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <Label for="sensor">Sensor Types*</Label>
                      <Select
                        value={this.state.sensorType}
                        options={sensortypedata}
                        onChange={sensorType =>
                          this.setState({
                            sensorType: sensorType,
                            messageForSensorType: false
                          })
                        }
                        onBlur={() =>
                          this.state.sensorType === ""
                            ? this.setState({ messageForSensorType: true })
                            : this.setState({ messageForSensorType: false })
                        }
                        placeholder="Select Sensor"
                      />
                      {this.state.messageForSensorType && (
                        <p className="required_message">
                          Sensortype is required.
                        </p>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Label for="manufacture">Manufactures*</Label>
                      <Select
                        value={this.state.manufacturer}
                        onChange={manufacturer =>
                          this.setState({
                            manufacturer: manufacturer,
                            messageForManufacture: false
                          })
                        }
                        onBlur={() =>
                          this.state.manufacturer === ""
                            ? this.setState({ messageForManufacture: true })
                            : this.setState({ messageForManufacture: false })
                        }
                        options={manufacturerdata}
                        placeholder="Select Manufacture"
                      />
                      {this.state.messageForManufacture && (
                        <p className="required_message">
                          Sensortype is required.
                        </p>
                      )}
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="name">Modal No*</Label>
                        <Input
                          type="text"
                          id="name"
                          placeholder="Modal No"
                          onChange={e => this.onChangeModelNo(e.target.value)}
                          onBlurCapture={e => this.onModalChange(e)}
                          value={this.state.modelNo}
                        />
                        {this.validator.message(
                          "Modalno",
                          this.state.modelNo,
                          "required"
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Label for="parameter">Parameters</Label>
                      <Select
                        value={this.state.parameters}
                        onChange={parameters => this.setState({ parameters })}
                        options={parameterdata}
                        isMulti
                        placeholder="Choose Parameters"
                      />
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="light" onClick={() => this.toggle()}>
                  Cancel
                </Button>
                <Button color="success" onClick={() => this.onsave()}>
                  Save
                </Button>{" "}
              </ModalFooter>
            </Modal>
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
      fetchOrganizationData: fetchOrganizationData,
      fetchIOTDeviceData: fetchIOTDeviceData,
      fetchManufactureData: fetchManufactureData,
      fetchParameterData: fetchParameterData,
      fetchLocationData: fetchLocationData,
      addSensor: addSensor
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Addsensor);
