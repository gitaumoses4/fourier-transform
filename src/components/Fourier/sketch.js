import {drawCircle} from './util';

const wave = [];
let circles = [];
let pen = {x: 0, y: 0};

export default (p) => {
  const circle = drawCircle(p);
  let time = 0;
  let n = 30;
  let scale = 1;
  let scaleSensitivity = 0.05;

  const drawCircles = () => {
    p.noFill();
    p.stroke(255);
    circles = [];

    let x = p.width * 0.5;
    let y = p.height * 0.5;
    let radius = 200;
    for (let i = 1; i < n; i += 2) {
      radius = 200 * 4 / (i * p.PI);
      const end = circle({x, y, radius, frequency: i, time, phase: 0, draw: false});
      circles.push({center: {x, y}, radius, arrow: {...end}, frequency: i, phase: 0});
      x = end.x;
      y = end.y;
    }
    const result = circles[circles.length - 1].arrow;

    wave.unshift(result);
    if (scale < 2) {
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
  };

  p.draw = () => {
    p.translate(pen.x, pen.y);
    p.scale(scale);
    p.strokeWeight(1 / scale);
    p.background(0);
    drawCircles();
    drawPath('#FF5722');

    time += (1 / scale);
  };

  p.keyPressed = () => {
    if (p.key === 'ArrowUp') {
      n *= 2;
    } else if (p.key === 'ArrowDown') {
      n /= 2;
    }
  };

  p.mouseWheel = (e) => {
    scale += scaleSensitivity * -e.delta;
    scale = p.constrain(scale, 1, 30);
  };
};
