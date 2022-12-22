import { Request, Response, Router } from "express";
import { userController } from "../controller";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('asdasd')
})
router.get('/user', userController.all)
router.get('/user/:id', userController.detail)
router.post('/user', userController.store)
router.put('/user', userController.update)
router.delete('/user', userController.destroy)

export default router;