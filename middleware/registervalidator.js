
const { body } = require('express-validator');

const { userModel } = require('../models')
// Mengimport model 'devices' dari modul Sequelize

const registerValidator = [
  body("email")
    .notEmpty().withMessage("email wajib diisi")
    .isEmail().withMessage("Format email tidak tepat")
    .custom(async (value) => {
      // Menggunakan async/await untuk melakukan pencarian dalam database
      const existingDevice = await userModel.findOne({ where: { email: value } });

      if (existingDevice) {
        throw new Error("Email sudah terdaftar");
      }

      return true;
    }),
    body("password")
      .notEmpty().withMessage("password wajib diisi")
      .isLength({ min: 8 }).withMessage("Password harus memiliki minimal 8 karakter"),
    
];

module.exports = registerValidator;