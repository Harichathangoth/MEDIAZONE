const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const operatorController = require('../controller/operatorController');


router.post(`/operator/signup`, operatorController.signUp);

router.post(`/operator/login`, operatorController.login);

router.post(`/operator/forgot_password`, operatorController.forgotPassword)

router.post(`/operator/logout`, auth, operatorController.logout);

router.post(`/operator/logoutall`, auth, operatorController.logoutAll);

router.get(`/operator/profile`, auth, operatorController.profile);

router.patch(`/operator/profile`, auth, operatorController.profileUpdate);

router.post(`/operator/profile/avatar`, auth, multer.avatarMulter.single('avatar'), operatorController.avatarUpload, ( error, req, res, next ) => {
    res.status(406).send({ 'error': error.message });
})

router.delete(`/operator/profile/avatar`, auth, operatorController.avatarRemove);

module.exports = router

