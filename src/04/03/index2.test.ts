import { getGreet } from ".";
import * as Fetchers from "../fetchers";
import { httpError } from "../fetchers/fixtures";

jest.mock("../fetchers");

test("success pattern: without name property", async () => {
  jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
    id: "id",
    email: "email@example.com",
  });

  expect(await getGreet()).toBe("Hello, anonymous user!");
});

test("success pattern: with name property", async () => {
  jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
    id: "id",
    name: "awa",
    email: "email@example.com",
  });

  expect(await getGreet()).toBe("Hello, awa!");
});

test("failure pattern: throw an error", async () => {
  jest.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);
  expect.assertions(1);

  try {
    await getGreet();
  } catch (err) {
    expect(err).toMatchObject(httpError);
  }
});
