import UserModel from '../models/user.model.js'

class UserRepository {
    async getUserByEmail(email) {
        return UserModel.findOne({email})
    }
    
}
export default UserRepository
