import React,{Component} from 'react'
import {NavLink,Redirect} from 'react-router-dom'
import {Grid,Form,Segment,Button,Header,Message,Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as actionTypes from '../../../store/index'

class Login extends Component {

    state = {
        username:{
            value:"",
            touched:false
        },
        password:{
            value:"",
            touched:false
        },
        validationErrors: []
    }

    handleInputErrors = (inputName,errors) => {
        return errors.some(error=>
            error.message.toLowerCase().includes(inputName)
            ) ? "error" : ""
    }

    handleChange = (event)=>{
        if(event.target.name === "username"){
            let updatedUsername = {...this.state.username}
            updatedUsername.value = event.target.value
            this.setState({username:updatedUsername})

        } else if(event.target.name === "password") {
            let updatedPassword = {...this.state.password}
            updatedPassword.value = event.target.value
            this.setState({password:updatedPassword})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.username.value === ""){
            this.setState({validationErrors:this.state.validationErrors.concat({message:"Please Insert Your Username"})})
        } else if(this.state.password.value === ""){
            this.setState({validationErrors:this.state.validationErrors.concat({message:"Please Insert Your Password"})})
        }
        if(this.isFormValid()){
            this.props.onSubmit(this.state.username.value,this.state.password.value);
        }
        
    }

    isFormValid = () => this.state.username.value !== "" && this.state.password.value !== "";

    // displayErrors = errors => errors.map((error,index)=>(
    //     <p key={index}>{error.message}</p>
    // ));

    render(){

        let username = this.state.username.value;
        console.log(username)
        let password = this.state.password.value;
        console.log(password)

        let setRedirect = null
        if(this.props.isAuthenticated){
            setRedirect = <Redirect to="/" />
        }

        return(
            <div>
            <Grid textAlign="center" verticalAlign="middle" className="app">
            {setRedirect} 
            <Grid.Column  style={{maxWidth:500}}>
                <Header as="h1" icon color="orange" textAlign="center">
                    <Icon name="code branch" color='violet' />
                        Login to RSVP
                </Header>
                <Form size="large" onSubmit={this.handleSubmit}>
                    <Segment stacked>
                        <Form.Input className={this.handleInputErrors('username',this.state.validationErrors)}  fluid name="username" icon="user circle" iconPosition="left" placeholder="Username" onChange={this.handleChange} type="text" value={username} required />
                        <Form.Input className={this.handleInputErrors('password',this.state.validationErrors)}   fluid name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password" value={password} required />
                        <Button disabled={this.props.loading} className={this.props.loading? 'loading':''} color="violet" fluid size="large">Submit</Button>
                    </Segment>
                </Form>
                 {this.state.validationErrors.length > 0? (<Message error><h3>Error</h3>{this.displayErrors(this.state.validationErrors)}</Message>):null} 
                 {this.state.errors ? (<Message error><h3>Error</h3>{this.props.errors}</Message>):null} 
                <Message>Don't have an account ?  <NavLink to="/register">Signup</NavLink></Message>
            </Grid.Column>
        </Grid>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuthenticated : state.auth.accessToken !== null,
        loading:state.auth.loading,
        errors:state.auth.errors
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        onSubmit : (username,password) => dispatch(actionTypes.authLogin(username,password))
    }
} 

export default connect(mapStateToProps,mapDispatchToProps) (Login)