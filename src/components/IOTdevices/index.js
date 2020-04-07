import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchIOTDeviceData, fetchEditData, fetchLoraConfig } from '../../services/IOTDevice';
import PageTitle from '../../components/includes/PageTitle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col, Card, CardBody, CardHeader, Button,
} from 'reactstrap';
import AddIOTDevice from './add_device';
import EditIOTDevice from './edit_device';
import LoraConfig from './lora_config';
import { MDBDataTable, MDBContainer, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Loading from '../../library/loader';

class IOTDevices extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        alltabledata: [],
        showaddnoti: '',
        editdevicemodal: false,
        adddevicemodal: false,
        loraconfigmodal: false,
        loraconfig: '',
        deviceId: '',
    };

    componentWillReceiveProps = (props) => {
        let data = props.data.IOTDevice.devicedata;
        let alltabledata = [];
        data && data.map((item, index) => {
            alltabledata.push({
                "id": item.id,
                "deviceId": item.deviceId,
                "reference": item.reference,
                "deviceType": item.deviceType.value,
                "appKey": item.appKey,
                "networkKey": item.networkKey,
                "application": item.application,
                "dutyCycleMin": item.dutyCycleMin,
                "status": item.status,
                "lastConfigAt": item.lastConfigAt,
                "createdAt": item.createdAt,
                "lastModifiedAt": item.lastModifiedAt,
                'action': <div><i className="lnr-pencil" style={{ cursor: 'pointer' }} onClick={() => this.edit_device(item)} /></div>,
                'loraconfig': <div><i className="pe-7s-config" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => this.edit_loraconfig(item)} /></div>
            })
        })
        this.setState({ alltabledata });
    }

    componentDidMount = async () => {
        const { fetchIOTDeviceData } = this.props;
        await fetchIOTDeviceData();
    }

    shownoti = (val) => {
        this.setState({ notitype: val });
    }

    edit_device = async (row) => {
        let { fetchEditData } = this.props;
        await fetchEditData(row.id);
        this.setState({ editdevicemodal: !this.state.editdevicemodal });
        this.setState({ notitype: '' });
    }

    edit_loraconfig = async (row) => {
        let { fetchLoraConfig } = this.props;
        await fetchLoraConfig(row.deviceId);
        let { IOTDevice } = this.props.data;
        IOTDevice.loraconfigdata && this.setState({ loraconfig: IOTDevice.loraconfigdata, deviceId: row.deviceId });
        if (IOTDevice.loraconfigdata) {
            this.setState({ loraconfigmodal: true });
        }
    }

    addDevice = () => {
        this.setState({ adddevicemodal: !this.state.adddevicemodal });
        this.setState({ notitype: 'adddevice' });
    }

    isaddiotdevicemodal = () => {
        this.setState({ adddevicemodal: !this.state.adddevicemodal });
        this.setState({ notitype: 'adddevice' });
    }

    isaddiotdevicemodalcancle = () => {
        this.setState({ adddevicemodal: !this.state.adddevicemodal });
    }

    iseditdevicemodal = () => {
        this.setState({ editdevicemodal: !this.state.editdevicemodal });
        this.setState({ notitype: 'editdevice' });
    }

    iseditdevicemodalcancle = () => {
        this.setState({ editdevicemodal: !this.state.editdevicemodal });
    }

    isloraconfigmodal = () => {
        this.setState({ notitype: 'loraconfig' });
    }

    isloraconfigmodalcancle = () => {
        this.setState({ loraconfigmodal: !this.state.loraconfigmodal });
    }

    render() {
        const { IOTDevice, Status } = this.props.data;
        const data = {
            columns: [
                {
                    label: 'Device Id',
                    field: 'deviceId',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Reference',
                    field: 'reference',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'Device Type',
                    field: 'deviceType',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'AppKey',
                    field: 'appKey',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Network Key',
                    field: 'networkKey',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Application',
                    field: 'application',
                    sort: 'asc',
                    width: 60
                },
                {
                    label: 'Duty Cycle Min',
                    field: 'dutyCycleMin',
                    sort: 'asc',
                    // width: 100
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                    // width: 10
                },
                // {
                //     label: 'LastConfigAt',
                //     field: 'lastConfigAt',
                // sort: 'asc',
                //     width: '30px'
                // },
                // {
                //     label: 'CreatedAt',
                //     field: 'createdAt',
                // sort: 'asc',
                //     width: '30px'
                // },
                // {
                //     label: 'LastModifiedAt',
                //     field: 'lastModifiedAt',
                // sort: 'asc',
                //     width: '30px'
                // },
                {
                    label: 'Actions',
                    field: 'action',
                    width: 20
                },
                {
                    label: 'Lora Config',
                    field: 'loraconfig',
                    width: 20
                },
            ],
            rows: this.state.alltabledata
        }
        return (
            <Fragment>
                {Status.loading && <Loading />}
                {!Status.loading &&
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="TabsAnimation"
                        transitionAppear={true}
                        transitionAppearTimeout={0}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <div>
                            <PageTitle
                                heading="IOT Devices"
                                icon="pe-7s-phone icon-gradient bg-mean-fruit"
                            />
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    <Row style={{ width: '100%' }}>
                                        <Col md="6" style={{ textAlign: 'left' }}>
                                        </Col>
                                        <Col md="6" style={{ textAlign: 'right' }} >
                                            <Button color="success" onClick={() => this.addDevice()}>Add IOT Device</Button>
                                            <AddIOTDevice shownoti={this.shownoti} notitype={this.state.notitype} adddevicemodal={this.state.adddevicemodal} isaddiotdevicemodal={this.isaddiotdevicemodal} isaddiotdevicemodalcancle={this.isaddiotdevicemodalcancle} />
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody className='page_css iot_devices' id="user_tbl">
                                    {/* <MDBContainer>
                                <MDBTable responsiveLg>
                                <MDBTableHead columns={data.columns} />
                                <MDBTableBody rows={data.rows} /> */}
                                    <MDBDataTable
                                        striped
                                        bordered
                                        hover
                                        responsiveXl
                                        responsiveSm
                                        responsiveMd
                                        // searchLabel="q" 
                                        btn
                                        responsive
                                        info={false}
                                        autoWidth={false}
                                        data={data}
                                        order={['entityReference', 'desc'], ['deviceId', 'desc'], ['reference', 'desc'], ['deviceType', 'desc'], ['appKey', 'desc'], ['networkKey', 'desc'], ['application', 'desc'], ['dutyCycleMin', 'desc'], ['status', 'desc'], ['lastConfigAt', 'desc'], ['createdAt', 'desc'], ['lastModifiedAt', 'desc']}
                                    />
                                    {/* </MDBTable>
                                    </MDBContainer> */}
                                    {IOTDevice.editdata && <EditIOTDevice shownoti={this.shownoti} notitype={this.state.notitype} editdevicemodal={this.state.editdevicemodal} iseditdevicemodal={this.iseditdevicemodal} getEditData={IOTDevice.editdata} iseditdevicemodalcancle={this.iseditdevicemodalcancle} />}
                                    {this.state.loraconfig !== '' && this.state.loraconfig.length > 0 && <LoraConfig loraconfigmodal={this.state.loraconfigmodal} isloraconfigmodal={this.isloraconfigmodal} isloraconfigmodalcancle={this.isloraconfigmodalcancle} shownoti={this.shownoti} notitype={this.state.notitype} deviceId={this.state.deviceId} loraconfig={this.state.loraconfig} />}
                                </CardBody>
                            </Card>
                        </div>
                    </ReactCSSTransitionGroup>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    data: state,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchIOTDeviceData: fetchIOTDeviceData,
    fetchEditData: fetchEditData,
    fetchLoraConfig: fetchLoraConfig,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IOTDevices);


