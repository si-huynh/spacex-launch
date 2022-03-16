import fetchUpComing from './response/upcoming.json'

export default function fetchUpComingResponse(responseStatus: string): void {
    switch (responseStatus) {
        case 'success':
            global.fetch = (): Promise<any> =>
                Promise.resolve({
                    json: () => fetchUpComing,
                    status: 200,
                })
            break
        case 'failed':
            global.fetch = (): Promise<any> =>
                Promise.resolve({
                    message: 'SERVICE_TEMPORARILY_UNAVAILABLE',
                    status: 503,
                })
            break
        default:
            break
    }
}
