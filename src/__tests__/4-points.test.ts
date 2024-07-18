import { SimpleLinearRegression } from 'ml-regression-simple-linear';

import { removePoints } from '..';

describe('test 4-points calibration curve', () => {
  const r2 = 0.99;
  const maxRemovals = 4;
  it('Remove just last point', async () => {
    const x = [0, 5, 10, 15];
    const y = [0, 0.1, 0.2, 0.35];
    const iR2 = new SimpleLinearRegression(x, y).score(x, y).r2;
    const result = removePoints({ x, y }, { r2, maxRemovals });
    const fR2 = new SimpleLinearRegression(x, y).score(
      x.filter((_, index) => !result[index]),
      y.filter((_, index) => !result[index]),
    ).r2;
    expect(iR2).toBeLessThan(r2);
    expect(result).toStrictEqual([false, false, false, true]);
    expect(fR2).toBeCloseTo(1, 8);
  });

  it('Remove just last point', async () => {
    const x = [0, 5, 10, 15];
    const y = [0, 0.1, 0.2, 0.25];
    const iR2 = new SimpleLinearRegression(x, y).score(x, y).r2;
    const result = removePoints({ x, y }, { r2, maxRemovals });
    const fR2 = new SimpleLinearRegression(x, y).score(
      x.filter((_, index) => !result[index]),
      y.filter((_, index) => !result[index]),
    ).r2;
    expect(iR2).toBeLessThan(r2);
    expect(result).toStrictEqual([false, false, false, true]);
    expect(fR2).toBeCloseTo(1, 8);
  });

  it('Remove just the third point', async () => {
    const x = [0, 5, 10, 15];
    const y = [0, 0.1, 0.25, 0.3];
    const iR2 = new SimpleLinearRegression(x, y).score(x, y).r2;
    const result = removePoints({ x, y }, { r2, maxRemovals });
    const fR2 = new SimpleLinearRegression(x, y).score(
      x.filter((_, index) => !result[index]),
      y.filter((_, index) => !result[index]),
    ).r2;
    expect(iR2).toBeLessThan(r2);
    expect(result).toStrictEqual([false, false, true, false]);
    expect(fR2).toBeCloseTo(1, 8);
  });

  it('Remove just the third point', async () => {
    const x = [0, 5, 10, 15];
    const y = [0, 0.1, 0.15, 0.3];
    const iR2 = new SimpleLinearRegression(x, y).score(x, y).r2;
    const result = removePoints({ x, y }, { r2, maxRemovals });
    const fR2 = new SimpleLinearRegression(x, y).score(
      x.filter((_, index) => !result[index]),
      y.filter((_, index) => !result[index]),
    ).r2;
    expect(iR2).toBeLessThan(r2);
    expect(result).toStrictEqual([false, false, true, false]);
    expect(fR2).toBeCloseTo(1, 8);
  });

  it('Remove just the second point', async () => {
    const x = [0, 5, 10, 15];
    const y = [0, 0.15, 0.2, 0.3];
    const iR2 = new SimpleLinearRegression(x, y).score(x, y).r2;
    const result = removePoints({ x, y }, { r2, maxRemovals });
    const fR2 = new SimpleLinearRegression(x, y).score(
      x.filter((_, index) => !result[index]),
      y.filter((_, index) => !result[index]),
    ).r2;
    expect(iR2).toBeLessThan(r2);
    expect(result).toStrictEqual([false, true, false, false]);
    expect(fR2).toBeCloseTo(1, 8);
  });

  it('Remove just the second point', async () => {
    const x = [0, 5, 10, 15];
    const y = [0, 0.05, 0.2, 0.3];
    const iR2 = new SimpleLinearRegression(x, y).score(x, y).r2;
    const result = removePoints({ x, y }, { r2, maxRemovals });
    const fR2 = new SimpleLinearRegression(x, y).score(
      x.filter((_, index) => !result[index]),
      y.filter((_, index) => !result[index]),
    ).r2;
    expect(iR2).toBeLessThan(r2);
    expect(result).toStrictEqual([false, true, false, false]);
    expect(fR2).toBeCloseTo(1, 8);
  });

  it('Remove just the first point', async () => {
    const x = [0, 5, 10, 15];
    const y = [0.5, 0.1, 0.2, 0.3];
    const iR2 = new SimpleLinearRegression(x, y).score(x, y).r2;
    const result = removePoints({ x, y }, { r2, maxRemovals });
    const fR2 = new SimpleLinearRegression(x, y).score(
      x.filter((_, index) => !result[index]),
      y.filter((_, index) => !result[index]),
    ).r2;
    expect(iR2).toBeLessThan(r2);
    expect(result).toStrictEqual([true, false, false, false]);
    expect(fR2).toBeCloseTo(1, 8);
  });

  it('Remove just the first point', async () => {
    const x = [0, 5, 10, 15];
    const y = [-0.5, 0.1, 0.2, 0.3];
    const iR2 = new SimpleLinearRegression(x, y).score(x, y).r2;
    const result = removePoints({ x, y }, { r2, maxRemovals });
    const fR2 = new SimpleLinearRegression(x, y).score(
      x.filter((_, index) => !result[index]),
      y.filter((_, index) => !result[index]),
    ).r2;
    expect(iR2).toBeLessThan(r2);
    expect(result).toStrictEqual([true, false, false, false]);
    expect(fR2).toBeCloseTo(1, 8);
  });
});
