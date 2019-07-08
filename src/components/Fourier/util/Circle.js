
const renderLine = (p) => {

};

export default (p) => (x, y, amplitude, frequency, time, phaseAngle = 0) => {
  p.noFill();
  p.stroke(200);
  const t = 30;
  p.ellipse(x, y, amplitude);

  let _x = amplitude / 2 * Math.cos(phaseAngle + frequency * time / t) + x;
  let _y = amplitude / 2 * Math.sin(phaseAngle + frequency * time / t) + y;

  p.fill(255);
  p.stroke(255);
  p.ellipse(_x,_y, 5);
  p.line(x, y,_x, _y);

  return { x: _x, y: _y };
};
