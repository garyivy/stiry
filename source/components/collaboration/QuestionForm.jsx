import React from 'react';
import { connect } from 'react-redux';
import { recordAnswer, autoPickAnswer, gotoPreviousQuestion, gotoNextQuestion, submitQuestionnaire } from './../../actions/collaborationActionCreators.js';
import Form from './../../shared/input/Form.jsx';
import Field from './../../shared/input/Field.jsx';
import { QuestionFormButtons, LAZY_BUTTON_NAME, PREVIOUS_BUTTON_NAME, NEXT_BUTTON_NAME, SUBMIT_BUTTON_NAME} from './QuestionFormButtons.jsx';

export class QuestionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.onUnload = this.onUnload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(formValues, buttonName) {
        switch (buttonName) {
            case LAZY_BUTTON_NAME:
                this.props.autoPickAnswer();
                break;
            case PREVIOUS_BUTTON_NAME:
                this.props.recordAnswer(formValues.question);
                this.props.gotoPreviousQuestion();
                break;
            case NEXT_BUTTON_NAME:
                this.props.recordAnswer(formValues.question);
                this.props.gotoNextQuestion();
                break;
            case SUBMIT_BUTTON_NAME:
                this.props.recordAnswer(formValues.question);
                this.props.submitQuestionnaire();
                break;
        }
    }

    onUnload(event) {
        event.returnValue = 'This action will exit you from the questionnairre.  Did you mean to do that?';
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onUnload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onUnload);
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Field type="textarea"
                    name="question"
                    label={this.props.questionText}
                    value={this.props.answer}
                    error={this.props.error}
                />
                <QuestionFormButtons/>
            </Form>
        );
    }
};

const mapStateToProps = ({ collaboration }) => {
    return {
        questionText: collaboration.answers[collaboration.currentQuestionIndex].prompt,
        answer: collaboration.answers[collaboration.currentQuestionIndex].text,
        error: collaboration.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        recordAnswer: (answer) => dispatch(recordAnswer(answer)),
        autoPickAnswer: () => dispatch(autoPickAnswer()),
        gotoPreviousQuestion: () => dispatch(gotoPreviousQuestion()),
        gotoNextQuestion: () => dispatch(gotoNextQuestion()),
        submitQuestionnaire: () => dispatch(submitQuestionnaire())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);

