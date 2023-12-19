import axios, { AxiosRequestHeaders } from 'axios';
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
  // ... additional user agents
];

const client = axios.create({});

client.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
    } as AxiosRequestHeaders,
  };
});

export default client;
