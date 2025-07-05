import { Crustacean } from './Crustacean.js';
import { Resettable } from '../../reset/Resettable.js';
import { ResetManager } from '../../reset/ResetManager.js';
import { AOEIntrinsicAttackBehaviour } from '../../behaviours/AOEIntrinsicAttackBehaviour.js';
import { DespawnBehaviour } from '../../behaviours/DespawnBehaviour.js';
import { ResetBehavior } from '../../behaviours/ResetBehavior.js';

/**
 * Class representing Giant Kray Fish enemy
 * Created by: Rvinder Sandhu
 */
export class GiantKrayFish extends Crustacean implements Resettable {
    constructor() {
        super(
            "Giant Kray Fish",
            'R',
            4803,
            500,
            2374,
            527,
            "slams",
            100
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