import App from './app';

const app = new App(80);

app.initializeDb();

app.listen();