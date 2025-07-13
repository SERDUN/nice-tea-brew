import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TeaService } from "./tea.service";
import { BrewCreateDto, BrewUpdateDto, TeaUpdateDto } from "./dto";
import { ZBody } from "./decoretors/zbody.decorator";
import { Throttle } from "@nestjs/throttler";
import { Public } from "../../decorators/guard";

@Controller('tea')
export class TeaController {
    private readonly service: TeaService;

    constructor(service: TeaService) {
        console.log("service inject", service);
        this.service = service;
    }

    @Public()
    @Get()
    async getBrewing(@Query('minRating') minRating?: number, @Query('pageSize') pageSize: number = 10, @Query('page') page: number = 1) {
        return this.service.getBrewing(minRating,pageSize, page);
    }

    @Get(':id')
    async getBrewingById(@Param('id') id: string) {
        return this.service.getBrewingById(id);
    }


    @Post()
    @Throttle({default: {limit: 10, ttl: 60000}})
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
