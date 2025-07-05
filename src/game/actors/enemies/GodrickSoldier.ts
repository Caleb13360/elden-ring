import { Humanoid } from './Humanoid.js';
import { Resettable } from '../../reset/Resettable.js';
import { ResetManager } from '../../reset/ResetManager.js';
import { DespawnBehaviour } from '../../behaviours/DespawnBehaviour.js';
import { ResetBehavior } from '../../behaviours/ResetBehavior.js';
import { Club } from '../../weapons/Club.js';
import { Faction } from './Faction.js';

/**
 * Class for Soldier of Godrick Enemy
 */
export class GodrickSoldier extends Humanoid implements Resettable {
    constructor() {
        super("Soldier of Godrick", 'p', 198, 38, 70);
        // TODO: Add heavycrossbow
        this.addWeaponToInventory(new Club());
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