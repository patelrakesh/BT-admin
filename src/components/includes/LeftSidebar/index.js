import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MetisMenu from 'react-metismenu';
import { fetchSidenavItemData } from '../../../services/SideNavItem'
import cx from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { setEnableMobileMenu } from '../../../reducers/ThemeOptions';
import HeaderLogo from '../Header/AppLogo';

class LeftSidebar extends Component {
    state = {
        content: [],
    };

    componentDidMount = async () => {
        const { fetchSidenavItemData } = this.props;
        fetchSidenavItemData();
    }
    toggleMobileSidebar = () => {
        let {enableMobileMenu, setEnableMobileMenu} = this.props;
        setEnableMobileMenu(!enableMobileMenu);
    }

    render() {
        let {
            backgroundColor,
            enableBackgroundImage,
            enableSidebarShadow,
            backgroundImage,
            backgroundImageOpacity,
        } = this.props;
        const { SideNavItem } = this.props.data;
        return (
            <Fragment>
                <div className="sidebar-mobile-overlay" onClick={this.toggleMobileSidebar} />
                <ReactCSSTransitionGroup
                    component="div"
                    className={cx("app-sidebar", backgroundColor, { 'sidebar-shadow': enableSidebarShadow })}
                    transitionName="SidebarAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <HeaderLogo />
                    <PerfectScrollbar>
                        <div className="app-sidebar__inner">
                            {SideNavItem.sidenavdata && SideNavItem.sidenavdata.map((item, index) => {
                                const sidebarMenu = [
                                    {
                                        icon: item.icon,
                                        label: item.text,
                                        to: '#'+item.key,
                                        content:
                                            item.menuItems.map((item1, index1) => {
                                                return (
                                                    {
                                                        label: item1.label,
                                                        to: item1.url,
                                                        content: item1.menuItems && item1.menuItems.map((item2, index2)=>{
                                                            return(
                                                                {
                                                                    label: item2.label,
                                                                    to: item2.url,
                                                                }
                                                            )
                                                        })
                                                    }
                                                )
                                            })
                                    },
                                ];
                                return (
                                    <Fragment>
                                        {/* {//item.menuItems.length > 0 &&
                                            <h5 className="app-sidebar__heading">{item.text}</h5>
                                        } */}
                                        <MetisMenu content={sidebarMenu} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                                    </Fragment>
                                )
                            })}
                        </div>
                    </PerfectScrollbar>
                    <div
                        className={cx("app-sidebar-bg", backgroundImageOpacity)}
                        style={{
                            backgroundImage: enableBackgroundImage ? 'url(' + backgroundImage + ')' : null
                        }}>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>

        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

// export default withRouter(Nav);

const mapStateToProps = state => ({
    enableBackgroundImage: state.ThemeOptions.enableBackgroundImage,
    enableSidebarShadow: state.ThemeOptions.enableSidebarShadow,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    backgroundColor: state.ThemeOptions.backgroundColor,
    backgroundImage: state.ThemeOptions.backgroundImage,
    backgroundImageOpacity: state.ThemeOptions.backgroundImageOpacity,
    data: state,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSidenavItemData: fetchSidenavItemData,
    setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftSidebar);


