import { Injectable } from '@nestjs/common';
import { TeaBrewingDto } from './dto';
import { TeaBrewingRepository } from './tea_brewing.repository';
import { paginate, PaginatedResult } from "../../utils";

@Injectable()
export class TeaService {
    constructor(private readonly repository: TeaBrewingRepository) {
    }

    async getBrewing(
        minRating?: number,
        pageSize = 10,
        page = 1
    ): Promise<PaginatedResult<TeaBrewingDto>> {
        const filteredData = this.repository.findFiltered(minRating);
        return paginate(filteredData, page, pageSize);
    }

    async getBrewingById(id: string): Promise<TeaBrewingDto | null> {
        return this.repository.findById(id);
    }

    async createBrewing(brew: Omit<TeaBrewingDto, 'id'>): Promise<TeaBrewingDto> {
        return this.repository.create(brew);
    }

    async updateBrewing(id: string, brew: Omit<Partial<TeaBrewingDto>, 'id'>): Promise<TeaBrewingDto | null> {
        return this.repository.update(id, brew);
    }

    async deleteBrewing(id: string): Promise<void> {
        this.repository.delete(id);
    }
}
