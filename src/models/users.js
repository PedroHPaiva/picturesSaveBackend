import { DataTypes } from 'sequelize';

import database from '../database/site';
import Profiles from './profiles';

const users = database.define('users', {
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},);

users.belongsTo(Profiles, { foreignKey: 'id_profile' });

export default users;