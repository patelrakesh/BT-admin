/* eslint-disable no-useless-constructor */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { fetchResetDetails } from '../../services/SideNavItem';
import Notification from '../../library/notification';
import BG_Logo from '../../assets/utils/images/BT-HighRes-Logo.5eb3d28f.png';
import {
    Row, Col, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, Input, FormGroup, Card, CardBody, CardHeader
} from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import { Redirect } from 'react-router-dom';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className='required_message'>{message}</div>
        }, { autoForceUpdate: this })
    }
    state = {
        email: '',
        reset_msg: '',
        redirect_login: false,
    }

    componentWillReceiveProps = (props) => { }

    componentDidMount = async () => { }

    onsubmit = async () => {        
        if (this.validator.allValid()) {
            const { fetchResetDetails } = this.props;
            await fetchResetDetails(this.state.email);
            let { SideNavItem } = this.props.data;
            this.setState({ reset_msg: SideNavItem.reset_send_data });            
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        const { Status, SideNavItem } = this.props.data;
        return (
            <Fragment>
                 {this.state.redirect_login && <Redirect to='/login' />}
                {/* <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>                        */}
                    <div className="login_bg_main">
                    {this.state.reset_msg !== '' && <Notification msg={SideNavItem.reset_send_data} status='success' />}
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
                                            <FormGroup>
                                                <Button className='btn-success btn' style={{ width: '100%' }} onClick={() => this.onsubmit()}>Submit</Button>
                                            </FormGroup>
                                        </Col>
                                    </Row> 
                                    <Row>
                                        <Col md={12} className="back_forgot">
                                            <FormGroup>
                                                <p onClick={()=>this.setState({redirect_login: true})}><i class="fa fa-arrow-left"></i> Back</p>
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
    fetchResetDetails: fetchResetDetails,
}, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPassword);