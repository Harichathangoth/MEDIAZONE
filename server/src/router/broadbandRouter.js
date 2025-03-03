const express = require('express');
const router = express.Router();
const auth =  require('../middleware/auth')
const broadbandCustomerAuth = require('../middleware/broadbandCustomerAuth')
const broadbandController = require('../controller/broadbandContoller')
const requestsController = require('../controller/requestsController')


router.post('/broadband/customer/login', broadbandController.login);

router.post(`/broadband/customer/logout`, broadbandCustomerAuth, broadbandController.logout);

router.post(`/broadband/customer/logoutall`, broadbandCustomerAuth, broadbandController.logoutAll);

router.post('/broadband', auth, broadbandController.addBroadbandCustomer)

router.get(`/broadband/customers`, auth, broadbandController.fetchAllBroadbandCustomers)

router.get(`/broadband/customer/:id`, auth, broadbandController.fetchBroadbandCustomer)

router.get(`/broadband/filter`, auth, broadbandController.filterBroadbandCustomers)

router.patch(`/broadband/customer`, auth, broadbandController.editBroadbandCustomer)

router.post('/broadband/request', broadbandCustomerAuth, requestsController.createRequest)

router.get('/broadband/request', broadbandCustomerAuth, requestsController.fetchAllbroadbandCustomerRequests)

router.get('/broadband/customers/request', auth, requestsController.fetchAllRequests)

router.patch('/broadband/customers/request', auth, requestsController.fetchAllRequests)

router.patch('/broadband/customers/request/resolve', auth, requestsController.resolveRequest)

router.delete(`/broadband/customer`, auth, broadbandController.RemoveBroadbandCustomer)



module.exports = router