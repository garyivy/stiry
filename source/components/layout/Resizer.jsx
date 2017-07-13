import React from 'react';
import { connect } from 'react-redux';
import { recordWindowSize } from './../../actions/windowSizeActionCreators.js';

// Note: CSS Media Queries can do most of the responsive work.  But this may prove helpful.
// This component listens for changes in display size and dispatches a event to update windowSize in store.

const styleDisplayNone = { display: 'none' };

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
        return (
        <span style={styleDisplayNone}></span>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onWindowSizeChange: (width, height) => dispatch(recordWindowSize(width, height))
    }
}

export default connect(undefined, mapDispatchToProps)(Resizer);

