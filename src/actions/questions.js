export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question
    }
}



export function saveUserAnswer({authedUser, id, answer}) {
    console.log('hhhh', authedUser, id, answer)
    return {
        type: SAVE_USER_ANSWER,
        authedUser,
        id,
        answer,
    }
}



