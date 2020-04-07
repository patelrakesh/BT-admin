import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';
import {
    Row, Col, Card, CardBody, CardTitle, Table, CardHeader, Button,
    DropdownToggle, DropdownMenu,
    Nav, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, FormGroup, DropdownItem
} from 'reactstrap';
import { fetchEditPrimaryLocation } from '../../services/User';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SimpleReactValidator from 'simple-react-validator';
import Notification from '../../library/notification';
import _ from "lodash";
import { Input } from "semantic-ui-react";

class Editprimarylocation extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    state = {
        editprilocmodal: false,
        nexteditprimarylocation: false,
        selectedLocation: [],
        expanded: [],
        treeData: [],
        keyword: '',
    }

    componentWillMount = async () => {
        if (this.props.data.User.editlocationdata && this.props.data.User.editlocationdata.length > 0) {
            let treeData = this.props.data.User.editlocationdata && this.props.data.User.editlocationdata.map((item, index) => {
                return (
                    {
                        value: item.key,
                        label: item.label,
                        children:
                            item.children && item.children.map((item1, index1) => {
                                return (
                                    {
                                        value: item1.key,
                                        label: item1.label,
                                        children:
                                            item1.children && item1.children.map((item2, index2) => {
                                                return (
                                                    {
                                                        value: item2.key,
                                                        label: item2.label,
                                                        children:
                                                            item2.children && item2.children.map((item3, index3) => {
                                                                return (
                                                                    {
                                                                        value: item3.key.split('||')[1],
                                                                        label: item3.label,
                                                                        checked: item3.checked,
                                                                        partialChecked: item3.partialChecked
                                                                    }
                                                                )
                                                            }),
                                                        checked: item2.checked,
                                                        partialChecked: item2.partialChecked
                                                    }
                                                )
                                            }),
                                        checked: item1.checked,
                                        partialChecked: item1.partialChecked
                                    }
                                )
                            }),
                        checked: item.checked,
                        partialChecked: item.partialChecked
                    }
                )
            })
            await this.setState({ treeData: treeData });
        }
    }
    componentWillReceiveProps = async (props) => {
        if (props.data.User.editlocationdata && props.data.User.editlocationdata.length > 0) {
            let treeData = props.data.User.editlocationdata && props.data.User.editlocationdata.map((item, index) => {
                return (
                    {
                        value: item.key,
                        label: item.label,
                        children:
                            item.children && item.children.map((item1, index1) => {
                                return (
                                    {
                                        value: item1.key,
                                        label: item1.label,
                                        children:
                                            item1.children && item1.children.map((item2, index2) => {
                                                return (
                                                    {
                                                        value: item2.key,
                                                        label: item2.label,
                                                        children:
                                                            item2.children && item2.children.map((item3, index3) => {
                                                                return (
                                                                    {
                                                                        value: item3.key.split('||')[1],
                                                                        label: item3.label,
                                                                        checked: item3.checked,
                                                                        partialChecked: item3.partialChecked
                                                                    }
                                                                )
                                                            }),
                                                        checked: item2.checked,
                                                        partialChecked: item2.partialChecked
                                                    }
                                                )
                                            }),
                                        checked: item1.checked,
                                        partialChecked: item1.partialChecked
                                    }
                                )
                            }),
                        checked: item.checked,
                        partialChecked: item.partialChecked
                    }
                )
            })
            await this.setState({ treeData: treeData });
        }
    }

    backedit =() => {
        this.props.iscloseeditmodalprilocsuser();
        this.props.iseditprilocmodaluser();
       
    }
    toggle = () => {
        this.props.iseditprilocmodalusercancle();
    }
    onSave = async () => {
        await this.props.locationData(this.state.selectedLocation);
       this.props.iseditprilocmodaluser();
        
    }
    onSearchInputChange = (event, data, searchedNodes) => {
        this.setState(prevState => {
            if (prevState.keyword.trim() && !data.value.trim()) {
                return {
                    expanded: [],
                    keyword: data.value
                };
            }
            return {
                expanded: this.getAllValuesFromNodes(searchedNodes, true),
                keyword: data.value
            };
        });
    };

    getHighlightText = (text, keyword) => {
        const startIndex = text.indexOf(keyword);
        return startIndex !== -1 ? (
            <span>
                {text.substring(0, startIndex)}
                <span style={{ color: "#2cb664" }}>
                    {text.substring(startIndex, startIndex + keyword.length)}
                </span>
                {text.substring(startIndex + keyword.length)}
            </span>
        ) : (
                <span>{text}</span>
            );
    };

    keywordFilter = (nodes, keyword) => {
        let newNodes = [];
        for (let n of nodes) {
            if (n.children) {
                const nextNodes = this.keywordFilter(n.children, keyword);
                if (nextNodes.length > 0) {
                    n.children = nextNodes;
                } else if (n.label.toLowerCase().includes(keyword.toLowerCase())) {
                    n.children = nextNodes.length > 0 ? nextNodes : [];
                }
                if (
                    nextNodes.length > 0 ||
                    n.label.toLowerCase().includes(keyword.toLowerCase())
                ) {
                    n.label = this.getHighlightText(n.label, keyword);
                    newNodes.push(n);
                }
            } else {
                if (n.label.toLowerCase().includes(keyword.toLowerCase())) {
                    n.label = this.getHighlightText(n.label, keyword);
                    newNodes.push(n);
                }
            }
        }
        return newNodes;
    };

    getAllValuesFromNodes = (nodes, firstLevel) => {
        if (firstLevel) {
            const values = [];
            for (let n of nodes) {
                values.push(n.value);
                if (n.children) {
                    values.push(...this.getAllValuesFromNodes(n.children, false));
                }
            }
            return values;
        } else {
            const values = [];
            for (let n of nodes) {
                values.push(n.value);
                if (n.children) {
                    values.push(...this.getAllValuesFromNodes(n.children, false));
                }
            }
            return values;
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.keyword !== nextState.keyword) {
            return true;
        }
        if (!_.isEqual(this.state.selectedLocation, nextState.selectedLocation)) {
            return true;
        }
        if (_.isEqual(this.state.expanded, nextState.expanded)) {
            return false;
        }
        return true;
    }

    OncheckTreeData = async (checked) => {
        await this.setState({ selectedLocation: checked });
    }

    render() {
        const { Status } = this.props.data;
        let searchedNodes = this.state.keyword.trim()
            ? this.keywordFilter(_.cloneDeep(this.state.treeData), this.state.keyword)
            : this.state.treeData;
            console.log("this.props.editprilocmodal::", this.props.editprilocmodal);
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
                        {Status.status !== '' && Status.page === 'editprimarylocation' && this.props.notitype === 'editprimarylocation' &&
                            <Fragment>
                                <Notification msg={Status.notificationMsg} status={Status.status} show={this.props.addnextmodaluser} />
                            </Fragment>
                        }
                        <Modal isOpen={this.props.editprilocmodal} toggle={() => this.toggle()} className={this.props.className} id='edit_location'>
                            <ModalHeader toggle={() => this.toggle()}>Edit Primary Location</ModalHeader>
                            <ModalBody>
                                <Card>
                                    <CardHeader>
                                        <h5 for="primarylocation" style={{marginBottom:"0"}}>Locations</h5>
                                    </CardHeader>
                                    <CardBody style={{ height: "600px",overflowY:"auto"}}>
                                        <Row>
                                            <Col md='12'>
                                                <FormGroup style={{marginBottom: "0"}}>
                                                    <Input
                                                        className='search_location'
                                                        style={{ marginBottom: "20px" }}
                                                        fluid
                                                        icon="search"
                                                        placeholder="Search Primary Locations..."
                                                        iconPosition="left"
                                                        onChange={(event, data) => {
                                                            this.onSearchInputChange(event, data, searchedNodes);
                                                        }}
                                                        autoComplete='off'
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md='12'>
                                                <FormGroup>
                                                        <CheckboxTree
                                                            nodes={searchedNodes}
                                                            checked={this.state.selectedLocation}
                                                            expanded={this.state.expanded}
                                                            onCheck={checked => {
                                                                this.OncheckTreeData(checked)
                                                            }}
                                                            onExpand={expanded => this.setState({ expanded })}
                                                            expandOnClick
                                                            onClick={() => {
                                                                console.log("on click");
                                                            }}
                                                            showNodeIcon={false}
                                                        />
                                                   
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="light" onClick={() => this.backedit()}>Back</Button>
                                <Button color="success" onClick={() => this.onSave()}>Update</Button>{' '}
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
    fetchEditPrimaryLocation: fetchEditPrimaryLocation,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editprimarylocation);