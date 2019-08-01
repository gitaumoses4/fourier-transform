export const dft = (p) => ({points, delta, N , time, speed = 1}) => {
  N = N || points.length;
  return Array(N).fill(0).map((_, k) => {
    const { re: r, im: i } = points.reduce((acc, xn, n) => {
      let dt = k / N;
      const angle = p.TWO_PI * n * dt;
      const cos = p.cos(angle);
      const sin = -p.sin(angle);
      return {
        re: acc.re + xn.x * cos - xn.y * sin,
        im: acc.im + xn.x * sin + xn.y * cos
      };
    }, { re: 0, im: 0 });

    let re = r / N;
    let im = i / N;
    return {
      frequency: k,
      re,
      im,
      amplitude: p.sqrt( re * re + im * im) * delta,
      phase: p.atan2(im, re)
    };
  }).sort((a, b) => b.amplitude - a.amplitude);
};

export const drawCircle = (p, speed = 1) => ({x, y, radius: amplitude, frequency, time, phase = 0, draw = true, scale = 1}) => {
  const angle = phase + (frequency * time / speed);
  let _x = amplitude * p.cos(angle) + x;
  let _y = amplitude * p.sin(angle) + y;

  if (draw) {
    p.noFill();
    p.stroke(100);
    p.ellipse(x, y, amplitude * 2);


    p.fill(255);
    p.stroke(255);
    p.line(x, y, _x, _y);
    p.beginShape();
    p.vertex(_x, _y);
    let length = amplitude / 50;
    let arrow = 20;
    p.vertex(
      _x - length * (p.cos(angle - (p.radians(arrow)))),
      _y - length * p.sin(angle - p.radians(arrow))
    );
    p.vertex(
      _x - length * (p.cos(angle + (p.radians(arrow)))),
      _y - length * p.sin(angle + p.radians(arrow))
    );
    p.endShape();
  }
  return {x: _x, y: _y};
};
