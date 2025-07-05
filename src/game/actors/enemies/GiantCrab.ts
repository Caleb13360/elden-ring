import { Crustacean } from './Crustacean.js';
import { Resettable } from '../../reset/Resettable.js';
import { ResetManager } from '../../reset/ResetManager.js';
import { AOEIntrinsicAttackBehaviour } from '../../behaviours/AOEIntrinsicAttackBehaviour.js';
import { DespawnBehaviour } from '../../behaviours/DespawnBehaviour.js';
import { ResetBehavior } from '../../behaviours/ResetBehavior.js';

/**
 * Class representing Giant Crab enemy
 * Created by: Rvinder Sandhu
 */
export class GiantCrab extends Crustacean implements Resettable {
    constructor() {
        super(
            "Giant Crab",
            'C',
            407,
            318,
            4961,
            208,
            "slams",
            90
        );
        this.behaviours.set(99, new AOEIntrinsicAttackBehaviour());
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