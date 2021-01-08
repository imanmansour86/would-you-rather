
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Radio } from 'antd';
import { handleUserAnswer } from '../actions/shared'
import { withRouter } from 'react-router-dom';

class Question extends Component {
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

        e.preventDefault()
        const { answer } = this.state
        const { dispatch, question } = this.props
        dispatch(handleUserAnswer(
            question.id,
            answer,

        ))
        this.props.history.push(`/result/${question.id}`)

    }
    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const { question } = this.props
        const { answer } = this.state;

        if (question === null) {
            return <p>Question does not exist</p>
        }
        return question ? (
            <div key={question.id}>

                <div>{this.props.users[question.author].name} asks:
                            <p>Would you rather</p></div>
                {this.props.hasVoted ?
                    <div>
                        <ul>
                            <li >{question.optionOne.text}
                            </li>
                            <li >{question.optionTwo.text}
                            </li>
                        </ul>
                        <button className='btn'
                            onClick={(e) => { this.toResults(e, question.id) }}>
                            View Results
                 </button>
                    </div>
                    :
                    <div>
                        <Radio.Group onChange={(e) => this.handleChangeQuestion(e, question.id)} >
                            <Radio style={radioStyle} key={question.id + "o1"} value={"optionOne"}>{question.optionOne.text}
                            </Radio>
                            <Radio style={radioStyle} key={question.id + "o2"} value={"optionTwo"}>{question.optionTwo.text}
                            </Radio>
                        </Radio.Group>
                        <button className='btn'
                            type='submit'
                            disabled={answer === ''}
                            onClick={e => this.handleSubmit(e)}>
                            Answer
                </button> </div>}
                <br /></div>
        ) : <div>Invalid question</div>
    }
}
function mapStateToProps({ users, questions, authedUser }, props) {
    const { id } = props.match.params
    const question = questions[id]
    let hasVoted = false
    if (question.optionOne.votes.includes(authedUser.id) || question.optionTwo.votes.includes(authedUser.id)) {
        hasVoted = true
    }

    return {
        authedUser,
        question,
        users,
        hasVoted,

    }
}

export default withRouter(connect(mapStateToProps)(Question))