import React from 'react';

class Clock extends React.Component {
    //  state = { date: '1/1/2001' }; TODO: Why/How is react-router doing stuff like this? and static propTypes
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.props.date}.</h2>
            </div>
        );
    }
}

export default Clock;