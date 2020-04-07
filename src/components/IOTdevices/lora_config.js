import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import 'rc-checkbox/assets/index.css';
import { sendLoraConfig } from '../../services/IOTDevice';
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

class LoraConfig extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className='required_message'>{message}</div>
        })
    }
    state = {

    }

    componentDidMount = async () => {

    }

    toggle = () => {
        this.props.isloraconfigmodalcancle();
    }

    send_config = async (item, index) => {
        let configData = { "deviceId": item.deviceId, "sensorReference": item.sensorReference, "sensorNo": item.sensorNo, "sensorType": item.sensorType, "paramsToRead": item.paramsToRead, "parmasToCalculate": item.parmasToCalculate, "formatString": item.formatString, "configPacket": item.configPacket, "multipliers": item.multipliers, "status": item.status }
        let { sendLoraConfig } = this.props;
        await sendLoraConfig(configData);
        this.props.isloraconfigmodal();
    }

    render() {
        const { Status } = this.props.data;
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
                        {Status.status !== '' && Status.page === 'loraconfig' && this.props.notitype === 'loraconfig' &&
                            <Fragment>
                                <Notification msg={Status.notificationMsg} status={Status.status} show={this.props.addusermodal} />
                            </Fragment>
                        }
                        <Modal isOpen={this.props.loraconfigmodal} toggle={() => this.toggle()} className={this.props.className} id='loraconfig'>
                            <ModalHeader toggle={() => this.toggle()}>IOTDevice Config</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <Row>
                                        <Col md={12}><b>DeviceId :</b> {this.props.deviceId}</Col>
                                    </Row>
                                    <Row className="table_margin">
                                        <Table className="table_wid">
                                            <thead>
                                                <tr style={{ backgroundColor: '#cccccc30' }}>
                                                    <th>Sensor No</th>
                                                    <th>Sensor Type</th>
                                                    <th className="wid_lora_param">Params To Read</th>
                                                    <th>Format String</th>
                                                    <th className="wid_lora_param">Config Packet</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props.loraconfig && this.props.loraconfig.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{item.sensorNo}</td>
                                                            <td>{item.sensorType}</td>
                                                            <td>{item.paramsToRead}</td>
                                                            <td>{item.formatString}</td>
                                                            <td>{item.configPacket}</td>
                                                            <td className="status_lora">{item.status}</td>
                                                            <td><Button className="btn btn-success" onClick={() => this.send_config(item, index)}>Send Config</Button></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </Row>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="light" onClick={() => this.toggle()}>Cancel</Button>
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
    sendLoraConfig: sendLoraConfig
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoraConfig);