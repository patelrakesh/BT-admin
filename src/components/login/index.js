/* eslint-disable no-useless-constructor */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { fetchLoginDetails } from '../../services/SideNavItem';
import Notification from '../../library/notification';
import BG_Logo from '../../assets/utils/images/BT-HighRes-Logo.5eb3d28f.png';
import {
    Row, Col, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, Input, FormGroup, Card, CardBody, CardHeader
} from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import { Redirect } from 'react-router-dom';
class Login extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className='required_message'>{message}</div>
        }, { autoForceUpdate: this })
    }
    state = {
        email: '',
        password: '',
        showPass: false,
        login_status: '',
        login_message: '',
        redirect_forgot: false,
    }

    componentWillReceiveProps = (props) => { }

    componentDidMount = async () => { }

    onLogin = async () => {
        this.setState({ login_status: '', login_message: '' });
        if (this.validator.allValid()) {
            const { fetchLoginDetails } = this.props;
            const logindata = { "email": this.state.email, "password": this.state.password };
            await fetchLoginDetails(logindata);
            let { SideNavItem } = this.props.data;
            this.setState({ login_status: SideNavItem.status });
            SideNavItem.status === 'error' && this.setState({ login_message: SideNavItem.res_data.response.data.message });            
            // if(SideNavItem.status === 'error'){
            //     this.setState({email: '', password: ''});
            // }
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        const { Status, SideNavItem } = this.props.data;
        return (
            <Fragment>
                {this.state.redirect_forgot && <Redirect to='/forgot-password' />}
                {/* <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}> */}
                    <div className="login_bg_main">
                    {this.state.login_status === 'error' && <Notification msg={SideNavItem.res_data.response.data.message} page="login" status={this.state.login_status} />}
                        <Card id="bt_login_page">
                            <CardHeader>
                                <img src={BG_Logo} alt='logo' width='45%' />
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input type='text' id="email" placeholder="Enter Email"
                                                    value={this.state.email}
                                                    onChange={(e) => this.setState({ email: e.target.value })}
                                                    onBlurCapture={(e) => this.validator.showMessageFor('Email')}
                                                />
                                                {this.validator.message('Email', this.state.email, 'required|email')}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup className="password_login">
                                                <Label for="password">Password</Label>
                                                <Input type={this.state.showPass ? 'text' : 'password'} id="password" placeholder="Enter Password"
                                                    value={this.state.password}
                                                    onChange={(e) => this.setState({ password: e.target.value })}
                                                    onBlurCapture={(e) => this.validator.showMessageFor('Password')}
                                                />
                                                <i className={this.state.showPass ? "fa fa-eye" : "fa fa-eye-slash"} onClick={() => this.setState({ showPass: !this.state.showPass })}></i>
                                                {this.validator.message('Password', this.state.password, 'required')}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Button className='btn-success btn' style={{ width: '100%' }} onClick={() => this.onLogin()}>Login</Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>                                
                                    <Row>
                                        <Col md={12} className="reset_pass">
                                            <FormGroup>
                                                <p onClick={()=>this.setState({redirect_forgot: true})}>Reset Password</p>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                {/* </ReactCSSTransitionGroup> */}
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    data: state,
})
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchLoginDetails: fetchLoginDetails,
}, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);


