import React from 'react';
import { connect } from 'react-redux';
import { recordAnswer } from './../../actions/collaborationActionCreators.js';

export const QuestionPresentation = ({ questionText, answer, onChange, onBlur, error }) => (
    <div className="field question-container">
        <label htmlFor="txtQuestion">{questionText}</label>
        <textarea onChange={onChange} onBlur={onBlur} value={answer}></textarea>
        {error && <label htmlFor="txtQuestion">{error}</label>}
    </div>
);

export class QuestionContainer extends React.Component {
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
        this.onUnload = this.onUnload.bind(this);
    }

    onChange(event) {
        // Track keystroke changes locally
        this.setState({ answer: event.target.value, error: null });
    }

    onBlur(event) {
        // Dispatch answer for redux store update
        this.props.recordAnswer(event.target.value);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ answer: nextProps.initialAnswer, error: nextProps.error });
    }

    onUnload(event) {
        event.returnValue = 'This action will exit you questionnairre.  Did you mean to do that?';
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onUnload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onUnload);
    }

    render() {
        return <QuestionPresentation
            questionText={this.props.questionText}
            answer={this.state.answer}
            error={this.state.error}
            onChange={this.onChange}
            onBlur={this.onBlur} />
    }
};

const mapStateToProps = ({ collaboration }) => {
    let { answers, currentQuestionIndex, error } = collaboration;
    return {
        questionText:   answers[currentQuestionIndex].prompt,
        initialAnswer:  answers[currentQuestionIndex].text,
        error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        recordAnswer: (answer) => dispatch(recordAnswer(answer))
    }
};

const Question = connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);

export default Question;

