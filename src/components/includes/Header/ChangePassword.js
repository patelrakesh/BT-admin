import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchChanePasswordUpadateData } from '../../../services/SideNavItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, Input, FormGroup
} from 'reactstrap';
import Notification from '../../../library/notification'
import SimpleReactValidator from 'simple-react-validator';
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className='required_message'>{message}</div>
        }, { autoForceUpdate: this })
    }
    state = {
        showCurrentPasswprd: false,
        showNewPasswprd: false,
        showConfNewPasswprd: false,
        password: "",
        newpassword: "",
        confpassword: "",
        matchpass: '',
    }
    componentDidMount = async () => {

    }
    componentWillReceiveProps = async (props) => {
    }

    toggle = () => {
        this.props.isCancleChangePassmodal();
        this.setState({
            password: "",
            newpassword: "",
            confpassword: ""
        });
        this.validator.hideMessages();
        this.forceUpdate();
    }
    onUpdate = async () => {
        if (this.validator.allValid()) {
            if (this.state.newpassword === this.state.confpassword) {
                const { fetchChanePasswordUpadateData } = this.props;
                let data = { "oldPassword": this.state.password, "password": this.state.newpassword, "confirmPassword": this.state.confpassword, "token": localStorage.getItem('BTauthToken') }
                await fetchChanePasswordUpadateData(data);
                this.props.ischangePassmodal(); 
                this.props.shownoti('changePassword');                               
                this.setState({
                    password: "",
                    newpassword: "",
                    confpassword: ""
                })
            } else {
                this.setState({ matchpass: 'New Password and Confirm Password does not match!' });
            }
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    onCancle = () => {
        this.props.isCancleChangePassmodal();
        this.forceUpdate();
    }
    render() {
        const { Status, SideNavItem } = this.props.data;
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
                        <Modal isOpen={this.props.changePass} toggle={() => this.toggle()}
                            className={this.props.className} id='add_location'>
                            <ModalHeader toggle={() => this.toggle()}>Change Password</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup className="password_login">
                                                <Label for="current_password">Current Password*</Label>
                                                <Input type={this.state.showCurrentPasswprd ? 'text' : 'password'}
                                                    placeholder="Current Password"
                                                    onChange={(e) => this.setState({ password: e.target.value })}
                                                    value={this.state.password}
                                                    onBlurCapture={() => this.validator.showMessageFor('Password')}
                                                />
                                                <i class={this.state.showCurrentPasswprd ? "fa fa-eye" : "fa fa-eye-slash"}
                                                    onClick={() => this.setState({
                                                        showCurrentPasswprd: !this.state.showCurrentPasswprd
                                                    })}></i>

                                                {this.validator.message(
                                                    'Password',
                                                    this.state.password,
                                                    'required'
                                                )}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup className="password_login">
                                                <Label for="new_password">New Password*</Label>
                                                <Input type={this.state.showNewPasswprd ? 'text' : 'password'}
                                                    placeholder="Current Password"
                                                    onChange={(e) => this.setState({ newpassword: e.target.value })}
                                                    value={this.state.newpassword}
                                                    onBlurCapture={() => this.validator.showMessageFor('Newpassword')}
                                                />
                                                <i class={this.state.showNewPasswprd ? "fa fa-eye" : "fa fa-eye-slash"}
                                                    onClick={() => this.setState({
                                                        showNewPasswprd: !this.state.showNewPasswprd
                                                    })}></i>

                                                {this.validator.message(
                                                    'Newpassword',
                                                    this.state.newpassword,
                                                    'required'
                                                )}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup className="password_login">
                                                <Label for="confirm_new_password">Confirm New Password</Label>
                                                <Input type={this.state.showConfNewPasswprd ? 'text' : 'password'}
                                                    placeholder="Current Password"
                                                    onChange={(e) => this.setState({ confpassword: e.target.value })}
                                                    value={this.state.confpassword}
                                                    onBlurCapture={() => this.validator.showMessageFor('Confirmnewpassword')}
                                                />
                                                <i class={this.state.showConfNewPasswprd ? "fa fa-eye" : "fa fa-eye-slash"} onClick={() => this.setState({ showConfNewPasswprd: !this.state.showConfNewPasswprd })}></i>
                                                {this.validator.message(
                                                    'Confirmnewpassword',
                                                    this.state.confpassword,
                                                    'required'
                                                )}
                                                {this.state.matchpass !== '' && <p className="required_message">{this.state.matchpass}</p>}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="light" onClick={() => this.onCancle()}>Cancel</Button>
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
    fetchChanePasswordUpadateData: fetchChanePasswordUpadateData

}, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword);