import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Location } from './../../engine/positions/Location.js';
import { ResetManager } from '../reset/ResetManager.js';
import { SiteOfLostGrace } from '../grounds/SiteOfLostGrace.js';
import { ResetAction } from './ResetAction.js';

/**
 * Class representing the action for resting at a site of lost grace
 */
export class RestAction extends Action {
    /**
     * Location of the grace
     */
    private graceLocation: Location;
    /**
     * Site of lost grace
     */
    private siteOfLostGrace: SiteOfLostGrace;

    /**
     * Constructor for rest action
     * @param siteOfLostGrace site of lost grace
     * @param graceLocation location of lost grace
     */
    constructor(siteOfLostGrace: SiteOfLostGrace, graceLocation: Location) {
        super();
        this.graceLocation = graceLocation;
        this.siteOfLostGrace = siteOfLostGrace;
    }

    /**
     * Executes the rest action, setting the last player grace and triggering a reset
     * @param actor the actor performing the action
     * @param map the game map
     * @returns a string describing the result of the action
     */
    execute(actor: Actor, map: GameMap): string {
        ResetManager.getInstance().setLastPlayerGrace(this.graceLocation);
        return new ResetAction().execute(actor, map);
    }

    /**
     * Returns the menu description for this action
     * @param actor the actor performing the action
     * @returns a string for the menu
     */
    menuDescription(actor: Actor): string {
        return `Rest at ${this.siteOfLostGrace}`;
    }
}