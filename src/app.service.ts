import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { lookup } from 'geoip-lite'
import UAParser from 'ua-parser-js'

interface Location {
    country_name: string
    city: string
}

@Injectable()
export class AppService {
    
    constructor(private httpService: HttpService) {
    }
    
    async getData(req: Request) {
        const uaParserResult = new UAParser(req.headers['user-agent']).getResult()
        const ip = req.ip?.toString().replace('::ffff:', '');
        const geo = lookup(ip)
        const location = await this.httpService.axiosRef.get<Location>(`https://ipapi.co/${ip}/json`)
        
        return {
            ip,
            os: uaParserResult.os.name ?? '',
            browser: uaParserResult.browser.name ?? '',
            country: new Intl.DisplayNames(['en'], { type: 'region' }).of(geo?.country ?? ''),
            city: geo?.city ?? '',
            accurateCountry: location.data.country_name ?? '',
            accurateCity: location.data.city ?? '',
        }
    }
    
}

