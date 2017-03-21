import { Router } from 'express';

const db = 'hf_pharmacy';

export default executeQuery => {
	const api = Router({ mergeParams: true });

	api.get('/', (req, res) => {
		const query = 'SELECT * FROM forms';
		const result = executeQuery(db, query, rows => {
			res.json({ forms: rows });
		});
	});

	return api;
};
