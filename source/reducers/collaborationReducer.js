import { isNullOrWhitespace } from './../shared/utilities.js';

import {
    START_COLLABORATION_REQUEST,
    START_COLLABORATION_RESPONSE,
    JOIN_COLLABORATION_REQUEST,
    JOIN_COLLABORATION_RESPONSE,
    RECORD_ANSWER,
    AUTO_PICK_ANSWER,
    GOTO_PREVIOUS_QUESTION,
    GOTO_NEXT_QUESTION,
    SUBMIT_QUESTIONNAIRE_REQUEST,
    SUBMIT_QUESTIONNAIRE_RESPONSE,
    GET_COLLABORATION_STATUS_REQUEST,
    GET_COLLABORATION_STATUS_RESPONSE,
    FORCE_COLLABORATION_END_REQUEST,
    FORCE_COLLABORATION_END_RESPONSE,
    FORCED_COLLABORATION_END,
    GET_SCRAMBLED_REQUEST,
    GET_SCRAMBLED_RESPONSE,
    SIGNIN
} from './../actions/actionTypes.js';

const initialState = {
    collaborationCode: null,
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
        case START_COLLABORATION_REQUEST:
        case JOIN_COLLABORATION_REQUEST:
            return { ...initialState };

        case START_COLLABORATION_RESPONSE:
        case JOIN_COLLABORATION_RESPONSE:
            return payload.collaborationToken
                ? { ...state, collaborationCode: payload.collaborationName, collaborationToken: payload.collaborationToken }
                : { ...state, error: 'Invalid collaboration code.' };

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

        case SUBMIT_QUESTIONNAIRE_REQUEST:
            return state; // Note: The xxx_REQUEST types are not used.  But, it helps my OCD :)
        case SUBMIT_QUESTIONNAIRE_RESPONSE:
            return state;

        case GET_COLLABORATION_STATUS_REQUEST:
            return state;
        case GET_COLLABORATION_STATUS_RESPONSE:
            return { ...state, ...payload }; // TODO: Note what ...payload provides here.

        case FORCE_COLLABORATION_END_REQUEST:
            return state;
        case FORCE_COLLABORATION_END_REQUEST:
            return state;

        case GET_SCRAMBLED_REQUEST:
            return state;
        case GET_SCRAMBLED_RESPONSE:
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

const randomPeople = [
    'Bond. James Bond.',
    'The most interesting man in the world',
    'Thomas the tank engine',
    'Oprah',
    'Donald Trump',
    'Snoop Dog',
    'Billy the Kid',
    'Jack Nicholson',
    'Wonder Woman',
    'Superman',
    'A former supermodel planning a comeback',
    'A Michael Jackson impersonator',
    'An Elvis Presley inpersonator',
    'Toby the Clown',
    'Toto the dog',
    'Michael Jordon',
    'Charles Barkley',
    'Tiger Woods',
    'The employee of the Month'
];

const randomMeet = randomPeople.concat([
    'A band of guerrillas',
    'An angry Christmas shopper',
    'A high school chess team',
    'Batman and Robin',
    'A band featuring a banjo and an accordian'
]);

const randomPlaces = [
    'The counry fair',
    'Rehab',
    'Employee Apreciation Dinner',
    'The captivating town of Accident, Maryland',
    'The well-named town of Embarass, Minnesota',
    'Hollywood',
    'Disneytown',
    'My hometowns annual hot-dog eating contest',
    'The local walmart supercenter',
    'A doctor specializing in helping people will really really really really short attention spans',
    'An awards dinner honoring me for my accomplishments in the field of beanie baby investing',
    'A piano recital',
    'A cheerleading competition',
    'I told you already!!!! I went to an anger management class!!!!',
]

const randomTransportation = [
    'I was beammed there by Scottie',
    'I hitch-hiked for 8 days',
    'I drove their in a car stolen by my uncle',
    'Dont let my friends find out.  But, I rode there on a Mo-ped',
    'I used a segue to impress my friends',
    'I dont know.  I took a pill and 3 days later woke up there.',
    'I crawled on my hands and knees for 3 days',
    'I walked there in high-heels',
    'I swam there in freezing cold water',
    'I salsa danced all the way there'
]

const randomQuotes = [
    'There is no place like home',
    'I dont always drink beer, but when I do it is Stag',
    'Where did you get those cookies?',
    'I want answers',
    'What is that smell?',
    'Can I borrow a dollar?',
    'Buy low, sell high',
    'Supreme executive authority is derived by a mandate from the masses',
    'Your instructions are to terminate badger 2.',
    'Houston, we have a problem'
]

const randomResponses = randomQuotes.concat([
    'Go ahead. Make my day punk!',
    'You can take the girl out of the honky tonk, but you cant take the honky tonk out of the girl.',
    'You cant handle the truth!',
    'Sticks and stones may break my bones but words will never hurt me.',
    'If I had a nickel for everytime I heard that, I would be a rich man today',
    'I know you are but what I am I?',
    'You are one disturbed individual',
    'I feel the need—the need for speed!'
]);

const randomAnswers = [
    randomPeople,
    randomPlaces,
    randomMeet,
    randomTransportation,
    randomQuotes,
    randomResponses
];

function getRandomAnswer(questionId) {
    let questionIndex = questionId - 1;
    let answerCount = randomAnswers[questionIndex].length;
    let index = Math.floor((Math.random() * answerCount));
    return randomAnswers[questionIndex][index];
}

export default collaborationReducer;