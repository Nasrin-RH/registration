import React,{Component} from 'react';
import './App.css';
import Navigation from './components/navigation';
import Register from './components/register';
import Signin from './components/signin'



const initialState={
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      company:data.company,
      department:data.department,
      designation:data.designation,
      contact:data.contact,
      email: data.email
    }})
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
     }
    else if (route === 'home') {
       this.setState({isSignedIn: true})
     }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, route } = this.state;
    return (
       <div className="App">
         
         <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          { (
              route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              :
               
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
              
              )
         } 
        
       </div>
  );
}
}
export default App;

