import drawCircle from './util/Circle';

const wave = [];

export default (p) => {
  const circle = drawCircle(p);
  let time = 0;
  let n = 3;

  const drawCircles = () => {
    p.noFill();
    p.stroke(255);

    let x = p.width * 0.1;
    let y = p.height * 0.1;
    let result;
    let radius = 200;
    for(let i=1;i<n;i+=2){
      radius = 200 * 4 / ( i * p.PI);
      result = circle(x, y, radius, i , time, 0);
      x = result.x;
      y = result.y;

    }

    wave.unshift(result);

    if( wave.length > 800){
      wave.pop();
    }
  };

  p.setup = () => {
    p.createCanvas(1500, 900);
  };

  p.draw = () => {
    p.background('#00796B');
    drawCircles();


    // p.stroke(255, 0, 0);
    let x = 500;
    p.beginShape(p.LINES);
    wave.forEach(({ y }, index) => {
      p.vertex(x + index, y);
    });
    p.endShape();
    if( wave[0]){
      p.stroke(150);
      p.line(wave[0].x, wave[0].y, x, wave[0].y);
    }
    time += 1;
  };

  p.keyPressed = () => {
    if(p.key === 'ArrowUp'){
      n+=2;
    }else if(p.key === 'ArrowDown'){
      n-=2;
    }
  };
};
