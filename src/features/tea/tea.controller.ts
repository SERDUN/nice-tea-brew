import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TeaService } from "./tea.service";
import { ZBody } from "../../decorators/zbody.decorator";
import { Throttle } from "@nestjs/throttler";
import { Public } from "../../decorators/guard";
import { ZQuery } from "../../decorators/zpagination.decorator";
import { Pagination, PaginationQuerySchema } from "../../dto/pagination.schema";
import { BrewCreateDto, BrewCreateDtoScheme, BrewUpdateDto, TeaUpdateDtoScheme } from "./dto/tea.dto";

@Controller('tea')
export class TeaController {
    private readonly service: TeaService;

    constructor(service: TeaService) {
        console.log("service inject", service);
        this.service = service;
    }

    @Public()
    @Get()
    async getBrewing(@ZQuery(PaginationQuerySchema) pagination: Pagination, @Query('minRating') minRating?: number) {
        return this.service.getBrewing(minRating, pagination.pageSize, pagination.page);
    }

    @Get(':id')
    async getBrewingById(@Param('id') id: string) {
        return this.service.getBrewingById(id);
    }


    @Post()
    @Throttle({default: {limit: 10, ttl: 60000}})
    async createBrewing(@ZBody(BrewCreateDtoScheme) @Body() dto: BrewCreateDto) {
        return this.service.createBrewing(dto);
    }

    @Put(':id')
    async updateBrewing(@Param('id') id: string, @ZBody(TeaUpdateDtoScheme) @Body() dto: BrewUpdateDto) {
        return this.service.updateBrewing(id, dto);
    }

    @Delete(':id')
    async deleteBrewing(@Param('id') id: string) {
        await this.service.deleteBrewing(id);
    }
}
