import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Radio } from 'antd';
import { handleUserAnswer } from '../actions/shared'
import { Redirect } from 'react-router-dom'
import { Tabs } from 'antd';
import Question from './Question'
const { TabPane } = Tabs;

class QuestionCard extends Component {


    state = {
        answer: '',
        questionId:'',
        toHome: false,
    }

    handleChangeQuestion = (e, questionId) => {
        const answer = e.target.value
       
        this.setState(() => ({
            answer,
            questionId
        }))
    }



    handleSubmit = (e) => {

        e.preventDefault()
        const { answer, questionId } = this.state
        const { dispatch } = this.props
        dispatch(handleUserAnswer(
            questionId,
            answer,
         
        ))

    }

    render() {


        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const { answer, toHome } = this.state;

        if (toHome === true) {
            return <Redirect to='/' />
        }


        console.log('the questions are', this.props)
        return (
            <div>



                <Tabs defaultActiveKey="2" >
                    <TabPane tab="Answered" key="1">

                        {this.props.answeredQuestions.map((question, index) => <div key={question.id}>
                            <h2>question #{index}</h2>
                            <div>{this.props.users[question.author].name} asks:
                            <p>Would you rather</p></div>
                            <Radio.Group onChange={(e)=>this.handleChangeQuestion(e, question.id)} >
                                <Radio style={radioStyle} key={question.id + "o1"} value={"optionOne"}>{question.optionOne.text}
                                </Radio>
                                <Radio style={radioStyle} key={question.id + "o2"} value={"optionTwo"}>{question.optionTwo.text}
                                </Radio>
                            </Radio.Group>
                            <button className='btn'
                                type='submit'
                                disabled={answer === ''}
                                onClick={e => this.handleSubmit(e)}>


                                Submit
                                </button>
                            <br /></div>

                        )}


                    </TabPane>
                    <TabPane tab="Unsnswered" key="2">
                        {this.props.unAnsweredQuestions.map((question, index) => <div key={question.id}>
                            <h2>question #{index}</h2>

                            <div>{this.props.users[question.author].name} asks:</div>
                            <Radio.Group onChange={(e)=>this.handleChangeQuestion(e, question.id)} >
                                <Radio style={radioStyle} key={question.id + "o1"} value={"optionOne"}>{question.optionOne.text}
                                </Radio>
                                <Radio style={radioStyle} key={question.id + "o2"} value={"optionTwo"}>{question.optionTwo.text}
                                </Radio>
                            </Radio.Group>
                            <button className='btn'
                                type='submit'
                                disabled={answer === ''}
                                onClick={e => this.handleSubmit(e)}>


                                Submit
                                </button>
                            <br /></div>
                            
                        )}
                        
                    </TabPane>

                </Tabs>


            </div>

        )
    }





}

function mapStateToProps({ users, questions, authedUser }) {
    console.log("mapStateToProps", questions)
    const answeredQuestions = Object.values(questions).filter(question => question.optionOne.votes.includes(authedUser.id) ||
        question.optionTwo.votes.includes(authedUser.id)).sort((a, b) => b.timestamp - a.timestamp)


    const unAnsweredQuestions = Object.values(questions).filter(question => !(question.optionOne.votes.includes(authedUser.id)) &&
        !(question.optionTwo.votes.includes(authedUser.id))).sort((a, b) => b.timestamp - a.timestamp)

    console.log('here', questions, authedUser.id)

    return {
        authedUser,
        users,
        answeredQuestions,
        unAnsweredQuestions,

    }
}



export default connect(mapStateToProps)(QuestionCard)

