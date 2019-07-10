import React, { useState } from 'react';
import PropTypes from 'prop-types';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';

const Fourier = (props) => {
  const [image, setImage] = useState(null);
  const onChange = (e) => {
    const { target: { files }} = e;
    if( files && files[0] && FileReader){
      const fr = new FileReader();
      fr.onload = () => {
        setImage(fr.result);
      };
      fr.readAsDataURL(files[0]);
    }
  };

  return (
    <div>
      <div className="canvas">
        <P5Wrapper sketch={sketch} />
      </div>
      <div className="form">
        <input type="file" accept="image/png,image/svg" onChange={onChange} />
        <img src={image} alt="" />
      </div>
    </div>
  );
};

Fourier.propTypes = {};

Fourier.defaultProps = {};

export default Fourier;
