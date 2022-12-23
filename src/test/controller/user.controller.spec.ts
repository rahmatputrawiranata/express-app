
import chai, {expect, use} from "chai"
import chaiHttp from "chai-http"
import {NextFunction, Request, Response} from "express";
import sinon from 'sinon'
import { userController } from "../../module/api/controller"
import { PrismaClient, User } from "@prisma/client"
import sinonChai from "sinon-chai";
import {faker} from "@faker-js/faker";
import {api} from '../../config'
chai.use(chaiHttp)
chai.use(sinonChai)
chai.should()

const prisma = new PrismaClient();

describe("user controller", () => {
  before(async ()=> {

    const createUser = () => {
      return {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName()
      }
    }
    
    const createUsers = (numUsers:number) => {
      return new Array(numUsers)
        .fill(undefined)
        .map(createUser);
    }
    
    let fakeUsers = createUsers(100)
    await prisma.user.createMany({
      data: fakeUsers
    })
    const user = await prisma.user.findFirst({})

    await prisma.user.update({
      where: {
        id: user?.id
      },
      data: {
        first_name: "Bagiyo",
        last_name: "Sapoedji"
      }
    })
    
  })
  describe("all function", () => {
    it("can get all data", async() => {
      const request = {} as Request
      let jsonSpy = sinon.spy()
      const response = ({
        json: jsonSpy,
        status: sinon.stub().returns({ json: jsonSpy }),
      } as unknown) as Response
      await userController.all(request, response)
      expect(response.status).to.have.been.calledWith(200)
    })
    it("can return filtered user by first name and lastname", async() => {
      const request = {
        query: {
          page: 1,
          limit: 10,
          keyword: "bagiyo sapoedji"
        }
      } as unknown as Request
      let jsonSpy = sinon.spy()
      const response = ({
        json: jsonSpy,
        status: sinon.stub().returns({ json: jsonSpy }),
      } as unknown) as Response
      await userController.all(request, response)
      expect(response.status).to.have.been.calledWith(200)
      const user = await prisma.user.findFirst({})
      expect(response.json).to.have.been.calledWith({
        status: true,
        message: "success",
        resp_data: {
          total_item: 1,
          data: [
            {
              id: user?.id,
              first_name: user?.first_name,
              last_name: user?.last_name
            }
          ]
        }
      })
    })
  })
  describe("detail function", () => {
    it("can return success", async() => {
      const request = {
        params: {
          id: '1'
        }
      } as unknown as Request
      let jsonSpy = sinon.spy()
      const response = ({
        json: jsonSpy,
        status: sinon.stub().returns({ json: jsonSpy }),
      } as unknown) as Response
      await userController.detail(request, response)
      expect(response.status).to.have.been.calledWith(200)
    })
    it("can return error when params not number", async() => {
      const request = {
        params: {
          id: 'asdasds'
        }
      } as unknown as Request
      let jsonSpy = sinon.spy()
      const response = ({
        json: jsonSpy,
        status: sinon.stub().returns({ json: jsonSpy }),
      } as unknown) as Response
      await userController.detail(request, response)
      expect(response.status).to.have.been.calledWith(400)
    })
  })
  describe('store function', () => { 
    it("can return success", async () => {
      const request = {
        body: {
          first_name: 'test',
          last_name: 'test'
        }
      } as Request
      let jsonSpy = sinon.spy()
      const response = ({
        json: jsonSpy,
        status: sinon.stub().returns({ json: jsonSpy }),
      } as unknown) as Response
      await userController.store(request, response)
      expect(response.status).to.have.been.calledWith(200)
    })
  })
  describe('update function', () => {
    it("can update user data", async() => {
      const user = await prisma.user.findFirst({
        where: {},
        skip: 5,
        select: {
          id: true
        }
      })
      const request = {
        body: {
          id: user?.id,
          first_name: 'test',
          last_name: 'test'
        }
      } as Request
      let jsonSpy = sinon.spy()
      const response = ({
        json: jsonSpy,
        status: sinon.stub().returns({ json: jsonSpy }),
      } as unknown) as Response
      await userController.update(request, response)
      expect(response.status).to.have.been.calledWith(200)
    })
    it("can return error when the id is invalid", async() => {
      const user = await prisma.user.findFirst({
        where: {},
        orderBy: {
          id: 'desc'
        },
        select: {
          id: true
        }
      })
      const request = {
        body: {
          id: user?.id ? user.id + 1000 : 1000,
          first_name: 'test',
          last_name: 'test'
        }
      } as Request
      let jsonSpy = sinon.spy()
      const response = ({
        json: jsonSpy,
        status: sinon.stub().returns({ json: jsonSpy }),
      } as unknown) as Response
      await userController.update(request, response)
      expect(response.status).to.have.been.calledWith(400)
    })
  })
  describe('destroy function', () => {
    it('can destroy user and return success', async() => {
      const user = await prisma.user.findFirst({
        where: {},
        skip: 2,
        select: {
          id: true
        }
      })
      const request = {
        body: {
          id: user?.id
        }
      } as Request
      let jsonSpy = sinon.spy()
      const response = ({
        json: jsonSpy,
        status: sinon.stub().returns({ json: jsonSpy }),
      } as unknown) as Response
      await userController.destroy(request, response)
      expect(response.status).to.have.been.calledWith(200)
    })
    it('can return error when the user id is invalid', async() => {
      const user = await prisma.user.findFirst({
        where: {},
        orderBy: {
          id: 'desc'
        },
        select: {
          id: true
        }
      })
      const request = {
        body: {
          id: user?.id ? user.id + 1000 : 10001
        }
      } as Request
      let jsonSpy = sinon.spy()
      const response = ({
        json: jsonSpy,
        status: sinon.stub().returns({ json: jsonSpy }),
      } as unknown) as Response
      await userController.destroy(request, response)
      expect(response.status).to.have.been.calledWith(400)
    })
  })
  after(async() => {
    await prisma.user.deleteMany({})
  })
})