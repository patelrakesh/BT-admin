import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { fetchChangePassword } from '../../services/Header';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, Input, FormGroup
} from 'reactstrap';
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

    }

    toggle = () => {
        this.props.ischangePassmodal();
        this.validator.hideMessages();
        this.forceUpdate();
    }
    onUpdate = () => {
        if (this.validator.allValid()){
            this.props.ischangePassmodal();
        } else {
            this.props.ischangePassmodal();
        }
    }

    onCancle = () => {
        this.props.ischangePassmodal();
        this.validator.hideMessages();
        this.forceUpdate();
    }

    render() {
        return (
            <Fragment>
                <Modal isOpen={this.props.changePass} fade={false} toggle={() => this.toggle()} className={this.props.className} id='add_location'>
                    <ModalHeader toggle={() =>this.toggle()}>Change Password</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="current_password">Current Password*</Label>
                                <Input type='password' id="current_password" />
                               
                            </FormGroup>
                            <FormGroup>
                                <Label for="new_password">New Password*</Label>
                                <Input type='password' id="new_password" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirm_new_password">Confirm New Password</Label>
                                <Input type='password' id="confirm_new_password" />
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="link" onClick={() => this.onCancle()}>Cancel</Button>
                        <Button color="dark" onClick={() => this.onUpdate()}>Update</Button>{' '}
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

}, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword);
