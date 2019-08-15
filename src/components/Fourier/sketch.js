import {drawCircle, dft} from './util';
import generatedPath, { generatePath } from './path';

let path = generatedPath;

// let path = [100, 100, 100, -100, -100, -100, 100, 100, 100, -100, -100, -100];

let wave = [];
let circles = [];
let pen = {x: 0, y: 0};

const input = [];

export default (p) => {

  let speed = 1;
  const circle = drawCircle(p, speed);
  const evaluateDft = dft(p);


  let time = 0;
  let N = path.length;
  let scale = 1;
  let paused = false;
  let shape = [];
  const dt = p.TWO_PI / N;

  const frequencies = evaluateDft({points: path, dt, N});

  const drawCircles = () => {
    p.noFill();
    p.stroke(255);
    circles = [];

    let x = (p.width - 725) / 2;
    let y = (p.height - 725) / 2;


    circles = frequencies.map(({frequency, amplitude, phase}) => {
      const end = circle({x, y, radius: amplitude, frequency, time, phase, draw: false});
      const result = {
        center: {x, y},
        radius: amplitude,
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

    circles.forEach(({center, arrow, radius, frequency, phase}) => {
      circle({x: center.x - pen.x, y: center.y - pen.y, radius, frequency, time, phase, scale, draw: true});
    });

  };

  p.myCustomRedrawAccordingToNewPropsHandler = ({ points }) => {
    if( points.length ){
      path = generatePath(points, 20);
      wave = [];
      time = 0;
    }
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

  const drawShape = () => {
    p.stroke('#ff00ee');
    p.noFill();
    p.beginShape();
    shape.forEach(({x, y}, index) => {
      p.vertex(x - pen.x, y - pen.y);
    });
    p.endShape();
  };

  const drawPath = () => {
    let color = [59, 121, 204];

    let prev = {...wave[0]};
    p.strokeWeight(3);
    p.stroke(...color);
    for(let i=0;i<wave.length;i++){
      const cur = wave[i];
      const strength = (wave.length - i) / wave.length;
      p.strokeWeight((3 * strength) + 0.5);
      p.line(prev.x, prev.y, cur.x, cur.y);

      prev = cur;
    }
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.frameRate(20);
  };

  p.draw = () => {
    p.translate(pen.x, pen.y);
    p.scale(scale);
    p.strokeWeight(1 / scale);
    p.background(0);
    drawCircles();
    // drawWave(p.width / 2 + 200, '#FF5722');
    drawPath();
    drawShape();

    if (!paused) {
      time += (dt * speed);
    }

    if( time >= p.TWO_PI){
      time = 0;
      // wave = [];
    }
  };
};
