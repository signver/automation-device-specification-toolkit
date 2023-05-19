import { AMSMessageData } from './ams-message-data'
import {  } from './constants'

describe("AMSMessageData", () => {
    describe(".packet", () => {
        it("should have a default value", () => {
            const link = "test"
            const data = new AMSMessageData<typeof link>("test")
            expect(data.packet).toStrictEqual(link)
        })
    })
})