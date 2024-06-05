import { Router } from 'express';
import { loginUser, registerUser, logoutUser, getUsers, getUserById,getUserProfile,updateUser,updateUserProfile,deleteUser,} from '../controllers/userController'

const UserRouter = Router();

UserRouter.get('/', getUsers).post('/', registerUser);
UserRouter.post('/logout', logoutUser);
UserRouter.post('/login', loginUser);
UserRouter.get('/profile', getUserProfile).put('/profile', updateUserProfile);
UserRouter.delete('/:id', deleteUser).get('/:id',getUserById).put('/:id',updateUser)
export default UserRouter;