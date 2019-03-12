namespace stats {

    /**
     * A sampling of data
     */
    export class DataSample {

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
         * The standard deviation of the data (sample)
         */
        private std: number;

        /**
         * The variance of the data (sample)
         */
        private var: number;

        /**
         * The population standard deviation of the data
         */
        private stdPop: number;

        /**
         * The population variance of the data
         */
        private varPop: number;

        /**
         * The smallest value in the data
         */
        private min: number;

        /**
         * The largest value in the data
         */
        private max: number;

        /**
         * @param data the data that is being sampled
         */
        constructor(data?: number[]) {
            if (!data) {
                this.data = [];
            } else {
                this.data = data;
            }
        }

        /**
         * Add a new data point to the sample
         * 
         * @param newData the new data point to be added
         */
        addData(newData: number) {
            this.data.push(newData);
            this.clearProperties();
        }

        /**
         * Adds an array of data points to the sample
         * 
         * @param newData the data points to be added
         */
        concatData(newData: number[]) {
            for (let value of newData) {
                this.data.push(value);
            }
            this.clearProperties();
        }

        /**
         * Clears all pre-computed values
         */
        private clearProperties() {
            this.mean = undefined;
            this.sum = undefined;
            this.std = undefined;
            this.var = undefined;
            this.stdPop = undefined;
            this.varPop = undefined;
            this.min = undefined;
            this.max = undefined;
        }

        /**
         * Sorts the data set
         */
        sort() {
            // simple selection sort.
            for (let i = 0; i < this.length - 1; ++i) {
                for (let j = i + 1; j < this.length; ++j) {
                    if (arr[i] > arr[j]) {
                        let temp: number = this.data[i];
                        this.data[i] = this.data[j];
                        this.data[j] = temp;
                    }
                }
            }
        }
        
        /**
         * Gets a copy of data of the sample
         * @returns a copy of the data
         */
        getData() {
            let out: number[] = [];
            for (let n of this.data) {
                out.push(n);
            }
            return out;
        }

        /**
         * Gets the data value at the specific index
         * 
         * @param index the index of the data
         * @returns the data value at the specific index
         */
        getDataAtIndex(index: number) : number{
            if (index >= this.length || index < 0) {
                return undefined;
            } else {
                return this.data[index];
            }
        }

        /**
         * Sets the data value at the specific index
         *
         * @param index value the data value at the specific index
         * @param data the data to be set at the specifc index
         */
        setDataAtIndex(index: number, data: number) {
            if (index >= this.length || index < 0) {
                return;
            }
            this.data[index] = data;
            this.clearProperties();
        }

        /**
         * Gets the average value of the data
         * 
         * @returns the average value of the data
         */
        getMean(): number {
            if (!this.mean) {
                this.mean = this.getSum() / this.length;
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
        get length(): number {
            return this.data.length;
        }

        /**
         * Gets the sample variance of the data 
         * 
         * @returns the sample variance of the data 
         */
        getVariance(): number {
            if (!this.var) {
                this.var = 0;
                for (let value of this.data) {
                    this.var += (value - this.getMean()) ** 2;
                }
                this.var /= (this.length - 1);
            }
            return this.var;
        }

        /**
         * Gets the sample standard deviation of the data
         * 
         * @returns the sample standard deviation of the data
         */
        getStandardDeviation(): number {
            if (!this.std) {
                this.std = Math.sqrt(this.getVariance());
            }
            return this.std;
        }

        /**
         * Gets the population variance of the data
         * 
         * @returns the population variance of the data
         */
        getVariancePopulation(): number {
            if (!this.varPop) {
                this.varPop = 0;
                for (let value of this.data) {
                    this.varPop += (value - this.getMean()) ** 2;
                }
                this.varPop /= this.length;
            }
            return this.varPop;
        }

        /**
         * Gets the population standard deviation of the data
         * 
         * @returns the population standard deviation of the data
         */
        getStandardDeviationPopulation(): number {
            if (!this.stdPop) {
                this.stdPop = Math.sqrt(this.getVariancePopulation());
            }
            return this.stdPop;
        }

        /**
         * Gets smallest value in the data
         * 
         * @returns the smallest value in the data
         */
        getMin(): number {
            if (!this.min) {
                this.calculateMinMax();
            }
            return this.min;
        }

        /**
         * Gets the largest value in the data
         * 
         * @returns the largest value in the data
         */
        getMax(): number {
            if (!this.max) {
                this.calculateMinMax();
            }
            return this.max;
        }

        /**
         * Calculates the min and max values of the data
         */
        private calculateMinMax() {
            if (this.data.length == 0) {
                return;
            }
            let min: number = this.data[0];
            let max: number = this.data[0];

            for (let i = 1; i < this.data.length; i++) {
                if (this.data[i] < min) {
                    min = this.data[i];
                }
                if (this.data[i] > max) {
                    max = this.data[i];
                }
            }
            this.min = min;
            this.max = max;
        }
    }
}