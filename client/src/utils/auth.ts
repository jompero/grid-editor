export default function auth(token: string) {
  return {
    Authorization: `bearer ${token}`,
  };
}