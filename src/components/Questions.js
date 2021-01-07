import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Radio } from 'antd';
import { handleUserAnswer } from '../actions/shared'
import { Redirect } from 'react-router-dom'
import { Tabs } from 'antd';
import Question from './Question'
const { TabPane } = Tabs;

class Questions extends Component {




    render() {
console.log("render")

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        // if (toHome === true) {
        //     return <Redirect to='/' />
        // }


        console.log('the questions are', this.props)
        return (
            <div>
                <Tabs defaultActiveKey="2" >
                    <TabPane tab="Answered" key="1">
                        {this.props.answeredQuestions.map((question, index) => {
                            console.log("fff", question)
                            return <Question key={question.id} index={index} id={question.id} />
                        }
                        )}
                    </TabPane>
                    <TabPane tab="Unsnswered" key="2">
                        {this.props.unAnsweredQuestions.map((question, index) => {
                            return <Question key={question.id} index={index} id={question.id} />
                        }
                        
                        )}

                    </TabPane>

                </Tabs>

            
        
   
            </div>

        )
    }





}

function mapStateToProps({ users, questions, authedUser }) {

    console.log("mapStateToProps2", questions)
    const answeredQuestions = Object.values(questions).filter(question => question.optionOne.votes.includes(authedUser.id) ||
        question.optionTwo.votes.includes(authedUser.id)).sort((a, b) => b.timestamp - a.timestamp)


    const unAnsweredQuestions = Object.values(questions).filter(question => !(question.optionOne.votes.includes(authedUser.id)) &&
        !(question.optionTwo.votes.includes(authedUser.id))).sort((a, b) => b.timestamp - a.timestamp)

   
    console.log('nextQuestion', unAnsweredQuestions[0])

    return {
        authedUser,
        users,
        answeredQuestions,
        unAnsweredQuestions,
     
    }
}



export default connect(mapStateToProps)(Questions)

