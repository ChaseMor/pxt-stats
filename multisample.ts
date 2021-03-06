namespace stats {

    /**
     * A multi-dimensional sampling of data
     */
    export class LargeDataSet {

        /**
         * The data being sampled
         */
        private _data: DataSample[];

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
                this._data[i] = new DataSample(data[i].slice(0, minWidth));
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
                    this._data[i].addData(newData[i]);
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
                    this._data[i].concatData(newData[i]);
                }
            }
        }
        
        /**
         * Gets the data sample at the specific index
         * 
         * @param index the specified index
         * @returns the data sample at the given index
         *  undefined if the given index does not map to a index in the data
         */
        getSampleByIndex(index: number) {
            if (index >= this.getNumOfDim() || index < 0) {
                return undefined;
            } else {
                return this._data[index];
            }
        }

        /**
         * Gets the data point at the given index
         * 
         * @param index the index of the specified data point
         * @returns the data point at the specified index
         */
        getDataAtIndex(index: number): number[] {
            if (index < 0 || index >= this.length) {
                return [];
            }
            let out: number[] = [];
            for (let i = 0; i < this.getNumOfDim(); i++) {
                out.push(this._data[i].getDataAtIndex(index));
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
            if (index < 0 || index >= this.length) {
                return;
            }
            if (data.length != this.getNumOfDim()) {
                return;
            }
            for (let i = 0; i < data.length; i++) {
                this._data[i].setDataAtIndex(index, data[i]);
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
                out.push(this._data[i].mean);
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
                out.push(this._data[i].min);
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
                out.push(this._data[i].max);
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
                out.push(this._data[i].sum);
            }
            return out;
        }

        /**
         * Gets the number of dimensions that the data set stores
         * 
         * @returns the number of dimensions that the data set stores
         */
        getNumOfDim(): number {
            return this._data.length;
        }

        /**
         * Gets the sample variance of all dimensions of the data
         * 
         * @returns the sample variance of all dimensions of the data
         */
        getVariance(): number[] {
            let out: number[] = [];
            for (let i = 0; i < this.getNumOfDim(); i++) {
                out.push(this._data[i].variance);
            }
            return out;
        }

        /**
         * Gets the sample standard deviation of all dimensions of the data
         * 
         * @returns the sample standard deviation of all dimensions of the data
         */
        getStandardDeviation(): number[] {
            let out: number[] = [];
            for (let i = 0; i < this.getNumOfDim(); i++) {
                out.push(this._data[i].standardDeviation);
            }
            return out;
        }

        /**
         * Gets the population variance of all dimensions of the data
         * 
         * @returns the population variance of all dimensions of the data
         */
        getVariancePopulation(): number[] {
            let out: number[] = [];
            for (let i = 0; i < this.getNumOfDim(); i++) {
                out.push(this._data[i].variancePopulation);
            }
            return out;
        }

        /**
         * Gets the population standard deviation of all dimensions of the data
         * 
         * @returns the population standard deviation of all dimensions of the data
         */
        getStandardDeviationPopulation(): number[] {
            let out: number[] = [];
            for (let i = 0; i < this.getNumOfDim(); i++) {
                out.push(this._data[i].standardDeviationPopulation);
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
                        if (this._data[dimension].getDataAtIndex(i) > this._data[dimension].getDataAtIndex(j)) {
                            swap(this._data, i, j);
                        }
                    }
                }
            }
            function swap(data: DataSample[], i: number, j: number) {
                for (let k = 0; k < data.length; k++) {
                    let temp: number = data[k].getDataAtIndex(j);
                    data[k].setDataAtIndex(j, data[k].getDataAtIndex(i));
                    data[k].setDataAtIndex(i, temp);
                }
            }
        }

        /**
         * Gets the number of data points in the data set
         * 
         * @returns the number of data points in the data set
         */
        get length(): number {
            if (this.getNumOfDim() > 0) {
                return this._data[0].length;
            } else {
                return 0;
            }
        }
    }
}