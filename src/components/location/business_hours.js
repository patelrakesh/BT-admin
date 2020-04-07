import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLocationItemData, fetchOrganizationData, fetchLocationTypesData,
     fetchEntityTypesData, fetchDayIntervalsData } from '../../services/Location'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, FormGroup
} from 'reactstrap';

class Business_Hours extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.startend_hours = this.startend_hours.bind(this);
        this.business_hrs = this.business_hrs.bind(this);
        this.save = this.save.bind(this);
    }

    state = {
        addlocationmodal: false,
        addorganizationmodal: false,
        addpropertymodal: false,
        busi_details: [],
        saveClicked: false,
        errorClass: 'is-invalid',
    };

    componentDidMount = async () => {
        const { fetchLocationItemData, fetchOrganizationData, fetchLocationTypesData, fetchEntityTypesData, fetchDayIntervalsData } = this.props;
        fetchLocationItemData();
        fetchOrganizationData();
        fetchLocationTypesData();
        fetchEntityTypesData();
        fetchDayIntervalsData();
    }


    business_hrs = (e, index, item) => {
        let busi_details = [...this.state.busi_details];
        const index1 = busi_details.findIndex((e) => e.weekDay === item.id);
        if (index1 === -1) {
            busi_details.push({ 'businessType': e.target.value, 'weekDay': item.id, 'opensAt': null, 'closesAt': null });
        } else {
            busi_details[index1]['businessType'] = e.target.value;
            busi_details[index1]['weekDay'] = item.id;
            busi_details[index1]['opensAt'] = null;
            busi_details[index1]['closesAt'] = null;
        }
        this.setState({ busi_details });
    }

    startend_hours = (e, time, index, item) => {
        let busi_details = [...this.state.busi_details];
        busi_details.map((item1, index1) => {
            if(time === 'opensAt' && item.id === item1.weekDay){
                busi_details[index1]['opensAt'] = e.target.value;
             }
            if(time === 'closesAt' && item.id === item1.weekDay){ 
                busi_details[index1]['closesAt'] = e.target.value;
            }
        })
        this.setState({ busi_details })
    }

    toggle = () => {
        this.props.isaddmodacancle();
    }

    save = () => {
        this.setState({ saveClicked: true });
        let busi_details = this.state.busi_details;
        const busi_hrs = busi_details.findIndex((e) => parseInt(e.businessType, 10) === 3);        
        if (busi_hrs === -1) {
            this.props.business_hours(this.state.busi_details);
            this.props.isclosemodals();
        } else {            
            if(busi_details[busi_hrs]['opensAt'] !== null && busi_details[busi_hrs]['closesAt'] !== null) {
                this.props.business_hours(this.state.busi_details);
                this.props.isclosemodals();
            }
        }             
    }

    back = () => {
        this.props.isaddnextmodal();
    }

    render() {
        const { Location } = this.props.data;
        let hrsOption = [
            {
                'label': 'Holiday',
                'value': 1
            },
            {
                'label': 'Allday',
                'value': 2
            },
            {
                'label': 'Fixed Hours',
                'value': 3
            },
        ]
        let weekdays = [{id: 1, val:'Monday'}, {id: 2, val:'Tuesday'}, {id: 3, val:'Wednesday'}, {id: 4, val:'Thursday'}, {id: 5, val:'Friday'}, {id: 6, val:'Saturday'}, {id: 7, val:'Sunday'}];
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

                        <Modal isOpen={this.props.addnextmodal} toggle={() => this.toggle()} className={this.props.className} id='add_location'>
                            <ModalHeader toggle={() => this.toggle()}>Business Hours</ModalHeader>
                            <ModalBody>
                                <Form>
                                    {weekdays.map((item1, index1) => {
                                        return (
                                            <Fragment key={index1}>
                                                <Row>
                                                    <Col md='12'>
                                                            <Label>{item1.val}</Label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md='4'>
                                                        <FormGroup>
                                                            <select id={index1} className="form-control" placeholder="Select Business Hours" onChange={(e) => this.business_hrs(e, index1, item1)}>
                                                                <option selected value=''>Select Business Hours</option>
                                                                {hrsOption.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item.value}>{item.label}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </FormGroup>
                                                    </Col>                                                    
                                                    {this.state.busi_details.length > 0 && this.state.busi_details.map((item2, index2) => {
                                                        if (item2.businessType === '3' && item2.weekDay === item1.id) {
                                                            return (
                                                                <Fragment key={index2}>
                                                                    <Col md='4' >
                                                                        <FormGroup>
                                                                            <select className={`form-control ${(item2.opensAt === null || item2.opensAt === '') && this.state.saveClicked && 'is-invalid'}`}
                                                                           placeholder="Select Business Hours" onChange={(e) => this.startend_hours(e, 'opensAt', index1, item1)}>
                                                                                <option selected value=''>Start Hours</option>
                                                                                {Location.daysintervaldata.map((item, index) => {
                                                                                    return (
                                                                                        <option key={index} value={item.minutes}>{item.value}</option>
                                                                                    )
                                                                                })}
                                                                            </select>
                                                                            {(item2.opensAt === null || item2.opensAt === '') && this.state.saveClicked && <div className='required_message'>{this.props.requiredMessage}</div>
                                                }
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col md='4'>
                                                                        <FormGroup>
                                                                            <select className={`form-control ${(item2.closesAt === null || item2.closesAt === '') && this.state.saveClicked && 'is-invalid'}`}
                                                                          placeholder="Select Business Hours"  onChange={(e) => this.startend_hours(e, 'closesAt', index1, item1)}>
                                                                                <option selected value='' >End Hours</option>
                                                                                {Location.daysintervaldata.map((item, index) => {
                                                                                    return (
                                                                                        <option key={index} value={item.minutes}>{item.value}</option>
                                                                                    )
                                                                                })}
                                                                            </select>
                                                                            {(item2.closesAt === null || item2.closesAt === '') && this.state.saveClicked && <div className='required_message'>{this.props.requiredMessage}</div>
                                                                            }
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Fragment>
                                                            )
                                                        }
                                                    })
                                                    }
                                                </Row>
                                            </Fragment>
                                        )
                                    })}
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="light" onClick={() => this.back()}>Back</Button>
                                <Button color="dark" onClick={() => this.save()}>Save</Button>{' '}
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
    fetchLocationItemData: fetchLocationItemData,
    fetchOrganizationData: fetchOrganizationData,
    fetchLocationTypesData: fetchLocationTypesData,
    fetchEntityTypesData: fetchEntityTypesData,
    fetchDayIntervalsData: fetchDayIntervalsData,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Business_Hours);


