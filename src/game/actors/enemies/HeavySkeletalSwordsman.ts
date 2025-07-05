import { Skeleton } from './Skeleton.js';
import { ResetManager } from '../../reset/ResetManager.js';
import { Resettable } from '../../reset/Resettable.js';
import { DespawnBehaviour } from '../../behaviours/DespawnBehaviour.js';
import { ResetBehavior } from '../../behaviours/ResetBehavior.js';
import { Grossmesser } from '../../weapons/Grossmesser.js';

/**
 * Class for Heavy Skeletal Swordsman Enemy
 */
export class HeavySkeletalSwordsman extends Skeleton implements Resettable {
    /**
     * Heavy Skeletal Swordsman constructor
     */
    constructor() {
        super("Heavy Skeletal Swordsman", 'q', 153, 35, 892);
        this.behaviours.set(998, new DespawnBehaviour());
        this.addWeaponToInventory(new Grossmesser());
        ResetManager.getInstance().registerResettable(this);
    }

    /**
     * Sets the enemy to reset on its next turn
     */
    reset(): void {
        this.behaviours.set(1, new ResetBehavior());
    }
}