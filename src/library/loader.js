import React, { Component, Fragment } from 'react';
import Loader from 'react-loaders'
// import 'loaders.css/src/animations/ball-pulse.scss'


class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                {/* <Loader type="line-scale" active /> */}
                <Loader
                    lines={13}
                    length={20}
                    width={10}
                    radius={30}
                    corners={1}
                    rotate={0}
                    direction={1}
                    color="#000"
                    speed={1}
                    trail={60}
                    shadow={false}
                    hwaccel={false}
                    className="spinner"
                    zIndex={2e9}
                    top="50%"
                    left="50%"
                    scale={1.0}
                    loadedClassName="loadedContent"
                />
            </Fragment>
        )
    }

}

export default Loading;
