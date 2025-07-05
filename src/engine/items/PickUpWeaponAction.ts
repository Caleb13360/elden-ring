import { PickUpAction } from './PickUpAction.js';
import { Actor } from '../actors/Actor.js';
import { GameMap } from '../positions/GameMap.js';
import { WeaponItem } from '../weapons/WeaponItem.js';
import { Item } from './Item.js';

/**
 * Action to allow weapons to be picked up.
 */
export class PickUpWeaponAction extends PickUpAction {
    private weapon: WeaponItem;

    /**
     * Constructor.
     *
     * @param weapon the weapon to pick up
     */
    constructor(weapon: WeaponItem) {
        super(weapon);
        this.weapon = weapon;
    }

    /**
     * Add the weapon to the actor's inventory.
     *
     * @param actor The actor performing the action.
     * @param map The map the actor is on.
     * @return a suitable description to display in the UI
     */
    execute(actor: Actor, map: GameMap): string {
        actor.addWeaponToInventory(this.weapon);
        return super.execute(actor, map);
    }
}