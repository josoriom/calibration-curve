import { removePoints } from '..';

describe('remove points', () => {
  const data = {
    x: [400, 400, 200, 200, 100, 100, 40, 40, 20, 20, 10, 10, 4, 4, 2, 2, 1, 1],
    y: [
      34.607674236491775, 30.38933261134425, 17.487705183585312,
      17.928897394376563, 8.543703007518797, 7.961653272101034,
      4.609089536463838, 3.580827067669173, 1.5703830582373093,
      1.331336874223076, 0.7657997574450882, 0.6463768115942029,
      0.36010182828049064, 0.29222950381168916, 0.11917098445595854,
      0.09588713534194165, 0.20399094491489897, 2.169973601294388,
    ],
  };
  it('Without losing points', async () => {
    expect(
      removePoints(data, { threshold: 0.99, maxRemovals: 4 }),
    ).toStrictEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
  });

  it('Remove one point', async () => {
    expect(
      removePoints(data, { threshold: 0.991, maxRemovals: 4 }),
    ).toStrictEqual([
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
  });

  it('Remove two point', async () => {
    expect(
      removePoints(data, { threshold: 0.996, maxRemovals: 4 }),
    ).toStrictEqual([
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
    ]);
  });

  it('Remove three point', async () => {
    expect(
      removePoints(data, { threshold: 0.999, maxRemovals: 4 }),
    ).toStrictEqual([
      false,
      true,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
    ]);
  });

  it('Remove four point', async () => {
    expect(
      removePoints(data, { threshold: 0.9993, maxRemovals: 4 }),
    ).toStrictEqual([
      false,
      true,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
    ]);
  });

  it('Remove five point', async () => {
    expect(
      removePoints(data, { threshold: 0.9996, maxRemovals: 5 }),
    ).toStrictEqual([
      false,
      true,
      false,
      true,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
    ]);
  });
});
