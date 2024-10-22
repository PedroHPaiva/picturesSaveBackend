export const socket = process.env.MYSQL_SOCKET
export const username = process.env.MYSQL_USER
export const password = process.env.MYSQL_PASS
export const schema = process.env.MYSQL_SCHEMA
export const port = process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : Number(3306)
export const dialect = 'mysql'
