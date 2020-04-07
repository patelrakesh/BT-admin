import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGatwaysData, fetchEditData } from '../../services/Gateway';
import PageTitle from '../../components/includes/PageTitle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col, Card, CardBody, Table, CardHeader, Button,
} from 'reactstrap';
import AddGateway from './add_gateway';
import EditGateways from './edit_gateway';
import { DataTable } from 'react-data-components';
import Loading from '../../library/loader';
class Gateways extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        alltabledata: [],
        showaddnoti: '',
        editgatewaymodal: false,
        addgatewaymodal: false,
        editdata: '',
    };
    componentWillReceiveProps = (props) => {
        let data = props.data.Gateways.gatewaydata;
        let alltabledata = [];
        data && data.map((item, index) => {
            alltabledata.push({
                "id": item.id,
                "label": item.label,
                "gatewayId": item.gatewayId,
                "deviceType": item.deviceType,
                "type": item.type,
                "locationLabel": item.locationLabel,
                "entityReference": item.entityReference
            })
        })
        this.setState({ alltabledata });
        props.data.Gateways.editdata && this.setState({ editdata: props.data.Gateways.editdata });
    }
    componentDidMount = async () => {
        const { fetchGatwaysData } = this.props;
        await fetchGatwaysData();
    }
    shownoti = (val) => {
        this.setState({ notitype: val });
    }
    edit_gateways = async (row) => {
        let { fetchEditData } = this.props;
        await fetchEditData(row.id);
        this.setState({ editgatewaymodal: !this.state.editgatewaymodal });
        this.setState({ notitype: '' });
    }
    add_gateways = () => {
        this.setState({ addgatewaymodal: !this.state.addgatewaymodal });
        this.setState({ notitype: '' });
    }
    isaddgatewaymodal = () => {
        this.setState({ addgatewaymodal: !this.state.addgatewaymodal });
        this.setState({ notitype: 'addgateway' });
    }
    isaddgatewaymodalcancle = () => {
        this.setState({ addgatewaymodal: !this.state.addgatewaymodal });
    }
    iseditgatewaymodal = () => {
        this.setState({ editgatewaymodal: !this.state.editgatewaymodal });
        this.setState({ notitype: 'editgateway' });
    }
    iseditgatewaymodalcancle = () => {
        this.setState({ editgatewaymodal: !this.state.editgatewaymodal });
    }
    render() {
        const { Gateways, Status } = this.props.data;
        const columns = [
            {
                title: 'Label',
                prop: 'label',
                width: '190px'
            },
            {
                title: 'GateWay Id',
                prop: 'gatewayId',
                // width: '40px'
            },
            {
                title: 'GateWay Type',
                prop: 'type',
                // width: '50px'
            },
            {
                title: 'Location Label',
                prop: 'locationLabel',
                // width: '70px'
            },
            {
                title: 'Entity Reference',
                prop: 'entityReference',
                // width: '20px'
            },
            {
                title: 'Actions',
                render: (val, row) => <div><i className="lnr-pencil"
                    style={{ cursor: 'pointer' }} onClick={() => this.edit_gateways(row)} /></div>,
                width: '50px'
            },
        ];
        // console.log("editdata::", this.state.editdata, "gateways::", Gateways.editdata);
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
                                heading="Gateways"
                                icon="lnr-apartment icon-gradient bg-mean-fruit"
                            />
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    <Row style={{ width: '100%' }}>
                                        <Col md="6" style={{ textAlign: 'left' }}></Col>
                                        <Col md="6" style={{ textAlign: 'right' }} >
                                            <Button color="success" onClick={() => this.add_gateways()}>Add Gateways</Button>
                                            <AddGateway shownoti={this.shownoti} notitype={this.state.notitype} addgatewaymodal={this.state.addgatewaymodal} isaddgatewaymodal={this.isaddgatewaymodal} isaddgatewaymodalcancle={this.isaddgatewaymodalcancle} />
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody className='page_css' id="user_tbl">
                                    <DataTable
                                        columns={columns}
                                        initialData={this.state.alltabledata}
                                        initialPageLength={10}
                                        initialSortBy={{
                                            prop: "label", prop: "gatewayId", prop: "deviceType", prop: "type", prop: "locationLabel", prop: "entityReference", order: 'descending'
                                        }}
                                        sortable={true}
                                    />
                                    {this.state.editdata !== '' && <EditGateways shownoti={this.shownoti} notitype={this.state.notitype} editgatewaymodal={this.state.editgatewaymodal} iseditgatewaymodal={this.iseditgatewaymodal} getEditData={Gateways.editdata} iseditgatewaymodalcancle={this.iseditgatewaymodalcancle} />}
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
    fetchGatwaysData: fetchGatwaysData,
    fetchEditData: fetchEditData,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Gateways);






