import React,{Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class Register extends Component {

state={
id:0,
email: '',
password: '',
name: '',
company:'',
designation:'',
contact:'',
department:''
}

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
//   onNameChange = (event) => {
//     this.setState({name: event.target.value})
//   }

submitFormAdd= () => {
    fetch('http://localhost:5000/reg', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
       company:this.state.company,
       designation:this.state.designation,
       contact:this.state.contact,
       department:this.state.department 
      })
    })
    .then((response) => response.json())
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
        const{id,name,company,department,designation,contact,email,password}=this.props.item;
        this.setState({
            id,
            name,
            company,
            department,
            designation,
            contact,
            email,
            password
        })
    }
}

  render() {
    return (<div>
   <h1 className="display-4">Register</h1>
        <Form onSubmit={this.submitFormAdd}>
        <FormGroup>
            <Label>Name</Label>
            <Input type="text"
                  name="name"
                  id="name"
                  onChange={this.onChange} required/>
        </FormGroup>
        <FormGroup>
        <Label>Company</Label>
        <Input type="text"
                  name="company"
                  id="company"
                  onChange={this.onChange} required/>
        </FormGroup>
        
        <FormGroup>
        <Label>Department</Label> 
        <Input type="text"
                  name="department"
                  id="department"
                  onChange={this.onChange} required/>
        </FormGroup>
        <FormGroup>
        <Label>Designation</Label> 
        <Input type="text"
                  name="designation"
                  id="designation"
                  onChange={this.onChange} required />
        </FormGroup>
        <FormGroup>
        <Label>Contact</Label> 
        <Input type="text"
                  name="contact"
                  id="contact"
                  onChange={this.onChange} required/>
        </FormGroup>
        <FormGroup>
        <Label>Email</Label>
         <Input type="text"
                  name="email"
                  id="email"
                  onChange={this.onChange} required />
        </FormGroup>
        <FormGroup>
        <Label>Password</Label>
         <Input type="password"
                  name="password"
                  id="password"
                  onChange={this.onChange} required />
        </FormGroup>
        {/* <Button className="btn btn-success" type="button">Submit</Button> */}
        <Button className="btn btn-success">Submit</Button>
      </Form>
      </div>
    );
  }
}

export default Register;