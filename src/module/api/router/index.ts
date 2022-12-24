import express, {Router, Request, Response} from "express";
import { producer } from "../../rabbit-mq";
import { userController } from "../controller";

const router = Router();

router.get('/test', userController.all)
router.get('/user/:id', userController.detail)
router.post('/user', userController.store)
router.put('/user', userController.update)
router.delete('/user', userController.destroy)
router.post('/send', (req: Request, res: Response) => {
    producer(JSON.stringify({
        action: 'SEND_EMAIL',
        data: {
                to: req.body.to,
                subject: req.body.subject,
                text: req.body.text
        }
    }))

    res.status(200).json({
        status: true,
        message: 'success',
        data: {}
    })
})

export default router;