import { SpawnFactory } from './SpawnFactory.js';
import { Canine } from '../actors/enemies/Canine.js';
import { Crustacean } from '../actors/enemies/Crustacean.js';
import { GiantDog } from '../actors/enemies/GiantDog.js';
import { GiantKrayFish } from '../actors/enemies/GiantKrayFish.js';
import { Humanoid } from '../actors/enemies/Humanoid.js';
import { SkeletalBandit } from '../actors/enemies/SkeletalBandit.js';
import { Skeleton } from '../actors/enemies/Skeleton.js';
import { RandomNumberGenerator } from '../utility/RandomNumberGenerator.js';

/**
 * Concrete class for eastern enemy spawning fields in Limgrave
 * Author: Rvinder Sandhu
 */
export class EastFactory implements SpawnFactory {
    createCanine(): Canine | null {
        if (RandomNumberGenerator.getRandomInt(0, 100) > 96) {
            return new GiantDog();
        } else {
            return null;
        }
    }

    createCrustacean(): Crustacean | null {
        if (RandomNumberGenerator.getRandomInt(0, 100) > 99) {
            return new GiantKrayFish();
        } else {
            return null;
        }
    }

    createSkeleton(): Skeleton | null {
        if (RandomNumberGenerator.getRandomInt(0, 100) > 27) {
            return new SkeletalBandit();
        } else {
            return null;
        }
    }

    createHumanoid(): Humanoid | null {
        return null;
    }
}