import { Location } from './../../engine/positions/Location.js';
import { EnemyField } from './EnemyField.js';
import { SpawnFactory } from './SpawnFactory.js';
import { Canine } from '../actors/enemies/Canine.js';

/**
 * Class representing the gust of wind ground type
 */
export class GustOfWind extends EnemyField {
    constructor(spawnFactory: SpawnFactory) {
        super(spawnFactory, '&');
    }

    tick(location: Location): void {
        const canine: Canine | null = this.factory.createCanine();
        if (canine !== null) {
            super.spawnCreature(location, canine);
        }
    }
}