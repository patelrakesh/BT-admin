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
import Logo from '../../../assets/utils/images/BT-transparentLogo.png'//logo.png BT-Logo.png
import Avatar from '../../../assets/utils/images/avatars/1.jpg'

class HeaderCustom extends Component {
    render() {
        return (
            <div className="main-container">
                <Row>
                    <Col md={2}><img src={Logo} height='50px' /></Col>
                    <Col md={7}>
                        <ul className="header_links">
                            <li>Home</li>
                            <li>Home</li>
                            <li>Home</li>
                            <li>Home</li>
                            <li>Home</li>
                            <li><i className="fa fa-search" /></li>
                        </ul>
                    </Col>
                    <Col md={3} style={{display: 'inline-flex'}}>
                        <Col md={2}>
                        <img src={Avatar} className="avatar" />
                        </Col>
                        <Col md={4} style={{color: '#fff'}} className="user_deatils">                            
                            <span>User Name</span>
                            <p>Manager</p>
                        </Col>
                        <Col md={6}>
                            <Button style={{marginTop: '10px'}}>Get Free Quote</Button>
                        </Col>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default HeaderCustom;