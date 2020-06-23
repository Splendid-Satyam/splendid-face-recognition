import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Clarifai from 'clarifai';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLink from './components/ImageLink/ImageLink';
import ImageDetection from './components/ImageDetection/ImageDetection';
import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
  apiKey: '7309d8653d4f4803af9ff57f3f1745ee'
 });


 // PARTICLE WAVE css 

const particleOptions = {
  particles: 
  {
    number: 
    {
      value: 100,
      density: 
      {
        enable: true,
        value_area: 800
      }
    }
  }
}

// INITIAL STATE

let initialState = {
  input : '',
  ImageUrl : '',
  box : {},
  route : 'signin',
  isSignedIn : false,
  user : {
    id : '',
    name  : '',
    email : '',
    entries : 0,
    joined : ''
  }
}

// APP CONTAINER COMPONENT

class App extends Component 
{

  constructor()
  {
    super()
    this.state = initialState
  }

  // LOAD USER PROFILE

  loadUser = (data) => {
    this.setState({ user : { 
      id : data.id,
      name : data.name,
      email : data.email,
      entries : data.entries,
      joined : data.joined
     }})
  }

  // INPUT IMAGE FORM

  onInputChange = (event) => {
    this.setState({ input : event.target.value })
  }


  // FACE LOCATION DETERMINATION

  faceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      top_row    : clarifaiFace.top_row * height,
      left_col   : clarifaiFace.left_col * width,
      bottom_row : height - (clarifaiFace.bottom_row * height),
      right_col  : width - (clarifaiFace.right_col * width)
    }
  }

  // FACE BOX CREATION

  faceBox = (box) => {
    this.setState({box : box});
  } 


  // DETECT BUTTON CLICK

  onButtonChange = () => {

    this.setState({ ImageUrl : this.state.input });

    app.models.predict (
      'e15d0f873e66047e579f90cf82c9882z', 
      this.state.input
      )
      .then(response => {
        if(response) {
          fetch('https://tranquil-brushlands-09620.herokuapp.com/image', {
            method : 'put',
            headers : { 'Content-Type' : 'application/json' },
            body : JSON.stringify({
                  id : this.state.user.id 
              })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries : count }))
          })
          .catch(console.log)
        }
          this.faceBox(this.faceLocation(response))
      })
        
      .catch(err => console.log(err))
  }


  // CHANGE OF ROUTES IN APP

  onRouteChange = (route) => {

    if(route === 'signout')
    this.setState( initialState )
    else if(route === 'home')
    this.setState({ isSignedIn : true })
    this.setState({route : route});
  }


  // APP RENDER

  render() 
  {
    const {isSignedIn, box, route, ImageUrl} = this.state;

    return (
    <div className="App">

      <Particles 
      className="particles" 
      params = { particleOptions } />

      <Navigation isSignedIn = { isSignedIn } onRouteChange = { this.onRouteChange } />
      { 
        route === 'home' 

        ?  <div>
              <Logo />
              <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
              <ImageLink 
              onInputChange = { this.onInputChange } 
              onButtonChange = { this.onButtonChange }
              />
              <ImageDetection  box = { box } ImageUrl = { ImageUrl }/> 
            </div> 
        : (route === 'signin') 

          ? <SignIn  loadUser = { this.loadUser } onRouteChange = { this.onRouteChange }/>
          : <Register loadUser = { this.loadUser } onRouteChange = { this.onRouteChange }/>
      
      }
    </div>
  );
  }
}
export default App;
