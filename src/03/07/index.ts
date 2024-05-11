export function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(duration);
    }, duration);
  });
}

export function timeout(duration: number) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(duration);
    }, duration);
  });
}

export function executeAfterWaiting(duration: number, callback: Function) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback());
    }, duration);
  });
}
