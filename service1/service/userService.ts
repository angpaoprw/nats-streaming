import { User } from '../model/User'



export const createUser = async () => {

    const newData = {
        email: 'test123@gmail.com',
        password: 'abc123'
    }

    const isDuplicated = await User.findOne({ email: newData.email });

    if (isDuplicated) {
        return console.log('error');

    }

    const newUser = new User(newData);

    return newUser.save();

} 