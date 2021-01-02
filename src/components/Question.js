import React, { Component } from 'react'
import { connect } from 'react-redux';
import { formatQuestion }  from '../utils/_DATA'
import { Radio, Input } from 'antd';


class Question extends Component {

    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };
          //const { value } = this.state;



        console.log('the questions are', this.props)
        return(

            

            <div>
            
                
                <Radio.Group onChange={this.onChange} >

                    <Radio style={radioStyle} value={this.props.currentQuestion.optionOne.text}>{this.props.currentQuestion.optionOne.text}
                    </Radio>

                    <Radio style={radioStyle} value={this.props.currentQuestion.optionTwo.text}>{this.props.currentQuestion.optionTwo.text}
                    </Radio>

                   
                    
                </Radio.Group>




            </div>

        )
    }





}

function mapStateToProps({ users, currentQuestion, authedUser}, {id}) { 
   

    return {
      
        currentQuestion
    }
}



export default connect(mapStateToProps)(Question) 

