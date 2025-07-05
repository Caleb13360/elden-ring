import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Behaviour } from './Behaviour.js';
import { RandomNumberGenerator } from '../utility/RandomNumberGenerator.js';
import { Util } from '../utility/Util.js';
import { AOEAttackAction } from '../actions/AOEAttackAction.js';

/**
 * Class that implements the behaviour for an enemy that can carry out an AOE attack
 * with their intrinsic weapon
 * Created by: Rvinder Sandhu
 */
export class AOEIntrinsicAttackBehaviour implements Behaviour {
    /**
     * Gets the intrinsic AOE attack action if a valid target is found
     * @param actor the Actor performing the intrinsic aoe attack
     * @param map the GameMap containing the Actor performing the attack
     * @return the intrinsic aoe attack action or null
     */
    getAction(actor: Actor, map: GameMap): Action | null {
        for (const exit of map.locationOf(actor).getExits()) {
            const destination = exit.getDestination();
            if (destination.containsAnActor()) {
                const target = map.getActorAt(destination);
                if(target){
                    const commonAllegiance = Util.checkCommonAllegiance(actor, target);
                    if (!commonAllegiance && RandomNumberGenerator.getRandomInt(100) > 50) {
                        return new AOEAttackAction();
                    }
                }
            }
        }
        return null;
    }
}