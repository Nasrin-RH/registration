import React,{Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class Signin extends Component {

  state={
    id:0,
    signinEmail:'',
    signinPassword:''
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };



  onSubmitSignIn = () => {
    fetch('http://localhost:5000/signin', {
      method: 'Post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })

    })
    // .then(response => response.json())
    //   .then(user => {
    //     if (user.id) {
    //       this.props.loadUser(user)
    //       this.props.onRouteChange('home');
    //    } })



       .then(response => response.json())
       .then((item) => {
         if (Array.isArray(item)) {
           this.props.addItemToState(item[0]);
           this.props.toggle();
         } else {
           console.log("failure");
         }
       })
       .catch((err) => console.log(err));
  
    alert("Submited");
   
  };
  componentDidMount(){
    if(this.props.item){
        const{id,email,password}=this.props.item;
        this.setState({
            id,
            email,
            password
        })
    }
}

  render() {
     const { onRouteChange } = this.props;
    return (
    <div>
    <legend className='display-4'>Sign In</legend>
       <Form onSubmit={this.onSubmitSignIn}>
        <FormGroup>
            <Label>Email</Label>
            <Input type="text"
                  name="name"
                  id="name"
                  onChange={this.onChange} required/>
        </FormGroup>
        <FormGroup>
        <Label>Password</Label>
        <Input type="password"
                  name="password"
                  id="password"
                  onChange={this.onChange} required/>
        </FormGroup>
        <Button className="btn btn-success">Submit</Button>
        <div>
          <p>New user?</p>
          <Button  className="btn btn-light"
              onClick={() => onRouteChange('register')} 
          >
            Register
          </Button>
         </div>
        </Form>
        </div>
    );
  }
}

export default Signin;