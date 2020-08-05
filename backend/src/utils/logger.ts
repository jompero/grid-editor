const info = (...params: any) => {
  if (process.env.NODE_ENV !== 'test') console.log(...params); // eslint-disable-line no-console
};

const error = (...params: any) => {
  if (process.env.NODE_ENV !== 'test') console.error(...params); // eslint-disable-line no-console
};

export default {
  info, error,
};
