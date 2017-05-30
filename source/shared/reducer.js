import { isNullOrWhitespace } from './../shared/utilities.js';

const reducer = (state = {}, action) => {
  console.log(action);
  switch(action.type) {
    case 'LOGIN_COMPLETE':
      return Object.assign({}, state, {userDisplayName: action.userDisplayName, isAuthorizedUser: true});
    case 'LOGOFF':
      return Object.assign({}, state, {userName: '', isAuthorizedUser: false});
    case 'START_SESSION':
      return Object.assign({}, state, {sessionName: action.sessionName});        
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
        if(isNullOrWhitespace(state.questions[state.currentQuestionIndex].answer)) {
            return Object.assign({}, state, {errors: { question: 'An answer is required before moving on to the next step.'} })          
        }
        if(state.currentQuestionIndex < state.questions.length - 1) {
            return Object.assign({}, state, {currentQuestionIndex: state.currentQuestionIndex + 1, errors: {} })
        }
    default:
      return state;
  }
}

export default reducer;