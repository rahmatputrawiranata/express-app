import express, {Router} from "express";
import { userController } from "../controller";

const router = Router();

router.get('/user', userController.all)
router.get('/user/:id', userController.detail)
router.post('/user', userController.store)
router.put('/user', userController.update)
router.delete('/user', userController.destroy)

export default router;