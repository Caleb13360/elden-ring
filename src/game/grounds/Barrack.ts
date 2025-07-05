import { Location } from './../../engine/positions/Location.js';
import { EnemyField } from './EnemyField.js';
import { SpawnFactory } from './SpawnFactory.js';
import { Humanoid } from '../actors/enemies/Humanoid.js';

/**
 * Class representing the Barrack ground type
 */
export class Barrack extends EnemyField {
    constructor(spawnFactory: SpawnFactory) {
        super(spawnFactory, 'B');
    }

    tick(location: Location): void {
        const humanoid: Humanoid | null = this.factory.createHumanoid();
        if (humanoid !== null) {
            super.spawnCreature(location, humanoid);
        }
    }
}