import { Router } from 'express';

import forms from './forms';
import { version } from '../config.json';

export default executeQuery => {
	const api = Router();

	// Mount the API endpoints.
	api.use('/forms', forms(executeQuery));

	// Perhaps expose some API metadata at the root.
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
};
