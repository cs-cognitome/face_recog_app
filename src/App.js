import React, { Component } from 'react'; 
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'; 
import FaceRecognition from './components/FaceRecognition/FaceRecognition'; 
import Navigation from './components/Navigation/Navigation'; 
import SignIn from './components/SignIn/SignIn';  
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
      imageUrl: '',
      box: {}, 
      route: 'signin'
    }
  } 

  calculateFaceLocation = (data) => { 
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; 
    const image = document.getElementById('inputimage'); 
    const width = Number(image.width); 
    const height = Number(image.height); 
    return { 
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => { 
    this.setState({box: box}); 
  }

  onInputChange = (event) => { 
    this.setState({input: event.target.value}); //to get value from the input
  } 

  onButtonSubmit = () => { 
    this.setState({imageUrl: this.state.input})
    console.log('click'); 
    app.models.predict(Clarifai.FACE_DETECT_MODEL, 
    this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
  } 

  onRouteChange = () => { 
    this.setState({route: 'home'}); 
  }

  render() {
    return (
      <div className="App"> 
        <Particles className='particles'
        params={particlesOptions} />
        <Navigation /> 
        { this.state.route === 'signin' 
        ? <SignIn onRouteChange={this.onRouteChange} /> 
        : <div>
          <Logo /> 
          <Rank />
          <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit} /> 
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} /> 
        </div>
        }
      </div>
    );
  }
}

export default App;
