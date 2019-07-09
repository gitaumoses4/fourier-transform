export const dft = (p) => (points, delta) => {
  let N = points.length;
  return Array(N).fill(0).map((_, k) => {
    const { re, im } = points.reduce((acc, xn, n) => {
      const angle = 2 * p.PI * k * n / N;
      return { re: acc.re + xn * p.cos(angle), im: acc.im + (xn * p.sin(angle))};
    }, { re: 0, im: 0 });

    return {
      frequency: k,
      amplitude: p.sqrt( re * re + im * im) * delta,
      phase: p.atan2(re , im)
    };
  });
};

export const drawCircle = (p, speed = 30) => ({x, y, radius: amplitude, frequency, time, phase = 0, draw = true, scale = 1}) => {
  const angle =phase + (frequency * time / speed);
  let _x = amplitude / 2 * Math.cos(angle) + x;
  let _y = amplitude / 2 * Math.sin(angle) + y;
  if (draw) {
    p.noFill();
    p.stroke(100);
    p.ellipse(x, y, amplitude);


    p.fill(255);
    p.stroke(255);
    p.line(x, y, _x, _y);
    p.beginShape();
    p.vertex(_x, _y);
    let length = amplitude / 50;
    let arrow = 20;
    p.vertex(
      _x - length * (Math.cos(angle - (p.radians(arrow)))),
      _y - length * Math.sin(angle - p.radians(arrow))
    );
    p.vertex(
      _x - length * (Math.cos(angle + (p.radians(arrow)))),
      _y - length * Math.sin(angle + p.radians(arrow))
    );
    p.endShape();
  }
  return {x: _x, y: _y};
};
