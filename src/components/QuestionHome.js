
import React from 'react'
import { connect } from 'react-redux';
import Question from './Question'
import Results from './Results'
import { withRouter } from 'react-router-dom';

const QuestionHome = ({
    hasVoted
        }) => (

        <div>
            {hasVoted ?
                <Results />
                : <Question />

            }
        </div>
    )

function mapStateToProps({ questions, authedUser }, props) {
    const { id } = props.match.params
    const question = questions[id]

    let hasVoted = false
    if (question.optionOne.votes.includes(authedUser.id) || question.optionTwo.votes.includes(authedUser.id)) {
        hasVoted = true
    }
    console.log(hasVoted)
    return {
        hasVoted

    }
}

export default withRouter(connect(mapStateToProps)(QuestionHome))