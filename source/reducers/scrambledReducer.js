import { isNullOrWhitespace } from './../shared/utilities.js';
import * as actionTypes from './../actions/actionTypes.js';

const initialState = {
    status: '',
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

const scrambledReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RECEIVED_SCRAMBLED_RESULT:
            return { ...state, ...action.payload }; // TODO: Favor clarity of brevity :)
        default:
            return state;
    }
}

export default scrambledReducer;