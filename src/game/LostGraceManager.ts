import { ActionList } from './../engine/actions/ActionList.js';
import { Location } from './../engine/positions/Location.js';
import { TeleportAction } from './actions/TeleportAction.js';
import { SiteOfLostGrace } from './grounds/SiteOfLostGrace.js';

/**
 * Singleton manager for activated sites of lost grace and their locations.
 */
export class LostGraceManager {
    /**
     * Container for activated sites of lost grace and where they are located
     */
    public sitesOfLostGrace: Map<SiteOfLostGrace, Location> = new Map();

    /**
     * Reference to the single instance in existence of LostGraceManager
     */
    private static instance: LostGraceManager;

    private constructor() {}

    /**
     * Add site of lost grace to list of activated sites of lost grace
     * @param siteOfLostGrace site of lost grace being added
     * @param location The location of the lost grace being added
     */
    addLostGrace(siteOfLostGrace: SiteOfLostGrace, location: Location): void {
        this.sitesOfLostGrace.set(siteOfLostGrace, location);
    }

    /**
     * Returns whether the site of lost grace has been activated or not
     * @param siteOfLostGrace
     * @return True if registered, else false
     */
    isLostGraceActivated(siteOfLostGrace: SiteOfLostGrace): boolean {
        return this.sitesOfLostGrace.has(siteOfLostGrace);
    }

    /**
     * Returns possible sites of lost grace which can be travelled to
     * @return action list containing teleport actions
     */
    possibleTeleports(siteOfLostGrace: SiteOfLostGrace): ActionList {
        const actionList = new ActionList();
        this.sitesOfLostGrace.forEach((location, site) => {
            if (siteOfLostGrace !== site) {
                actionList.add(new TeleportAction(site, location));
            }
        });
        return actionList;
    }

    /**
     * Retrieve the singleton instance of LostGraceManager
     * @return instance of LostGraceManager
     */
    public static getInstance(): LostGraceManager {
        if (!LostGraceManager.instance) {
            LostGraceManager.instance = new LostGraceManager();
        }
        return LostGraceManager.instance;
    }
}