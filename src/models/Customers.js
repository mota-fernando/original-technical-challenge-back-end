const { Model, DataTypes } = require('sequelize');

class Customers extends Model {
	
    static init(sequelize) {
		
        super.init({
			
            name: DataTypes.STRING,
			
            surname: DataTypes.STRING,
			
            email: DataTypes.STRING,
			
			cpf: DataTypes.INTEGER
			
        }, {
			
            sequelize
			
        })
    }

   static associate(models) {
	   
        this.hasOne(models.Addresses, { foreignKey: 'customers_id', as: 'Address' });
    }

}
module.exports = Customers;