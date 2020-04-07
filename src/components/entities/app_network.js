import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import 'rc-checkbox/assets/index.css';
import { fetchLorTypeData, updatedEntitieData } from '../../services/Entities';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, Input, FormGroup, DropdownItem
} from 'reactstrap';
import Notification from '../../library/notification';

class Appnetlora extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        add: '',
        application: [],
        applicationtypes: [{ reference: "" }],
        defaultapplication: [],
        editloraid: '',
    }
    componentDidMount = async () => {
        const { fetchLorTypeData } = this.props;
        await fetchLorTypeData();
    }
    componentWillReceiveProps = async (props) => {
        const { Entities } = props.data;
        Entities.entitiyuserdata !== undefined && Entities.entitiyuserdata.applications && await this.setState({ defaultapplication: Entities.entitiyuserdata.applications, editloraid: Entities.entitiyuserdata.id });
    }
    onsave = () => {
        let data = {
            id: this.state.editloraid,
            applications: this.state.applicationtypes
        }
        let { updatedEntitieData } = this.props;
        updatedEntitieData(data);
        this.props.isloranetworkmodal();
        this.setState({ notitype: 'appnetlora' });
        this.setState({applicationtypes: [{ reference: "" }], application: []});
    }
    // onsave = () => {
    //     let data = {
    //         id: this.state.editloraid,
    //         applications: this.state.applicationtypes
    //     }
    //     let { updatedEntitieData } = this.props;
    //     updatedEntitieData(data);
    //     this.props.isloranetworkmodal();
    //     // this.setState({ notitype: 'appnetlora' });
    //     this.setState({applicationtypes: [{ reference: "" }], application: []});
    //     this.props.shownoti('appnetlora');
    // }
    handleNameChange = evt => {
        this.setState({ add: evt.target.value });
    };
    handleApplicationTypeChange = idx => evt => {
        let application = [...this.state.application];
        application[idx] = evt;
        this.setState({ application });
        const newApplicationTypes = this.state.applicationtypes.map((applicationtype, sidx) => {
            if (idx !== sidx) return applicationtype;
            return { ...applicationtype, reference: evt.value };
        });
        this.setState({ applicationtypes: newApplicationTypes });
    };
    handleRemoveApplicationType = idx => () => {
        this.setState({
            applicationtypes: this.state.applicationtypes.filter((s, sidx) => idx !== sidx)
        });
    };
    handleAddApplicationType = () => {
        this.setState({
            applicationtypes: this.state.applicationtypes.concat([{ reference: "" }])
        });
    };
    toggle = () => {
        this.props.isloranetworkmodal();
    }

    render() {
        const { Entities, Status } = this.props.data;
        let Appentitype = Entities.loraappdata && Entities.loraappdata.map(function (item) {
            return { value: item.reference, label: item.value };
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
                        {Status.status !== '' && Status.page === 'appnetlora' && this.state.notitype === 'appnetlora' &&
                            <Fragment>
                                <Notification msg={Status.notificationMsg} status={Status.status} show={this.props.addentitiemodal} />
                            </Fragment>
                        }
                        <Modal isOpen={this.props.loranetworkmodal} toggle={() => this.toggle()} className={this.props.className} id='add_location'>

                            <ModalHeader toggle={() => this.toggle()}>Applications

                            </ModalHeader>

                            <ModalBody>
                                <div className="add_btn_modal"><a style={{ cursor: 'pointer' }} onClick={this.handleAddApplicationType} ><i className="pe-7s-plus"> </i> Add </a></div>

                                <Form className="modal_form">

                                    <Row>
                                        <Col md='6'>
                                            <FormGroup>
                                                <Label for="Firstname">Application Type</Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    {this.state.defaultapplication.length > 0 && this.state.defaultapplication.map((item, index) => {
                                        return (
                                            <Row>
                                                <Col md='6'>
                                                    <FormGroup>
                                                        <Input type="text" disabled type="text" placeholder="Select Application Type"maxLength="50" className="form-control" value={item.value} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        )
                                    })

                                    }
                                    {this.state.applicationtypes.map((applicationtype, idx) => (
                                        <Row>
                                            <Col md='6'>
                                                <FormGroup>
                                                    <Select
                                                        placeholder={" Select Application Type"}
                                                        options={Appentitype}
                                                        value={this.state.application[idx]}
                                                        onChange={this.handleApplicationTypeChange(idx)}
                                                    >Select Application Type
                                                </Select>
                                                </FormGroup>
                                            </Col>
                                            <Col md='2'>
                                                <FormGroup>
                                                    <button type="button" className="btn btn-primary close_btn" onClick={this.handleRemoveApplicationType(idx)}>X</button>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    ))}
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
    fetchLorTypeData: fetchLorTypeData,
    updatedEntitieData: updatedEntitieData,

}, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Appnetlora);