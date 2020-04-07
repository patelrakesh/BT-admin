import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Notification extends Component {
    constructor(props) {
        super(props);
    }

    state = {
    }

    componentDidMount = () => {   
        // console.log("msg::", this.props.msg);
        this.props.page && this.props.page !== '' && this.props.status === 'error' && toast.error(this.props.msg);
        this.props.status === 'success' && toast.success(this.props.msg);
        this.props.status === 'error' && !this.props.page && toast.error('There is Something Wrong! Please try again...');        
    }

    render() {        
        return (
            <Fragment>
                <ToastContainer
                    position="top-right"
                    autoClose={7000}
                    newestOnTop={false}
                    closeOnClick={true}
                    hideProgressBar={false}
                    // rtl={false}
                    //transition= "bounce" //zoom, silde, bounce, flip
                    pauseOnVisibilityChange={false}
                    draggable={false}
                    // pauseOnHover
                />
            </Fragment>
        )
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
)(Notification);






































