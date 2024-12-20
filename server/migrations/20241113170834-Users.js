'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: {
						msg: 'Username is required',
					},
					len: {
						args: [7, 20],
						msg: 'Username must be between 7 and 20 characters',
					},
					isAlphanumeric: {
						msg: 'Username can only contain letters and numbers',
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: {
						msg: 'Please enter a valid email address',
					},
					notEmpty: {
						msg: 'Email is required',
					},
				},
			},
			fullname: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'Fullname is required',
					},
				},
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: true,
				unique: true,
				validate: {
					isMobilePhone: {
						args: ['any', 'en-US'],
						msg: 'Please enter a valid phone number',
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'Password is required',
					},
					len: {
						args: [6, Infinity],
						msg: 'Password must be at least 6 characters long',
					},
				},
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users');
	},
};