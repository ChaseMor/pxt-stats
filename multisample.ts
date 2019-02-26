namespace stats {

    /**
     * A multi-dimensional sampling of data
     */
    export class LargeDataSet {

        /**
         * The data being sampled
         */
        private data: DataSample[];

        /**
         * @param numOfDimensions
         * @param data the data that is being sampled
         */
        constructor(data: number[][]) {
            if (!data) {
                return;
            }
            // In case of dimensions having different lengths, use the shortest
            let minWidth: number;
            for (let dataArr of data) {
                if (!minWidth || minWidth > dataArr.length) {
                    minWidth = dataArr.length;
                }
            }

            for (let i = 0; i < data.length; i++) {
                this.data[i] = new DataSample(data[i].slice(0, minWidth));
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
         * Gets the data point at the given index
         * 
         * @param index the index of the specified data point
         * @returns the data point at the specified index
         */
        getDataAtIndex(index: number): number[] {
            if (index < 0 || index >= this.length()) {
                return [];
            }
            let out: number[] = [];
            for (let i = 0; i < this.getNumOfDim(); i++) {
                out.push(this.data[i].getDataAtIndex(index));
            }
            return out;
        }

        /**
         * Sets the data point at the given index with the given values
         * 
         * @param index the index of the specified data point
         * @param data the new data point should be changed to
         */
        setDataAtIndex(index: number, data: number[]) {
            if (index < 0 || index >= this.length()) {
                return;
            }
            if (data.length != this.getNumOfDim()) {
                return;
            }
            for (let i = 0; i < data.length; i++) {
                this.data[i].setDataAtIndex(index, data[i]);
            }
        }

        /**
         * Gets the average value of the data
         * 
         * @returns the average value of all dimensions of the data
         */
        getMean(): number[] {
            let out: number[] = [];
            for (let i = 0; i < this.getNumOfDim(); i++) {
                out.push(this.data[i].getMean());
            }
            return out;
        }

        /**
         * Gets the min values of the data
         * 
         * @returns the min values of all dimensions of the data
         */
        getMin(): number[] {
            let out: number[] = [];
            for (let i = 0; i < this.getNumOfDim(); i++) {
                out.push(this.data[i].getMin());
            }
            return out;
        }

        /**
         * Gets the max values of the data
         * 
         * @returns the max values of all dimensions of the data
         */
        getMax(): number[] {
            let out: number[] = [];
            for (let i = 0; i < this.getNumOfDim(); i++) {
                out.push(this.data[i].getMax());
            }
            return out;
        }

        /**
         * Gets the total sum of all dimensions of the data
         * 
         * @returns the total sum of all dimensions of the data
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
         * Gets the variance of all dimensions of the data
         * 
         * @returns the variance of all dimensions of the data
         */
        getVariance(): number[] {
            let out: number[] = [];
            for (let i = 0; i < this.getNumOfDim(); i++) {
                out.push(this.data[i].getVariance());
            }
            return out;
        }

        /**
         * Gets the standard deviation of all dimensions of the data
         * 
         * @returns the standard deviation of all dimensions of the data
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
         * 
         * @param dimension the specified dimension that is the basis of the sort
         */
        sortByDim(dimension: number) {
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
         * Gets the average value of the data at the specific dimension
         * 
         * @param dimension the specified dimension
         * @returns the average value of the data at the specific dimension
         *  undefined if the given dimension does not map to a dimension in the sample
         */
        getMeanByDim(dimension: number): number {
            if (dimension >= this.getNumOfDim() || dimension < 0) {
                return undefined;
            } else {
                return this.data[dimension].getMean();
            }
        }

        /**
         * Gets the min value of the data at the specific dimension
         * 
         * @param dimension the specified dimension
         * @returns the min value of the data at the specific dimension
         *  undefined if the given dimension does not map to a dimension in the sample
         */
        getMinByDim(dimension: number): number {
            if (dimension >= this.getNumOfDim() || dimension < 0) {
                return undefined;
            } else {
                return this.data[dimension].getMin();
            }
        }

        /**
         * Gets the max value of the data at the specific dimension
         * 
         * @param dimension the specified dimension
         * @returns the max value of the data at the specific dimension
         *  undefined if the given dimension does not map to a dimension in the sample
         */
        getMaxByDim(dimension: number): number {
            if (dimension >= this.getNumOfDim() || dimension < 0) {
                return undefined;
            } else {
                return this.data[dimension].getMax();
            }
        }

        /**
         * Gets the total sum of the data at the specific dimension
         *
         * @param dimension the specified dimension
         * @returns the total sum of the data at the specific dimension
         *  undefined if the given dimension does not map to a dimension in the sample
         */
        getSumByDim(dimension: number): number {
            if (dimension >= this.getNumOfDim() || dimension < 0) {
                return undefined;
            } else {
                return this.data[dimension].getSum();
            }
        }

        /**
         * Gets the number of data points in the data set
         * 
         * @returns the number of data points in the data set
         */
        length(): number {
            if (this.getNumOfDim() > 0) {
                return this.data[0].getCount();
            } else {
                return 0;
            }
        }

        /**
         * Gets the variance of the data at the specific index
         * 
         * @param dimension
         * @returns the variance of the data at the specific index
         *  undefined if the given index does not map to a dimension in the sample
         */
        getVarianceByDim(dimension: number): number {
            if (dimension >= this.getNumOfDim() || dimension < 0) {
                return undefined;
            } else {
                return this.data[dimension].getVariance();
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