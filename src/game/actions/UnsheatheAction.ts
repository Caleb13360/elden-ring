import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { DeathAction } from './DeathAction.js';

/**
 * Class representing Unsheathe skill
 * Created by: Caleb Smith
 */
export class UnsheatheAction extends Action {
    /**
     * Target of attack
     */
    private target: Actor;
    /**
     * Direction of attack
     */
    private direction: string;
    /**
     * Weapon being unsheathed
     */
    private weapon: WeaponItem;
    /**
     * Accuracy of skill
     */
    private readonly skillChance: number = 60;

    /**
     * Constructor for unsheathe action
     * @param target to be attacked
     * @param direction direction to attack in
     * @param weapon to attack with
     */
    constructor(target: Actor, direction: string, weapon: WeaponItem) {
        super();
        this.target = target;
        this.direction = direction;
        this.weapon = weapon;
    }

    /**
     * When executed, the chance to hit of the weapon that the Actor used is computed to determine whether
     * the actor will hit the target. If so, deal double damage to the target and determine whether the target is killed.
     * the double damage is the unique ability to this skill.
     * @param actor The actor performing the unsheathe action.
     * @param map The map the actor is on.
     * @return the result of unsheathe, e.g. whether the target is killed, etc.
     */
    execute(actor: Actor, map: GameMap): string {
        if (Math.floor(Math.random() * 100) > this.skillChance) {
            return `${actor} misses ${this.target}.`;
        }

        const damage = this.weapon.damage() * 2;
        let result = `${actor} Unsheathes against ${this.target} for ${damage} damage.`;
        this.target.hurt(damage);
        if (!this.target.isConscious()) {
            result += new DeathAction(actor).execute(this.target, map);
        }
        return result;
    }

    /**
     * Describes which target the actor is unsheathing against in which direction with which weapon
     * @param actor The actor performing unsheathe
     * @return a description used for the menu UI
     */
    menuDescription(actor: Actor): string {
        return `${actor} Unsheathes against ${this.target} at ${this.direction} with ${this.weapon ? this.weapon : "Intrinsic Weapon"}`;
    }
}