import { isNullOrWhitespace } from './../shared/utilities.js';
import * as actionTypes from './../actions/actionTypes.js';

const initialState = {
    collaborationName: null,
    collaborationToken: null,    
    currentQuestionIndex: 0,
    questions: [
        { id: 1, prompt: 'Who are you?', answer: '' },
        { id: 2, prompt: 'Where did you go?', answer: '' },
        { id: 3, prompt: 'How did you get there?', answer: '' },
        { id: 4, prompt: 'Who did you meet?', answer: '' },
        { id: 5, prompt: 'What did they say to you?', answer: '' },
        { id: 6, prompt: 'What did you say to them?', answer: '' }
    ],
    error: null
};

const questionnaireReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STARTED_COLLABORATION:
            return { ...state, ...action.payload };
        case actionTypes.JOINED_COLLABORATION:
            return { ...state, ...action.payload };
        case actionTypes.RECORD_ANSWER:
            var questions = state.questions
                .map(q => q.id === state.questions[state.currentQuestionIndex].id
                    ? { id: q.id, prompt: q.prompt, answer: action.answer }
                    : q);
            return Object.assign({}, state, { questions: questions });
        case actionTypes.GOTO_PREVIOUS_QUESTION:
            if (state.currentQuestionIndex > 0) {
                return Object.assign({}, state, { currentQuestionIndex: state.currentQuestionIndex - 1 });
            }
        case actionTypes.GOTO_NEXT_QUESTION:
            if (isNullOrWhitespace(state.questions[state.currentQuestionIndex].answer)) {
                return Object.assign({}, state, { error: 'An answer is required before moving on to the next step.' });
            }
            if (state.currentQuestionIndex < state.questions.length - 1) {
                return Object.assign({}, state, { currentQuestionIndex: state.currentQuestionIndex + 1, error: null });
            }
        default:
            return state;
    }
}

export default questionnaireReducer;