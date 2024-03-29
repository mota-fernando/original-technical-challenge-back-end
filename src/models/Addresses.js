const { Model, DataTypes } = require('sequelize');

class Addresses extends Model {
	
    static init(sequelize) {
		
        super.init({
			
			cep: DataTypes.INTEGER,
			
            street: DataTypes.STRING,
			
            number: DataTypes.STRING,
			
            district: DataTypes.STRING,
			
            city: DataTypes.STRING,
			
			state: DataTypes.STRING
			
        }, {
            sequelize
        })	
    }

    static associate(models) {
		
      this.belongsTo(models.Customers, { foreignKey: 'customers_id', as: 'Customers' });
	  
    }
}

module.exports = Addresses;