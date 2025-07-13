import { Injectable } from '@nestjs/common';
import { Tea } from './dto/tea.dto';
import { nanoid } from "nanoid";

@Injectable()
export class TeaBrewingRepository {
    private data: Tea[] = [];

    findFiltered(minRating?: number): Tea[] {
        return minRating
            ? this.data.filter(brew => brew.rating != null && brew.rating >= minRating)
            : this.data;
    }

    findById(id: string): Tea | null {
        return this.data.find(brew => brew.id === id) || null;
    }

    create(brew: Omit<Tea, 'id'>): Tea {
        const newBrew = {...brew, id: nanoid()};
        this.data.push(newBrew);
        return newBrew;
    }

    update(id: string, brew: Omit<Partial<Tea>, 'id'>): Tea | null {
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
