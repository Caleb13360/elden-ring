import { Canine } from './Canine.js';
import { DespawnBehaviour } from '../../behaviours/DespawnBehaviour.js';
import { ResetBehavior } from '../../behaviours/ResetBehavior.js';
import { ResetManager } from '../../reset/ResetManager.js';
import { Resettable } from '../../reset/Resettable.js';
import { Faction } from './Faction.js';

/**
 * Class representing Lone Wolf Enemy
 * Created by: Adrian Kristanto
 * Modified by: Rvinder Sandhu
 */
export class LoneWolf extends Canine implements Resettable {
    /**
     * Lone Wolf constructor
     */
    constructor() {
        super(
            "Lone Wolf",
            'h',
            102,
            55,
            1470,
            97,
            "bites",
            95
        );
        ResetManager.getInstance().registerResettable(this);
        this.behaviours.set(998, new DespawnBehaviour());
        this.addCapability(Faction.CANINE_FRIENDLY);
    }

    /**
     * Sets the enemy to reset on its next turn
     */
    reset(): void {
        this.behaviours.set(1, new ResetBehavior());
    }
}