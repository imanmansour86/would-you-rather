
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Radio } from 'antd';
import { handleUserAnswer } from '../actions/shared'


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

    handleSubmit = (e) => {

        e.preventDefault()
        const { answer } = this.state
        const { dispatch, question } = this.props
    
        dispatch(handleUserAnswer(
            question.id,
            answer,

        ))

    }
    render() {
        console.log('1234', this.props)
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const { question, index } = this.props
        console.log('answer here is', question)
        const { answer } = this.state;

        return question ? (
            <div key={question.id}>
                <h2>question #{index}</h2>
                <div>{this.props.users[question.author].name} asks:
                            <p>Would you rather</p></div>
                <Radio.Group onChange={(e) => this.handleChangeQuestion(e, question.id)} >
                    <Radio style={radioStyle} key={question.id + "o1"} value={"optionOne"}>{question.optionOne.text}
                    </Radio>
                    <Radio style={radioStyle} key={question.id + "o2"} value={"optionTwo"}>{question.optionTwo.text}
                    </Radio>
                </Radio.Group>
                {this.props.hasVoted ? 
                <button className='btn'
                    type='submit'
                    disabled={answer === ''}
                    onClick={()=>{}}>
                    View Results
                 </button>

                    :

                <button className='btn'
                    type='submit'
                    disabled={answer === ''}
                    onClick={e => this.handleSubmit(e)}>
                    Submit
                </button> } 
                <br /></div>
        ) : <div>Invalid question</div>
    }
}
function mapStateToProps({ users, questions, authedUser }, {id,index}) {
   const question = questions[id]
   let hasVoted = false
   if (question.optionOne.votes.includes(authedUser.id) || question.optionTwo.votes.includes(authedUser.id)){
       hasVoted= true
   }

    return {
        authedUser,
        question,
        users,
        index,
        hasVoted,

    }


}


export default connect(mapStateToProps)(Question)