const Customers = require('../models/Customers');

const Address = require('../models/Addresses');

const fetch = require("node-fetch");

module.exports = {
	
	async index(req, res) {
		
        const { customers_id } = req.params;

        const customers = await Customers.findByPk(customers_id, {
			
            include: { association: 'Address'}
			
        });

        if (!customers) {
			
            return res.status(400).send({
				
                status: 0,
				
                message: 'Customer not found'
				
            });
        }

        return res.status(200).send(customers);
    },

    async store(req, res) {

        const { customers_id } = req.params;
          
		const customers = await Customers.findByPk(customers_id);

          if (!customers) {
			  
              return res.status(400).json({
				  
                  status: 0,
				  
                  message: 'Customer not found!'
				  
              });
		  }  
	
		const addr = await Address.findOne({ where: {  customers_id:  customers_id}, limit: 1 });
		  	
		 if (addr) {
			  
              return res.status(400).json({
				  
                  status: 0,
				  
                  message: 'Customer has one address!'
				  
              });
		  }  
		 
		let { cep, street, number, district, city, state } = req.body;
	
		if (cep == "" || cep == null || cep == undefined || cep.length != 8) {
				  
				  return res.status(400).json({
					  
					  status: 0,
					  
					  message: 'CEP is bad formatted. Please enter a CEP with 8 numbers.'
				
					});
			  
		 } 
		 
		  	  
		const params = {
			  
			  method: 'GET',	
			  
			  mode: 'cors',
			  
			  cache: 'default'

		}
	  
		fetch('https://viacep.com.br/ws/'+ cep + '/json', params)
		
		.then(response => {
			
			if (res.status >= 400) {
				
			  throw new Error("Bad response from server");
			  
			}
			
			response.json().then(
					
			data => addrComplete(data)
			
			)
					
		})
		
		.catch(e => console.log(e.message))
		
		let addrComplete = (data) => {	
						 			
				street = data["logradouro"] == "" ? street : data["logradouro"];
				
				number = number == "" ? "s/n" : number;
				
				district = data["bairro"] == "" ? district :  data["bairro"];
				
				city = data["localidade"];
				
				state = data["uf"];
				
				
			let address = Address.create({
						 
				cep,
				
				street,
				
				number,
				
				district,
				
				city,
				
				state,
				
				customers_id
						
			});
			return res.status(200).json({
			  
              status: 1,
			  
              message: "Well done! Address associate to customer!",
			  
          });	
		 }	    

    },
};