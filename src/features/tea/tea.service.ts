import { Injectable } from '@nestjs/common';
import { Tea } from './dto/tea.dto';
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
    ): Promise<PaginatedResult<Tea>> {
        const filteredData = this.repository.findFiltered(minRating);
        return paginate(filteredData, page, pageSize);
    }

    async getBrewingById(id: string): Promise<Tea | null> {
        return this.repository.findById(id);
    }

    async createBrewing(brew: Omit<Tea, 'id'>): Promise<Tea> {
        return this.repository.create(brew);
    }

    async updateBrewing(id: string, brew: Omit<Partial<Tea>, 'id'>): Promise<Tea | null> {
        return this.repository.update(id, brew);
    }

    async deleteBrewing(id: string): Promise<void> {
        this.repository.delete(id);
    }
}
