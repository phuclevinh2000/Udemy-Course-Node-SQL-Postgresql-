import { createServer } from 'http';

const hostname = 'localhost';
const port = 5000;

const server = createServer((req, res) => {
  const { url } = req;
  console.log(url);

  if (url === '/translation') {
    const translations = {1: 'one', 2: 'two'}

    res.setHeader('Content-Type', "application/json");

    res.write(JSON.stringify(translations))
  }
  
  res.end('Welcome to node');
});

server.listen(port, hostname, () => {
  console.log(`Server runnning at ${hostname}: ${port}`);
});
