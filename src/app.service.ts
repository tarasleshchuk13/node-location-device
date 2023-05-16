import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { lookup } from 'geoip-lite'
import * as requestIp from 'request-ip'
import * as UAParser from 'ua-parser-js'

@Injectable()
export class AppService {
    getData(req: Request) {
        const clientIp = requestIp.getClientIp(req)
        const uaParserResult = new UAParser(req.headers['user-agent']).getResult()
        const geo = lookup(clientIp)
        const country = new Intl.DisplayNames(['en'], { type: 'region' }).of(geo?.country ?? '')
        const city = geo?.city ?? ''
        const system = uaParserResult.os.name ?? ''
        const browser = uaParserResult.browser.name ?? ''
        return { system, browser, country, city, clientIp }
    }
}
