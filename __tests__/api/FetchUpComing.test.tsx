import FetchUpComing from '../../__mocks__/api/FetchUpComing'
import { Launch } from 'types'

expect.extend({
    nullOrAny(received, expected) {
        if (received === null) {
            return {
                message: (): string =>
                    `expected null or instance of ${this.utils.printExpected(
                        expected,
                    )}, but received ${this.utils.printReceived(received)}`,
                pass: true,
            }
        }

        if (expected === String) {
            return {
                message: (): string =>
                    `expected null or instance of ${this.utils.printExpected(
                        expected,
                    )}, but received ${this.utils.printReceived(received)}`,
                pass: typeof received === 'string' || received instanceof String,
            }
        }

        if (expected === Number) {
            return {
                message: (): string =>
                    `expected null or instance of ${this.utils.printExpected(
                        expected,
                    )}, but received ${this.utils.printReceived(received)}`,
                pass: typeof received === 'number' || received instanceof Number,
            }
        }

        if (expected === Function) {
            return {
                message: (): string =>
                    `expected null or instance of ${this.utils.printExpected(
                        expected,
                    )}, but received ${this.utils.printReceived(received)}`,
                pass: typeof received === 'function' || received instanceof Function,
            }
        }

        if (expected === Object) {
            return {
                message: (): string =>
                    `expected null or instance of ${this.utils.printExpected(
                        expected,
                    )}, but received ${this.utils.printReceived(received)}`,
                pass: received !== null && typeof received === 'object',
            }
        }

        if (expected === Boolean) {
            return {
                message: (): string =>
                    `expected null or instance of ${this.utils.printExpected(
                        expected,
                    )}, but received ${this.utils.printReceived(received)}`,
                pass: typeof received === 'boolean',
            }
        }

        /* jshint -W122 */
        /* global Symbol */
        if (typeof Symbol !== 'undefined' && this.expectedObject === Symbol) {
            return {
                message: (): string =>
                    `expected null or instance of ${this.utils.printExpected(
                        expected,
                    )}, but received ${this.utils.printReceived(received)}`,
                pass: typeof received === 'symbol',
            }
        }
        /* jshint +W122 */

        return {
            message: (): string =>
                `expected null or instance of ${this.utils.printExpected(
                    expected,
                )}, but received ${this.utils.printReceived(received)}`,
            pass: received instanceof expected,
        }
    },
})

describe('fetchUpComing', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('1. fetchUpComing should be return response json successfully', async () => {
        FetchUpComing('success')
        const result = await fetch('https://api.spacexdata.com/v4/launches/upcoming')
        expect(result).toMatchSnapshot()
    })

    test('2. fetchUpComing should be thrown SERVICE_TEMPORARILY_UNAVAILABLE error', async () => {
        FetchUpComing('failed')
        try {
            await fetch('https://api.spacexdata.com/v4/launches/upcoming')
        } catch (e) {
            expect(e.message).toBe('SERVICE_TEMPORARILY_UNAVAILABLE')
        }
    })

    test('3. fetchUpComing should return array of object', async () => {
        FetchUpComing('success')
        const result = await fetch('https://api.spacexdata.com/v4/launches/upcoming')
        const response = await result.json()
        expect(Array.isArray(response)).toBe(true)
        expect(response[0]).toBeInstanceOf(Object)
    })

    test('4. fetchUpComing should return array of object - with every item is Launch', async () => {
        FetchUpComing('success')
        const result = await fetch('https://api.spacexdata.com/v4/launches/upcoming')
        const response = await result.json()
        const item = response[0] as Launch
        expect(item).toHaveProperty('auto_update')
        expect(item).toEqual({
            auto_update: expect.any(Boolean),
            capsules: expect.any(Array),
            cores: expect.any(Array),
            crew: expect.any(Array),
            date_local: expect.any(String),
            date_precision: expect.any(String),
            date_unix: expect.any(Number),
            date_utc: expect.any(String),
            // @ts-ignore
            details: expect.nullOrAny(String),
            failures: expect.any(Array),
            fairings: expect.any(Object),
            flight_number: expect.any(Number),
            id: expect.any(String),
            launchpad: expect.any(String),
            links: expect.any(Object),
            name: expect.any(String),
            net: expect.any(Boolean),
            payloads: expect.any(Array),
            rocket: expect.any(String),
            ships: expect.any(Array),
            // @ts-ignore
            static_fire_date_unix: expect.nullOrAny(Number),
            // @ts-ignore
            static_fire_date_utc: expect.nullOrAny(String),
            // @ts-ignore
            success: expect.nullOrAny(String),
            tbd: expect.any(Boolean),
            upcoming: expect.any(Boolean),
            // @ts-ignore
            window: expect.nullOrAny(String),
        })
    })
})
