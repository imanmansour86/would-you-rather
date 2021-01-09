
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';


class QuestionListItem extends Component {
    state = {
        answer: '',
        toHome: false,
    }

    handleChangeQuestion = (e) => {
        const answer = e.target.value
        this.setState(() => ({
            answer,
            questionId: this.props.question.id
        }))
    }

    toResults = (e, id) => {
        const { question } = this.props
        e.preventDefault()
        this.props.history.push(`/result/${question.id}`)
    }


    handleSubmit = (e) => {
        const { question } = this.props
        this.props.history.push(`/question/${question.id}`)
    }

    render() {

        const { question, user, authedUser } = this.props

        let hasVoted = false
        if (question.optionOne.votes.includes(authedUser.id) || question.optionTwo.votes.includes(authedUser.id)) {
            hasVoted = true
        }
        if (question === null) {
            return <p>Question does not exist</p>
        }
        return question ? (
            <div key={question.id}>
                <div>{user.name} asks:
                            <p>Would you rather</p></div>
                <ul>
                    <li >{question.optionOne.text}
                    </li>
                    <li >{question.optionTwo.text}
                    </li>
                </ul>
                {hasVoted ?
                    <div>
                        <button className='btn'
                            onClick={(e) => { this.toResults(e, question.id) }}>
                            View Results
                 </button>
                    </div>
                    :
                    <div>
                        <button className='btn'
                            onClick={e => this.handleSubmit(e)}>
                            View Question
                </button> </div>}
                <br /></div>
        ) : <div>Invalid question</div>
    }
}

export default withRouter(QuestionListItem)