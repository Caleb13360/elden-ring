import { Canine } from './Canine.js';
import { Resettable } from '../../reset/Resettable.js';
import { ResetManager } from '../../reset/ResetManager.js';
import { DespawnBehaviour } from '../../behaviours/DespawnBehaviour.js';
import { ResetBehavior } from '../../behaviours/ResetBehavior.js';
import { Faction } from './Faction.js';

/**
 * Class representing Dog Enemy
 * Created by: Rvinder Sandhu
 */
export class Dog extends Canine implements Resettable {
    constructor() {
        super(
            "Dog",
            'a',
            104,
            52,
            1390,
            101,
            "bites",
            93
        );
        this.addCapability(Faction.GODRICK_FRIENDLY);
        this.behaviours.set(998, new DespawnBehaviour());
        ResetManager.getInstance().registerResettable(this);
    }

    /**
     * Sets the enemy to reset on its next turn
     */
    reset(): void {
        this.behaviours.set(1, new ResetBehavior());
    }
}