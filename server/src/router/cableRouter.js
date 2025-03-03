const express = require('express');
const router = express.Router();
const CableController = require('../controller/cableController');
const auth = require('../middleware/auth')


router.post('/cable', auth, CableController.addCableCustomer)

router.get(`/cable/customers`, auth, CableController.fetchAllCableCustomers)

router.get(`/cable/customers/:id`, auth, CableController.fetchCableCustomer)

router.get(`/cable/filter`, auth, CableController.filterCableCustomers)

router.patch(`/cable`, auth, CableController.editCableCustomer)

router.delete(`/cable`, auth, CableController.RemoveCableCustomer)

module.exports = router