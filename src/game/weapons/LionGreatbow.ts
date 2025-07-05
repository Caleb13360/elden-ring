import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Location } from './../../engine/positions/Location.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { GravityArrowAction } from '../actions/GravityArrowAction.js';
import { SellAction } from '../actions/SellAction.js';
import { TradeRememberanceAction } from '../actions/TradeRememberanceAction.js';
import { RadahnsRain } from '../items/RadahnsRain.js';
import { Remembrance } from '../items/Remembrance.js';
import { RandomNumberGenerator } from '../utility/RandomNumberGenerator.js';
import { Status } from '../utility/Status.js';
import { Util } from '../utility/Util.js';
import { Tradeable } from './Tradeable.js';
import { SellAble } from './SellAble.js';

/**
 * Class representing the weapon LionGreatbow used by Radahn
 * Created by: Caleb Smith
 */
export class LionGreatbow extends WeaponItem implements Tradeable, SellAble {
    /**
     * Price LionGreatbow can be sold for
     */
    private sellPrice: number = 1000;

    /**
     * Constructor for LionGreatbow
     */
    constructor() {
        super("Lion Greatbow", 'D', 120, "snipes", 91);
        this.addCapability(Status.RANGED);
    }

    /**
     * Returns skill of Gravity Arrow
     * @param target actor being attacked
     * @param direction direction of the actor being attacked
     * @return gravity arrow action using this weapon
     */
    getSkill(target: Actor, direction: string): Action {
        return new GravityArrowAction(this, target, direction);
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
     * Allow the weapon to perform the passive ability of Radahn's rain
     * This method is called once per turn, if the Item is being carried.
     * @param currentLocation The location of the actor carrying this Item.
     * @param actor The actor carrying this Item.
     */
    tick(currentLocation: Location, actor?: Actor): void {
        this.resetActions();
        if (actor) {
            const traders = Util.getNearbyStatusActor(currentLocation, Status.MERCHENT);
            for (const trader of traders) {
                this.addAction(new SellAction(trader, this));
            }
            const rangedAttacks = Util.getRangedAttacks(currentLocation, this, actor);
            for (const action of rangedAttacks) {
                this.addAction(action);
            }
            const x = currentLocation.xCoord() + RandomNumberGenerator.getRandomInt(-3, 3);
            const y = currentLocation.yCoord() + RandomNumberGenerator.getRandomInt(-3, 3);
            const map = currentLocation.mapRef();
            if (map.getXRange().contains(x) && map.getYRange().contains(y)) {
                if (map.at(x, y).getGround().getDisplayChar() === '.') {
                    map.at(x, y).addItem(new RadahnsRain(actor, map.at(x, y)));
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
        traderInActor.addWeaponToInventory(new LionGreatbow());
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