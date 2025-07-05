import { Action } from './../../engine/actions/Action.js';
import { ActionList } from './../../engine/actions/ActionList.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Ground } from './../../engine/positions/Ground.js';
import { Location } from './../../engine/positions/Location.js';
import { LostGraceManager } from '../LostGraceManager.js';
import { RestAction } from '../actions/RestAction.js';
import { UpgradeHpAction } from '../actions/UpgradeHpAction.js';
import { VisitAction } from '../actions/VisitAction.js';
import { Status } from '../utility/Status.js';
import { UpgradeManager } from '../utility/UpgradeManager.js';

/**
 * Class representing Site of Lost Grace ground type
 */
export class SiteOfLostGrace extends Ground {
    /**
     * Name of the site of lost grace
     */
    private name: string;

    /**
     * Constructor for site of lost grace
     * @param name name of site of lost grace
     */
    constructor(name: string) {
        super('U');
        this.name = name;
    }

    allowableActions(actor: Actor, location: Location, direction: string): ActionList {
        const actionList = new ActionList();
        if (actor.hasCapability(Status.HOSTILE_TO_ENEMY)) {
            // Add any actions from the parent class
            const parentActions = super.allowableActions(actor, location, direction);
            for (const action of parentActions.getUnmodifiableActionList()) {
                actionList.add(action);
            }
            if (LostGraceManager.getInstance().isLostGraceActivated(this)) {
                actionList.add(new RestAction(this, location));
                // possibleTeleports returns an ActionList, so add all actions from it
                const teleports = LostGraceManager.getInstance().possibleTeleports(this);
                for (const action of teleports.getUnmodifiableActionList()) {
                    actionList.add(action);
                }
                actionList.add(new UpgradeHpAction(48, UpgradeManager.getInstance().getCost()));
                return actionList;
            }
            actionList.add(new VisitAction(this, location));
        }
        return actionList;
    }

    toString(): string {
        return this.name;
    }
}