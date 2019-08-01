import React, { useState } from 'react';
import PropTypes from 'prop-types';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import travela from './travela.svg';

const Fourier = (props) => {
  const [image, setImage] = useState(null);

  const [points, setPoints] = useState([]);

  const onChange = (e) => {
    const { target: { files }} = e;
    if( files && files[0] && FileReader){
      const fr = new FileReader();
      fr.onload = ({ target: { result }}) => {
        setImage(result);

        const svg = document.querySelector('svg');
        if( svg ){
          const path = svg.querySelectorAll('path')[0];
          const coordinates = [];
          const pathLength = path.getTotalLength();
          for(let i=0;i<pathLength;i++){
            const point = path.getPointAtLength(i);
            coordinates.push({ x: point.x, y: point.y});
          }
          setPoints(coordinates);
        }
      };
      fr.readAsText(files[0]);
    }
  };

  return (
    <div>
      <div className="canvas">
        <P5Wrapper sketch={sketch} points={points} />
      </div>
    </div>
  );
};

Fourier.propTypes = {};

Fourier.defaultProps = {};

export default Fourier;
