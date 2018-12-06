namespace stats {
    /**
     * Gets a random number generated using a specified given normal (Gaussian) distribution
     * @param mean the mean value of the distribution
     * @param std the standard deviation of the distribution
     * @returns a random number generated with the probability denisity of a normal distribution
     */
    export function randomNorm(mean: number, std: number): number {
        // Uses a Box-Muller Transform to generate a normally distributed sampling
        let s = 0;
        let v1: number = Math.random();
        let v2: number = Math.random();
        return std * (Math.sqrt(-2 * Math.log(v2)) * Math.cos(2 * Math.PI * v1)) + mean;
    }
}