import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Location } from './../../engine/positions/Location.js';
import { SiteOfLostGrace } from '../grounds/SiteOfLostGrace.js';

/**
 * Class representing the action of fast travelling to another site of lost grace
 */
export class TeleportAction extends Action {
    /**
     * Site of lost grace to travel to
     */
    private lostGrace: SiteOfLostGrace;
    /**
     * Location of lost grace
     */
    private location: Location;

    /**
     * Constructor for the Teleport action
     * @param siteOfLostGrace site of lost grace to teleport to
     * @param location location of the site of lost grace
     */
    constructor(siteOfLostGrace: SiteOfLostGrace, location: Location) {
        super();
        this.lostGrace = siteOfLostGrace;
        this.location = location;
    }

    /**
     * Executes the teleport action
     * @param actor the actor performing the action
     * @param map the game map
     * @returns a string describing the result of the action
     */
    execute(actor: Actor, map: GameMap): string {
        map.moveActor(actor, this.location);
        return `${actor} has teleported to ${this.lostGrace}`;
    }

    /**
     * Returns the menu description for this action
     * @param actor the actor performing the action
     * @returns a string for the menu
     */
    menuDescription(actor: Actor): string {
        return `${actor} teleports to ${this.lostGrace}`;
    }
}