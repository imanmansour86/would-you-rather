import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_USER_ANSWER } from '../actions/questions'

export default function questions(state = {}, action) {

    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        case SAVE_USER_ANSWER:

            return {
                ...state,
                [action.id]: {
                    ...state[action.id],

                    [action.answer]: {
                        ...state[action.id][action.answer],
                        votes: state[action.id][action.answer].votes.concat([action.authedUser])
                    }
                }
            }


        default:
            return state
    }

}


