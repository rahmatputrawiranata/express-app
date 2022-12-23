import { PrismaClient, User } from '@prisma/client'
import { Response, Request, NextFunction } from "express";
const prisma = new PrismaClient()

const all = async(req: Request, res: Response) => {
    const query = req.query
    const page: number  = isNaN(Number(query?.page)) ? 1 : Number(query.page)
    const limit: number = isNaN(Number(query?.page)) ? 10 : Number(query.limit)
    const take = limit
    const skip = (page - 1) * take
    
    const where: {
        id?: {
            in: number[]
        }
    } = {}
    
    if(query?.keyword) {
        const keyword = `%${query.keyword}%`
        const userIds: User[] = await prisma.$queryRaw`SELECT id FROM user WHERE CONCAT_WS(' ', first_name, last_name) LIKE ${keyword}`
        where.id = {
            in: userIds.map(item => item.id)
        }
    }

    const [users, totalItem] = await Promise.all([
        prisma.user.findMany({
            where,
            take,
            skip
        }),
        prisma.user.count({
            where
        })
    ]);
    return res.status(200).json({
        status: true,
        message: "success",
        resp_data: {
            total_item: totalItem,
            data: users
        }
    })
}

const detail = async(req: Request, res: Response) => {
    
    const param = req.params
    const id: number = Number(param.id)
    if(isNaN(id)){
        return res.status(400).json({
            status: false,
            message: "invalid user id",
            resp_data: null
        });
    }
    const user = await prisma.user.findFirst({
        where: {
            id: id
        }
    })

    return res.status(200).json({
        status: true,
        message: 'success',
        resp_data: user
    })
}

const store = async(req: Request, res: Response) => {
    const input = req.body

    const user = await prisma.user.create({
        data: {
            first_name: input.first_name,
            last_name: input.last_name
        }
    })

    return res.status(200).json({
        status: true,
        message: 'success',
        resp_data: user
    })
}

const update = async(req: Request, res: Response) => {
    const input = req.body

    const isUserExists = await prisma.user.findFirst({
        where: {
            id: input.id
        }
    })

    if(!isUserExists) {
        return res.status(400).json({
            status: false,
            message: 'user not found',
            resp_data: null
        })
    }

    const user = await prisma.user.update({
        where: {
            id: input.id
        },
        data: {
            first_name: input.first_name,
            last_name: input.last_name
        }
    })

    return res.status(200).json({
        status: true,
        message: 'success',
        resp_data: user
    })
}

const destroy = async(req: Request, res: Response) => {
    const input = req.body

    const isUserExists = await prisma.user.findFirst({
        where: {
            id: input.id
        }
    })

    if(!isUserExists) {
        return res.status(400).json({
            status: false,
            message: 'user not found',
            resp_data: null
        })
    }

    await prisma.user.delete({
        where: {
            id: input.id
        }
    })

    return res.status(200).json({
        status: true,
        message: 'success delete users',
        resp_data: null
    })
}

export {
    all,
    detail,
    store,
    update,
    destroy
};