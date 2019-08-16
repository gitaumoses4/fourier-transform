export const dft = (p) => ({points, N , dt, speed = 1, width, height}) => {
  N = N || points.length;
  const result = Array(N).fill(0).map((_, n) => {
    let t = 0;
    const { re: r, im: i } =
      points.
        map(point => new Complex(point.x, point.y))
        .reduce((acc, xn, t) => {
          const angle =  (p.TWO_PI * t * n) / N;
          const cos = p.cos(angle);
          const sin = -p.sin(angle);

          return acc.add(xn.multiply(new Complex(cos, sin)));
        }, new Complex(0, 0));

    let re = r / points.length;
    let im = i / points.length;
    const amplitude = p.sqrt( re * re + im * im) ;
    return {
      frequency: n,
      re: re,
      im: im,
      amplitude,
      phase: p.atan2(im, re)
    };
  });
  const sort = true;
  return sort ? result.sort((a, b) => b.amplitude - a.amplitude) :result;

};

class Complex {
  constructor(a, b){
    this.re = a;
    this.im = b;
  }

  multiply(another){
    return another.constructor === Complex ? new Complex(
      (this.re * another.re) - (this.im * another.im),
      (this.re * another.im) + (this.im * another.re)
    ) : new Complex(
      this.re * another,
      this.im * another
    );
  }

  add(another){
    return new Complex(
      (this.re + another.re),
      (this.im + another.im)
    );
  }
}

export const drawCircle = (p) => ({x, y, radius, frequency, time, phase = 0, draw = true}) => {
  let amplitude = radius;
  const angle = (time * frequency ) + phase;
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
