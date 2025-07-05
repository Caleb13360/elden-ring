import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Location } from './../../engine/positions/Location.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { AttackAction } from './AttackAction.js';
import { Faction } from '../actors/enemies/Faction.js';

/**
 * An Action to perform the gravity arrow action which shoots an arrow which travels until it reaches a non-passable
 * object or the end of the map, damaging every enemy it passes through
 * Created by: Caleb Smith
 */
export class GravityArrowAction extends Action {
    private weapon: WeaponItem;
    private target: Actor;
    private direction: string;

    /**
     * Gravity arrow constructor
     * @param weapon weapon using the skill
     * @param target actor getting hit by the skill initially
     * @param direction direction the skill is being performed in
     */
    constructor(weapon: WeaponItem, target: Actor, direction: string) {
        super();
        this.weapon = weapon;
        this.target = target;
        this.direction = direction;
    }

    /**
     * Complete the gravity arrow action by sending an attack in a given direction until the ground blocks thrown objects
     * or reaches the edge of the map
     * @param actor The actor performing the skill
     * @param map The map the actor is on.
     * @returns description of the execution of the skill
     */
    execute(actor: Actor, map: GameMap): string {
        let results = `${actor} shoots a gravity arrow ${this.direction}`;
        const here = map.locationOf(actor);
        const there = map.locationOf(this.target);
        const xDif = there.xCoord() - here.xCoord();
        const yDif = there.yCoord() - here.yCoord();
        let currentX = here.xCoord();
        let currentY = here.yCoord();
        let flying = true;

        while (flying) {
            currentX += xDif;
            currentY += yDif;
            if (map.getXRange().contains(currentX) && map.getYRange().contains(currentY)) {
                const newLocation = map.at(currentX, currentY);
                if (newLocation.containsAnActor()) {
                    const targetActor = newLocation.getActor();
                    if (!targetActor.hasCapability(Faction.NPC)) {
                        results += "\n";
                        results += new AttackAction(targetActor, "from a distance", this.weapon).execute(actor, map);
                    }
                }
                if (newLocation.getGround().blocksThrownObjects()) {
                    flying = false;
                }
            } else {
                flying = false;
            }
        }
        return results;
    }

    /**
     * Describes which actor is performing the skill
     * @param actor The actor performing the skill
     * @returns a description used for the menu UI
     */
    menuDescription(actor: Actor): string {
        return `${actor} fires a gravity arrow ${this.direction}`;
    }
}