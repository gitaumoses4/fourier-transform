import codingtrain from './codingtrain';
import travela from './travela';
import moses from './moses';

const circle = () => {
  let n = 2;
  let angle = 0;
  return Array(n).fill(0).map((_, index) => {
    const delta = angle * Math.PI / 180;
    let result = {
      x: 200 + 100 * Math.cos(delta),
      y: 200 + 200 * Math.sin(delta)
    };
    angle += 360 / n;
    return result;
  });
};

export const generatePath = (drawing, threshold = 10) => {
  return drawing.reduce((acc, cur, index) => {
    if (index % threshold === 0) {
      return [...acc, cur];
    }
    return acc;
  }, []);
};

const codingTrain = () => {
  return codingtrain.drawing.reduce((acc, cur, index) => {
    if (index % 10 === 0) {
      return [...acc, cur];
    }
    return acc;
  }, []);
};

const travelaDrawing = () => {
  return generatePath(travela, 5);
};

const mosesDrawing = () => {
  return generatePath(moses, 5);
};

const m = () => {
  return [
    {x: 0, y: 0},
    {x: 100, y: 0},
    {x: 125, y: 100},
    {x: 150, y: 0},
    {x: 250, y: 0},
    {x: 250, y: 400},
    {x: 200, y: 400},
    {x: 200, y: 50},
    {x: 137, y: 250},
    {x: 112, y: 250},
    {x: 50, y: 50},
    {x: 50, y: 400},
    {x: 0, y: 400}
  ];
};

const square = () => {
  return [
    {x: 0, y: 0},
    {x: 400, y: 0},
    {x: 400, y: 400},
    {x: 0, y: 400}
  ];
};

export default mosesDrawing();
