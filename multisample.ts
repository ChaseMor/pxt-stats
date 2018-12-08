namespace stats {

    /**
     * A multi-dimensional sampling of data
     */
    export class MultiDimensionSample {

        /**
         * The data being sampled
         */
        private data: Sample[];

        /**
         * @param numOfDimensions
         * @param data the data that is being sampled
         */
        constructor(numOfDimensions: number, data?: number[][]) {
            if (numOfDimensions < 0) {
                numOfDimensions = 0;
            }
            if (data.length < numOfDimensions) {
                numOfDimensions = data.length;
            }
            let minWidth: number;
            for (let dataArr of data) {
                if (!minWidth || minWidth > dataArr.length) {
                    minWidth = dataArr.length;
                }
            }
            for (let i = 0; i < numOfDimensions; i++) {
                if (data) {
                    this.data[i] = new Sample(data[i].slice(0, minWidth));
                } else {
                    this.data[i] = new Sample();
                }
            }
        }

        /**
         * Add a new data point to the sample
         * 
         * @param newData the new data point to be added
         */
        addData(newData: number[]) {
            if (newData.length == this.getNumOfDim()) {
                for (let i = 0; i < this.getNumOfDim(); i++) {
                    this.data[i].addData(newData[i]);
                }
            }
        }

        /**
         * Adds an array of data points to the sample
         * 
         * @param newData the data points to be added
         */
        concatData(newData: number[][]) {
            if (newData.length == this.getNumOfDim()) {
                for (let i = 0; i < this.getNumOfDim(); i++) {
                    this.data[i].concatData(newData[i]);
                }
            }
        }

        /**
         * Sorts the data set
         */
        sort() {
            for (let i = 0; i < this.getNumOfDim(); i++) {
                this.data[i].sort();
            }
        }

        /**
         * Gets the average value of the data
         * 
         * @returns the average value of the data
         */
        getMean(): number[] {
            let out: number[] = [];
            for (let i = 0; i < this.getNumOfDim(); i++) {
                out.push(this.data[i].getMean());
            }
            return out;
        }

        /**
         * Gets the total sum of the data
         * 
         * @returns the total sum of the data
         */
        getSum(): number[] {
            let out: number[] = [];
            for (let i = 0; i < this.getNumOfDim(); i++) {
                out.push(this.data[i].getSum());
            }
            return out;
        }

        /**
         * Gets the number of dimensions that the data set stores
         * 
         * @returns the number of dimensions that the data set stores
         */
        getNumOfDim(): number {
            return this.data.length;
        }

        /**
         * Gets the variance of the data
         * 
         * @returns the variance of the data
         */
        getVariance(): number[] {
            let out: number[] = [];
            for (let i = 0; i < this.getNumOfDim(); i++) {
                out.push(this.data[i].getVariance());
            }
            return out;
        }

        /**
         * Gets the standard deviation of the data
         * 
         * @returns the standard deviation of the data
         */
        getStandardDeviation(): number[] {
            let out: number[] = [];
            for (let i = 0; i < this.getNumOfDim(); i++) {
                out.push(this.data[i].getStandardDeviation());
            }
            return out;
        }

        /**
         * Sorts the data set based on the given dimension
         */
        sortByIndex(dimension: number) {
            if (dimension < this.getNumOfDim() && dimension > 0) {
                // simple selection sort.
                for (let i = 0; i < this.getNumOfDim() - 1; i++) {
                    for (let j = i + 1; j < this.getNumOfDim(); j++) {
                        if (this.data[dimension].getDataAtIndex(i) > this.data[dimension].getDataAtIndex(j)) {
                            swap(i, j);
                        }
                    }
                }
            }
            function swap(i: number, j: number) {
                for (let k = 0; k < this.getNumOfDim(); k++) {
                    let temp: number = this.data[k].getDataAtIndex(j);
                    this.data[k].getDataAtIndex(j, this.data[k].getDataAtIndex(i));
                    this.data[k].getDataAtIndex(i, temp);
                }
            }
        }

        /**
         * Gets the average value of the data at the specific index
         * 
         * @returns the average value of the data at the specific index
         *  undefined if the given index does not map to a dimension in the sample
         */
        getMeanByIndex(index: number): number {
            if (index >= this.getNumOfDim() || index < 0) {
                return undefined;
            } else {
                return this.data[index].getMean();
            }
        }

        /**
         * Gets the total sum of the data at the specific index
         * 
         * @returns the total sum of the data at the specific index
         *  undefined if the given index does not map to a dimension in the sample
         */
        getSumByIndex(index: number): number {
            if (index >= this.getNumOfDim() || index < 0) {
                return undefined;
            } else {
                return this.data[index].getSum();
            }
        }

        /**
         * Gets the number of data points in the data set
         * 
         * @returns the number of data points in the data set
         */
        getCount(): number {
            if (this.getNumOfDim() > 0) {
                return this.data[0].getCount();
            } else {
                return 0;
            }
        }

        /**
         * Gets the variance of the data at the specific index
         * 
         * @returns the variance of the data at the specific index
         *  undefined if the given index does not map to a dimension in the sample
         */
        getVarianceByIndex(index: number): number {
            if (index >= this.getNumOfDim() || index < 0) {
                return undefined;
            } else {
                return this.data[index].getVariance();
            }
        }

        /**
         * Gets the standard deviation of the data at the specific index
         * 
         * @returns the standard deviation of the data at the specific index.
         *  undefined if the given index does not map to a dimension in the sample
         */
        getStandardDeviationByIndex(index: number): number {
            if (index >= this.getNumOfDim() || index < 0) {
                return undefined;
            } else {
                return this.data[index].getStandardDeviation();
            }
        }
    }
}