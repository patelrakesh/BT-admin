import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import 'rc-checkbox/assets/index.css';
import { fetchLocationData } from '../../services/IOTDevice';
import { fetchOrganizationData } from '../../services/Location';
import { fetchGatwayTypeData, addGateway, editGateway } from '../../services/Gateway';
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

class EditGateway extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className='required_message'>{message}</div>
        }, { autoForceUpdate: this })
    }

    state = {
        organization: '',
        location: '',
        gatewaytype: '',
        label: '',
        gatewayId: '',
        id: '',
    }

    componentDidMount = async () => {
        await this.getData();
    }

    getData = async () => {
        setTimeout(async () => {
            const { fetchOrganizationData } = this.props;
            await fetchOrganizationData();
            let props = this.props;
            if (props.getEditData) {
                let { Location } = this.props.data;
                var entity = {};
                var entityId = '';
                Location.orgnizationdata && Location.orgnizationdata.map((item, index) => {
                    if (item.reference === props.getEditData.entityReference) {
                        entity = { value: item.reference, label: item.name };
                        entityId = item.id;
                    }
                })
                const { fetchLocationData } = this.props;
                await fetchLocationData(entityId);
                this.setState({
                    id: props.getEditData.id,
                    organization: entity,
                    gatewaytype: props.getEditData.gatewayType && { value: props.getEditData.gatewayType.id, label: props.getEditData.gatewayType.value },
                    label: props.getEditData.label,
                    gatewayId: props.getEditData.gatewayId,
                })
            }
        }, 1000);
    }

    componentWillReceiveProps = async (props) => {
        const { IOTDevice, Gateways } = props.data;
        IOTDevice.locationdata && IOTDevice.locationdata.map((item, index) => {
            if (item.value === Gateways.editdata.locationLabel) {
                this.setState({ location: { value: item.id, label: item.value } });
            }
        })

        if (this.props.getEditData.id !== props.getEditData.id) {
            await this.getData();
        }
    }

    toggle = () => {
        this.props.iseditgatewaymodalcancle();
    }

    onChangeOrg = async (organization) => {
        this.setState({ organization });
        const { fetchLocationData } = this.props;
        await fetchLocationData(organization.value);
        this.setState({ location: '' })
    }

    onUpdate = async () => {
        if (this.validator.allValid()) {
            let data = {
                "id": this.state.id,
                "label": this.state.label,
                "gatewayId": this.state.gatewayId,
                "gatewayType": { "id": this.state.gatewaytype.value },
                "locations": { "id": this.state.location.value },
                "entities": { "id": this.state.organization.value }
            };
            const { editGateway } = this.props;
            await editGateway(data);
            this.props.iseditgatewaymodal();
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        const { IOTDevice, Location, Status, Gateways } = this.props.data;
        let orgnizationdata = Location.orgnizationdata.map(function (item) {
            return { value: item.id, label: item.name };
        })
        let locationdata = IOTDevice.locationdata && IOTDevice.locationdata.map(function (item) {
            return { value: item.id, label: item.value };
        })
        let gatewaytypedata = Gateways.gatewaytypedata && Gateways.gatewaytypedata.map(function (item) {
            return { value: item.id, label: item.value };
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
                        {Status.status !== '' && Status.page === 'editgateway' && this.props.notitype === 'editgateway' &&
                            <Fragment>
                                <Notification msg={Status.notificationMsg} status={Status.status} show={this.props.addusermodal} />
                            </Fragment>
                        }
                        <Modal isOpen={this.props.editgatewaymodal} toggle={() => this.toggle()} className={this.props.className} id='add_location'>
                            <ModalHeader toggle={() => this.toggle()}>Edit Gateway</ModalHeader>
                            <ModalBody>
                                    <Form>
                                        <Row>
                                            <Col md='6'>
                                                <FormGroup>
                                                    <Label for="Firstname">Organization*</Label>
                                                    <Select
                                                        value={this.state.organization}
                                                        onChange={(organization) => this.onChangeOrg(organization)}
                                                        options={orgnizationdata}
                                                        placeholder='Select Organization'
                                                    />
                                                    {this.validator.message('organization', this.state.organization, 'required')}
                                                </FormGroup>
                                            </Col>
                                            <Col md='6'>
                                                <FormGroup>
                                                    <Label for="lastname">Locations*</Label>
                                                    <Select
                                                        value={this.state.location}
                                                        onChange={(location) => this.setState({ location })}
                                                        options={locationdata}
                                                        placeholder='Select Location'
                                                    />
                                                    {this.validator.message('location', this.state.location, 'required')}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md='12'>
                                                <FormGroup>
                                                    <Label for="Firstname">GatewayType *</Label>
                                                    <Select
                                                        value={this.state.gatewaytype}
                                                        onChange={(gatewaytype) => this.setState({ gatewaytype })}
                                                        options={gatewaytypedata}
                                                        placeholder='Select Gateways Type'
                                                    />
                                                    {this.validator.message('gatewaytype', this.state.gatewaytype, 'required')}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md='6'>
                                                <FormGroup>
                                                    <Label for="label">Label *</Label>
                                                    <Input type='text' id="label"
                                                        onChange={(e) => this.setState({ label: e.target.value })} value={this.state.label} placeholder='Label' />
                                                    {this.validator.message('label', this.state.label, 'required')}
                                                </FormGroup>
                                            </Col>
                                            <Col md='6'>
                                                <FormGroup>
                                                    <Label for="gatewayId">GateWayId *</Label>
                                                    <Input type='text' id="gatewayId"
                                                        onChange={(e) => this.setState({ gatewayId: e.target.value })} value={this.state.gatewayId} placeholder='GateWayId' />
                                                    {this.validator.message('gatewayId', this.state.gatewayId, 'required')}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="light" onClick={() => this.toggle()}>Cancel</Button>
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
    fetchOrganizationData: fetchOrganizationData,
    fetchLocationData: fetchLocationData,
    fetchGatwayTypeData: fetchGatwayTypeData,
    addGateway: addGateway,
    editGateway: editGateway,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditGateway);
