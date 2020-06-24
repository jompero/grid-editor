export default function Debug(...messages: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...messages); // eslint-disable-line no-console
  }
}
