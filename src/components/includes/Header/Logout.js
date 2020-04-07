import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../services/SideNavItem';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, Input, FormGroup
} from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import Notification from '../../../library/notification';
import { Route, Link, Switch, HashRouter, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Login from '../../login';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    state = {

    }

    toggle = () => {
        this.props.isCancleLogoutmodal();
    }
    onLogout = async () => {
        let { logout } = this.props;
        await logout();
        this.props.islogoutmodal();
    }

    onCancle = () => {
        this.props.isCancleLogoutmodal();
    }

    render() {
        const { Status } = this.props.data;
        return (
            <Fragment>
                {Status.status !== '' && Status.status === 'success' && Status.page === 'logout' && this.props.notitype === 'logout' &&
                    <Redirect to={{ pathname: "login" }} />
                }               
                <Modal isOpen={this.props.logoutmodal} toggle={() => this.toggle()} className={this.props.className} id='add_location'>
                    <ModalHeader toggle={() => this.toggle()}>Logout</ModalHeader>
                    <ModalBody>
                        <p>Are you sure want to logout?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="light" onClick={() => this.onCancle()}>Cancel</Button>
                        <Button color="danger" onClick={() => this.onLogout()}>Log Out</Button>{' '}
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}


const mapStateToProps = state => ({
    data: state,
})
const mapDispatchToProps = dispatch => bindActionCreators({
    logout: logout,
}, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout);
