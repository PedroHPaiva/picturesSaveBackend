import { DataTypes } from 'sequelize';

import database from '../database/site';

const profiles = database.define('profiles', {
  id_profile: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},);

export default profiles;