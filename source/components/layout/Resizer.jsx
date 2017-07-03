import React from 'react';
import { connect } from 'react-redux';
import { recordWindowSize } from './../../actions/windowSizeActionCreators.js';

// Note: CSS Media Queries can do most of the responsive work.  But this may prove helpful.

class Resizer extends React.Component {
    constructor(props) {
        super(props);

        this.onWindowSizeChange = this.onWindowSizeChange.bind(this);
    }

    onWindowSizeChange(event) {
        this.props.onWindowSizeChange(window.innerWidth, window.innerHeight);
    } 

    componentDidMount() {
        window.addEventListener('resize', this.onWindowSizeChange);
        this.onWindowSizeChange();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowSizeChange);
    }
 
    render() {
        var style = { "display": "none" };
        return (
        <span style={style}>{this.props.windowSize.width} - {this.props.windowSize.height}</span>
        )
    }
}

const mapStateToProps = ( {windowSize}) =>
{
    return { windowSize };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onWindowSizeChange: (width, height) => dispatch(recordWindowSize(width, height))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Resizer);

