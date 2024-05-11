// imports
import { greet, sayGoodBye } from "./greet";

// define mock module
jest.mock("./greet", () => ({
  ...jest.requireActual("./greet"),
  sayGoodBye: (name: string) => `Good Bye ${name}.`,
}));

// test greet function
test("greet", () => {
  expect(greet("awa")).toBe("Hello! awa.");
});

// test sayGoodBye function
test("sayGoodBye", () => {
  expect(sayGoodBye("awa")).toBe("Good Bye awa.");
});
