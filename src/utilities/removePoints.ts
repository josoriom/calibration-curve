import { SimpleLinearRegression } from 'ml-regression-simple-linear';
import { xMaxValue } from 'ml-spectra-processing';

export function removePoints(
  data: DataXY,
  options: { threshold?: number; maxRemovals?: number } = {},
) {
  const { threshold = 0.999, maxRemovals = 4 } = options;
  const { x, y } = data;
  let removals = 0;
  const result = new Array(x.length).fill(false);

  const r2 = calculateR2({ x, y });
  let bestR2 = r2;
  let xx = x.slice();
  let yy = y.slice();
  while (removals < maxRemovals) {
    if (bestR2 >= threshold) break;
    let bestIndex = -1;
    const r2Array = [];
    let newX = [];
    let newY = [];
    for (let i = 0; i < xx.length; i++) {
      if (result[i]) continue;
      newX = xx.filter((_, index) => index !== i);
      newY = yy.filter((_, index) => index !== i);
      r2Array.push({
        r2: calculateR2({ x: newX, y: newY }),
        i,
        newY,
        newX,
        x: xx[i],
        y: yy[i],
      });
    }
    const newR2 = xMaxValue(r2Array.map((item) => item.r2));
    const sample = r2Array.find((item) => item.r2 === newR2).y;
    const arrIndex = r2Array.findIndex((item) => item.r2 === newR2);
    const index = y.findIndex((item) => item === sample);
    if (newR2 > bestR2) {
      bestR2 = newR2;
      bestIndex = index;
      result[bestIndex] = true;
      xx = r2Array[arrIndex].newX;
      yy = r2Array[arrIndex].newY;
    }
    if (bestIndex === -1) {
      break;
    }
    removals++;
  }

  return result;
}

interface DataXY {
  x: number[];
  y: number[];
}

function calculateR2(data: DataXY) {
  const { x, y } = data;
  const regression = new SimpleLinearRegression(x.slice(), y.slice());
  const r2 = regression.score(x.slice(), y.slice()).r2;
  return r2;
}
