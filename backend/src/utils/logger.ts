const info = (...params: any) => {
  console.log(...params); // eslint-disable-line no-console
};

const error = (...params: any) => {
  console.error(...params); // eslint-disable-line no-console
};

export default {
  info, error,
};
