/* eslint-disable no-use-before-define */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import { fetchAccountDetailsData, fetchAccountDetailsUpadateData } from '../../../services/SideNavItem';
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
import Notification from '../../../library/notification'

class AccoumtDetail extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className='required_message'>{message}</div>
        }, { autoForceUpdate: this })
    }
    state = {
        firstname: '',
        disabledSMS: false,
        lastname: '',
        phonenumber: '',
        emailNotification: false,
        smsNotification: false,
        id: '36',
        getAccountData: {},
        notitype: '',
    }
    componentDidMount = async () => {
        const { fetchAccountDetailsData } = this.props;
        await fetchAccountDetailsData();
    }

    componentWillReceiveProps = async (props) => {
        let { SideNavItem } = props.data;
        SideNavItem.accountdata && SideNavItem.accountdata.id !== this.state.id && await this.setState({
            id: SideNavItem.accountdata.id,
            firstname: SideNavItem.accountdata.firstName,
            lastname: SideNavItem.accountdata.lastName,
            phonenumber: SideNavItem.accountdata.mobileNo,
        });
        if (SideNavItem.accountdata) {
            SideNavItem.accountdata.notificationMode === 'Email' ? this.setState({ emailNotification: true, smsNotification: false })
                : SideNavItem.accountdata.notificationMode === 'phone' ? await this.setState({ smsNotification: true, emailNotification: false }) : SideNavItem.accountdata.notificationMode === null ? await this.setState({ emailNotification: false, smsNotification: false }) : await this.setState({ emailNotification: true, smsNotification: true });
            const getAccountData = {
                id: this.props.data.SideNavItem.accountdata.id,
                firstname: this.props.data.SideNavItem.accountdata.firstName,
                lastname: this.props.data.SideNavItem.accountdata.lastName,
                phonenumber: this.props.data.SideNavItem.accountdata.mobileNo,

            };
            this.setState({ getAccountData });
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

    toggle = () => {
        this.props.isCancleChangeAccountmodal();
        this.validator.hideMessages();
        this.forceUpdate();
    }
    onUpdate = async() => {
        if (this.validator.allValid()) {
            let data = { "id": 36, "firstName": this.state.firstname, "lastName": this.state.lastname, "mobileNo": this.state.phonenumber, "notifications": { "email": this.state.emailNotification, "phone": this.state.smsNotification } };
            let { fetchAccountDetailsUpadateData } = this.props;
            await fetchAccountDetailsUpadateData(data);
            this.props.ischangeAccountmodal();
            this.props.shownoti('accountudata');            
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    onCancle = () => {
        this.props.isCancleChangeAccountmodal();
        this.validator.hideMessages();
        this.forceUpdate();
    }
    render() {
        const { Status, SideNavItem } = this.props.data;
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
                        <Modal isOpen={this.props.accountdetail} toggle={() => this.toggle()} className={this.props.className} id='add_location'>
                            <ModalHeader toggle={() => this.toggle()}>Account Details</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <Row>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="Firstname">First Name*</Label>
                                                <Input type='text' id="Firstname" placeholder="Enter Firstname"
                                                    onChange={(e) => this.onFirstname(e)} value={this.state.firstname} />
                                                {this.validator.message('FirstName', this.state.firstname, 'required')}
                                            </FormGroup>
                                        </Col>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="lastname">Last Name*</Label>
                                                <Input type='text' placeholder="Enter Lastname" id="lastname" onChange={(e) => this.onLastname(e)} value={this.state.lastname} />
                                                {this.validator.message('Lastname', this.state.lastname, 'required')}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="role" >Role</Label>
                                                <Select type="text"
                                                    placeholder="Super Administrator"
                                                    isDisabled
                                                    value={this.state.role}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="email">Email*</Label>

                                                <Input type="text" id="email" disabled type="text" placeholder="shankar.piriya@amzur.com" maxLength="50" className="form-control"
                                                //  value={item.value}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='12'>
                                            <FormGroup>
                                                <Label for="organization" placeholder='Select Organization'>Organization</Label>
                                                <Select
                                                    value={this.state.oraganization}
                                                    isDisabled
                                                    placeholder="Club Mahindra Holidays"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="location">User Location</Label>
                                                <Select
                                                    value={this.state.location}
                                                    isDisabled
                                                    placeholder="Varca Beach Resort Varca Beach"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md='6'>
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
                                <Button color="light" onClick={() => this.onCancle()}>Cancel</Button>
                                <Button color="success" onClick={() => this.onUpdate()}>Update</Button>{' '}
                            </ModalFooter>
                        </Modal>

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
    fetchAccountDetailsData: fetchAccountDetailsData,
    fetchAccountDetailsUpadateData: fetchAccountDetailsUpadateData
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccoumtDetail);


