import { Canine } from './Canine.js';
import { Resettable } from '../../reset/Resettable.js';
import { ResetManager } from '../../reset/ResetManager.js';
import { AOEIntrinsicAttackBehaviour } from '../../behaviours/AOEIntrinsicAttackBehaviour.js';
import { DespawnBehaviour } from '../../behaviours/DespawnBehaviour.js';
import { ResetBehavior } from '../../behaviours/ResetBehavior.js';
import { Faction } from './Faction.js';

/**
 * Class representing Giant Dog Enemy
 * Created by: Rvinder Sandhu
 */
export class GiantDog extends Canine implements Resettable {
    constructor() {
        super(
            "Giant Dog",
            'G',
            693,
            313,
            1808,
            314,
            "slams",
            90
        );
        this.behaviours.set(99, new AOEIntrinsicAttackBehaviour());
        this.behaviours.set(998, new DespawnBehaviour());
        this.addCapability(Faction.CANINE_FRIENDLY);
        ResetManager.getInstance().registerResettable(this);
    }

    /**
     * Sets the enemy to reset on its next turn
     */
    reset(): void {
        this.behaviours.set(1, new ResetBehavior());
    }
}