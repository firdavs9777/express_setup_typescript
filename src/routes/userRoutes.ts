import { Router } from 'express';
import { loginUser, registerUser, logoutUser, getUsers, getUserById,getUserProfile,updateUser,updateUserProfile,deleteUser,} from '../controllers/userController'
import { protect, admin } from "../middleware/authMiddleware"
const UserRouter = Router();

UserRouter.post('/logout', logoutUser);
UserRouter.post('/login', loginUser);
UserRouter.post('/', registerUser);


UserRouter.use(protect)
UserRouter.get('/profile', getUserProfile)
UserRouter.put('/profile', updateUserProfile);

UserRouter.use(protect,admin)
UserRouter.get('/', getUsers)

UserRouter.use(protect,admin)
UserRouter.delete('/:id', deleteUser)
UserRouter.get('/:id', getUserById)
UserRouter.put('/:id', updateUser)



export default UserRouter;