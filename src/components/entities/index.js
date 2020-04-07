/* eslint-disable no-useless-constructor */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PageTitle from '../../components/includes/PageTitle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { fetchEntitiesData, editentitiey } from '../../services/Entities';
import Editentitiey from './edit_entitie';
import Appnetwork from './app_network';
import {
    Row, Col, Card, CardBody, CardHeader, Button,
} from 'reactstrap';
import { DataTable } from 'react-data-components';
import { MDBDataTable } from 'mdbreact';

// import ReactTable from "react-table";
// import "react-table/react-table.css";
import Loading from '../../library/loader';
import Addentitie from './add_entitie';

class Entities extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        allentitidata: [],
        addentitiemodal: false,
        notitype: '',
        editentitieymodal: false,
        id: '',
        loranetworkmodal: false,
        closemodal:true,
        checked:false,
    }

    componentWillReceiveProps = (props) => {
        let data1 = props.data.Entities.entitiydata;
        let allentitidata = [];
        data1 && data1.map((item, index) => {
            allentitidata.push({
                "id": item.id,
                "reference": item.reference,
                "name": item.name,
                "type": item.type,
                "industrySector": item.industrySector,
                "enableLora": item.enableLora,
                "loranetwork": <div><i className={`pe-7s-signal lora_network ${item.enableLora === true ? 'greennetwork' : 'rednetwork'}`}   style={{ cursor: 'pointer' }} 
                checked={item.enableLora && item.enableLora === 1 ? true : false} onClick={() => this.onlora_network(item)}  /></div>,
                "action": <div><i className="lnr-pencil" style={{ cursor: 'pointer' }} onClick={() => this.editEntitiey(item.id)} /></div>,
            })           
        })
        this.setState({ allentitidata });
    }

    componentDidMount = async () => {
        const { fetchEntitiesData, editentitiey } = this.props;
        await fetchEntitiesData();
        await editentitiey();
    }
    isaddentitimodal = () => {
        this.setState({ addentitiemodal: !this.state.addentitiemodal });
        this.setState({ notitype: 'addentitie' });
         this.setState({ notitype: '' });
    }
    addEntitie = () => {
        this.setState({ addentitiemodal: !this.state.addentitiemodal });
        this.setState({ notitype: 'addentitie' });
        this.setState({ notitype: '' });
    }
    editEntitiey = (id) => {
        const { editentitiey } = this.props;
        editentitiey(id);
        this.setState({ editentitieymodal: !this.state.editentitieymodal });
        this.setState({ notitype: 'editentitiey' });
        this.setState({ notitype: '' });
    }
    iseditentitieymodal = () => {
        this.setState({ editentitieymodal: !this.state.editentitieymodal });
        this.setState({ notitype: 'editentitiey' })
    }
    iseditentitieymodalcancle=()=>{
        this.setState({ editentitieymodal: !this.state.editentitieymodal });
    }
    onlora_network = (item, checked) => {
        if(item.enableLora == true) {
            this.setState({ checked });
            const { editentitiey } = this.props;
            editentitiey(item.id);
            this.setState({ loranetworkmodal: !this.state.loranetworkmodal });
            this.setState({ notitype: 'appnetlora' })
            this.setState({ notitype: '' });
        }
    }
    isloranetworkmodal = () => {
        this.setState({ loranetworkmodal: !this.state.loranetworkmodal });
        this.setState({ notitype: 'appnetlora' })
    }
    shownoti = (val) => {
        this.setState({ notitype: val });        
    };
    render() {
        const { Entities, Status } = this.props.data;
        const columns = [
            {
                title: 'Reference',
                prop: 'reference',
                // width: '50px',
            },
            {
                title: 'Name',
                prop: 'name',
                // width: '80px',
            },
            {
                title: 'Type',
                prop: 'type',
                // width: '80px',
            },
            {
                title: 'Sector',
                prop: 'industrySector',
                // width: '80px',
            },
            {
                title: 'Lora Network',
                width: '25px',
                render: (val, row) => <div><i className={`pe-7s-signal lora_network ${row.enableLora === true ? 'greennetwork' : 'rednetwork'}`
             }   style={{ cursor: 'pointer' }} 
                 checked={row.enableLora && row.enableLora === 1 ? true : false}
                 onClick={() => this.onlora_network(row)}  /></div>,
            },
            {
                title: 'Actions',
                render: (val, row) => <div><i className="lnr-pencil"
                    style={{ cursor: 'pointer' }} onClick={() => this.editEntitiey(row)} /></div>,
                width: '30px',
            }
        ];
        const data = {
            columns: [
                {
                    label: 'Reference',
                    field: 'reference',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 200
                },   
                {
                    label: 'Type',
                    field: 'type',
                    sort: 'asc',
                    width: 200
                },                  
                {
                    label: 'Sector',
                    field: 'industrySector',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Lora Network',
                    field: 'loranetwork',
                    width: '50px'
                },
                {
                    label: 'Action',
                    field: 'action',
                    width: '50px'
                },
            ],
            rows: this.state.allentitidata
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
                                heading="Entities"
                                icon="fa fa-building-o icon-gradient bg-mean-fruit"
                            />
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    <Row style={{ width: '100%' }}>
                                        <Col md="6" style={{ textAlign: 'left' }}>
                                        </Col>
                                        <Col md="6" style={{ textAlign: 'right' }} >
                                            <Button color="success"
                                                onClick={() => this.addEntitie()} >Add Entity </Button>
                                            {<Addentitie shownoti={this.shownoti} notitype={this.state.notitype}                        
                                             addentitiemodal={this.state.addentitiemodal} isaddentitimodal={this.isaddentitimodal} />}
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody className='page_css' id="user_tbl">
                                    {/* <DataTable
                                        columns={columns}
                                        initialData={this.state.allentitidata}
                                        initialPageLength={10}
                                        initialSortBy={{
                                            prop: 'industrySector', prop: 'name', 
                                             prop: 'type',  prop: 'reference',  order: 'descending',
                                        }}
                                        sortable={true}
                                    /> */}
                                    <MDBDataTable
                                        striped
                                        bordered
                                        hover                                        
                                        // responsiveXl
                                        // responsiveSm
                                        // responsiveMd
                                        // searchLabel="q" 
                                        btn 
                                        responsive
                                        info={false}
                                        data={data}
                                        order={['industrySector', 'desc'], ['name', 'desc'], ['type', 'desc'], ['reference', 'desc'] }
                                    />
                                    <Editentitiey shownoti={this.shownoti} notitype={this.state.notitype}                                       
                                        editentitieymodal={this.state.editentitieymodal} iseditentitieymodal={this.iseditentitieymodal} entitiyeditid={this.state.entitiyeditid}
                                        entitiyeditid={this.state.id} iseditentitieymodalcancle={this.iseditentitieymodalcancle}/>
                                    <Appnetwork shownoti={this.shownoti} notitype={this.state.notitype}
                                        loranetworkmodal={this.state.loranetworkmodal}
                                        isloranetworkmodal={this.isloranetworkmodal} />
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
    fetchEntitiesData: fetchEntitiesData,
    editentitiey: editentitiey
}, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Entities);