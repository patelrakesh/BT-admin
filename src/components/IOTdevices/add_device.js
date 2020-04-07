import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import 'rc-checkbox/assets/index.css';
import { fetchLocationData, fetchDeviceTypeData, fetchProfileData, addIotdevicesData, fetchApplicationData } from '../../services/IOTDevice';
import { fetchOrganizationData } from '../../services/Location';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, Input, FormGroup,
} from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import Notification from '../../library/notification';

class AddIOTDevice extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className='required_message'>{message}</div>
        }, {autoForceUpdate: this})
    }
    state = {
        organization: '',
        location: '',
        deviceid: '',
        devicetype: '',
        application: '',
        dutycyclemin: '',
        deviceprofile: '',
        messageForOraganization:false,
        messageForLocation:false,
        messageForDeviceType:false,
        messageForApplication:false,
        messageForDeviceProfile:false,
        
    }
    componentDidMount = async () => {
        const { fetchOrganizationData, fetchDeviceTypeData, fetchProfileData } = this.props;
        await fetchOrganizationData();
        await fetchDeviceTypeData();
        await fetchProfileData();
        this.validator.hideMessageFor('deviceid');
        this.validator.hideMessageFor('dutycyclemin');
        this.validator.hideMessages();
    }
    toggle = () => {
        this.props.isaddiotdevicemodalcancle();
        this.setState({
            organization: '',
            location: '',
            deviceid: '',
            devicetype: '',
            application: '',
            dutycyclemin: '',
            deviceprofile: '',
            messageForOraganization:false,
            messageForLocation:false,
            messageForDeviceType:false,
            messageForApplication:false,
            messageForDeviceProfile:false,
        })
        this.validator.hideMessageFor('deviceid');
        this.validator.hideMessageFor('dutycyclemin');
        this.validator.hideMessages();
        this.forceUpdate();
    }
    onChangeDeviceId=(e)=>{      
        this.setState({deviceid:e.target.value})
        this.validator.showMessageFor("deviceid");

    }
    onChangeDutyCycle=(e)=>{      
        this.setState({dutycyclemin:e.target.value})
        this.validator.showMessageFor("dutycyclemin");
    }
    onChangeorg = async (organization) => {
        this.setState({ organization });
        this.validator.showMessageFor('organization');
        const { fetchLocationData, fetchApplicationData } = this.props;
        await fetchLocationData(organization.value);
        await fetchApplicationData(organization.value);
        this.setState({ location: '', application: '', messageForOraganization:false,})
    }   
    onSave = async () => {
        this.validator.showMessageFor("dutycyclemin");
        this.validator.showMessageFor('deviceid');
        if (this.validator.allValid() && this.state.organization !== "" && this.state.location !== "" &&  this.state.devicetype !== "" &&  this.state.application !== "" &&  this.state.deviceprofile !== "") {
            let data = {
                'deviceId': this.state.deviceid,
                "deviceTypes": { "id": this.state.devicetype.value },
                "application": this.state.application.value,
                "dutyCycleMin": this.state.dutycyclemin,
                "locations": { "id": this.state.location.value },
                "deviceProfileType": this.state.deviceprofile.value
            }
            const { addIotdevicesData } = this.props;
            await addIotdevicesData(data);
            this.props.isaddiotdevicemodal();
            this.setState({
                organization: '',
                location: '',
                deviceid: '',
                devicetype: '',
                application: '',
                dutycyclemin: '',
                deviceprofile: '',
                messageForOraganization:false,
                messageForLocation:false,
                messageForDeviceType:false,
                messageForApplication:false,
                messageForDeviceProfile:false,
            })
            this.validator.hideMessages();
            this.validator.hideMessageFor("dutycyclemin");
            this.validator.hideMessageFor('deviceid');
        }  else {
            this.state.organization === '' && this.setState({ messageForOraganization: true });
            this.state.location === '' && this.setState({ messageForLocation: true });
            this.state.devicetype === '' && this.setState({ messageForDeviceType: true });
            this.state.application === '' && this.setState({ messageForApplication: true });
            this.state.deviceprofile === '' && this.setState({ messageForDeviceProfile: true });
            this.validator.showMessages();
            this.forceUpdate();
        }
        this.validator.hideMessages();
        this.props.shownoti('adddevice');
        
    }
    render() {
        const { IOTDevice, Location, Status } = this.props.data;
        let orgnizationdata = Location.orgnizationdata.map(function (item) {
            return { value: item.id, label: item.name };
         
        })
        let locationdata = IOTDevice.locationdata && IOTDevice.locationdata.map(function (item) {
            return { value: item.id, label: item.value };
        })
        let applicationdata = IOTDevice.applicationdata && IOTDevice.applicationdata.map(function (item) {
            return { value: item.reference, label: item.value };
        })
        let devicetypedata = IOTDevice.devicetypedata && IOTDevice.devicetypedata.map(function (item) {
            return { value: item.id, label: item.value };
        })
        let deviceprofiledata = IOTDevice.deviceprofiledata && IOTDevice.deviceprofiledata.map(function (item) {
            return { value: item, label: item };
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
                        {Status.status !== '' && Status.page === 'adddevice' && this.props.notitype === 'adddevice' &&
                            <Fragment>
                                <Notification msg={Status.notificationMsg} status={Status.status} show={this.props.addusermodal} />
                            </Fragment>
                        }
                        <Modal isOpen={this.props.adddevicemodal} toggle={() => this.toggle()} className={this.props.className} id='add_location'>
                            <ModalHeader toggle={() => this.toggle()}>Add IOT Device</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <Row>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="Organization">Organization*</Label>
                                                <Select
                                                    value={this.state.organization}
                                                    onChange={(organization) => this.onChangeorg(organization)}
                                                    onBlur={() => this.state.organization === '' ?
                                                     this.setState({messageForOraganization: true}) : this.setState({messageForOraganization: false})}              
                                                    options={orgnizationdata}
                                                    placeholder="Select Organization"
                                                />
                                                 {this.state.messageForOraganization && <p className="required_message">Oraganization is required.</p>}
                                            </FormGroup>
                                        </Col>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="location">Locations*</Label>
                                                <Select
                                                    value={this.state.location}
                                                    onChange={location => this.setState({ location: location, messageForLocation: false })}
                          onBlur={() => this.state.location === '' ? this.setState({messageForLocation: true}) : this.setState({messageForLocation: false})}
                                                   options={locationdata}
                                                    placeholder="Select Locations"
                                                />
                                                
                                                {this.state.messageForLocation && <p className="required_message">Location is required.</p>}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="DeviceId">DeviceId *</Label>
                                                <Input type='text' id="deviceid"
                                                placeholder="Device Id"                                                   
                                                onChange={(e) => this.onChangeDeviceId(e)}              
                                                  onBlurCapture={(e) => this.onChangeDeviceId(e)}
                                                  value={this.state.deviceid} />                                                        
                                                {this.validator.message('deviceid', this.state.deviceid, 'required')}
                                            </FormGroup>
                                        </Col>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="devicetype">Device Type*</Label>
                                                <Select
                                                    value={this.state.devicetype}
                                                    
                                                    onChange={devicetype => this.setState({ devicetype: devicetype, messageForDeviceType: false })}
                          onBlur={() => this.state.devicetype === '' ? this.setState({messageForDeviceType: true}) : this.setState({messageForDeviceType: false})}
                                                    options={devicetypedata}
                                                    placeholder="Select Device Type"
                                                />
                                              {this.state.messageForDeviceType && <p className="required_message">Device is required.</p>}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="Application">Application*</Label>
                                                <Select
                                                    value={this.state.application}
                                                    onChange={application => this.setState({ application: application, messageForApplication: false })}
                          onBlur={() => this.state.application === '' ? this.setState({messageForApplication: true}) : this.setState({messageForApplication: false})}
                                                    options={applicationdata}
                                                    placeholder="Select Application"
                                                />
                                               {this.state.messageForApplication && <p className="required_message">Application is required.</p>}
                                            </FormGroup>
                                        </Col>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="dutycyclemin">Duty Cycle Min*</Label>
                                                <Input type='number' id="dutycyclemin"
                                                   placeholder="Duty Cycle Min"
                                                   onChange={(e) => this.onChangeDutyCycle(e)}              
                                                  onBlurCapture={(e) => this.onChangeDutyCycle(e)} 
                                                  value={this.state.dutycyclemin} />
                                                {this.validator.message('dutycyclemin', this.state.dutycyclemin, 'required|numeric')}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='12'>
                                            <FormGroup>
                                                <Label for="deviceprofile">Device Profile*</Label>
                                                <Select
                                                    value={this.state.deviceprofile}                                                 
                                                    onChange={deviceprofile => this.setState({ deviceprofile: deviceprofile, messageForDeviceProfile: false })}
                          onBlur={() => this.state.deviceprofile === '' ? this.setState({messageForDeviceProfile: true}) : this.setState({messageForDeviceProfile: false})}   
                                                    options={deviceprofiledata}
                                                    placeholder="Select Device Profile"
                                                />
                                                 {this.state.messageForDeviceProfile && <p className="required_message">Device is required.</p>}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="light" onClick={() => this.toggle()}>Cancel</Button>
                                <Button color="success" onClick={() => this.onSave()}>Save</Button>{' '}
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
    fetchOrganizationData: fetchOrganizationData,
    fetchLocationData: fetchLocationData,
    fetchProfileData: fetchProfileData,
    fetchDeviceTypeData: fetchDeviceTypeData,
    fetchApplicationData: fetchApplicationData,
    addIotdevicesData: addIotdevicesData,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddIOTDevice);