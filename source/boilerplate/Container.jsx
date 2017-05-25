import React from 'react';

// Sample Starting Point For React "Container"
class BOILERPLATEContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wasButtonClicked: false
        }

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick(event) {
        event.preventDefault();
        this.setState({ wasButtonClicked: true});
        this.props.onButtonClick();
    }

    render() {
        return (
            <div>
                <button onClick={this.onButtonClick}>Click Me</button>
                {
                    this.state.wasButtonClicked && <span>Thanks for clicking the button :)</span>
                }
            </div>
        );
    }
}

StartSessionPromptContainer.propTypes = {
    onButtonClick = React.PropTypes.func.isRequired
}

export default StartSessionPromptContainer;