const { Sequelize } = require('sequelize')

module.exports = new Sequelize(

    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        port: 5432,
        host: 'db',
        dialect: 'postgres',
    }
)


