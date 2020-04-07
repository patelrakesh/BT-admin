import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import { fetchSectorTypeData, fetchEntitiTypeData, addEntitiy } from '../../services/Entities';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, Input, FormGroup
} from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import Notification from '../../library/notification';
class Addentitie extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className='required_message'>{message}</div>
        }, {autoForceUpdate: this})
    }
    state = {
        type: '',
        name: '',
        sector: '',
        entitistepdata: [],
        loranetwork: false,  
        messageForType:false,
        messageForSector:false,
    }
    componentDidMount = async () => {
        const { fetchSectorTypeData, fetchEntitiTypeData } = this.props;
        await fetchSectorTypeData();
        await fetchEntitiTypeData();
        this.validator.hideMessageFor('Name');
        this.validator.hideMessages();
    }
    componentWillReceiveProps = (props) => {
    }
    addnameentitiy = (e) => {
        this.setState({ name: e.target.value });
    }
    onCheckedloranetwork = (e) => {
        this.setState({ loranetwork: e.target.checked });
    }
    onChangeName=(e)=>{
        this.setState({ name: e.target.value });
        this.validator.showMessageFor('Name');
    }
  
    toggle = () => {
        this.props.isaddentitimodal();
        // this.props.shownoti('addentitie');
        this.setState({
            type: '',
            name: '',
            sector: '',
            loranetwork: false,  
            messageForType:false,
            messageForSector:false,  
        })
        this.validator.hideMessageFor('Name');
        this.validator.hideMessages();
        this.forceUpdate();
    }
    onsave = () => {
        if (this.validator.allValid()&& this.state.type !== '' && this.state.sector !== '' ) {
            this.props.isaddentitimodal();
            let data = {
                "name": this.state.name,
                'enableLora': this.state.loranetwork,
                "entityType": { id: this.state.type.value },
                "sector": { id: this.state.sector.value }
            };
            let { addEntitiy } = this.props;
            addEntitiy(data);
            this.props.shownoti('addentitie');
            this.setState({
                type: '',
                name: '',
                sector: '',
                loranetwork: false, 
                messageForType:false,
                messageForSector:false,   
            })
            this.validator.hideMessageFor('Name');
            this.validator.hideMessages();
        } else {
            this.state.type === '' && this.setState({ messageForType: true });
            this.state.sector === '' && this.setState({ messageForSector: true });
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
                        {Status.status !== '' && Status.page === 'addentitie' && this.props.notitype === 'addentitie' &&
                            <Fragment>
                                <Notification msg={Status.notificationMsg} status={Status.status} show={this.props.addentitiemodal} />
                            </Fragment>
                        }
                        <Modal isOpen={this.props.addentitiemodal} toggle={() => this.toggle()} className={this.props.className} id='add_location'>
                            <ModalHeader toggle={() => this.toggle()}>Add Entity</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <Row>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="name">Name*</Label>
                                                <Input type='text' id="name" placeholder="Enter Name" 
                                                 value={this.state.name}                                                
                                                 onChange={(e) => this.onChangeName(e)}              
                                                  onBlurCapture={(e) => this.onChangeName(e)} 
                                                 />
                                                {this.validator.message('Name', this.state.name, 'required')}
                                            </FormGroup>
                                        </Col>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="type" >Type*</Label>
                                                <Select
                                                    value={this.state.type}
                                                  
                                                    onChange={type => this.setState({ type: type, messageForType: false })}
                          onBlur={() => this.state.type === '' ? this.setState({messageForType: true}) : this.setState({messageForType: false})}
                                                    options={addtypeentiti}
                                                    placeholder="Select Entity Type"
                                                  
                                                />
                                           {this.state.messageForType && <p className="required_message">Type is required.</p>}

                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='12'>
                                            <FormGroup>
                                                <Label for="role" >Sector</Label>
                                                <Select
                                                    value={this.state.sector}                                                 
                                                    onChange={sector => this.setState({ sector: sector, messageForSector: false })}
                          onBlur={() => this.state.sector === '' ? this.setState({messageForSector: true}) : this.setState({messageForSector: false})}
                                                    options={addsectorentiti}
                                                    placeholder='Select Sector'
                                                />
                                                 {this.state.messageForSector && <p className="required_message">Sector is required.</p>}
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
                                                        checked={this.state.loranetwork}
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
                                <Button color="success" onClick={() => this.onsave()} >Save</Button>{' '}
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
    addEntitiy: addEntitiy
}, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Addentitie);