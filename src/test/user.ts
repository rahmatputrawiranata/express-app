import assert from "assert"
import chai, {expect} from "chai"
import chaiHttp from "chai-http"
import { api } from "../config"
chai.use(chaiHttp)
chai.should()

const dummyUser = [
    {
      id: 2,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 3,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 4,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 5,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 6,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 7,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 8,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 9,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 10,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 11,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 12,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 13,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 14,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 15,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 16,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 17,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 18,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 19,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 20,
      first_name: "jhon",
      last_name: "doe"
    },
    {
      id: 21,
      first_name: "jhon",
      last_name: "doe"
    }
]


describe("can show all user with pagination data", () => {
    it("should erturn 4 ", () => {
        return chai.request(api).get('/user')
          .then(res => {
            chai.expect(res.body).to.eql(dummyUser)
          })
    })
})