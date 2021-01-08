import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {

    state = { 
        optionOne: '',
        optionTwo:'',
        toHome: false,
    }

    handleSubmit = (e) => { 
        e.preventDefault()
        const { optionOne, optionTwo} = this.state
        const { dispatch, id  } = this.props 

        //Add question to store 
        dispatch(handleAddQuestion(optionOne, optionTwo))
        
        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
            toHome: id ? false : true, 
        }))
    }
   
    handleChangeQuestion1 = (e) => {
        const optionOne = e.target.value

        this.setState(() => ({
            optionOne
          
        }))
    }

     
    handleChangeQuestion2 = (e) => {
        const optionTwo= e.target.value

        this.setState(() => ({
            optionTwo
          
        }))
    }


    render() {
                
        const { optionOne, optionTwo, toHome } = this.state
        if (toHome === true) {
            return <Redirect to = '/'/>
        }


        return (

            <div>
            <h3 className = 'center'>Create new Question</h3>

            <form className = 'new-question' >
                <input type = 'text' className= 'textarea' maxLength = {280}
                placeholder = "Enter first option" 
                value = {optionOne}
                onChange={this.handleChangeQuestion1}/>

                <br/>
                <p>Or</p>
                  <input type = 'text' className= 'textarea' maxLength = {280}
                placeholder = "Enter second option" 
                value = {optionTwo}
                onChange={this.handleChangeQuestion2}/>

                <br/>           
                <button className= 'btn'
                type = 'submit'
                disabled= {optionOne === '' || optionTwo === ''}
                onClick={(e) => this.handleSubmit(e)}>
            

                    Submit
                </button>
                    </form>






            </div>





        )
    }



}



export default connect()(NewQuestion)