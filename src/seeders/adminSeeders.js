import User from '../models/User.js';
import { hashPassword } from '../utils/utility.js';

const adminSeeder = async () => {
const adminFound = await User.findOne({email:'admin@gmail.com'}) 
      

      if (!adminFound){
        const password = hashPassword('admin')
        await User.create({
          userName: 'admin',
          email: 'admin@gmail.com',
          password,
          phone: '9819366714',
          role: 'ADMIN'
        });
        console.log('Admin seeded successfully');
         } else{
        console.log('Admin already exists');
         }
};

export { adminSeeder};