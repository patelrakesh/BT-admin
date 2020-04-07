import React, { Component, Fragment } from 'react';
import { fetchSensorData, fetchEditSensorData } from '../../services/Sensors';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PageTitle from '../../components/includes/PageTitle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col, Card, CardBody, CardHeader, Button,
} from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import Loading from '../../library/loader';
import Addsensor from './add_sensor';
import EditSensor from './edit_sensor';

class Sensors extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        alltablesensdata: [],
        addsensormodal: false,
    }

    componentWillReceiveProps = (props) => {
        let data = props.data.Sensors.sensordata;
        let alltablesensdata = [];
        data && data.map((item, index) => {
            alltablesensdata.push({
                "reference": item.reference,
                "channelNo": item.channelNo,
                "sensorType": item.sensorType.value,
                "manufacturers": item.manufacturers.value,
                "modelNo": item.modelNo,
                "sensorStatus": item.sensorStatus,
                "lastDataAt": item.lastDataAt,
                "floor": item.floor,
                "id": item.id,
                "action": <div><i className="lnr-pencil" style={{ cursor: 'pointer' }} onClick={() => this.editSensor(item)} /></div>,
            })
        })
        this.setState({ alltablesensdata });
    }

    componentDidMount = async () => {
        const { fetchSensorData } = this.props;
        await fetchSensorData();
    }

    isaddsensoemodal = () => {
        this.setState({ addsensormodal: !this.state.addsensormodal });
        this.setState({ notitype: 'addsensor' });
    }
    iseditsensoemodal = () => {
        this.setState({ editsensormodal: !this.state.editsensormodal });
        this.setState({ notitype: 'editsensor' });
    }
    isaddsensoemodalcancle = () => {
        this.setState({ addsensormodal: !this.state.addsensormodal });
    }
    iseditsensoemodalcancle = () => {
        this.setState({ editsensormodal: !this.state.editsensormodal });
    }

    addSensor = () => {
        this.setState({ addsensormodal: !this.state.addsensormodal });
        this.setState({ notitype: 'addsensor' });
        this.setState({ notitype: '' });
    }

    editSensor = async (row) => {
        let { fetchEditSensorData } = this.props;
        await fetchEditSensorData(row.id);
        this.setState({ editsensormodal: !this.state.editsensormodal });
        this.setState({ notitype: 'editsensor' });
        this.setState({ notitype: '' });
    }

    render() {
        const { Status, Sensors } = this.props.data;
        const data = {
            columns : [
                {
                    label: 'Reference',
                    field: 'reference',
                    sort: 'asc',
                    width: '150px'
                },
                {
                    label: 'ChannelNo',
                    field: 'channelNo',
                    sort: 'asc',
                    width: '50px'
                },
                {
                    label: 'Sensor Type',
                    field: 'sensorType',
                    sort: 'asc',
                    // width: '80px'
                },
                {
                    label: 'Manufacture',
                    field: 'manufacturers',
                    sort: 'asc',
                    // width: '80px'
                },
                {
                    label: 'ModelNo',
                    field: 'modelNo',
                    sort: 'asc',
                    // width: '50px'
                },
                {
                    label: 'Sensor Status',
                    field: 'sensorStatus',
                    sort: 'asc',
                    width: '50px'
                },
                {
                    label: 'Last Data At',
                    field: 'lastDataAt',
                    sort: 'asc',
            
                },
                {
                    label: 'Actions',
                    field: 'action',
                },
            ],
            rows: this.state.alltablesensdata
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
                                heading="Sensors"
                                icon="pe-7s-wristwatch icon-gradient bg-mean-fruit"
                            />
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    <Row style={{ width: '100%' }}>
                                        <Col md="6" style={{ textAlign: 'left' }}>
                                        </Col>
                                        <Col md="6" style={{ textAlign: 'right' }} >
                                            <Button color="success"
                                                onClick={() => this.addSensor()}
                                            >Add Sensors
                                             </Button>
                                            <Addsensor shownoti={this.shownoti} notitype={this.state.notitype} addsensormodal={this.state.addsensormodal} isaddsensoemodal={this.isaddsensoemodal} isaddsensoemodalcancle={this.isaddsensoemodalcancle} />
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody className='page_css' id="user_tbl">
                                    <MDBDataTable
                                        striped
                                        bordered
                                        hover
                                        btn
                                        responsive
                                        info={false}
                                        data={data}
                                        order={['channelNo', 'desc'], ['sensorStatus', 'desc'], ['sensorType', 'desc'], ['manufacturers', 'desc'], ['modelNo', 'desc'], ['lastDataAt', 'desc']}
                                    />
                                    {Sensors.editdata && <EditSensor shownoti={this.shownoti} notitype={this.state.notitype} editsensormodal={this.state.editsensormodal} iseditsensoemodal={this.iseditsensoemodal} iseditsensoemodalcancle={this.iseditsensoemodalcancle} getEditData={Sensors.editdata} />}
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
    fetchSensorData: fetchSensorData,
    fetchEditSensorData: fetchEditSensorData,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sensors);