import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PageTitle from '../../components/includes/PageTitle';
import { fetchUserData, fetchUpdateUserStatus, editUser } from '../../services/User';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Adduser from './add_user';
import Switch from "react-switch";
import {
    Row, Col, Card, CardBody, CardTitle, Table, CardHeader, Button,
    DropdownToggle, DropdownMenu,
    Nav, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, Input, FormGroup, DropdownItem
} from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import Loading from '../../library/loader';
import Edituser from './edit_user';
import Notification from '../../library/notification';

class Users extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        alluserdata: [],
        addusermodal: false,
        showaddnoti: '',
        checked: false,
        editusermodal: false,
        notitype: '',
    }

    componentWillReceiveProps = (props) => {
        let data = props.data.User.useritem;
        let alluserdata = [];
        data && data.map((item, index) => {
            alluserdata.push({
                "id": item.id,
                "firstName": item.firstName,
                "lastName": item.lastName,
                "username": item.username,
                "email": item.email,
                "entityName": item.entityName,
                "entityId": item.entityId,
                "lastLoginOn": item.lastLoginOn,
                "activatedAt": item.activatedAt,
                "loginCount": item.loginCount,
                "roleName": item.roleName,
                "status": item.status,
                "notificationMode": item.notificationMode,
                "action": <div><i className="lnr-pencil" style={{ cursor: 'pointer' }} onClick={() => this.edit_user(item)} /></div>,
                "alerts": <div>
                <Switch
                    checked={item.status && item.status === 1 ? true : false}
                    onChange={() => this.handleChange(item)}
                    height={20}
                    width={35}
                    className="react-switch"
                    id="small-radius-switch"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor="#007ad9"
                />
                {item.notificationMode && item.notificationMode.split(', ').indexOf('Email') > -1 && <i className="pe-7s-mail" />}{" "}
                {item.notificationMode && item.notificationMode.split(', ').indexOf('Phone') > -1 && <i className="pe-7s-comment" />}
            </div>
            })
        })
        this.setState({ alluserdata });
    }

    componentDidMount = async () => {
        const { fetchUserData, editUser } = this.props;
        await fetchUserData();
        await editUser();
    }
    handleChange(row, checked) {
        this.setState({ notitype: '' });
        this.setState({ checked });
        let updatestatus = { "id": row.id, "status": row.status === 0 ? 1 : 0 };
        let { fetchUpdateUserStatus } = this.props;
        fetchUpdateUserStatus(updatestatus);
        this.setState({ notitype: 'userstatus' });
        // }
    }
    isaddusermodal = () => {
        this.setState({ addusermodal: !this.state.addusermodal });
        this.setState({ notitype: 'adduser' });
    };
    add_user = () => {
        this.setState({ addusermodal: !this.state.addusermodal });
        this.setState({ notitype: '' });
    };
    edit_user = async(item) => {
        const { editUser } = this.props;
        await editUser(item.id);
        this.setState({ editusermodal: !this.state.editusermodal });
        this.setState({ notitype: '' });
    }
    iseditusermodal = () => {
        this.setState({ editusermodal: !this.state.editusermodal });
        this.setState({ notitype: 'edituser' })
    }
    shownoti = (val) => {
        this.setState({ notitype: val });
    };
    render() {
        const { User, Status } = this.props.data;
        const data = {
            columns: [
                {
                    label: 'Roles',
                    field: 'roleName',
                    sort: 'asc',
                    width: '50px'
                },
                {
                    label: 'First Name',
                    field: 'firstName',
                    sort: 'asc',
                    width: '60px'
            
                },
                {
                    label: 'Last Name',
                    field: 'lastName',
                    sort: 'asc',
                    width: '80px'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                    width: '100px'
                },
                {
                    label: 'Organization',
                    field: 'entityName',
                    sort: 'asc',
                    width: '150px',
                },
                // {
                //     label: 'Intitial Login',
                //     field: 'activatedAt',
                //     sort: 'asc',
                //     width: '120px'
            
                // },
                {
                    label: 'Last Login',
                    field: 'lastLoginOn',
                    sort: 'asc',
                    width: '120px'
                },
                // {
                //     label: 'No.of Logins',
                //     field: 'loginCount',
                //     sort: 'asc',
                //     width: '30px'
            
                // },
                {
                    label: 'Actions',
                    field: 'action',
                    width: '40px'
                },
                {
                    label: 'Alerts',
                    field: 'alerts',
                    sort: 'asc',
                    width: 100,
                },
            ],
            rows: this.state.alluserdata
        }
        return (
            <Fragment>
                {Status.loading && <Loading />}
                {Status.status !== '' && Status.page === 'userstatus' && this.state.notitype === 'userstatus' &&
                    <Fragment>
                        <Notification msg={Status.notificationMsg} status={Status.status} show={this.props.addlocationmodal} />
                    </Fragment>
                }
                {!Status.loading &&
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="TabsAnimation"
                        transitionAppear={true}
                        transitionAppearTimeout={0}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <div>
                            <PageTitle
                                heading="Users"
                                icon="pe-7s-users icon-gradient bg-mean-fruit"
                            />
                           
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    <Row style={{ width: '100%' }}>
                                        <Col md="6" style={{ textAlign: 'left' }}>

                                        </Col>
                                        <Col md="6" style={{ textAlign: 'right' }} >
                                            <Button color="success"
                                                onClick={() => this.add_user()}
                                            >Add User</Button>
                                            {<Adduser shownoti={this.shownoti} notitype={this.state.notitype}
                                                addusermodal={this.state.addusermodal} isaddusermodal={this.isaddusermodal} /> }
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody className='page_css' id="user_tbl">
                                    <MDBDataTable
                                        className='user_list'
                                        striped
                                        bordered
                                        hover
                                        btn
                                        responsive
                                        info={false}
                                        data={data}
                                        order={['firstName', 'desc'], ['lastName', 'desc'], ['email', 'desc'], ['entityName', 'desc'], ['lastLoginOn', 'desc'], ['loginCount', 'desc'], ['activatedAt', 'desc']}
                                    />
                                    {<Edituser shownoti={this.shownoti} notitype={this.state.notitype} editusermodal={this.state.editusermodal} iseditusermodal={this.iseditusermodal}  />}
                                </CardBody>
                            </Card>
                        </div>
                    </ReactCSSTransitionGroup>
                }
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    data: state,
})
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUserData: fetchUserData,
    fetchUpdateUserStatus: fetchUpdateUserStatus,
    editUser: editUser,
}, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);


