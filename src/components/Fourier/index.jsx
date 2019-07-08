import React from 'react';
import PropTypes from 'prop-types';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';

const Fourier = (props) => {
  return (
    <P5Wrapper sketch={sketch} />
  );
};

Fourier.propTypes = {};

Fourier.defaultProps = {};

export default Fourier;
