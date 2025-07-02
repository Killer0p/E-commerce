import User from '../models/User.js';

const adminSeeder = async () => {
const adminFound = await User.findOne({email:'admin@gmail.com'}) 
      

      if (!adminFound){
        await User.create({
          userName: 'admin',
          email: 'admin@gmail.com',
          password: 'adminn',
          phone: '9819366714',
          role: 'ADMIN'
        });
        console.log('Admin seeded successfully');
         } else{
        console.log('Admin already exists');
         }
};

export { adminSeeder};