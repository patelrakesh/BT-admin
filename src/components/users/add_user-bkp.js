import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "react-select";
import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";
import {
  fetchRoleData,
  addUser,
  fetchPrimaryLocation
} from "../../services/User";
import { fetchOrganizationData } from "../../services/Location";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  // eslint-disable-next-line no-unused-vars
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
import Primarylocation from "./primarylocation";
class Adduser extends Component {
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
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    role: "",
    oraganization: "",
    userstepdata: [],
    disabledSMS: true,
    nextmodaluser: false,
    addnextmodaluser: false,
    notificationEmail: false,
    notificationSMS: false
  };
  componentDidMount = async () => {
    const { fetchRoleData, fetchOrganizationData } = this.props;
    await fetchRoleData();
    await fetchOrganizationData();
  };
  onCheckedEmail(e) {
    this.setState({ notificationEmail: e.target.checked });
  }
  onCheckedSMS(e) {
    this.setState({ notificationSMS: e.target.checked });
  }

  onPhonenumber = e => {
    this.setState({ phonenumber: e.target.value });
    this.validator.showMessageFor("Phonenumber");
  };

  isaddnextmodaluser = () => {
    this.setState({ addnextmodaluser: !this.state.addnextmodaluser });
    this.setState({ nextmodaluser: !this.state.nextmodaluser });
    // this.setState({ notitype: "primarylocation" });
    //  this.props.shownoti("");
    this.props.isaddusermodal();
  };

  isclosemodalsuser = () => {
    this.setState({ addnextmodaluser: !this.state.addnextmodaluser });
    this.setState({ nextmodaluser: !this.state.nextmodaluser });
    this.setState({ notitype: "primarylocation" });
    this.props.shownoti("");
  };
  toggle = () => {
    this.props.isaddusermodal();
    this.setState({ notitype: "primarylocation" });
    this.props.shownoti("");
    this.setState({
      firstname: "",
      lastname: "",
      phonenumber: "",
      email: "",
      role: "",
      oraganization: "",
      userstepdata: [],
      valfirstname: true
    });
  };
  nextuser = async () => {
    if (this.validator.allValid()) {
      let { fetchPrimaryLocation } = this.props;
      await fetchPrimaryLocation(this.state.oraganization.value);
      this.props.isaddusermodal();
      let data = {
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        mobileNo: this.state.phonenumber,
        email: this.state.email,
        role: this.state.role.value,
        entityId: this.state.oraganization.value,
        notifications: {
          email: this.state.notificationEmail,
          phone: this.state.notificationSMS
        },
        status: 1,
        locations: []
      };
      this.setState({ nextmodaluser: !this.state.nextmodaluser });
      this.setState({ addnextmodaluser: !this.state.addnextmodaluser });
      this.setState({ valfirstname: !this.state.valfirstname });
      this.setState({ userstepdata: data });
      this.setState({ notitype: "primarylocation" });
      this.props.shownoti("");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  AdduserData = value => {
    let datas = this.state.userstepdata;
    datas.locations = value;
    let { addUser } = this.props;
    addUser(datas);
    this.props.shownoti("adduser");
    this.setState({
      firstname: "",
      lastname: "",
      phonenumber: "",
      email: "",
      role: "",
      oraganization: "",
      userstepdata: []
    });
  };

  onFirstChange = e => {
    this.setState({ firstname: e.target.value });
    this.validator.showMessageFor("FirstName");
  };
  onLastChange = e => {
    this.setState({ lastname: e.target.value });
    this.validator.showMessageFor("Lastname");
  };
  onEmailChange = e => {
    this.setState({ email: e.target.value });
    this.validator.showMessageFor("Email");
  };
  // onRoleBlur =  () => {
  //     if(this.state.role === ''){
  //         console.log(this.state.role);
  //         this.validator.showMessageFor('role');
  //     }

  render() {
    const { User, Location, Status } = this.props.data;
    let roleadduser =
      User.roledata.rows &&
      User.roledata.rows.map(function(item) {
        return { value: item.id, label: item.name };
      });
    let oraguseritem =
      Location.orgnizationdata &&
      Location.orgnizationdata.map(function(item) {
        return { value: item.id, label: item.name };
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
              Status.page === "adduser" &&
              this.props.notitype === "adduser" && (
                <Fragment>
                  <Notification
                    msg={Status.notificationMsg}
                    status={Status.status}
                    show={this.props.addusermodal}
                  />
                </Fragment>
              )}
            <Modal
              isOpen={this.props.addusermodal}
              toggle={() => this.toggle()}
              className={this.props.className}
              id="add_location"
            >
              <ModalHeader toggle={() => this.toggle()}>Add User</ModalHeader>
              <ModalBody>
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="Firstname">First Name*</Label>
                        <Input
                          type="text"
                          id="Firstname"
                          placeholder="Enter Firstname"
                          value={this.state.firstname}
                          onChange={e => this.onFirstChange(e)}
                          onBlurCapture={e => this.onFirstChange(e)}
                        />
                        {this.validator.message(
                          "FirstName",
                          this.state.firstname,
                          "required"
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="lastname">Last Name*</Label>
                        <Input
                          type="text"
                          id="lastname"
                          placeholder="Enter Lastname"
                          onChange={e => this.onLastChange(e)}
                          value={this.state.lastname}
                          onBlurCapture={e => this.onLastChange(e)}
                        />
                        {this.validator.message(
                          "Lastname",
                          this.state.lastname,
                          "required"
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="role" placeholder="Select Roles">
                          Role*
                        </Label>
                        <Select
                          value={this.state.role}
                          onChange={role => this.setState({ role })}
                          onBlur={
                            this.state.role === "" &&
                            this.validator.showMessageFor("role")
                          }
                          options={roleadduser}
                          placeholder="Select Roles"
                        />
                        {this.validator.message(
                          "role",
                          this.state.role,
                          "required"
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="email">Email*</Label>
                        <Input
                          type="text"
                          id="email"
                          placeholder="Enter Email"
                          onChange={e => this.onEmailChange(e)}
                          onBlurCapture={e => this.onEmailChange(e)}
                          value={this.state.email}
                        />
                        {this.validator.message(
                          "Email",
                          this.state.email,
                          "email|required"
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label
                          for="organization"
                          placeholder="Select Organization"
                        >
                          Organization*
                        </Label>
                        <Select
                          value={this.state.oraganization}
                          onChange={oraganization =>
                            this.setState({ oraganization })
                          }
                          onBlur={
                            this.state.oraganization === "" &&
                            this.validator.showMessageFor("oraganizations")
                          }
                          options={oraguseritem}
                          placeholder="Select Organization"
                        />
                        {this.validator.message(
                          "oraganizations",
                          this.state.oraganization,
                          "required"
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="phonenumber">Phone Number</Label>
                        <Input
                          type="text"
                          id="phonenumber"
                          placeholder="Enter Phone Number"
                          onChange={e => this.onPhonenumber(e)}
                          value={this.state.phonenumber}
                        />
                        {this.validator.message(
                          "Phonenumber",
                          this.state.phonenumber,
                          "phone"
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="alerts">Alerts</Label>
                        <br />
                        <label style={{ cursor: "pointer" }}>
                          <Checkbox
                            checked={this.state.notificationEmail}
                            onChange={e => this.onCheckedEmail(e)}
                            disabled={this.state.disabled}
                          />
                          &nbsp;Email
                        </label>
                        &nbsp;&nbsp;&nbsp;
                        <label style={{ cursor: "pointer" }}>
                          <Checkbox
                            checked={this.state.notificationSMS}
                            onChange={e => this.onCheckedSMS(e)}
                            disabled={
                              this.state.phonenumber === "" ? true : false
                            }
                          />
                          &nbsp;SMS
                        </label>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="light" onClick={() => this.toggle()}>
                  Cancel
                </Button>
                <Button color="success" onClick={() => this.nextuser()}>
                  Next
                </Button>{" "}
              </ModalFooter>
            </Modal>
            {this.state.addnextmodaluser && (
              <Primarylocation
                addnextmodaluser={this.state.addnextmodaluser}
                isaddnextmodaluser={this.isaddnextmodaluser}
                isclosemodalsuser={this.isclosemodalsuser}
                AdduserData={this.AdduserData}
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
      fetchRoleData: fetchRoleData,
      addUser: addUser,
      fetchPrimaryLocation: fetchPrimaryLocation,
      fetchOrganizationData: fetchOrganizationData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Adduser);
