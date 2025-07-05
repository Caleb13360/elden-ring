import { Ground } from './Ground.js';

/**
 * Interface for factory classes used by GameMap to create new map locations.
 */
export interface GroundFactory {
    newGround(displayChar: string): Ground;
}