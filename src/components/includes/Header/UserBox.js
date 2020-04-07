import React, { Fragment } from 'react';
import {
    DropdownToggle, DropdownMenu,
    Nav, Button, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, Input, FormGroup, DropdownItem
} from 'reactstrap';
import {
    toast,
    Bounce
} from 'react-toastify';
import {
    faCalendarAlt,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import avatar1 from '../../../assets/utils/images/avatars/1.jpg';
import { fetchtopUseritemdata } from '../../../services/SideNavItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChangePassword from './ChangePassword';
import AccoumtDetail from './AccountDetails';
import Logout from './Logout';
import Notification from '../../../library/notification'

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            changePass: false,
            accountdetail: false,
            notitype: '',
            notify_message: '',
        };
    }
    componentDidMount = async () => {
        const { fetchtopUseritemdata } = this.props;
        await fetchtopUseritemdata();
    }
    onChangePass = () => {
        this.setState({ changePass: !this.state.changePass, notitype: '' });
    }
    onChangeAccount = () => {
        this.setState({ accountdetail: !this.state.accountdetail, notitype: '' });
    }
    onLogout = () => {
        this.setState({ logoutmodal: !this.state.logoutmodal, notitype: '' });
    }
    ischangePassmodal = () => {
        this.setState({ changePass: !this.state.changePass });
        this.setState({ notitype: 'changePassword' })
    }
    isCancleChangePassmodal = () => {
        this.setState({ changePass: !this.state.changePass });
    }
    ischangeAccountmodal = () => {
        this.setState({ accountdetail: !this.state.accountdetail });
        this.setState({ notitype: 'accountudata' })
    }
    isCancleChangeAccountmodal = () => {
        this.setState({ accountdetail: !this.state.accountdetail })
    }
    islogoutmodal = () => {
        this.setState({ logoutmodal: !this.state.logoutmodal });
        this.setState({ notitype: 'logout' })
    }
    isCancleLogoutmodal = () => {
        this.setState({ logoutmodal: !this.state.logoutmodal });
    }
    shownoti = (val) => {
        this.setState({ notitype: val });
    };

    render() {
        const { Status, SideNavItem } = this.props.data;
        var splitdata = SideNavItem.topuserdata.text && SideNavItem.topuserdata.text.split(" | ");
        var user_nm = splitdata && splitdata[0];
        var role = splitdata && splitdata[1];
        var menuItems = SideNavItem.topuserdata.menuItems && SideNavItem.topuserdata.menuItems;
        return (
            <Fragment>
                {this.state.notitype !== '' &&
                    <Fragment>
                        <Notification msg={Status.status === 'success' ? Status.notificationMsg : Status.notificationMsg.response.data.message} status={Status.status} page='user' />
                    </Fragment>
                }
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <img width={42} className="rounded-circle" src={avatar1} alt="" />
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <DropdownItem className="nav-item-header">
                                            My Account
                                            </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <NavLink href="#" onClick={() => this.onChangePass()}>
                                                Change Password
                                                </NavLink>
                                            <ChangePassword shownoti={this.shownoti} notitype={this.state.notitype}
                                                changePass={this.state.changePass} ischangePassmodal={this.ischangePassmodal} isCancleChangePassmodal={this.isCancleChangePassmodal} />
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink href="#" onClick={() => this.onChangeAccount()}>
                                                Account Details
                                                </NavLink>
                                            <AccoumtDetail shownoti={this.shownoti} notitype={this.state.notitype}
                                                accountdetail={this.state.accountdetail} ischangeAccountmodal={this.ischangeAccountmodal} isCancleChangeAccountmodal={this.isCancleChangeAccountmodal} />
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink href="#" onClick={() => this.onLogout()}>
                                                Log Out
                                                </NavLink>
                                            <Logout shownoti={this.shownoti} notitype={this.state.notitype} logoutmodal={this.state.logoutmodal} islogoutmodal={this.islogoutmodal} isCancleLogoutmodal={this.isCancleLogoutmodal} />
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                            <div className="widget-content-left  ml-3 header-user-info">
                                <div className="widget-heading">
                                    {user_nm}
                                </div>
                                <div className="widget-subheading">
                                    {role}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

// export default UserBox;
const mapStateToProps = state => {
    return { data: state }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchtopUseritemdata: fetchtopUseritemdata,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserBox);
