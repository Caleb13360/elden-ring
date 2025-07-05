import { Actor } from '../actors/Actor.js';
import { Item } from '../items/Item.js';
import { Weapon } from './Weapon.js';
import { PickUpAction } from '../items/PickUpAction.js';
import { DropAction } from '../items/DropAction.js';
import { PickUpWeaponAction } from '../items/PickUpWeaponAction.js';
import { DropWeaponAction } from '../items/DropWeaponAction.js';

/**
 * Class representing items that can be used as a weapon.
 */
export abstract class WeaponItem extends Item implements Weapon {
    private readonly _damage: number;
    private readonly _hitRate: number;
    private readonly _verb: string;

    /**
     * Constructor.
     * @param name name of the item
     * @param displayChar character to use for display when item is on the ground
     * @param damage amount of damage this weapon does
     * @param verb verb to use for this weapon, e.g. "hits", "zaps"
     * @param hitRate the probability/chance to hit the target.
     */
    constructor(name: string, displayChar: string, damage: number, verb: string, hitRate: number) {
        super(name, displayChar, true);
        this._damage = damage;
        this._verb = verb;
        this._hitRate = hitRate;
    }

    /**
     * Accessor for damage done by this weapon.
     * @return the damage
     */
    damage(): number {
        return this._damage;
    }

    /**
     * Returns the verb used for attacking with this weapon, so that it can be displayed in the UI.
     * @return a third-person present tense verb, e.g. "hits", "zaps"
     */
    verb(): string {
        return this._verb;
    }

    /**
     * Returns the chance to hit the target in integer.
     * @return Integer, such as
     */
    chanceToHit(): number {
        return this._hitRate;
    }

    /**
     * Create and return an action to pick this WeaponItem up.
     * If this WeaponItem is not portable, returns null.
     * @return a new PickUpWeaponAction if this Item is portable, null otherwise.
     */
    getPickUpAction(actor: Actor): PickUpAction | null {
        if (this.portable)
            return new PickUpWeaponAction(this);
        return null;
    }

    /**
     * Create and return an action to drop this WeaponItem.
     * If this WeaponItem is not portable, returns null.
     * @return a new DropWeaponAction if this WeaponItem is portable, null otherwise.
     */
    getDropAction(actor: Actor): DropAction | null {
        if (this.portable)
            return new DropWeaponAction(this);
        return null;
    }
}