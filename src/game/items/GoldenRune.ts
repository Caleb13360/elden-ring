import { Action } from './../../engine/actions/Action.js';
import { ActionList } from './../../engine/actions/ActionList.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Item } from './../../engine/items/Item.js';
import { Location } from './../../engine/positions/Location.js';
import { ConsumeAction } from '../actions/ConsumeAction.js';
import { RuneManager } from '../runes/RuneManager.js';
import { Consumable } from './Consumable.js';
import { RandomNumberGenerator } from '../utility/RandomNumberGenerator.js';

/**
 * Golden rune item which can be consumed for a random amount of runes
 * Created by: Caleb Smith
 */
export class GoldenRune extends Item implements Consumable {
    /**
     * Max runes that can drop
     */
    private readonly maxRunes: number = 10000;
    /**
     * Minimum runes that can drop
     */
    private minRunes: number = 200;
    /**
     * Bool representing if the golden rune is within an inventory
     */
    private inInventory: boolean = false;

    /**
     * Golden rune constructor
     */
    constructor() {
        super("Golden Rune", '*', true);
    }

    /**
     * Provides the action to consume the golden rune if it is in the inventory
     * @return a consume action
     */
    getAllowableActions(): readonly Action[] {
        const actions = new ActionList();
        if (this.inInventory) {
            actions.add(new ConsumeAction(this));
        }
        return actions.getUnmodifiableActionList();
    }

    /**
     * Allows the golden rune to tick in an inventory showing it is being held
     * @param currentLocation The location of the actor carrying this Item.
     * @param actor The actor carrying this Item.
     */
    tick(currentLocation: Location, actor?: Actor): void {
        this.inInventory = !!actor;
    }

    /**
     * Allows the golden rune to be consumed
     * @param actor actor consuming the golden rune
     * @return string representing the consumption of the golden rune
     */
    consume(actor: Actor): string {
        const randomRuneAmount = RandomNumberGenerator.getRandomInt(this.minRunes, this.maxRunes);
        RuneManager.getInstance().addRunes(randomRuneAmount);
        actor.removeItemFromInventory(this);
        return `${actor} consumed ${this} for ${randomRuneAmount} runes`;
    }
}