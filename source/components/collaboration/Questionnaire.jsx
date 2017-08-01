import React from 'react';
import { connect } from 'react-redux';

import Question from './Question.jsx';
import StepIndicator from './StepIndicator.jsx';
import Form from './../../shared/input/Form.jsx';
import Field from './../../shared/input/Field.jsx';
import PrimaryButton from './../../shared/input/PrimaryButton.jsx';
import SecondaryButton from './../../shared/input/SecondaryButton.jsx';
import { recordAnswer } from './../../actions/collaborationActionCreators.js';

import {
    autoPickAnswer,
    gotoPreviousQuestion,
    gotoNextQuestion,
    submitQuestionnaire
} from './../../actions/collaborationActionCreators.js';

const reducedTextThreshold = 450;

export const Questionnaire = ({ windowSize, onLazyButtonClick,
    collaborationName, shouldShowPreviousButton, onPreviousButtonClick, 
    shouldShowSubmitButton, onNextButtonClick, onSubmitButtonClick, recordAnswer, questionText, initialAnswer, error }) => {

    let lazyQuestionButtonText = windowSize.width < reducedTextThreshold
        ? 'Lazy'
        : 'I am Lazy';

    let previousQuestionButtonText = windowSize.width < reducedTextThreshold
        ? 'Previous'
        : 'Previous Question';

    let nextQuestionButtonText = windowSize.width < reducedTextThreshold
        ? 'Next'
        : 'Next Question';

    const lazyButton = <SecondaryButton name="lazy">{lazyQuestionButtonText}</SecondaryButton>;

    const previousButton = shouldShowPreviousButton
        ? <SecondaryButton name="previous">{previousQuestionButtonText}</SecondaryButton>
        : null;

    const nextButton = shouldShowSubmitButton
        ? <PrimaryButton name="submit">Submit</PrimaryButton>
        : <PrimaryButton name="next">{nextQuestionButtonText}</PrimaryButton>;

    let buttons = [];

    if (windowSize.width < 400) {
        // Note: On small devices, show next before previous since the buttons show on separate "lines"
        buttons.push(nextButton);
        buttons.push(previousButton);
        buttons.push(lazyButton);

    } else {
        buttons.push(previousButton);
        buttons.push(lazyButton);
        buttons.push(nextButton);
    }

    let onSubmit = (formValues, buttonName) => {

        console.log(formValues);
        switch(buttonName) {
            case 'lazy':
                onLazyButtonClick();
                break;                
            case 'previous':
                recordAnswer(formValues.question);
                onPreviousButtonClick();
                break;                
            case 'next':
            recordAnswer(formValues.question);
                onNextButtonClick();
                break;                
            case 'submit':
                recordAnswer(formValues.question);
                onSubmitButtonClick();
                break;                
        }
    }

    console.log('Rendering questionnaire');
    console.log(initialAnswer);
    return (
        <main className="questionnaire-container">
            <h1>The Stirytime Questionnaire</h1>
            <h2>Collaboration Code: {collaborationName}</h2>
            <StepIndicator />
            <Form onSubmit={onSubmit}>
                <Field type="textarea" name="question" label={questionText} error={error} value={initialAnswer} />
                <div className="button-container">
                    {buttons}
                </div>
            </Form>
        </main>
    )
}

const mapStateToProps = ({ collaboration, windowSize }) => {
    return {
        shouldShowPreviousButton: collaboration.shouldShowPreviousButton,
        shouldShowSubmitButton: collaboration.shouldShowSubmitButton,
        collaborationName: collaboration.collaborationName,
        questionText: collaboration.answers[collaboration.currentQuestionIndex].prompt,
        initialAnswer: collaboration.answers[collaboration.currentQuestionIndex].text,
        error: collaboration.error,
        windowSize
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        recordAnswer: (answer) => dispatch(recordAnswer(answer)),
        onLazyButtonClick: () => dispatch(autoPickAnswer()),
        onPreviousButtonClick: () => dispatch(gotoPreviousQuestion()),
        onNextButtonClick: () => dispatch(gotoNextQuestion()),
        onSubmitButtonClick: () => dispatch(submitQuestionnaire())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);


