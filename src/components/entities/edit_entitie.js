import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import { fetchSectorTypeData, fetchEntitiTypeData, addEntitiy, updatEntityData } from '../../services/Entities';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, Input, FormGroup
} from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import Notification from '../../library/notification';
var diff = require('deep-diff').diff;

class Editentitiey extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className='required_message'>{message}</div>
        }, {autoForceUpdate: this})
    }
    state = {
        name: '',
        loranetwork: false,
        sector: '',
        entitistepdata: [],
        reference: '',
        id: '',
        entityType: '',
        editentystepdata: {},
        industrysector: '',
        getappnetentidata: {},
        enableLora:false,
        
    }
    componentDidMount = async () => {
        const { fetchSectorTypeData, fetchEntitiTypeData } = this.props;
        await fetchSectorTypeData();
        await fetchEntitiTypeData();
    }   
    componentWillReceiveProps = async (props) => {
        let { Entities } = props.data;  
        Entities.entitiyuserdata && Entities.entitiyuserdata !== undefined && await this.setState({
            id: Entities.entitiyuserdata.id,
            name: Entities.entitiyuserdata.name,
            enableLora: Entities.entitiyuserdata.enableLora,
            entityType: { value: Entities.entitiyuserdata.entityType && Entities.entitiyuserdata.entityType.id, label: Entities.entitiyuserdata.type },
            sector: { value: Entities.entitiyuserdata.sector && Entities.entitiyuserdata.sector.id, label: Entities.entitiyuserdata.industrySector },
        });
            if (this.props.data.Entities && this.props.data.Entities.entitiyuserdata!== undefined) {          
                const getappnetentidata = {
                    name: this.props.data.Entities.entitiyuserdata.name,
                    enableLora: this.props.data.Entities.entitiyuserdata.enableLora,
                    entityType: {id:this.props.data.Entities.entitiyuserdata.entityType && this.props.data.Entities.entitiyuserdata.entityType.id},
                    sector: {id:this.props.data.Entities.entitiyuserdata.sector && this.props.data.Entities.entitiyuserdata.sector.id}
                }
                this.setState({getappnetentidata});
            }
    }
    addnameentitiy = (e) => {
        this.setState({ name: e.target.value });
        this.validator.showMessageFor('Name');
    }
    isloranetapp = () => {
        this.setState({ loranetwork: !this.state.loranetwork })
    }
    onCheckedloranetwork = (e) => {
        this.setState({ enableLora: e.target.checked });
    }
    toggle = () => {
        this.props.iseditentitieymodalcancle();
        
    }
    onupadate = async() => {
        if (this.validator.allValid()) {   
            let data = {
                "id": this.state.id,
                "name": this.state.name,
                'enableLora': this.state.enableLora,
                "entityType": { id: this.state.entityType.value },
                "sector": { id: this.state.sector.value }
            };
            var differences = diff(this.state.getappnetentidata, data);
            var dif = { ...dif };
            if (differences) {
                differences.map((item, index) => {
                    var value = item.rhs;
                    dif[item.path[0]] = value;
                })
            }
            dif.id = this.state.id;
            let { updatEntityData } = this.props;
            updatEntityData(dif);
            this.props.iseditentitieymodal();
            this.props.shownoti('editentitiey');
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    render() {
        const { Entities, Status } = this.props.data;
        let addtypeentiti = Entities.addentititiydata && Entities.addentititiydata.map(function (item) {
            return { value: item.id, label: item.reference };
        })
        let addsectorentiti = Entities.sectordata && Entities.sectordata.map(function (item) {
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
                        {Status.status !== '' && Status.page === 'editentitiey' && this.props.notitype === 'editentitiey' &&
                            <Fragment>
                                <Notification msg={Status.notificationMsg} status={Status.status} show={this.props.addentitiemodal} />
                            </Fragment>
                        }
                        <Modal isOpen={this.props.editentitieymodal} toggle={() => this.toggle()} className={this.props.className} id='add_location'>
                            <ModalHeader toggle={() => this.toggle()}>Edit Entity</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <Row>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="name">Name*</Label>
                                                <Input type='text' id="name" placeholder="Enter Name"onChange={(e) => this.addnameentitiy(e)} value={this.state.name} />
                                                {this.validator.message('Name', this.state.name, 'required')}
                                            </FormGroup>
                                        </Col>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="type">Entity Type*</Label>
                                                <Select
                                                    value={this.state.entityType}
                                                    onChange={(entityType) => this.setState({ entityType })}
                                                    options={addtypeentiti}
                                                    placeholder="Select Entity Type"
                                                />
                                                {this.validator.message('Entity Type', this.state.entityType, 'required')}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='12'>
                                            <FormGroup>
                                                <Label for="role" >Sector</Label>
                                                <Select
                                                    value={this.state.sector}
                                                    onChange={(sector) => this.setState({ sector })}
                                                    options={addsectorentiti}
                                                    placeholder='Select Sector'
                                                />
                                                {this.validator.message('Sector', this.state.sector, 'required')}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='12'>
                                            <FormGroup>
                                                <Label for="network">Lore NetWork Enable or Not:</Label>
                                                <br />
                                                <label style={{ cursor: 'pointer' }}>
                                                    <Checkbox
                                                        checked={this.state.enableLora}
                                                        onChange={(e) => this.onCheckedloranetwork(e)}
                                                    /> &nbsp;LoraNetWork
                                                </label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="light" onClick={() => this.toggle()} >Cancel</Button>
                                <Button color="success" onClick={() => this.onupadate()} >Update</Button>{' '}
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
    fetchSectorTypeData: fetchSectorTypeData,
    fetchEntitiTypeData: fetchEntitiTypeData,
    updatEntityData: updatEntityData,
    addEntitiy: addEntitiy,
}, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editentitiey);