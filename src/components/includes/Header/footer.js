import React, { Component, Fragment } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../../../assets/custom.css';
import {
    Row, Col, Card, CardBody, CardTitle, Table, CardHeader, Button,
    DropdownToggle, DropdownMenu,
    Nav, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, Input, FormGroup, DropdownItem
} from 'reactstrap';
import Logo from '../../../assets/utils/images/BT-Logo.png'//logo.png
import Avatar from '../../../assets/utils/images/avatars/1.jpg'

class Footer extends Component {
    render() {
        return (
            <Fragment>
                <div className="ftr">
                    <Row>
                        <Col md={4} className="first_ftr">
                            <img src={Logo} height='50px' />
                            <h2>About us</h2>
                            <p>Dummy textDummy textDummy textDummy textDummy textDummy textDummy textDummy textDummy text</p>
                        </Col>
                        <Col md={4} className="cntct">
                            <h2>Contact Us</h2>
                            <Form>
                                <FormGroup><Input type='text' placeholder="Name" /></FormGroup>
                                <FormGroup><Input type='text' placeholder="Email" /></FormGroup>
                                <FormGroup><Input type='text' placeholder="Number" /></FormGroup>
                                <FormGroup><textarea className="form-control"></textarea></FormGroup>
                                <FormGroup><Button>Send message</Button></FormGroup>
                            </Form>
                        </Col>
                        <Col md={4}>
                            <h2>Title</h2>
                            <ul className="footer_links">
                                <li>Home</li>
                                <li>Home</li>
                                <li>Home</li>
                                <li>Home</li>
                                <li>Home</li>
                            </ul>
                        </Col>
                    </Row>
                </div>
                <Row className="btn_ftr">
                    <p>© 2020 Bridge Things. All rights reserved.</p>
                </Row>
            </Fragment>
        )
    }
}
export default Footer;