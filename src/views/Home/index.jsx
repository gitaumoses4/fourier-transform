import React, { Component } from 'react';
import Fourier from '../../components/Fourier';

class Home extends Component{

  container = React.createRef();

  componentDidMount(){
  }

  toggleFullScreen = ({ target: elem}) => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  };

  render(){
    return (
      <div
        ref={this.container}
        role="presentation"
        onClick={this.toggleFullScreen}>
        <Fourier />
      </div>
    );
  }
}

export default Home;
