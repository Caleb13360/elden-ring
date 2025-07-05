import { DropAction } from './DropAction.js';
import { Actor } from '../actors/Actor.js';
import { GameMap } from '../positions/GameMap.js';
import { WeaponItem } from '../weapons/WeaponItem.js';

/**
 * Special Action that allows Actors to drop weapons.
 */
export class DropWeaponAction extends DropAction {
    private weapon: WeaponItem;

    /**
     * Constructor.
     *
     * @param weapon the weapon to drop
     */
    constructor(weapon: WeaponItem) {
        super(weapon);
        this.weapon = weapon;
    }

    /**
     * Drop the weapon
     *
     * @param actor The actor performing the action.
     * @param map The map the actor is on.
     * @return a description of the action suitable for feedback in the UI
     */
    execute(actor: Actor, map: GameMap): string {
        actor.removeWeaponFromInventory(this.weapon);
        return super.execute(actor, map);
    }
}