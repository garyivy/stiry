import React from 'react';
import { connect } from 'react-redux';
import { recordAnswer } from './../../actions/collaborationActionCreators.js';

export class Question extends React.Component {
    constructor(props) {
        super(props);

        // Nice article about best practices for where state should be stored for forms when using redux:
        // https://goshakkk.name/should-i-put-form-state-into-redux/

        this.state = {
            answer: props.initialAnswer,
            error: null
        }

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(event) {
        // Track keystroke changes locally
        this.setState({ answer: event.target.value, error: null });
    }

    onBlur(event) {
        // Dispatch answer for redux store update
        this.props.onAnswerChange(event.target.value);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ answer: nextProps.initialAnswer, error: nextProps.error });
    }

    render() {
        return (
            <div className="question-container">
                <label htmlFor="txtQuestion">{this.props.questionText}</label>
                <textarea 
                    onChange={this.onChange} 
                    onBlur={this.onBlur} 
                    value={this.state.answer}></textarea>
                {this.state.error && <label htmlFor="txtQuestion">{this.state.error}</label>}
            </div>
        )
    }
};

const mapStateToProps = ({ collaboration }) => {
    let { answers, currentQuestionIndex, error } = collaboration;
    return {
        questionText: answers[currentQuestionIndex].prompt,
        initialAnswer: answers[currentQuestionIndex].text,
        error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAnswerChange: (answer) => dispatch(recordAnswer(answer))
    }
};

const QuestionConnected = connect(mapStateToProps, mapDispatchToProps)(Question);

export default QuestionConnected;

