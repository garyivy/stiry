import { isNullOrWhitespace } from './../shared/utilities.js';
import * as actionTypes from './../actions/actionTypes.js';

const initialState = {
    collaborationName: null,
    collaborationToken: null,
    currentQuestionIndex: 0,
    answers: [
        { id: 1, prompt: 'Who are you?', text: '' },
        { id: 2, prompt: 'Where did you go?', text: '' },
        { id: 3, prompt: 'How did you get there?', text: '' },
        { id: 4, prompt: 'Who did you meet?', text: '' },
        { id: 5, prompt: 'What did they say to you?', text: '' },
        { id: 6, prompt: 'What did you say to them?', text: '' }
    ],
    error: null
};

const questionnaireReducer = (state = initialState, {type, payload, error}) => {
    switch (type) {
        case actionTypes.START_COLLABORATION:
        case actionTypes.JOIN_COLLABORATION:
            return { ...initialState, ...payload }; // payload provides collaborationName/Token
        case actionTypes.RECORD_ANSWER:
            var answers = state.answers
                .map(q => q.id === state.answers[state.currentQuestionIndex].id
                    ? { id: q.id, prompt: q.prompt, text: payload.answer }
                    : q);
            return { ...state, answers };
        case actionTypes.GOTO_PREVIOUS_QUESTION:
            if (state.currentQuestionIndex > 0) {
                return { ...state, currentQuestionIndex: state.currentQuestionIndex - 1 }
            }
        case actionTypes.GOTO_NEXT_QUESTION:
            if (isNullOrWhitespace(state.answers[state.currentQuestionIndex].text)) {
                return { ...state, error: 'An answer is required before moving on to the next step.' };
            }
            if (state.currentQuestionIndex < state.answers.length - 1) {
                return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1, error: null }
            }
        default:
            return state;
    }
}

export default questionnaireReducer;