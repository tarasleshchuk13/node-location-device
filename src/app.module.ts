import { HttpModule } from '@nestjs/axios'
import { Logger, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
    imports: [HttpModule],
    controllers: [AppController],
    providers: [AppService, Logger],
})
export class AppModule {
}
