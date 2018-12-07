namespace stats {

    /**
     * Defines the usage of a Distribution
     */
    interface Distribution {

        /**
         * Generates a random number
         */
        generateRandom(): number;

        /**
         * Gets the mean value of the distribution
         */
        mean(): number;

        /**
         * Gets the standard deviation of the distribution
         */
        standardDeviation(): number;

        /**
         * Gets the variance of the distribution
         */
        variance(): number;
    }

    /**
     * A Distribution that generates numbers based on a normal distribution
     */
    export class NormalDistribution implements Distribution {
        
        /**
         * The mean (or average) value of the distribution
         */
        private avg: number;

        /**
         * The standard deviation of the distribution
         */
        private std: number;


        /**
         * The next value to be returned
         */
        private nextGauss: number;

        /**
         * Creates a new Normal Distribution number generator with the given properties
         * 
         * @param mean the mean value of the distribution
         * @param std the standard deviation of the distribution
        */
        constructor(mean: number, std: number) {
            this.avg = mean;
            this.std = std;
            this.nextGauss = undefined;
        }
        /**
         * Gets a random number generated using a specified given normal (Gaussian) distribution
         * 
         * @returns a random number generated with the probability denisity of a normal distribution
         */
        generateRandom(): number {
            if (this.nextGauss) {
                const out: number = this.nextGauss;
                this.nextGauss = undefined;
                return out;
            }
            // Uses a Box-Muller Transform to generate a normally distributed sampling
            let v1: number = Math.random();
            let v2: number = Math.random();
            this.nextGauss = this.std * (Math.sqrt(-2 * Math.log(v1)) * Math.cos(2 * Math.PI * v2)) + this.avg;
            return this.std * (Math.sqrt(-2 * Math.log(v2)) * Math.cos(2 * Math.PI * v1)) + this.avg;
        }
        
        /**
         * Gets the mean value of the distribution
         * 
         * @returns the mean value of the distribution
         */
        mean(): number {
            return this.avg;
        }

        /**
         * Gets the standard deviation of the distribution
         * 
         * @returns the standard deviation of the distribution
         */
        standardDeviation(): number {
            return this.std;
        }
        
        /**
         * Gets the variance of the distribution
         * 
         * @returns the variance of the distribution
         */
        variance(): number {
            return this.std * this.std;
        }
    }
}