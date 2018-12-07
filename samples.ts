namespace stats {

    /**
     * A sampling of data
     */
    export class Sample {

        /**
         * The data used
         */
        private data: number[];

        /**
         * The average value of the data
         */
        private mean: number;

        /**
         * The total sum of the data
         */
        private sum: number;

        /**
         * The standard deviation of the data
         */
        private std: number;

        /**
         * The variance of the data
         */
        private var: number;

        /**
         * @param data the data that is being sampled
         */
        constructor(data: number[]) {
            this.data = data;
        }

        /**
         * Gets the average value of the data
         * 
         * @returns the average value of the data
         */
        getMean(): number {
            if (!this.mean) {
                this.mean = this.getSum() / this.getCount();
            }
            return this.mean;
        }

        /**
         * Gets the total sum of the data
         * 
         * @returns the total sum of the data
         */
        getSum(): number {
            if (!this.sum) {
                this.sum = 0;
                for (let value of this.data) {
                    this.sum += value;
                }
            }
            return this.sum;
        }

        /**
         * Gets the number of data points in the data set
         * 
         * @returns the number of data points in the data set
         */
        getCount(): number {
            return this.data.length;
        }

        /**
         * Gets the variance of the data
         * 
         * @returns the variance of the data
         */
        getVariance(): number {
            if (!this.var) {
                this.var = 0;
                for (let value of this.data) {
                    this.var += (value - this.getMean()) ** 2;
                }
                this.var /= this.getCount();
            }
            return this.var;
        }

        /**
         * Gets the standard deviation of the data
         * 
         * @returns the standard deviation of the data
         */
        getStandardDeviation(): number {
            if (!this.std) {
                this.std = Math.sqrt(this.getVariance());
            }
            return this.std;
        }
    }
} 