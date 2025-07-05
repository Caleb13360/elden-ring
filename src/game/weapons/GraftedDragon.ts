import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Exit } from './../../engine/positions/Exit.js';
import { Location } from './../../engine/positions/Location.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { AOEAttackAction } from '../actions/AOEAttackAction.js';
import { SellAction } from '../actions/SellAction.js';
import { TradeRememberanceAction } from '../actions/TradeRememberanceAction.js';
import { Fire } from '../items/Fire.js';
import { Remembrance } from '../items/Remembrance.js';
import { RandomNumberGenerator } from '../utility/RandomNumberGenerator.js';
import { Status } from '../utility/Status.js';
import { Util } from '../utility/Util.js';
import { Tradeable } from './Tradeable.js';
import { SellAble } from './SellAble.js';
import { Weapon } from '../../engine/weapons/Weapon.js';

/**
 * Class representing the weapon GraftedDragon used by Godrick
 * Created by: Caleb Smith
 */
export class GraftedDragon extends WeaponItem implements Tradeable, SellAble {
    private sellPrice: number = 200;

    constructor() {
        super("Grafted Dragon", 'N', 89, "hits", 90);
    }

    /**
     * Returns AOE attack action
     * @param target actor being attacked
     * @param direction direction of the actor being attacked
     * @return aoe attack action using this weapon
     */
    getSkill(target: Actor, direction: string): Action {
        return new AOEAttackAction(this as WeaponItem as Weapon);
    }

    /**
     * Clear the actions an item can carry out
     */
    private resetActions(): void {
        const allowableActions = this.getAllowableActions();
        for (const action of allowableActions) {
            this.removeAction(action);
        }
    }

    /**
     * Inform the weapon of the passage of time.
     * Allows the weapon to be sold to nearby traders
     * Allows the weapon to perform its passive ability of frequently spreading fire to nearby tiles
     * This method is called once per turn, if the Item is being carried.
     * @param currentLocation The location of the actor carrying this Item.
     * @param actor The actor carrying this Item.
     */
    tick(currentLocation: Location, actor?: Actor): void {
        this.resetActions();
        const traders = Util.getNearbyStatusActor(currentLocation, Status.MERCHENT);
        for (const trader of traders) {
            this.addAction(new SellAction(trader, this));
        }
        if (actor && RandomNumberGenerator.getRandomInt(100) < 75) {
            for (const exit of currentLocation.getExits()) {
                const destination = exit.getDestination();
                if (
                    !destination.getGround().hasCapability(Status.BURNED) &&
                    destination.getGround().getDisplayChar() === '.'
                ) {
                    destination.addItem(new Fire(actor, destination));
                }
            }
        }
    }

    /**
     * Resets the actions for the weapon if it ticks on the ground as no actor should be using it unless it is in their inventory
     * @param currentLocation The location of the ground on which we lie.
     */
    tickOnGround(currentLocation: Location): void {
        this.resetActions();
    }

    /**
     * Implementation of adding the tradeable to the actor's inventory
     * @param traderInActor actor in which tradeable is being added to
     */
    addTradeableToInventory(traderInActor: Actor): void {
        traderInActor.addWeaponToInventory(new GraftedDragon());
    }

    /**
     * Gets the item name
     * @return string of the item's name
     */
    getItemName(): string {
        return this.toString();
    }

    /**
     * Gets the sell price of the item
     * @return int for item's sell price
     */
    getSellPrice(): number {
        return this.sellPrice;
    }

    /**
     * Removes item from actor inventory
     * @param actor actor the item is being removed from
     */
    removeItem(actor: Actor): void {
        actor.removeWeaponFromInventory(this);
    }
}