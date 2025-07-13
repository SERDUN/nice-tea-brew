import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TeaService } from "./tea.service";
import { BrewCreateDto, BrewUpdateDto, TeaUpdateDto } from "./dto";
import { ZBody } from "./decoretors/zbody.decorator";

@Controller('tea')
export class TeaController {
    private readonly service: TeaService;

    constructor(service: TeaService) {
        console.log("service inject", service);
        this.service = service;
    }

    @Get()
    async getBrewing() {
        return this.service.getBrewing();
    }

    @Get(':id')
    async getBrewingById(@Param('id') id: string) {
        return this.service.getBrewingById(id);
    }


    @Post()
    async createBrewing(@ZBody(BrewCreateDto) @Body() dto: BrewCreateDto) {
        return this.service.createBrewing(dto);
    }

    @Put(':id')
    async updateBrewing(@Param('id') id: string, @ZBody(TeaUpdateDto) @Body() dto: BrewUpdateDto) {
        return this.service.updateBrewing(id, dto);
    }

    @Delete('tea/:id')
    async deleteBrewing(@Param('id') id: string) {
        return this.service.deleteBrewing(id);
    }
}
