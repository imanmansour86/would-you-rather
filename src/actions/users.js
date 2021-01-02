export const RECEIVE_USERS = 'RECEIVE_USERS'
export const RECEIVE_USER_ANSWER = 'RECEIVE_USER_ANSWER'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}


