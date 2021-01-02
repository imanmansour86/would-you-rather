import { save}
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const RECEIVE_USER_ANSWER = 'RECEIVE_USER_ANSWER'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}


export function userAnswer({authedUser, id, answer}) {
    return {
        type: RECEIVE_USER_ANSWER,
        authedUser,
        id,
        answer
    }
}


export function handleUserAnswer(info) {
    return(dispatch) => {
        dispatch(userAnswer(info)) // Optimistic Updating; updating the UI,
         //before the action gets recorded on the backend so it seems more performant.

        return saveQuestionAnswer(info) //save info to db 
        .catch((e)=> {
            console.warn('Error in handle answer ', e)
            dispatch(userAnswer(info)) 
            alert('There was an error choosing an answer. Try again.')
        })
    }
}
