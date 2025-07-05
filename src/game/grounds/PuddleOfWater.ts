import { Location } from './../../engine/positions/Location.js';
import { EnemyField } from './EnemyField.js';
import { SpawnFactory } from './SpawnFactory.js';
import { Crustacean } from '../actors/enemies/Crustacean.js';

/**
 * Concrete class representing puddle of water ground type
 * Author: Rvinder Sandhu
 */
export class PuddleOfWater extends EnemyField {
    constructor(spawnFactory: SpawnFactory) {
        super(spawnFactory, '~');
    }

    tick(location: Location): void {
        const crustacean: Crustacean | null = this.factory.createCrustacean();
        if (crustacean !== null) {
            super.spawnCreature(location, crustacean);
        }
    }
}