import React from 'react';
import { connect } from 'react-redux';
import PrimaryButton from './../../shared/input/PrimaryButton.jsx';
import SecondaryButton from './../../shared/input/SecondaryButton.jsx';

export const LAZY_BUTTON_NAME = 'lazy';
const lazyButton = <SecondaryButton name={LAZY_BUTTON_NAME} key={LAZY_BUTTON_NAME}>See An Example</SecondaryButton>;
const lazyShortTextButton = <SecondaryButton name={LAZY_BUTTON_NAME} key={LAZY_BUTTON_NAME}>Example</SecondaryButton>;

export const PREVIOUS_BUTTON_NAME = 'previous';
const previousButton = <SecondaryButton name={PREVIOUS_BUTTON_NAME} key={PREVIOUS_BUTTON_NAME}>Previous Question</SecondaryButton>;
const previousShortTextButton = <SecondaryButton name={PREVIOUS_BUTTON_NAME} key={PREVIOUS_BUTTON_NAME}>Previous</SecondaryButton>;

export const NEXT_BUTTON_NAME = 'next';
const nextButton = <PrimaryButton name={NEXT_BUTTON_NAME} key={NEXT_BUTTON_NAME}>Next Question</PrimaryButton>;
const nextShortTextButton = <PrimaryButton name={NEXT_BUTTON_NAME} key={NEXT_BUTTON_NAME}>Next</PrimaryButton>;

export const SUBMIT_BUTTON_NAME = 'submit';
const submitButton = <PrimaryButton name={SUBMIT_BUTTON_NAME} key={SUBMIT_BUTTON_NAME}>Submit Answers</PrimaryButton>;
const submitShortTextButton = <PrimaryButton name={SUBMIT_BUTTON_NAME}key={SUBMIT_BUTTON_NAME}>Submit</PrimaryButton>;

export const Buttons = ({ windowSize, shouldShowPreviousButton, shouldShowSubmitButton }) => {
    let buttons = [];

    if (windowSize.width < 400) {
        // Note: On small devices, show next/submit before previous since the buttons show on separate "lines" and use shorter text.
        buttons.push(shouldShowSubmitButton ? submitShortTextButton : nextShortTextButton);
        shouldShowPreviousButton && buttons.push(previousShortTextButton);
        buttons.push(lazyShortTextButton);

    } else {
        shouldShowPreviousButton && buttons.push(previousButton);
        buttons.push(lazyButton);
        buttons.push(shouldShowSubmitButton ? submitButton : nextButton);
    }

    return <div className="button-container">{buttons}</div>
}

const mapStateToProps = ({ collaboration, windowSize }) => {
    return {
        shouldShowPreviousButton: collaboration.shouldShowPreviousButton,
        shouldShowSubmitButton: collaboration.shouldShowSubmitButton,
        windowSize
    }
}

export const QuestionFormButtons = connect(mapStateToProps)(Buttons);

