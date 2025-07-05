import { Skeleton } from '../actors/enemies/Skeleton.js';
import { Canine } from '../actors/enemies/Canine.js';
import { Crustacean } from '../actors/enemies/Crustacean.js';
import { Humanoid } from '../actors/enemies/Humanoid.js';

/**
 * Interface which shows what a Spawn Factory needs to be able to do
 * Author: Rvinder Sandhu
 */
export interface SpawnFactory {
    /**
     * Create a skeleton type enemy
     * @return Skeleton or null
     */
    createSkeleton(): Skeleton | null;

    /**
     * Create a canine type enemy
     * @return Canine or null
     */
    createCanine(): Canine | null;

    /**
     * Create a crustacean type enemy
     * @return Crustacean or null
     */
    createCrustacean(): Crustacean | null;

    /**
     * Create a humanoid type enemy
     * @return Humanoid or null
     */
    createHumanoid(): Humanoid | null;
}