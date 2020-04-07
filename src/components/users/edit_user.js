/* eslint-disable no-use-before-define */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import { fetchRoleData, updatedUserData, fetchEditPrimaryLocation } from '../../services/User';
import { fetchOrganizationData } from '../../services/Location';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col, Card, CardBody, CardTitle, Table, CardHeader, Button,
    DropdownToggle, DropdownMenu,
    Nav, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, Input, FormGroup, DropdownItem
} from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import Notification from '../../library/notification';
import Editprimarylocation from './edit_primarylocation';
var diff = require('deep-diff').diff;

class Edituser extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className='required_message'>{message}</div>
        }, {autoForceUpdate: this})
    }
    state = {
        nextedituser: false,
        emailNotification: false,
        smsNotification: false,
        nextclick: false,
        firstname: '',
        lastname: '',
        phonenumber: '',
        email: '',
        role: '',
        id: '',
        oraganization: '',
        userstepdata: {},
        disabledSMS: false,
        nextmodaluser: false,
        addnextmodaluser: false,
        editprilocmodal: false,
        nexteditprimarylocation: false,
        editusermodal: false,
        getEditData: {},
        activeStatus: 0,
        locationdata: [],
    }
    componentWillMount = async () => {
        const { fetchRoleData, fetchOrganizationData } = this.props;
        await fetchRoleData();
        await fetchOrganizationData();
    }
    componentWillReceiveProps = async (props) => {
        let { User } = props.data;
        User.edituserdata && User.edituserdata.id !== this.state.id && await this.setState({
            id: User.edituserdata.id,
            firstname: User.edituserdata.firstName,
            lastname: User.edituserdata.lastName,
            email: User.edituserdata.email,
            phonenumber: User.edituserdata.mobileNo,
            role: { value: User.edituserdata.role, label: User.edituserdata.roleName },
            oraganization: { value: User.edituserdata.entityId, label: User.edituserdata.entityName },
            activeStatus: User.edituserdata.status
        });
        if (User.edituserdata) {
            User.edituserdata.notificationMode === 'Email' ? await this.setState({ emailNotification: true,smsNotification: false  }) : User.edituserdata.notificationMode === 'Phone' ? await this.setState({ smsNotification: true ,emailNotification:false}) : User.edituserdata.notificationMode === null ? await this.setState({ emailNotification: false, smsNotification: false }) : await this.setState({ emailNotification: true, smsNotification: true });
            const getEditData = {
                id: this.props.data.User.edituserdata.id,
                firstname: this.props.data.User.edituserdata.firstName,
                lastname: this.props.data.User.edituserdata.lastName,
                email: this.props.data.User.edituserdata.email,
                phonenumber: this.props.data.User.edituserdata.mobileNo,
                role: this.props.data.User.edituserdata.role,
                oraganization: this.props.data.User.edituserdata.entityId,
            };
            this.setState({ getEditData });
        }

    }
    onFirstname = (e) => {
        this.setState({ firstname: e.target.value })
        this.validator.showMessageFor('FirstName');
    }
    onLastname = (e) => {
        this.setState({ lastname: e.target.value })
        this.validator.showMessageFor('Lastname');
    }
    onPhonenumber = (e) => {
        this.setState({ phonenumber: e.target.value });
        this.validator.showMessageFor('Phonenumber');
    }
    onEmail = (e) => {
        this.setState({ email: e.target.value });
        this.validator.showMessageFor('Email');
    }
    onsmsnoti = () => {
        this.setState({ smsNotification: true });
    }
    onemailnoti = () => {
        this.setState({ emailNotification: true });
    }

    // iseditnextmodaluser = () => {
    //     this.setState({ editusermodal: !this.state.editusermodal });
    //     this.setState({ nextedituser: !this.state.nextedituser });
    //     this.setState({ notitype: 'primarylocation' });
    //     this.props.iseditusermodal();
    // }
    // iscloseeditmodalsuser = () => {
    //     this.setState({ editusermodal: !this.state.editusermodal });
    //     this.setState({ nextedituser: !this.state.nextedituser });
    // }

    iscloseeditmodalprilocsuser = () => {
        this.setState({ editprilocmodal: !this.state.editprilocmodal });
        this.setState({ nexteditprimarylocation: !this.state.nexteditprimarylocation });
        this.props.iseditusermodal();
        this.setState({ notitype: 'editprimarylocation' });
        this.props.shownoti('');
    }
    iseditnextprilocmodaluser = () => {
        this.setState({ editprilocmodal: !this.state.editprilocmodal });
        this.setState({ nexteditprimarylocation: !this.state.nexteditprimarylocation });
        this.setState({ notitype: 'editprimarylocation' });
        this.props.shownoti('');
    }
    iseditprilocmodaluser = () => {
        this.setState({ editprilocmodal: !this.state.editprilocmodal }); 
        
    }
    iseditprilocmodalusercancle=()=>{
        this.setState({ editprilocmodal: !this.state.editprilocmodal });  

    }
    toggle = () => {
        this.props.iseditusermodal();
        this.setState({ notitype: 'editprimarylocation' });
        this.props.shownoti('');

    }
    nextuser = async() => {
        if (this.validator.allValid()) {
            let { fetchEditPrimaryLocation } = this.props;
            await fetchEditPrimaryLocation(this.state.oraganization.value, this.state.id);
            let data = {
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                phonenumber: this.state.phonenumber,
                label: this.state.label,
                email: this.state.email,
                role: this.state.role.value,
                entityId: this.state.oraganization.value,
                notifications: { 'email': this.state.emailNotification, 'phone': this.state.smsNotification },
                status: this.state.activeStatus,
            };
            this.setState({ userstepdata: data });
            this.setState({ editprilocmodal: !this.state.editprilocmodal });        
            this.setState({ nexteditprimarylocation: !this.state.nexteditprimarylocation });
            this.props.iseditusermodal();

        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
         this.props.shownoti('');
         this.setState({ notitype: 'editprimarylocation' });
    }
    locationData = (val) => {
        this.setState({ locationdata: val });
        let userstepdata = this.state.userstepdata;
        userstepdata.locations = val;
        var differences = diff(this.state.getEditData, userstepdata);
        var dif = { ...dif };
        if (differences) {
            differences.map((item, index) => {
                var value = item.rhs;
                dif[item.path[0]] = value;
            })
        }
        dif.id = this.state.id;
        dif.locations = val;
        const { updatedUserData } = this.props;
        updatedUserData(this.state.id, dif);
        this.props.shownoti('edituser');
    }

    render() {
        const { User, Location, Status } = this.props.data;
        let roleadduser = User.roledata.rows && User.roledata.rows.map(function (item) {
            return { value: item.id, label: item.name };
        })
        let oraguseritem = Location.orgnizationdata && Location.orgnizationdata.map(function (item) {
            return { value: item.id, label: item.name };
        })
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        {Status.status !== '' && Status.page === 'edituser' && this.props.notitype === 'edituser' &&
                            <Fragment>
                                <Notification msg={Status.notificationMsg} status={Status.status} show={this.props.addusermodal} />
                            </Fragment>
                        }
                        <Modal isOpen={this.props.editusermodal} toggle={() => this.toggle()} className={this.props.className} id='add_location'>
                            <ModalHeader toggle={() => this.toggle()}>Edit User</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <Row>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="Firstname">First Name*</Label>
                                                <Input type='text' id="Firstname"    placeholder="Enter Firstname"
                                                    onChange={(e) => this.onFirstname(e)} value={this.state.firstname} />
                                                {this.validator.message('FirstName', this.state.firstname, 'required')}
                                            </FormGroup>
                                        </Col>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="lastname">Last Name*</Label>
                                                <Input type='text' placeholder="Enter Lastname"id="lastname" onChange={(e) => this.onLastname(e)} value={this.state.lastname} />
                                                {this.validator.message('Lastname', this.state.lastname, 'required')}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="role" placeholder='Select Roles'>Role*</Label>
                                                <Select
                                                    value={this.state.role}
                                                    onChange={(role) => this.setState({ role })}
                                                    options={roleadduser}
                                                    placeholder="Select Roles"
                                                />
                                                {this.validator.message('role', this.state.role, 'required')}

                                            </FormGroup>
                                        </Col>

                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="email">Email*</Label>
                                                <Input type='text' id="email" placeholder="Enter Email" onChange={(e) => this.onEmail(e)} value={this.state.email} />
                                                {this.validator.message('Email', this.state.email, 'email|required')}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='12'>
                                            <FormGroup>
                                                <Label for="organization" placeholder='Select Organization'>Organization*</Label>
                                                <Select
                                                    value={this.state.oraganization}
                                                    onChange={(oraganization) => this.setState({ oraganization })}
                                                    options={oraguseritem}
                                                    placeholder="Select Organization"
                                                />
                                                {this.validator.message('oraganizations', this.state.oraganization, 'required')}

                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='12'>
                                            <FormGroup>
                                                <Label for="phonenumber">Phone Number</Label>
                                                <Input type='text' placeholder="Enter Phone Number" id="phonenumber" onChange={(e) => this.onPhonenumber(e)} value={this.state.phonenumber} />
                                                {this.validator.message('Phonenumber', this.state.phonenumber, 'phone')}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='3'>
                                            <FormGroup>
                                                <Label for="alerts">Alerts</Label>
                                                <br />
                                                <label style={{ cursor: 'pointer' }}>
                                                    <Checkbox
                                                        checked={this.state.emailNotification}
                                                        onChange={(e) => this.setState({ emailNotification: e.target.checked })}
                                                    />
                                                    &nbsp;Email
                                                    </label>&nbsp;&nbsp;&nbsp;
                                                    <label style={{ cursor: 'pointer' }}>
                                                    <Checkbox
                                                        checked={this.state.smsNotification}
                                                        onChange={(e) => this.setState({ smsNotification: e.target.checked })}
                                                        disabled={this.state.phonenumber === '' ? true : false}
                                                    />&nbsp;SMS
                                                    </label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="light" onClick={() => this.toggle()}>Cancel</Button>
                                <Button color="success" onClick={() => this.nextuser()}>Next</Button>{' '}
                            </ModalFooter>
                        </Modal>
                        {this.state.editprilocmodal && <Editprimarylocation shownoti={this.shownoti} notitype={this.state.notitype}
                         editprilocmodal={this.state.editprilocmodal} iseditnextprilocmodaluser={this.iseditnextprilocmodaluser} iscloseeditmodalprilocsuser={this.iscloseeditmodalprilocsuser} iseditprilocmodaluser={this.iseditprilocmodaluser} entityId={this.state.userstepdata.entityId} editid={this.state.id} locationData={this.locationData} iseditprilocmodalusercancle={this.iseditprilocmodalusercancle} />}
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    data: state,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRoleData: fetchRoleData,
    fetchOrganizationData: fetchOrganizationData,
    updatedUserData: updatedUserData,
    fetchEditPrimaryLocation: fetchEditPrimaryLocation,

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edituser);