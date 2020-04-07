import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
// import { fetchSectorentititypeData, fetchEntitiTypeData, addEntitiy } from '../../services/Entities';
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
import { fetchOrganizationData } from '../../services/Location';
import { fetchIOTDeviceData, fetchManufactureData, fetchParameterData, editSensor } from '../../services/Sensors';
import { fetchLocationData } from '../../services/IOTDevice';

class Editsensor extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className='required_message'>{message}</div>
        }, {autoForceUpdate: this})
    }
    state = {
        organization: '',
        iotDevices: '',
        channelNo: '',
        sensorType: '',
        locations: '',
        modelNo: '',
        manufacturer: '',
        parameters: [],
        id: '',
    }

    componentDidMount = async () => {
        this.getData();
    }

    getData = async () => {
        setTimeout(async () => {
            const { fetchOrganizationData, fetchManufactureData } = this.props;
            await fetchOrganizationData();
            await fetchManufactureData();
            let props = this.props;
            if (props.getEditData) {
                const { fetchIOTDeviceData, fetchLocationData, fetchParameterData } = this.props;
                await fetchIOTDeviceData(props.getEditData.entity.id);
                await fetchLocationData(props.getEditData.entity.id);
                await fetchParameterData( props.getEditData.manufacturers && props.getEditData.manufacturers.id, props.getEditData.modelNo);
                this.setState({
                    id: props.getEditData.id,
                    organization: { value: props.getEditData.entity.id, label: props.getEditData.entity.name },
                    iotDevices: { value: props.getEditData.iotDevices.id, label: props.getEditData.iotDevices.reference },
                    locations: { value: props.getEditData.location.id, label: props.getEditData.location.label },
                    channelNo: props.getEditData.channelNo,
                    sensorType: { value: props.getEditData.sensorType.id, label: props.getEditData.sensorType.value },
                    manufacturer: { value: props.getEditData.manufacturers.id, label: props.getEditData.manufacturers.value },
                    modelNo: props.getEditData.modelNo,
                });
                let paras = [];
                props.getEditData.parameters && props.getEditData.parameters.map((item, index) => {
                    if (item.value) {
                        paras.push({ value: item.id, label: item.value });
                    }
                })
                this.setState({ parameters: paras });
            }
        }, 1000);
    }

    componentWillReceiveProps = async (props) => {
        if (this.props.getEditData.id !== props.getEditData.id) {
            this.getData();
        }
    }

    toggle = () => {
        this.props.iseditsensoemodalcancle();
    }

    onorganization = async (organization) => {
        this.setState({ organization });
        const { fetchIOTDeviceData, fetchLocationData } = this.props;
        await fetchIOTDeviceData(organization.value);
        await fetchLocationData(organization.value);
        this.setState({ iotDevices: '', locations: '' })
    }

    onupdate = async () => {
        if (this.validator.allValid()) {
            let paras = [];
            this.state.parameters && this.state.parameters.map((item, index) => {
                return (
                    paras.push(item.value)
                )
            })
            let data = {
                "id": this.state.id,
                "parameters": paras,
                "iotDevices": { id: this.state.iotDevices.value },
                "channelNo": this.state.channelNo,
                "sensorType": { id: this.state.sensorType.value },
                "locations": { id: this.state.locations.value },
                "modelNo": this.state.modelNo,
                "manufacturer": { id: this.state.manufacturer.value },
            };
            let { editSensor } = this.props;
            await editSensor(data);
            this.props.iseditsensoemodal();
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    onChangeModelNo = async (val) => {
        await this.setState({ modelNo: val });
        if (this.state.manufacturer !== '') {
            this.parameterData();
        }
    }

    onChangeManufacture = async (manufacturer) => {
        await this.setState({ manufacturer });
        if (this.state.modelNo !== '') {
            this.parameterData();
        }
    }

    parameterData = async () => {
        let { fetchParameterData } = this.props;
        await fetchParameterData(this.state.manufacturer.value, this.state.modelNo);
    }

    render() {
        const { Sensors, Status, Location, IOTDevice } = this.props.data;
        let orgnizationdata = Location.orgnizationdata.map(function (item) {
            return { value: item.id, label: item.name };
        })
        let sensoriotdata = Sensors.iotdevicedata && Sensors.iotdevicedata.map(function (item) {
            return { value: item.id, label: item.reference }
        })
        let locationdata = IOTDevice.locationdata && IOTDevice.locationdata.map(function (item) {
            return { value: item.id, label: item.value }
        })
        let sensortypedata = Sensors.sensortypedata && Sensors.sensortypedata.map(function (item) {
            return { value: item.id, label: item.value }
        })
        let manufacturerdata = Sensors.manufacturedata && Sensors.manufacturedata.map(function (item) {
            return { value: item.id, label: item.value }
        })
        let parameterdata = Sensors.parameterdata && Sensors.parameterdata.map(function (item) {
            return { value: item.id, label: item.value }
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
                        {Status.status !== '' && Status.page === 'editsensor' && this.props.notitype === 'editsensor' &&
                            <Fragment>
                                <Notification msg={Status.notificationMsg} status={Status.status} show={this.props.addsensormodal} />
                            </Fragment>
                        }
                        <Modal isOpen={this.props.editsensormodal} toggle={() => this.toggle()} className={this.props.className} id='add_location'>
                            <ModalHeader toggle={() => this.toggle()}>Edit Sensor</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <Row>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="type" >Organization *</Label>
                                                <Select
                                                    value={this.state.organization}
                                                    onChange={(organization) => this.onorganization(organization)}
                                                    options={orgnizationdata}
                                                    placeholder="Select Organization"
                                                />
                                                {this.validator.message('Organization', this.state.organization, 'required')}
                                            </FormGroup>
                                        </Col>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="type" >IOT Devices*</Label>
                                                <Select
                                                    value={this.state.iotDevices}
                                                    onChange={(iotDevices) => this.setState({ iotDevices })}
                                                    options={sensoriotdata}
                                                    placeholder="Select IOT Device"

                                                />
                                                {this.validator.message('IOTDevices', this.state.iotDevices, 'required')}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='12'>
                                            <FormGroup>
                                                <Label for="location" >Locations*</Label>
                                                <Select
                                                    value={this.state.locations}
                                                    onChange={(locations) => this.setState({ locations })}
                                                    options={locationdata}
                                                    placeholder='Select Location'

                                                />
                                                {this.validator.message('Location', this.state.locations, 'required')}

                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="name">Channel No</Label>
                                                <Input type='number' id="Channel No" placeholder="Channel No"
                                                   placeholder="Channel No"
                                                   onChange={(e) => this.setState({ channelNo: e.target.value })} value={this.state.channelNo}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md='6'>
                                            <Label for="sensor" >Sensor Types*</Label>
                                            <Select
                                                value={this.state.sensorType}
                                                onChange={(sensorType) => this.setState({ sensorType })}
                                                options={sensortypedata}
                                                placeholder='Select Sensor'

                                            />
                                            {this.validator.message('Sensortype', this.state.sensorType, 'required')}

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='6'>
                                            <Label for="manufacture" >Manufactures*</Label>
                                            <Select
                                                value={this.state.manufacturer}
                                                onChange={(manufacturer) => this.onChangeManufacture(manufacturer)}
                                                options={manufacturerdata}
                                                placeholder='Select Manufacture'

                                            />
                                            {this.validator.message('Manufacture', this.state.manufacturer, 'required')}

                                        </Col>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="name">Modal No*</Label>
                                                <Input type='text' id="name" placeholder="Modal No" onChange={(e) => this.onChangeModelNo(e.target.value)} value={this.state.modelNo} />
                                                {this.validator.message('Modalno', this.state.modelNo, 'required')}
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col md='12'>
                                            <Label for="parameter" >Parameters</Label>
                                            <Select
                                                value={this.state.parameters}
                                                onChange={(parameters) => this.setState({ parameters })}
                                                options={parameterdata}
                                                isMulti
                                                placeholder='Choose Parameters'
                                            />
                                        </Col>
                                    </Row>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="light" onClick={() => this.toggle()} >Cancel</Button>
                                <Button color="success" onClick={() => this.onupdate()}>Update</Button>{' '}
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
    fetchIOTDeviceData: fetchIOTDeviceData,
    fetchManufactureData: fetchManufactureData,
    fetchParameterData: fetchParameterData,
    fetchLocationData: fetchLocationData,
    editSensor: editSensor,
}, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editsensor);
