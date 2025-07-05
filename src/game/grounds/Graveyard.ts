import { Location } from './../../engine/positions/Location.js';
import { EnemyField } from './EnemyField.js';
import { SpawnFactory } from './SpawnFactory.js';
import { Skeleton } from '../actors/enemies/Skeleton.js';

/**
 * Concrete class representing graveyard ground type
 */
export class Graveyard extends EnemyField {
    constructor(spawnFactory: SpawnFactory) {
        super(spawnFactory, 'n');
    }

    tick(location: Location): void {
        const skeleton: Skeleton | null = this.factory.createSkeleton();
        if (skeleton !== null) {
            super.spawnCreature(location, skeleton);
        }
    }
}