export const renderLine = (p) => {

};

export const drawCircle = (p, speed = 30) => ({x, y, radius: amplitude, frequency, time, phase = 0, draw = true, scale = 1}) => {
  let _x = amplitude / 2 * Math.cos(phase + frequency * time / speed) + x;
  let _y = amplitude / 2 * Math.sin(phase + frequency * time / speed) + y;
  if (draw) {
    p.noFill();
    p.stroke(100);
    p.ellipse(x, y, amplitude);


    p.fill(255);
    p.stroke(255);
    p.ellipse(_x, _y, 6 / scale);
    p.line(x, y, _x, _y);
  }
  return {x: _x, y: _y};
};
