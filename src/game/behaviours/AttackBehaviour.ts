import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Exit } from './../../engine/positions/Exit.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { RandomNumberGenerator } from '../utility/RandomNumberGenerator.js';
import { Status } from '../utility/Status.js';
import { Util } from '../utility/Util.js';
import { AttackAction } from '../actions/AttackAction.js';
import { Behaviour } from './Behaviour.js';
import { DoNothingAction } from '../../engine/actions/DoNothingAction.js';

/**
 * Class that implements the behaviour for an enemy to attack
 * Created by: Rvinder Sandhu
 */
export class AttackBehaviour implements Behaviour {
    /**
     * Used to get the action from the attack behaviour
     * @param actor the Actor that has the attack behaviour
     * @param map the GameMap containing the Actor with the behaviour
     * @return an attack action from the behaviour
     */
    getAction(actor: Actor, map: GameMap): Action | null {
        let weapon: WeaponItem | null = null;
        const actions: Action[] = [];

        if (actor.getWeaponInventory().length >= 1) {
            weapon = actor.getWeaponInventory()[0];
            if (weapon.hasCapability(Status.RANGED)) {
                const rangedAttacks = Util.getRangedAttacks(map.locationOf(actor), weapon, actor);
                for (const action of rangedAttacks) {
                    actions.push(action);
                }
            }
        }

        for (const exit of map.locationOf(actor).getExits()) {
            const destination = exit.getDestination();
            if (destination.containsAnActor()) {
                const target = map.getActorAt(destination);
                if(target) {
                    const commonAllegiance = Util.checkCommonAllegiance(actor, target);
                    if (!commonAllegiance) {
                        if (weapon !== null) {
                            actions.push(this.attackWithWeapon(target, exit.getName(), weapon));
                        } else {
                            actions.push(new AttackAction(target, exit.getName()));
                        }
                    }
                }
                
            }
        }

        if (actions.length > 0) {
            return actions[RandomNumberGenerator.getRandomInt(actions.length)];
        } else {
            return null;
        }
    }

    /**
     * The attack action from the behaviour when the attacking actor has a weapon
     * @param target the actor being attacked
     * @param direction the direction the actor being attacked is from the actor attacking
     * @param weapon the weapon being used to attack
     * @return the attack action using the weapon
     */
    private attackWithWeapon(target: Actor, direction: string, weapon: WeaponItem): Action {
        const basicAttack = new AttackAction(target, direction, weapon);
        if (RandomNumberGenerator.getRandomInt(100) > 50) {
            return basicAttack;
        } else {
            const skill = (typeof (weapon as any).getSkill === "function")
            ? (weapon as any).getSkill(target, direction)
            : DoNothingAction;
            // If the skill's hotkey is not "5", use the skill, else use basic attack
            return (typeof skill.hotkey === "function" && skill.hotkey() !== "5") ? skill : basicAttack;
        }
    }
}