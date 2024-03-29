const express = require('express');

const router = express.Router();

const CustomersRouters = require('./routers/CustomersRouters');

const AddressesRouters = require('./routers/AddressesRouters');

//--Customers routers
router.get('/', 
				(req, resp) => {return resp.send("Test Backend Dev Jr")
			});
router.get('/customers', CustomersRouters.index);

router.post('/customers/search/', CustomersRouters.searchByEmail);

router.post('/customers', CustomersRouters.store);

//-- Adressess routers

router.get('/customers/:customers_id/address', AddressesRouters.index);

router.post('/customers/:customers_id/address', AddressesRouters.store);

const app = express();

app.use(express.json());

require('./db/start.js');

app.use(router);

app.listen(3000);

