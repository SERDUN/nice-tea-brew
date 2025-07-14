import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TeaService } from "./tea.service";
import { ZBody } from "../../decorators/zbody.decorator";
import { Throttle } from "@nestjs/throttler";
import { Public } from "../../decorators/guard";
import { ZQuery } from "../../decorators/zpagination.decorator";
import { Pagination, PaginationQuerySchema } from "../../dto/pagination.schema";
import { ApiTeaBrewingCreateDto, ApiTeaBrewingUpdateDto, TeaBrewingCreateDto, TeaBrewingUpdateDto } from "./dto";
import { TeaBrewingCreateScheme, TeaBrewingUpdateScheme } from './schemes';
import { ApiBody } from "@nestjs/swagger";

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
    @ApiBody({type: ApiTeaBrewingCreateDto})
    @Throttle({default: {limit: 10, ttl: 60000}})
    async createBrewing(@ZBody(TeaBrewingCreateScheme) @Body() dto: TeaBrewingCreateDto) {
        return this.service.createBrewing(dto);
    }

    @Put(':id')
    @ApiBody({type: ApiTeaBrewingUpdateDto})
    async updateBrewing(@Param('id') id: string, @ZBody(TeaBrewingUpdateScheme) @Body() dto: TeaBrewingUpdateDto) {
        return this.service.updateBrewing(id, dto);
    }

    @Delete(':id')
    async deleteBrewing(@Param('id') id: string) {
        await this.service.deleteBrewing(id);
    }
}
