import { Injectable } from '@nestjs/common';
import { TeaBrewingDto } from './dto/tea_brewing.dto';
import { nanoid } from "nanoid";

@Injectable()
export class TeaBrewingRepository {
    private data: TeaBrewingDto[] = [];

    findFiltered(minRating?: number): TeaBrewingDto[] {
        return minRating
            ? this.data.filter(brew => brew.rating != null && brew.rating >= minRating)
            : this.data;
    }

    findById(id: string): TeaBrewingDto | null {
        return this.data.find(brew => brew.id === id) || null;
    }

    create(brew: Omit<TeaBrewingDto, 'id'>): TeaBrewingDto {
        const newBrew = {...brew, id: nanoid()};
        this.data.push(newBrew);
        return newBrew;
    }

    update(id: string, brew: Omit<Partial<TeaBrewingDto>, 'id'>): TeaBrewingDto | null {
        const index = this.data.findIndex(b => b.id === id);
        if (index === -1) return null;

        const updatedBrew = {...this.data[index], ...brew};
        this.data[index] = updatedBrew;
        return updatedBrew;
    }

    delete(id: string): boolean {
        const index = this.data.findIndex(b => b.id === id);
        if (index === -1) return false;

        this.data.splice(index, 1);
        return true;
    }
}
