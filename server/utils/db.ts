import mysql from 'mysql2/promise'

const config = useRuntimeConfig()

export const db = mysql.createPool({
  host: config.dbHost,
  port: Number(config.dbPort),
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  waitForConnections: true,
  connectionLimit: 10,
})
