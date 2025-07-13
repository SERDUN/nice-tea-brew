import { Injectable } from '@nestjs/common';
import { TeaEntities } from "./entities";

@Injectable()
export class TeaService {
    private data: TeaEntities[] = [];

    async getBrewing(): Promise<TeaEntities[]> {
        return this.data;
    }

    async getBrewingById(id: string): Promise<TeaEntities | null> {
        return this.data.find(brew => brew.id === id) || null;
    }

    async createBrewing(brew: Omit<TeaEntities, "id">): Promise<TeaEntities> {
        return new Promise((resolve) => {
            const newBrew = {...brew, id: (Math.random() * 1000).toString()};
            this.data.push(newBrew);
            resolve(newBrew);
        });
    }

    async updateBrewing(id: string, brew: Omit<TeaEntities, "id">): Promise<TeaEntities | null> {
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
