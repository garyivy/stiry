const initialStore = {
    isAuthorizedUser: false,
    userDisplayName: null,
    sessionName: null,
    currentQuestionIndex: 0,
    questions: [ 
        { id: 1, prompt: 'Who are you?', answer: '' },
        { id: 2, prompt: 'Where did you go?', answer: '' },
        { id: 3, prompt: 'How did you get there?', answer: '' },
        { id: 4, prompt: 'Who did you meet?', answer: '' },
        { id: 5, prompt: 'What did they say to you?', answer: '' },
        { id: 6, prompt: 'What did you say to them?', answer: '' }
    ],
    scrambledAnswers: [ 
        { id: 1, prompt: 'Who are you?', answer: 'Mickey Mouse' },
        { id: 2, prompt: 'Where did you go?', answer: 'Android Developer Conference' },
        { id: 3, prompt: 'How did you get there?', answer: 'I went grehound' },
        { id: 4, prompt: 'Who did you meet?', answer: 'Donald Trump' },
        { id: 5, prompt: 'What did they say to you?', answer: 'I dont know why people where they hats backwards.' },
        { id: 6, prompt: 'What did you say to them?', answer: 'I had a dollar for every time I heard that, I would be rich' }
    ],
    errors: {}
}

export default initialStore;