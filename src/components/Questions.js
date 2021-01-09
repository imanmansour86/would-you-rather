import React from 'react'
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import QuestionListItem from './QuestionListItem'
const { TabPane } = Tabs;

const Questions = ({
    users,
    answeredQuestions,
    unAnsweredQuestions,
    authedUser,

    }) => (
        <div>
            <Tabs defaultActiveKey="2" >
                <TabPane tab="Answered" key="1">
                    {answeredQuestions.map((question) => (
                        <QuestionListItem key={question.id} user={users[question.author]} authedUser={authedUser} question={question} />
                    ))}
                </TabPane>
                <TabPane tab="Unsnswered" key="2">
                    {unAnsweredQuestions.map((question) => (
                        <QuestionListItem key={question.id} user={users[question.author]} authedUser={authedUser} question={question} />
                    ))}
                </TabPane>
            </Tabs>
        </div>
    )


function mapStateToProps({ users, questions, authedUser }) {
    const answeredQuestions = Object.values(questions).filter(question => question.optionOne.votes.includes(authedUser.id) ||
        question.optionTwo.votes.includes(authedUser.id)).sort((a, b) => b.timestamp - a.timestamp)
    const unAnsweredQuestions = Object.values(questions).filter(question => !(question.optionOne.votes.includes(authedUser.id)) &&
        !(question.optionTwo.votes.includes(authedUser.id))).sort((a, b) => b.timestamp - a.timestamp)

    return {
        authedUser,
        users,
        answeredQuestions,
        unAnsweredQuestions,

    }
}


export default connect(mapStateToProps)(Questions)

