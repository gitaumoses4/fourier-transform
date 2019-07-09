
export default (() => {
  return Array(10).fill(0).map((_, index) => {
    return { x: index * 100, y: index % 2 === 0 ? -100 : 100};
  });
})();
