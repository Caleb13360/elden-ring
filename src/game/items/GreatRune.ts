import { Action } from './../../engine/actions/Action.js';
import { ActionList } from './../../engine/actions/ActionList.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Item } from './../../engine/items/Item.js';
import { Location } from './../../engine/positions/Location.js';
import { ConsumeAction } from '../actions/ConsumeAction.js';
import { Consumable } from './Consumable.js';

/**
 * A great rune that can be consumed to apply a hp increase
 * Created by: Caleb Smith
 */
export class GreatRune extends Item implements Consumable {
    /**
     * bool showing if the great rune is in an inventory
     */
    private inInventory: boolean = false;
    /**
     * amount of hp to increase by
     */
    private hpIncrease: number;

    constructor(name: string, hpIncrease: number) {
        super(name, 'g', true);
        this.hpIncrease = hpIncrease;
    }

    /**
     * allows the great rune to show consume action if it is being held in the inventory
     * @return a consume action if the great rune is in the inventory
     */
    getAllowableActions(): readonly Action[] {
        const actions = new ActionList();
        if (this.inInventory) {
            actions.add(new ConsumeAction(this));
        }
        return actions.getUnmodifiableActionList();
    }

    /**
     * allows the great rune to tick within an inventory, showing it is being carried
     * @param currentLocation The location of the actor carrying this Item.
     * @param actor The actor carrying this Item.
     */
    tick(currentLocation: Location, actor?: Actor): void {
        this.inInventory = !!actor;
    }

    /**
     * allows for the consumption of the great rune
     * @param actor actor consuming the great rune
     * @return a string description of consuming the great rune
     */
    consume(actor: Actor): string {
        actor.increaseMaxHp(this.hpIncrease);
        actor.removeItemFromInventory(this);
        return `${actor} consumed ${this} to increase max hit points by ${this.hpIncrease}`;
    }
}