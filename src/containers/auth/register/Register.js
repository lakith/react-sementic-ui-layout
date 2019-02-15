import React,{Component} from 'react'
import {Grid,Form,Segment,Button,Header,Message,Icon} from 'semantic-ui-react';
import {NavLink,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as authActions from '../../../store/index';

class Register extends Component {

    state={
        username:"",
        email:"",
        password:"",
        passwordConfirmation: "",
        name:"",
        file:"",
        validationErrors:[]
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.isFormValid()){
            this.setState({errors:[],loading:true});
            let userData = {
                name:this.state.name,
                email:this.state.email,
                password:this.state.password,
                userName:this.state.username,
                file:this.state.file
            }

            this.props.onAuthSubmit(userData);
        }
    }

    handleInputErrors = (errors,inputName) => {
        return errors.some(error=>
            error.message.toLowerCase().includes(inputName)
            ) ? "error" : ""
    }

    handleChange = (event)=>{
        this.setState({[event.target.name] : event.target.value});

    }

    displayErrors = errors => errors.map((error,index)=>(
        <p key={index}>{error.message}</p>
    )); 


    addFile = (event) => {
        const file = event.target.files[0];
        if(file){
            this.setState({ file });
        }
    }

    isFormValid = () => {
        let errors = [];
        let error;

        if(this.isEmptyForm(this.state)) {
            error = {message:"Fill all the fields"};
            this.setState({validationErrors:errors.concat(error)})
            return false;
        } else if(!this.isPasswordValid(this.state)) {
            error = {message : "Invalied password"}
            this.setState({validationErrors:errors.concat(error)});
            return false;
        } else {
            return true;
        }
    }

    
    isPasswordValid = ({password,passwordConfirmation}) => {
        console.log("Form Validation - password");
        if(password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else if (password !== passwordConfirmation){
            return false;
        } else {
            return true;
        }
    }

    isEmptyForm = ({username,email,password,passwordConfirmation,name,file})=> {
        console.log("Form Validation - required");
        return !username.length || !email.length || !password.length || !passwordConfirmation || !name.length || !file
    }

    render () {

        let {validationErrors,username,email,password,passwordConfirmation,name} = this.state;

        let setRedirect = null;
        if(this.props.authSubmitRedirect) {  
            setRedirect =  <Redirect to="/login" />
        }

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
            {setRedirect}
            <Grid.Column  style={{maxWidth:500}}>
                <Header as="h1" icon style={{color:"#bf00ff"}} textAlign="center">
                    <Icon name="puzzle piece"  style={{color:"#bf00ff"}} />
                        Register for RSVP
                </Header>
                <Form size="large" onSubmit={this.handleSubmit}>
                    <Segment stacked>
                        <Form.Input className={this.handleInputErrors(validationErrors,'name')}  fluid name="name" icon="user" iconPosition="left" placeholder="Name" onChange={this.handleChange} type="text" value={name} required />
                        <Form.Input className={this.handleInputErrors(validationErrors,'username')}  fluid name="username" icon="user" iconPosition="left" placeholder="Username" onChange={this.handleChange} type="text" value={username} required />
                        <Form.Input className={this.handleInputErrors(validationErrors,'email')}  fluid name="email" icon="mail" iconPosition="left" placeholder="Email Address" onChange={this.handleChange} type="email" value={email} required />
                        <Form.Input className={this.handleInputErrors(validationErrors,'password')}   fluid name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password" value={password} required />
                        <Form.Input className={this.handleInputErrors(validationErrors,'password')} fluid name="passwordConfirmation"  icon="repeat" iconPosition="left" placeholder="Password Confirmation" onChange={this.handleChange} type="password" value={passwordConfirmation} required />
                        <Form.Input type="file" icon='tags' iconPosition='left' name="file" onChange={this.addFile} />
                        <Button disabled={this.props.loading} className={this.props.loading? 'loading':''} style={{backgroundColor:"#bf00ff",color:"white"}} fluid size="large">Submit</Button>
                    </Segment>
                </Form>
                {this.props.error ? (<Message error><h3>Error</h3>{this.props.error}</Message>):null}
                {validationErrors.length > 0? (<Message error><h3>Error</h3>{this.displayErrors(validationErrors)}</Message>):null}
                <Message>Already a member ?  <NavLink to="/login">Login</NavLink></Message>
            </Grid.Column>
        </Grid>
        )
    }
}

const mapStateToProps = (state) => { 
    return{
        loading: state.auth.loading,
        error: state.auth.errors,
        submit:state.auth.submit,
        authSubmitRedirect:state.auth.authSubmitRedirect
    }
 };

 const mapDispatchToProps = (dispatch) => { 
    return{
        onAuthSubmit:(userData)=>dispatch(authActions.authSubmit(userData)),
        onSubmitRedirect:()=>dispatch(authActions.setAuthSubmitRedirectPath())
    }
 };

export default connect(mapStateToProps,mapDispatchToProps)(Register);