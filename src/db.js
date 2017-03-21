import mysql from 'mysql';

import { datasources } from './config.json';

export function initializeDatabasePools(callback) {
	const dbPools = {};

	datasources.databases.forEach(database => {
		dbPools[database.name] = mysql.createPool({
			connectionLimit: database.connectionLimit || datasources.connectionLimit,
			host: database.host || datasources.host,
			port: database.port || datasources.port,
			user: database.user || datasources.user,
			password: database.password || datasources.password,
			database: database.name,
			debug: datasources.debug
		});
	});

	callback(executeQuery.bind(this, dbPools));
}

function executeQuery(dbPools, database, query, callback) {
	dbPools[database].getConnection((connectionError, connection) => {
		if(connectionError) throw connectionError;
		connection.query(query, (error, rows, fields) => {
			connection.release();
			// Handle error after the release.
			if(error) throw error;
			callback(rows, fields);
		});
	});
}
