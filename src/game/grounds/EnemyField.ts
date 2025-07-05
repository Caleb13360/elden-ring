import { Actor } from './../../engine/actors/Actor.js';
import { Ground } from './../../engine/positions/Ground.js';
import { Location } from './../../engine/positions/Location.js';
import { SpawnFactory } from './SpawnFactory.js';

/**
 * Abstract class for ground types which will spawn enemies
 * Author: Rvinder Sandhu
 */
export abstract class EnemyField extends Ground {
    protected factory: SpawnFactory;

    /**
     * Constructor for an enemy field
     * @param factory The factory that will be used in spawning enemies
     * @param displayChar The character used to display the ground
     */
    constructor(factory: SpawnFactory, displayChar: string) {
        super(displayChar);
        this.factory = factory;
    }

    /**
     * Method for spawning an enemy on the ground 
     * @param location where the spawning occurs
     * @param actor what will be spawned
     */
    spawnCreature(location: Location, actor: Actor): void {
        if (!location.containsAnActor()) {
            location.addActor(actor);
        }
    }
}