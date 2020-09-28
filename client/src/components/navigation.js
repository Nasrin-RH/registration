import React from 'react';

          
const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav  className="navbar navbar-light bg-primary" >
          <button className="btn btn-dark" onClick={() => onRouteChange('signout')} >
          Sign Out
          </button>
          </nav>
          );

    } 
    else {
      return (
<nav  className="navbar navbar-light bg-primary" >
  <form className="form-inline">
    <button className="btn btn-dark" type="button" onClick={() => onRouteChange('signin')}>Sign In</button>
   <pre> </pre>
    <button className="btn  btn-dark" type="button" onClick={() => onRouteChange('register')} >Register</button>
  </form>





        {/* <div>
          <p  onClick={() => onRouteChange('signin')} >
          Sign In
          </p>
          <p onClick={() => onRouteChange('register')} >
          Register</p>
        </div> */}
        </nav>
      );
    }
}

export default Navigation;
