import {drawCircle, dft } from './util';
import valuePath from './path';

// let path = [100, 100, 100, -100, -100, -100, 100, 100, 100, -100, -100, -100];
const path = valuePath;

const wave = [];
let circles = [];
let pen = {x: 0, y: 0};

const input = [];

export default (p) => {
  const circle = drawCircle(p, 1);
  const evaluateDft = dft(p);

  let time = 0;
  let n = 30;
  let scale = 1;
  let scaleSensitivity = 0.05;
  let paused = false;
  let frequencies = [];

  const drawCircles = () => {
    p.noFill();
    p.stroke(255);
    circles = [];

    let x = p.width * 0.5;
    let y = p.height * 0.2;

    frequencies = evaluateDft(path, 1);

    circles = frequencies.map(({ frequency, amplitude, phase}) => {
      const end = circle({x, y, radius: amplitude, frequency, time, phase, draw: false});
      const result = {
        center: { x, y },
        radius : amplitude,
        arrow: {...end},
        frequency,
        phase
      };
      x = end.x;
      y = end.y;
      return result;
    });
    const result = circles[circles.length - 1].arrow;

    wave.unshift(result);
    if (scale === 1) {
      pen = {x: 0, y: 0};
    } else {
      pen = {x: result.x, y: result.y};
    }

    circles.forEach(({center, arrow, radius, frequency, phase}) => {
      circle({x: center.x - pen.x, y: center.y - pen.y, radius, frequency, time, phase, scale, draw: true});
    });


    if (wave.length > 800) {
      wave.pop();
    }
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {

  };


  const drawWave = (start, ...stroke) => {
    p.stroke(stroke);
    let x = start;
    p.noFill();
    p.beginShape();
    wave.forEach(({y}, index) => {
      p.vertex(x + index - pen.x, y - pen.y);
    });
    p.endShape();
    if (wave[0]) {
      p.stroke(150);
      p.line(wave[0].x - pen.x, wave[0].y - pen.y, x - pen.x, wave[0].y - pen.y);
    }
  };

  const drawPath = (...stroke) => {
    p.stroke(stroke);
    p.noFill();
    p.beginShape();
    wave.forEach(({x, y}, index) => {
      p.vertex(x - pen.x, y - pen.y);
    });
    p.endShape();
  };

  p.setup = () => {
    p.createCanvas(1500, 900);
    console.log(path);
    console.log(evaluateDft(path, 1));
  };

  p.draw = () => {
    p.translate(pen.x, pen.y);
    p.scale(scale);
    p.strokeWeight(1 / scale);
    p.background(0);
    drawCircles();
    // drawWave(p.width / 2 + 200, '#FF5722');
    drawPath('#5cff4a');

    if( !paused ){
      let dt = p.TWO_PI / frequencies.length;
      time += (dt / scale);
    }
  };

  p.keyPressed = () => {
    if (p.key === 'ArrowUp') {
      n *= 2;
    } else if (p.key === 'ArrowDown') {
      n /= 2;
    } else if(p.key === ' '){
      paused = !paused;
    }
  };

  p.mouseWheel = (e) => {
    scale += scaleSensitivity * -e.delta;
    scale = p.constrain(scale, 1, 1000);
  };
};
