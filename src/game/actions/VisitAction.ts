import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Location } from './../../engine/positions/Location.js';
import { LostGraceManager } from '../LostGraceManager.js';
import { SiteOfLostGrace } from '../grounds/SiteOfLostGrace.js';
import { FancyMessage } from '../utility/FancyMessage.js';

/**
 * Class for the action where you visit a Site of Lost Grace for the first time
 */
export class VisitAction extends Action {
    /**
     * Location of the site of lost grace
     */
    private graceLocation: Location;
    /**
     * Site of lost grace
     */
    private siteOfLostGrace: SiteOfLostGrace;

    /**
     * Constructor for Visit action
     * @param siteOfLostGrace site of lost grace
     * @param graceLocation location of site of lost grace
     */
    constructor(siteOfLostGrace: SiteOfLostGrace, graceLocation: Location) {
        super();
        this.graceLocation = graceLocation;
        this.siteOfLostGrace = siteOfLostGrace;
    }

    /**
     * Executes the visit action
     * @param actor the actor performing the action
     * @param map the game map
     * @returns a string describing the result of the action
     */
    execute(actor: Actor, map: GameMap): string {
        LostGraceManager.getInstance().addLostGrace(this.siteOfLostGrace, this.graceLocation);
        FancyMessage.fancyPrint(FancyMessage.LOST_SITE_ACTIVATED);
        return `${actor} touches the Site Of Lost Grace `;
    }

    /**
     * Returns the menu description for this action
     * @param actor the actor performing the action
     * @returns a string for the menu
     */
    menuDescription(actor: Actor): string {
        return `${actor} touches the ${this.siteOfLostGrace} site of lost grace`;
    }
}