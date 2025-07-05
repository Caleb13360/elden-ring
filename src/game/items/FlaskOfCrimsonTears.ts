import { Action } from './../../engine/actions/Action.js';
import { ActionList } from './../../engine/actions/ActionList.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Item } from './../../engine/items/Item.js';
import { ResetManager } from '../reset/ResetManager.js';
import { Resettable } from '../reset/Resettable.js';
import { ConsumeAction } from '../actions/ConsumeAction.js';
import { Consumable } from './Consumable.js';

/**
 * Flask of tears item that allows the player to heal 250 health without going over max hp and has 2 uses per game reset
 * Created by: Caleb Smith
 */
export class FlaskOfCrimsonTears extends Item implements Consumable, Resettable {
    /**
     * Maximum uses the flask has
     */
    private maxUses: number = 2;
    /**
     * Current uses the flask has
     */
    private uses: number = this.maxUses;

    /**
     * Flask of crimson tears constructor
     */
    constructor() {
        super("Flask of Crimson Tears", 'f', false);
        ResetManager.getInstance().registerResettable(this);
    }

    /**
     * Gets how many current uses are left in the flask
     * @return int value for current uses left in the flask
     */
    public getUses(): number {
        return this.uses;
    }

    /**
     * Description of the flask including how many uses out of max uses the flask has
     * @return string description of the item
     */
    public toString(): string {
        return super.toString() + ` (${this.uses}/${this.maxUses})`;
    }

    /**
     * A list of allowable actions from the item, these are actions the item can perform
     * The flask adds a consume action as it is consumable
     * @return list of actions containing a consume action
     */
    public getAllowableActions(): readonly Action[] {
        const actions = new ActionList();
        actions.add(new ConsumeAction(this));
        return actions.getUnmodifiableActionList();
    }

    /**
     * Used to consume the flask, will fail to consume if there are no uses left
     * @param actor actor consuming the flask
     * @return description of the outcome of trying to consume the flask
     */
    public consume(actor: Actor): string {
        if (this.uses === 0) {
            return this + " is empty";
        } else {
            actor.heal(250);
            this.uses -= 1;
            return `${actor} consumed ${this}`;
        }
    }

    /**
     * Reset the uses back to the max uses on reset
     */
    public reset(): void {
        this.uses = this.maxUses;
    }
}