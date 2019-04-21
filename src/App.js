import React, { Component } from 'react'; 
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'; 
import FaceRecognition from './components/FaceRecognition/FaceRecognition'; 
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';  
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';  
import Rank from './components/Rank/Rank';  
import './App.css'; 

const app = new Clarifai.App({
  apiKey: '8169325a8b3640e68c6d5f1e25c8b94e'
 });

const particlesOptions = {
  particles: { 
    number: { 
      value: 50, 
      density: { 
        enable: true, 
        value_area: 800
      }
    }
  }
}

class App extends Component { 
  constructor() {
    super(); 
    this.state = { 
      input: '', 
      imageUrl: ''
      box: {},
    }
  } 

  calculateFaceLocation = (data) => { 
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; 
    const image = document.getElementById('inputimage'); 
  }

  onInputChange = (event) => { 
    this.setState({input: event.target.value}); //to get value from the input
  } 

  onButtonSubmit = () => { 
    this.setState({imageUrl: this.state.input})
    console.log('click'); 
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then((response => this.calculateFaceLocation(response))
    .catch(err => console.log(err))
    ); 
  }

  render() {
    return (
      <div className="App"> 
        <Particles className='particles'
        params={particlesOptions} />
        <Navigation /> 
        <Logo /> 
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit} /> 
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
