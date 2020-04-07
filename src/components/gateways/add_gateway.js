import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "react-select";
import "rc-checkbox/assets/index.css";
import { fetchLocationData } from "../../services/IOTDevice";
import { fetchOrganizationData } from "../../services/Location";
import { fetchGatwayTypeData, addGateway } from "../../services/Gateway";
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
import SimpleReactValidator from "simple-react-validator";
import Notification from "../../library/notification";
class AddGateway extends Component {
  constructor(props) {
    super(props);
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
    location: "",
    gatewaytype: "",
    label: "",
    gatewayId: "",
    messageForOraganization: false,
    messageForLocation: false,
    messageForGatewayType: false
  };
  componentDidMount = async () => {
    const { fetchOrganizationData, fetchGatwayTypeData } = this.props;
    await fetchOrganizationData();
    await fetchGatwayTypeData();
    this.validator.hideMessageFor("Label");
    this.validator.hideMessageFor("Gateway Id");
    this.validator.hideMessages();
  };
  toggle = () => {
    this.props.isaddgatewaymodalcancle();
    this.setState({
      organization: "",
      location: "",
      gatewaytype: "",
      label: "",
      gatewayId: "",
      messageForOraganization: false,
      messageForLocation: false,
      messageForGatewayType: false
    });
    this.validator.hideMessageFor("Label");
    this.validator.hideMessageFor("Gateway Id");
    this.validator.hideMessages();
    this.forceUpdate();
  };

  onChangeOrg = async organization => {
    this.setState({ organization });
    const { fetchLocationData } = this.props;
    await fetchLocationData(organization.value);
    this.setState({ location: "", messageForOraganization: false });
  };

  onChangeLabel = e => {
    this.setState({ label: e.target.value });
    this.validator.showMessageFor("Label");
  };
  onChangeGateId = e => {
    this.setState({ gatewayId: e.target.value });
    this.validator.showMessageFor("Gateway Id");
  };
  onSave = async () => {
    if (
      this.validator.allValid() &&
      this.state.organization !== "" &&
      this.state.location !== "" &&  this.state.gatewaytype !== ""
    ) {
      let data = {
        label: this.state.label,
        gatewayId: this.state.gatewayId,
        gatewayType: { id: this.state.gatewaytype.value },
        locations: { id: this.state.location.value },
        entities: { id: this.state.organization.value }
      };
      const { addGateway } = this.props;
      await addGateway(data);
      this.props.isaddgatewaymodal();
      this.setState({
        organization: "",
        location: "",
        gatewaytype: "",
        label: "",
        gatewayId: "",
        messageForOraganization: false,
        messageForLocation: false,
        messageForGatewayType: false
      });
      this.validator.hideMessageFor("Label");
      this.validator.hideMessageFor("Gateway Id");
      this.validator.hideMessages();
    } else {
        this.state.organization === '' && this.setState({ messageForOraganization: true });
        this.state.location === '' && this.setState({ messageForLocation: true });
        this.state.gatewaytype === '' && this.setState({ messageForGatewayType: true });
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  render() {
    const { IOTDevice, Location, Status, Gateways } = this.props.data;
    let orgnizationdata = Location.orgnizationdata.map(function(item) {
      return { value: item.id, label: item.name };
    });
    let locationdata =
      IOTDevice.locationdata &&
      IOTDevice.locationdata.map(function(item) {
        return { value: item.id, label: item.value };
      });
    let gatewaytypedata =
      Gateways.gatewaytypedata &&
      Gateways.gatewaytypedata.map(function(item) {
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
              Status.page === "addgateway" &&
              this.props.notitype === "addgateway" && (
                <Fragment>
                  <Notification
                    msg={Status.notificationMsg}
                    status={Status.status}
                    show={this.props.addusermodal}
                  />
                </Fragment>
              )}
            <Modal
              isOpen={this.props.addgatewaymodal}
              toggle={() => this.toggle()}
              className={this.props.className}
              id="add_location"
            >
              <ModalHeader toggle={() => this.toggle()}>
                Add Gateway
              </ModalHeader>
              <ModalBody>
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="Firstname">Organization*</Label>
                        <Select
                          value={this.state.organization}
                          onChange={organization =>
                            this.onChangeOrg(organization)
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
                        <Label for="location">Locations*</Label>
                        <Select
                          value={this.state.location}
                          options={locationdata}
                          onChange={location =>
                            this.setState({
                              location: location,
                              messageForLocation: false
                            })
                          }
                          onBlur={() =>
                            this.state.location === ""
                              ? this.setState({ messageForLocation: true })
                              : this.setState({ messageForLocation: false })
                          }
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
                    <Col md="12">
                      <FormGroup>
                        <Label for="gatewaytype">GatewayType *</Label>
                        <Select
                          value={this.state.gatewaytype}
                          onChange={gatewaytype =>
                            this.setState({
                              gatewaytype: gatewaytype,
                              messageForGatewayType: false
                            })
                          }
                          onBlur={() =>
                            this.state.gatewaytype === ""
                              ? this.setState({ messageForGatewayType: true })
                              : this.setState({ messageForGatewayType: false })
                          }
                          options={gatewaytypedata}
                          placeholder="Select Gateways Type"
                        />
                        {this.state.messageForGatewayType && (
                          <p className="required_message">
                            Gateway is required.
                          </p>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="label">Label *</Label>
                        <Input
                          type="text"
                          id="label"
                          onChange={e => this.onChangeLabel(e)}
                          onBlurCapture={e => this.onChangeLabel(e)}
                          value={this.state.label}
                          placeholder="Label"
                        />
                        {this.validator.message(
                          "Label",
                          this.state.label,
                          "required"
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="gatewayId">GateWayId *</Label>
                        <Input
                          type="text"
                          id="gatewayId"
                          onChange={e => this.onChangeGateId(e)}
                          onBlurCapture={e => this.onChangeGateId(e)}
                          value={this.state.gatewayId}
                          placeholder="GateWayId"
                        />
                        {this.validator.message(
                          "Gateway Id",
                          this.state.gatewayId,
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
                <Button color="success" onClick={() => this.onSave()}>
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
      fetchLocationData: fetchLocationData,
      fetchGatwayTypeData: fetchGatwayTypeData,
      addGateway: addGateway
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddGateway);
