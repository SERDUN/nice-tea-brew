import { Module } from '@nestjs/common';
import { TeaController } from './tea.controller';
import { TeaService } from './tea.service';
import { TeaBrewingRepository } from "./tea_brewing.repository";

@Module({
    controllers: [TeaController],
    providers: [TeaService, TeaBrewingRepository]
})
export class TeaModule {
}
