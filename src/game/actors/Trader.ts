import { Action } from './../../engine/actions/Action.js';
import { ActionList } from './../../engine/actions/ActionList.js';
import { DoNothingAction } from './../../engine/actions/DoNothingAction.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Display } from './../../engine/displays/Display.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Faction } from '../actors/enemies/Faction.js';
import { BuyAble } from '../weapons/BuyAble.js';
import { BuyAction } from '../actions/BuyAction.js';
import { Status } from '../utility/Status.js';

/**
 * Class representing a Trader in the game
 * Created by: Caleb Smith & Rvinder Sandhu
 */
export class Trader extends Actor {
    /**
     * Stock list of buyable items of the trader
     */
    private traderInventory: BuyAble[] = [];

    /**
     * Constructor for trader
     * @param name name of trader
     * @param displayChar display char of trader
     */
    constructor(name: string, displayChar: string) {
        super(name, displayChar, 1);
        this.addCapability(Status.MERCHENT);
        this.addCapability(Faction.NPC);
    }

    /**
     * Add to stock of trader
     * @param buyAble the buyable item being added to the traders stock
     */
    public addBuyAble(buyAble: BuyAble): void {
        this.traderInventory.push(buyAble);
    }

    /**
     * Return buy actions for items in stock
     * @param otherActor the Actor checking the traders actions
     * @param direction  String representing the direction of the other Actor
     * @param map        current GameMap
     * @return the action list of actions the trader allows
     */
    allowableActions(otherActor: Actor, direction: string, map: GameMap): ActionList {
        const actions = new ActionList();
        for (const item of this.traderInventory) {
            actions.add(new BuyAction(this, item));
        }
        return actions;
    }

    /**
     * plays the turn of the trader, the trader always does nothing
     * @param actions    collection of possible Actions for this Actor
     * @param lastAction The Action this Actor took last turn
     * @param map        the map containing the trader
     * @param display    the I/O object to which messages may be written
     * @return do nothing action
     */
    async playTurn(actions: ActionList, lastAction: Action, map: GameMap, display: Display): Promise<Action> {
        return new DoNothingAction();
    }
}