const reducer = (state = {}, action) => {
  console.log(action);
  switch(action.type) {
    case 'SHOW_PRIVATE_LINKS':
      return Object.assign({}, state, {userName: action.userName, isAuthorizedUser: true});
    case 'RECORD_ANSWER':
      var questions = state.questions
        .map(q => q.id === state.questions[state.currentQuestionIndex].id
            ? { id: q.id, prompt: q.prompt, answer: action.answer } 
            : q);
    console.log(questions);
      return Object.assign({}, state, { questions: questions });
    case 'GOTO_PREVIOUS_QUESTION':
        if(state.currentQuestionIndex > 0) {
            return Object.assign({}, state, {currentQuestionIndex: state.currentQuestionIndex - 1 })
        }
    case 'GOTO_NEXT_QUESTION':
        if(state.currentQuestionIndex < state.questions.length - 1) {
            return Object.assign({}, state, {currentQuestionIndex: state.currentQuestionIndex + 1 })
        }
    default:
      return state;
  }
}

export default reducer;