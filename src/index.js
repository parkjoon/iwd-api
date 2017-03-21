import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';

import api from './api';
import config from './config.json';
import { initializeDatabasePools } from './db';

let app = express();
app.server = http.createServer(app);

// HTTP request logger middleware.
app.use(morgan('dev'));

// CORS middleware.
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit: config.bodyLimit
}));

// Connect to database.
initializeDatabasePools(executeQuery => {
	app.use(`/api/${config.version}`, api(executeQuery));
	app.server.listen(process.env.PORT || config.port);
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
