import { isNullOrWhitespace } from './../shared/utilities.js';

import {
    START_COLLABORATION,
    JOIN_COLLABORATION,
    RECORD_ANSWER,
    AUTO_PICK_ANSWER,
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
        { id: 1, prompt: 'Who are you?', text: '' }, 
        { id: 2, prompt: 'Where did you go?', text: '' },
        { id: 3, prompt: 'How did you get there?', text: '' },
        { id: 4, prompt: 'Who did you meet?', text: '' },
        { id: 5, prompt: 'What did they say to you?', text: '' },
        { id: 6, prompt: 'What did you say to them?', text: '' }
    ],

    error: null
};

const collaborationReducer = (state = initialState, { type, payload, error }) => {
    switch (type) {
        case START_COLLABORATION:
        case JOIN_COLLABORATION:
            return payload.collaborationToken 
                ? { ...initialState, ...payload } // payload provides collaborationName/Token
                : { ...initialState, error: 'Invalid collaboration code.'};

        case RECORD_ANSWER:
            var answers = state.answers
                .map(q => q.id === state.answers[state.currentQuestionIndex].id
                    ? { id: q.id, prompt: q.prompt, text: payload.answer }
                    : q);
            return { ...state, answers };

        case AUTO_PICK_ANSWER:
            var answers = state.answers
                .map(q => q.id === state.answers[state.currentQuestionIndex].id
                    ? { id: q.id, prompt: q.prompt, text: getRandomAnswer(q.id) }
                    : q);
            return { ...state, answers };

        
        case GOTO_PREVIOUS_QUESTION:
            return state.currentQuestionIndex > 0
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

const randomAnswers = [
    [ 'The most interesting man in the world','Thomas the tank engine', 'Oprah', 'Donald Trump', 'Snoop Dog', 'Billy the Kid', 'Wonder Woman', 'Superman', 'Ghandi'],
    [ 'The country fair', 'Rehab', 'Employee Apreciation Dinner', 'Accident, Maryland', 'Embarass, Minnesota', 'Hollywood', 'Disneytown'],
    [ 'I hitch-hiked', 'On my harley trike', 'Mo-ped', 'VW Hippie Van', 'My private jet', 'I was beammed there', 'I crawled', 'I walked there in high heels'],
    [ 'Batman', 'Robin', 'Jack Nicholson', 'The employee of the month', 'Hillary Clinton', 'The dude that use to do those sprint commercials', 'My second cousin'],
    [ 'I dont always drink beer, but when I do it is Stag.', 'Where did you get those cookies?', 'I want answers', 'Is that you I smell?', 'Can I borrow a dollar?', 'Buy low, sell high', 'Supreme executive authority is derived by a mandate from the masses', 'Your instructions are to terminate badger 2.'],
    [ 'You cant handle the truth!', 'Sticks and stones may break my bones but words will never hurt me.', 'If I had a nickel for everytime I heard that, I would be a rich man today', 'I know you are but what I am I?']
];

function getRandomAnswer(questionId) {
    let questionIndex = questionId -1;
    let answerCount = randomAnswers[questionIndex].length;
    let index = Math.floor((Math.random() * answerCount));
    return randomAnswers[questionIndex][index];
}

export default collaborationReducer;