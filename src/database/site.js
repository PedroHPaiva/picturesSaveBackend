import sequelize from 'sequelize';
import { socket, username, password, schema, dialect, port } from '../config/mysql';

const databaseConection = new sequelize({
    username: username,
    password: password,
    database: schema,
    host: socket,
    port: port,
    dialect: dialect,
    define: {
        underscored: true,
        timestamps: false,
        freezeTableName: true,
    },
})

export default databaseConection