import { executeAfterWaiting, timeout, wait } from ".";

describe("非同期処理", () => {
  describe("wait", () => {
    test("指定時間待つと、経過時間をもって resolve される", () => {
      return wait(50).then((duration) => {
        expect(duration).toBe(50);
      });
    });
    test("指定時間待つと、経過時間をもって resolve される", () => {
      return expect(wait(50)).resolves.toBe(50);
    });
    test("指定時間待つと、経過時間をもって resolve される", async () => {
      await expect(wait(50)).resolves.toBe(50);
    });
    test("指定時間待つと、経過時間をもって resolve される", async () => {
      expect(await wait(50)).toBe(50);
    });
  });
  describe("timeout", () => {
    test("指定時間待つと、経過時間をもって reject される", () => {
      return timeout(50).catch((duration) => {
        expect(duration).toBe(50);
      });
    });
    test("指定時間待つと、経過時間をもって reject される", () => {
      return expect(timeout(50)).rejects.toBe(50);
    });
    test("指定時間待つと、経過時間をもって reject される", async () => {
      await expect(timeout(50)).rejects.toBe(50);
    });
  });
});

test("指定時間待つと、経過時間をもって reject される", async () => {
  expect.assertions(1);
  try {
    await timeout(50); // timeout関数のつもりが、wait関数にしてしまった
    // ここで終了してしまい、テストは成功する
  } catch (err) {
    // アサーションは実行されない
    expect(err).toBe(50);
  }
});

test("return していないため、Promise が解決する前にテストが終了してしまう", () => {
  // 失敗を期待して書かれたアサーション
  // expect(wait(2000)).resolves.toBe(3000);
  // 正しくはアサーションを return する
  // return expect(wait(2000)).resolves.toBe(3000);
});

test("指定時間待ってから、コールバック関数が呼び出される", async () => {
  const mockedFn = jest.fn().mockReturnValue("Hello, World!");

  const result = await executeAfterWaiting(200, mockedFn);

  expect(result).toBe("Hello, World!");
  expect(mockedFn).toBeCalled();
});

test("'expect.assertions'を使ってみる", async () => {
  expect.assertions(2);

  try {
    expect(await wait(100)).toBe(100);
    await timeout(50);
  } catch (err) {
    expect(err).toBe(50);
  }
});
