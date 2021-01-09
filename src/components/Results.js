
import React, { Component } from 'react'
import { connect } from 'react-redux';


class Results extends Component {

    render() {
        const { question, users } = this.props
        const { optionOne, optionTwo} = question
        const totalVotes = optionOne.votes.length + optionTwo.votes.length
        const optionOnePercent = ((optionOne.votes.length / totalVotes) * 100).toFixed(2)
        const optionTwoPercent = ((optionTwo.votes.length / totalVotes) * 100).toFixed(2)
        return question ? (
            <div key={question.id}>
                <h1>Results</h1>
                <div>Asked by {users[question.author].name}
                    <img src={users[question.author].avatarURL} className='avatar'
                        style={{ width: 40, padding: 2 }}></img>
                </div>
                <div >
                    <div className={question.optionOne.votes.includes(question.author) ? `bordered` : ``}>
                        <div key={question.id + "o1"} >Would you rahter {question.optionOne.text}</div>
                        <div>
                            {optionOne.votes.length}/{totalVotes}
                            <div>
                                <progress id={question.id} value={optionOnePercent} max="100" width={optionOnePercent}>
                                </progress></div>
                        </div>
                    </div>
                    <br />
                    <div className={question.optionTwo.votes.includes(question.author) ? `bordered` : ``}>
                        <div key={question.id + "o2"} >Would you rahter {question.optionTwo.text}</div>
                        <div>
                            {optionTwo.votes.length}/{totalVotes}
                            <div>
                                <progress id={question.id} value={optionTwoPercent} max="100" width={optionTwoPercent}>
                                </progress></div>
                        </div>
                    </div>
                    <br /></div>
            </div>
        ) : <div>Invalid question</div>
    }
}

function mapStateToProps({ users, questions, authedUser }, props) {

    const { id } = props.match.params
    const question = questions[id]
    const user = users[authedUser.id]

    return {
        authedUser,
        user,
        question,
        users,

    }
}

export default connect(mapStateToProps)(Results)