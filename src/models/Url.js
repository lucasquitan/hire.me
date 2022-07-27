import { Sequelize } from 'sequelize';
import db from '../db.js';

const sequelize = db.define('url', {
    alias: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

export default sequelize;