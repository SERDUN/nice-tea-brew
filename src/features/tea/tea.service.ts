import { Injectable } from '@nestjs/common';
import { TeaEntities } from "./entities";
import { Tea } from "./dto/tea.dto";

@Injectable()
export class TeaService {
    private data: Tea[] = [];

    async getBrewing(): Promise<Tea[]> {
        return this.data;
    }

    async getBrewingById(id: string): Promise<Tea | null> {
        return this.data.find(brew => brew.id === id) || null;
    }

    async createBrewing(brew: Omit<Tea, "id">): Promise<Tea> {
        return new Promise((resolve) => {
            const newBrew = {...brew, id: (Math.random() * 1000).toString()};
            this.data.push(newBrew);
            resolve(newBrew);
        });
    }

    async updateBrewing(id: string,brew: Omit<Partial<Tea>, 'id'>): Promise<Tea | null> {
        return new Promise((resolve) => {
            const index = this.data.findIndex(b => b.id === id);
            if (index === -1) {
                resolve(null);
                return;
            }
            const updatedBrew = {...this.data[index], ...brew};
            this.data[index] = updatedBrew;
            resolve(updatedBrew);
        });
    }

    async deleteBrewing(id: string): Promise<{ success: boolean; id: string }> {
        return new Promise((resolve) => {
            const index = this.data.findIndex(b => b.id === id);
            if (index === -1) {
                resolve({success: false, id});
                return;
            }
            this.data.splice(index, 1);
            resolve({success: true, id});
        });
    }
}
