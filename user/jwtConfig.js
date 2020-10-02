const jwt=require('jsonwebtoken');
require('dotenv').config();

const createToken=user=>{
	if(!user.role){
		throw new Error('No user role specified');
	}
	return jwt.sign({
		sub:user.id,
		email:user.email,
		role:user.role,
		iss:'api.live-weather',
		aud:'api.live-weather'
	},
	process.env.JWT_SECRET,
	{algorithm:'HS256',expiresIn:'1h'}
	);
}

module.exports={createToken}
