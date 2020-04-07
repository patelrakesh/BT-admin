import React, { Suspense, lazy, Fragment, Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { bindActionCreators } from 'redux';
import ResizeDetector from 'react-resize-detector';
import Header from '../components/includes/Header';
import LeftSidebar from '../components/includes/LeftSidebar';
import Location from '../components/location';
import User from '../components/users';
import Entities from '../components/entities';
import IOTDevices from '../components/IOTdevices';
import Sensors from '../components/sensors';
import Gateways from '../components/gateways';
import Login from '../components/login';
import ForgotPassword from '../components/login/forgot_pasword';
import PerformanceDashboard from '../components/dashboards/performance';
import { Route, Link, Switch, HashRouter, BrowserRouter as Router, Redirect } from 'react-router-dom';
// import { fetchSidenavItemData } from '../services/SideNavItem';
// const PeroformanceDashboard = lazy(() => import('./dashboards/performance'));
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            closedSmallerSidebar: false
        };
    }
    componentDidMount = async () => {
        // const { fetchSidenavItemData } = this.props;
        // fetchSidenavItemData();
    }
    render() {
        let {
            colorScheme,
            enableFixedHeader,
            enableFixedSidebar,
            enableFixedFooter,
            enableClosedSidebar,
            closedSmallerSidebar,
            enableMobileMenu,
            enablePageTabsAlt,
        } = this.props;
        const authToken = localStorage.getItem('BTauthToken');
        return (
            <ResizeDetector
                handleWidth
                render={({ width }) => (
                    <Fragment>
                        <div className={cx(
                            "app-container app-theme-" + colorScheme,
                            { 'fixed-header': enableFixedHeader },
                            { 'fixed-sidebar': enableFixedSidebar || width < 1250 },
                            { 'fixed-footer': enableFixedFooter },
                            { 'closed-sidebar': enableClosedSidebar || width < 1250 },
                            { 'closed-sidebar-mobile': closedSmallerSidebar || width < 1250 },
                            { 'sidebar-mobile-open': enableMobileMenu },
                        )}>
                            <HashRouter>
                                {(authToken && authToken === '') || !authToken &&
                                    <Fragment>
                                        <Route path="/login" component={Login} />
                                        <Route path="/forgot-password" component={ForgotPassword} />
                                        <Redirect from='/' to="/login" />
                                        <Redirect from='*' to="/login" />
                                    </Fragment>
                                }
                                {authToken && authToken !== '' &&
                                    <Fragment>
                                        <Header />
                                        <div className="app-main">
                                            <LeftSidebar />
                                            <div className="app-main__outer">
                                                <div className="app-main__inner">
                                                    {/* <Suspense fallback={
                                                    <div className="loader-container">
                                                        <div className="loader-container-inner">
                                                            <h6 className="mt-5">
                                                                Please wait Perforamance Dashboard is loading ...
                                                            <small></small>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                }> */}
                                                    {/* <Route path="/" component={PeroformanceDashboard} /> */}
                                                    {/* </Suspense> */}
                                                    {/* <Redirect from='/login' to="/dashboard" /> */}
                                                    {/* <Redirect from='/' to="/dashboard" />
                                                    <Redirect from='*' to="/dashboard" /> */}
                                                    <Route path="/dashboard" component={PerformanceDashboard} />
                                                    <Route path="/locations" component={Location} />
                                                    <Route path="/users" component={User} />
                                                    <Route path="/entities" component={Entities} />
                                                    <Route path="/iotdevices" component={IOTDevices} />
                                                    <Route path="/sensors" component={Sensors} />
                                                    <Route path="/gateways" component={Gateways} />
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                }
                            </HashRouter>
                        </div>
                    </Fragment>
                )}
            />
        )
    }
}
const mapStateToProps = state => ({
    colorScheme: state.ThemeOptions.colorScheme,
    enableFixedHeader: state.ThemeOptions.enableFixedHeader,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    enableFixedFooter: state.ThemeOptions.enableFixedFooter,
    enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
    enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
    enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt,
    // match: state.match,
    data: state,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    // fetchSidenavItemData: fetchSidenavItemData,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
