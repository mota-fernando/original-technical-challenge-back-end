const Customers = require('../models/Customers');

const { Op } = require("sequelize");

const validator = require("email-validator");

module.exports = {

    async index(req, res) {

        const customers = await Customers.findAll();

        if (customers == '' || customers == undefined || customers == null) {
            
			return res.status(200).send(
			
			{ message: "Customer' list is Empty" });
        }

        return res.status(200).send({ customers });

    },
	
	async searchByEmail(req, res) {
		
		const { email } = req.body;		
	
		if (email == '' || email == undefined || email == null) {
			
			return res.status(200).send(
			
				{ message: "Email is Empty" });
				
		} else if (!validator.validate(email)){
			
			return res.status(200).send(
			
				{ message: "Email is bad formatted" });
				
		} else {
		
			const customers = await Customers.findOne({ where: { email } });

			if (customers == undefined || customers == null) {
				
				return res.status(200).send(
				
				{ message: "Customer' list is Empty" });
				
			}else if (!customers) {
				
				return res.status(400).send({
					
					status: 0,
					
					message: 'Customer not found.',
					
					customers: {}
				});
			}	
			return res.status(200).send({ customers });
		
		}
		
    },

    async store(req, res) {	

        const { name, surname, email, cpf } = req.body;

		if (!validator.validate(email)){
			
			return res.status(200).send(
				
				{ message: "Email is bad formatted" });	
				
		} else {
			
			const customers = await Customers.findOne({
				where: {
					[Op.or]: [
					  { email: email },
					  { cpf: cpf }
					]				
			}});
			
			if (customers){
			
				return res.status(200).send(
					
					{ message: "Email or CPF found in database. Please regiter with another email." });
		
			} else {
				const customers = await Customers.create({ name, surname, email, cpf });

				return res.status(200).send({
					
					status: 1,
					
					message: 'Well done! Registration complete!',

			});
			}
		}

    },

};