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
        { id: 1, prompt: 'Who are you?', text: 'a' },
        { id: 2, prompt: 'Where did you go?', text: 'b' },
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
                : { ...initialState, error: 'Invalid collaboration code.' };

        case RECORD_ANSWER:
            var answers = state.answers
                .map(q => q.id === state.answers[state.currentQuestionIndex].id
                    ? { id: q.id, prompt: q.prompt, text: payload.answer }
                    : q);
            console.log(answers);
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
    ['Bond. James Bond.','The most interesting man in the world', 'Thomas the tank engine', 'Oprah', 'Donald Trump', 'Snoop Dog', 'Billy the Kid', 'Wonder Woman', 'Superman', 'Ghandi'],
    ['The country fair', 'Rehab', 'Employee Apreciation Dinner', 'Accident, Maryland', 'Embarass, Minnesota', 'Hollywood', 'Disneytown'],
    ['I hitch-hiked', 'On my harley trike', 'Mo-ped', 'VW Hippie Van', 'My private jet', 'I was beammed there', 'I crawled', 'I walked there in high heels'],
    ['Batman', 'Robin', 'Jack Nicholson', 'The employee of the month', 'Hillary Clinton', 'The dude that use to do those sprint commercials', 'My second cousin'],
    ['I dont always drink beer, but when I do it is Stag.', 'Where did you get those cookies?', 'I want answers', 'Is that you I smell?', 'Can I borrow a dollar?', 'Buy low, sell high', 'Supreme executive authority is derived by a mandate from the masses', 'Your instructions are to terminate badger 2.'],
    ['You can take the girl out of the honky tonk, but you cant take the honky tonk out of the girl.', 'You cant handle the truth!', 'Sticks and stones may break my bones but words will never hurt me.', 'If I had a nickel for everytime I heard that, I would be a rich man today', 'I know you are but what I am I?']
];

const movieLines = [
    [
        "\"Frankly, my dear, I don't give a [hoot].\" Gone with the Wind",
        "\"I'm gonna make him an offer he can't refuse.\" The Godfather",
        "\"I have a feeling we're not in Kansas anymore.\" The Wizard of Oz",
        "\"Here's looking at you, kid.\" Casablanca",
        "\"Go ahead, make my day.\" Sudden Impact",
        "\"May the Force be with you.\" Star Wars",
        "\"What we've got here is failure to communicate.\" Cool Hand Luke",
        "\"I'm as mad as [can be], and I'm not going to take this anymore!\" Network",
        "\"I think this is the beginning of a beautiful friendship.\" Casablanca",
        "\"There's no place like home.\" The Wizard of Oz",
        "\"I am big! It's the pictures that got small.\" Sunset Boulevard",
        "\"Show me the money!\" Jerry Maguire",
        "\"You can't handle the truth!\" A Few Good Men",
        "\"Round up the usual suspects.\" Casablanca",
        "\"You're gonna need a bigger boat.\" Jaws",
        "\"Badges? We ain't got no badges! We don't need no badges! I don't have to show you any stinking badges!\" Gold Hat",
        "\"I'll be back.\" The Terminator",
        "\"Mama always said life was like a box of chocolates. You never know what you're gonna get.\" Forrest Gump",
        "\"We'll always have Paris.\" Casablanca",
        "\"Well, nobody's perfect.\" Some Like It Hot",
        "\"It's alive! It's alive!\" Frankenstein",
        "\"Houston, we have a problem.\" Apollo 13",
        "\"You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?\" Dirty Harry",
        "\"You had me at 'hello.'\" Jerry Maguire",
        "\"Greed, for lack of a better word, is good.\" Wall Street",
        "\"Keep your friends close, but your enemies closer.\" The Godfather Part II",
        "\"As God is my witness, I'll never be hungry again.\" Gone with the Wind",
        "\"Well, here's another nice mess you've gotten me into!\" Sons of the Desert",
        "\"Elementary, my dear Watson.\" The Adventures of Sherlock Holmes",
        "\"Of all the gin joints in all the towns in all the world, she walks into mine.\" Casablanca",
        "\"Wait a minute, wait a minute. You ain't heard nothin' yet!\" The Jazz Singer",
        "\"I have always depended on the kindness of strangers.\" A Streetcar Named Desire",
        "\"Hasta la vista, baby.\" Terminator 2: Judgment Day",
        "\"A martini. Shaken, not stirred.\" Goldfinger",
        "\"Life is a banquet, and most poor suckers are starving to death!\" Auntie Mame",
        "\"I feel the need—the need for speed!\" Top Gun",
        "\"Nobody puts Baby in a corner.\" Dirty Dancing",
        "\"I'll get you, my pretty, and your little dog too!\" The Wizard of Oz",
        "\"I'm the King of the World\" Titanic"
    ]
];

function getRandomAnswer(questionId) {
    let questionIndex = questionId - 1;
    let answerCount = randomAnswers[questionIndex].length;
    let index = Math.floor((Math.random() * answerCount));
    return randomAnswers[questionIndex][index];
}

export default collaborationReducer;