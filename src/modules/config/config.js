module.exports = { 
    dev: {
        db: {
            engine: 'mongo',
            host: 'localhost',
            dbname: 'menu',
            connectionString: 'mongodb://localhost/menu'
        },
        api: {
            port: 8000,
        }
    },
    prod: {
        db: {
            engine: 'mongo',
            host: 'localhost',
            dbname: 'prod',
            connectionString: 'mongodb://localhost/prod'
        },
        api: {
            port: 3000,
        }
    }
}
