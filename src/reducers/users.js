import { RECEIVE_USERS, ADD_QUESTION_TO_AUTHED_USER, SAVE_QUESTION_ANSWER_TO_AUTHED_USER } from '../actions/users'


export default function users(state = {}, action) {

    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_QUESTION_TO_AUTHED_USER:
            const { authedUser, id } = action
            return {
                ...state,
                [authedUser.id]: {
                    ...state[authedUser.id],
                    questions: state[authedUser.id].questions.concat(id)
                }

            }
        case SAVE_QUESTION_ANSWER_TO_AUTHED_USER:
            const { answer } = action
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.id]: answer
                    }
                }

            }
        default:
            return state
    }

}