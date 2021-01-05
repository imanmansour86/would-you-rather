import { receiveUsers, addQuestionToAuthedUser, saveQuestionAnswerToAuthedUser } from '../actions/users'
import { receiveQuestions, addQuestion, saveUserAnswer } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestionAnswer, saveQuestion, getInitialData } from '../utils/api'


export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(null))
                dispatch(hideLoading())
            })

    }
}




export function handleAddQuestion(question1, question2) {
    return (dispatch, getState) => {

        const { authedUser } = getState()

        dispatch(showLoading())
        return saveQuestion({
            optionOneText: question1,
            optionTwoText: question2,
            author: authedUser

        })
            .then((question) => {
                dispatch(addQuestion(question))
                dispatch(addQuestionToAuthedUser(authedUser, question.id))
                dispatch(hideLoading())
            })

    }
}

export function handleUserAnswer(qid, answer) {

    return (dispatch, getState) => {
        const { authedUser } = getState()

        console.log("aaaa", authedUser)
        dispatch(showLoading())
        return saveQuestionAnswer({
            answer,
            qid,
            authedUser: authedUser.id,
        })
            .then(({ users, questions }) => {
                console.log("new questions", questions)
                dispatch(saveUserAnswer({ id: qid, answer, authedUser: authedUser.id }))
                // dispatch(receiveQuestions(questions))
                // dispatch(receiveUsers(users))
                dispatch(hideLoading())
            })

    }
}
