namespace stats {

    /**
     * A sampling of data
     */
    export class DataSample {

        /**
         * The data used
         */
        private _data: number[];

        /**
         * The average value of the data
         */
        private _mean: number;

        /**
         * The median value of the data
         */
        private _median: number;

        /**
         * The total sum of the data
         */
        private _sum: number;

        /**
         * The standard deviation of the data (sample)
         */
        private _std: number;

        /**
         * The variance of the data (sample)
         */
        private _var: number;

        /**
         * The population standard deviation of the data
         */
        private _stdPop: number;

        /**
         * The population variance of the data
         */
        private _varPop: number;

        /**
         * The smallest value in the data
         */
        private _min: number;

        /**
         * The largest value in the data
         */
        private _max: number;

        /**
         * Whether or not the sample is sorted
         */
        private _isSorted: boolean;

        /**
         * @param data the data that is being sampled
         */
        constructor(data?: number[]) {
            if (!data) {
                this._data = [];
            } else {
                this._data = data;
            }
        }

        /**
         * Add a new data point to the sample
         * 
         * @param newData the new data point to be added
         */
        addData(newData: number) {
            this._data.push(newData);
            this.clearProperties();
        }

        /**
         * Adds an array of data points to the sample
         * 
         * @param newData the data points to be added
         */
        concatData(newData: number[]) {
            for (let value of newData) {
                this._data.push(value);
            }
            this.clearProperties();
        }

        /**
         * Clears all pre-computed values
         */
        private clearProperties() {
            this._mean = undefined;
            this._median = undefined;
            this._sum = undefined;
            this._std = undefined;
            this._var = undefined;
            this._stdPop = undefined;
            this._varPop = undefined;
            this._min = undefined;
            this._max = undefined;
            this._isSorted = undefined;
        }

        /**
         * Sorts the data set
         */
        sort() {
            // simple selection sort.
            for (let i = 0; i < this.length - 1; ++i) {
                for (let j = i + 1; j < this.length; ++j) {
                    if (this._data[i] > this._data[j]) {
                        let temp: number = this._data[i];
                        this._data[i] = this._data[j];
                        this._data[j] = temp;
                    }
                }
            }
            this._isSorted = true;
        }

        /**
         * Determines whether or not the the data sample is sorted
         * @returns Whether or not the data sample is sorted
         */
        isSorted() {
            if (this._isSorted == undefined) {
                if (this.length == 0) {
                    this._isSorted;
                } else {
                    let prev: number = this._data[0];
                    for (let i = 1; i < this._data.length; i++) {
                        if (this._data[i] < prev) {
                            this._isSorted = false;
                            break;
                        }
                        prev = this._data[i];
                    }
                    this._isSorted = true;
                }
            }
            return this._isSorted;
        }
        
        /**
         * Gets a copy of data of the sample
         * @returns a copy of the data
         */
        getData() {
            let out: number[] = [];
            for (let n of this._data) {
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
                return this._data[index];
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
            this._data[index] = data;
            this.clearProperties();
        }

        /**
         * Gets the average value of the data
         * 
         * @returns the average value of the data
         */
        get mean(): number {
            if (!this._mean) {
                this._mean = this.sum / this.length;
            }
            return this._mean;
        }

        /**
         * Gets the median value of the data
         * 
         * @returns the median value of the data
         */
        get median(): number {
            if (!this._median) {
                if (this._isSorted) {
                    if (this.length % 2 == 0) {
                        let left = this._data[(this.length / 2) - 1];
                        let right = this._data[(this.length / 2)];
                        this._median = (left + right) / 2;
                    } else {
                        this._median = this._data[(this.length - 1) / 2];
                    }
                } else {
                    let temp: DataSample = new DataSample(this.getData());
                    temp.sort();
                    this._median = temp.median;
                }
            }
            return this._median;
        }

        /**
         * Gets the total sum of the data
         * 
         * @returns the total sum of the data
         */
        get sum(): number {
            if (!this._sum) {
                this._sum = 0;
                for (let value of this._data) {
                    this._sum += value;
                }
            }
            return this._sum;
        }

        /**
         * Gets the number of data points in the data set
         * 
         * @returns the number of data points in the data set
         */
        get length(): number {
            return this._data.length;
        }

        /**
         * Gets the sample variance of the data 
         * 
         * @returns the sample variance of the data 
         */
        get variance(): number {
            if (!this._var) {
                this._var = 0;
                for (let value of this._data) {
                    this._var += (value - this.mean) ** 2;
                }
                this._var /= (this.length - 1);
            }
            return this._var;
        }

        /**
         * Gets the sample standard deviation of the data
         * 
         * @returns the sample standard deviation of the data
         */
        get standardDeviation(): number {
            if (!this._std) {
                this._std = Math.sqrt(this.variance);
            }
            return this._std;
        }

        /**
         * Gets the population variance of the data
         * 
         * @returns the population variance of the data
         */
        get variancePopulation(): number {
            if (!this._varPop) {
                this._varPop = 0;
                for (let value of this._data) {
                    this._varPop += (value - this.mean) ** 2;
                }
                this._varPop /= this.length;
            }
            return this._varPop;
        }

        /**
         * Gets the population standard deviation of the data
         * 
         * @returns the population standard deviation of the data
         */
        get standardDeviationPopulation(): number {
            if (!this._stdPop) {
                this._stdPop = Math.sqrt(this.variancePopulation);
            }
            return this._stdPop;
        }

        /**
         * Gets smallest value in the data
         * 
         * @returns the smallest value in the data
         */
        get min(): number {
            if (!this._min) {
                this.calculateMinMax();
            }
            return this._min;
        }

        /**
         * Gets the largest value in the data
         * 
         * @returns the largest value in the data
         */
        get max(): number {
            if (!this._max) {
                this.calculateMinMax();
            }
            return this._max;
        }

        /**
         * Calculates the min and max values of the data
         */
        private calculateMinMax() {
            if (this._data.length == 0) {
                return;
            }
            let min: number = this._data[0];
            let max: number = this._data[0];

            for (let i = 1; i < this._data.length; i++) {
                if (this._data[i] < min) {
                    min = this._data[i];
                }
                if (this._data[i] > max) {
                    max = this._data[i];
                }
            }
            this._min = min;
            this._max = max;
        }
    }
}