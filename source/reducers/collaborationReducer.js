import { isNullOrWhitespace } from './../shared/utilities.js';

import {
    START_COLLABORATION,
    JOIN_COLLABORATION,
    RECORD_ANSWER,
    GOTO_NEXT_QUESTION,
    GOTO_PREVIOUS_QUESTION,
    GET_COLLABORATION_STATUS,
    GET_SCRAMBLED_RESULT
} from './../actions/actionTypes.js';

const initialState = {
    collaborationName: null,
    collaborationToken: null,

    incompleteSurveyCount: 1,
    isScrambled: false,
    userStatuses: [
        { userName: '', answersRemaining: 6 }
    ],

    shouldShowPreviousButton: false,
    shouldShowNextButton: true,
    shouldShowSubmitButton: false,

    currentQuestionIndex: 0,
    answers: [
        { id: 1, prompt: 'Who are you?', text: '1' }, // TODO: Remove hard code
        { id: 2, prompt: 'Where did you go?', text: '2' },
        { id: 3, prompt: 'How did you get there?', text: '3' },
        { id: 4, prompt: 'Who did you meet?', text: '4' },
        { id: 5, prompt: 'What did they say to you?', text: '5' },
        { id: 6, prompt: 'What did you say to them?', text: '6' }
    ],

    error: null
};

const collaborationReducer = (state = initialState, { type, payload, error }) => {
    switch (type) {
        case START_COLLABORATION:
        case JOIN_COLLABORATION:
            return { ...initialState, ...payload }; // payload provides collaborationName/Token

        case RECORD_ANSWER:
            var answers = state.answers
                .map(q => q.id === state.answers[state.currentQuestionIndex].id
                    ? { id: q.id, prompt: q.prompt, text: payload.answer }
                    : q);
            return { ...state, answers };

        case GOTO_PREVIOUS_QUESTION:
            return state.currentQuestionIndex < state.answers.length - 1
                ? buildStateForGoto(state, type)
                : state;

        case GOTO_NEXT_QUESTION:
            if (isNullOrWhitespace(state.answers[state.currentQuestionIndex].text)) {
                return { ...state, error: 'An answer is required before moving on to the next step.' };
            }

            return state.currentQuestionIndex < state.answers.length - 1
                ? buildStateForGoto(state, type)
                : state;

        case GET_COLLABORATION_STATUS:
            return { ...state, ...payload }; // TODO: Note what ...payload provides here.

        case GET_SCRAMBLED_RESULT:
            return { ...state, answers: payload };

        default:
            return state;
    }
}

function buildStateForGoto(state, gotoType) {
    let increment = gotoType === GOTO_NEXT_QUESTION ? 1 : -1;

    let currentQuestionIndex = state.currentQuestionIndex + increment;

    return {
        ...state,
        currentQuestionIndex,
        shouldShowPreviousButton: currentQuestionIndex > 0,
        shouldShowNextButton: currentQuestionIndex < state.answers.length - 1,
        shouldShowSubmitButton: currentQuestionIndex == state.answers.length - 1,
        error: null
    }
}

export default collaborationReducer;