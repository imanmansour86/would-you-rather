import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {

    render() {
        return (
            <div>
                {this.props.leaderBoardUsers.map((user) =>
                    <li key={user.id} value={user.id}>
                        <img src={user.avatar} alt={`Avatar of ${user.name}`} style={{ width: 20, padding: 2 }} />
                        {user.name}
                        <p>Answered questions{user.answeredQuestions}</p>
                        <p>Created questions{user.totalQuestions}</p>
                        <p>Score{user.score}</p>
                    </li>
                )}
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    const leaderBoardUsers = Object.values(users).map(user => ({
        name: user.name,
        id: user.id,
        avatar: user.avatarURL,
        totalQuestions: user.questions.length,
        answeredQuestions: Object.keys(user.answers).length,
        score: Object.keys(user.answers).length + user.questions.length

    })).sort((a, b) => a.score - b.score).reverse()

    return {
        leaderBoardUsers
    }
}


export default connect(mapStateToProps)(LeaderBoard)