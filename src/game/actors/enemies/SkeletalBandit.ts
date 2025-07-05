import { DespawnBehaviour } from '../../behaviours/DespawnBehaviour.js';
import { ResetBehavior } from '../../behaviours/ResetBehavior.js';
import { ResetManager } from '../../reset/ResetManager.js';
import { Resettable } from '../../reset/Resettable.js';
import { Scimitar } from '../../weapons/Scimitar.js';
import { Skeleton } from './Skeleton.js';

/**
 * Class for Skeletal Bandit Enemy
 */
export class SkeletalBandit extends Skeleton implements Resettable {
    /**
     * Skeletal bandit constructor
     */
    constructor() {
        super("Skeletal Bandit", 'b', 184, 35, 892);
        this.behaviours.set(998, new DespawnBehaviour());
        this.addWeaponToInventory(new Scimitar());
        ResetManager.getInstance().registerResettable(this);
    }

    /**
     * Sets the enemy to reset on its next turn
     */
    reset(): void {
        this.behaviours.set(1, new ResetBehavior());
    }
}