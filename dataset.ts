namespace stats {

    /**
     * A 2-dimensional sampling of data
     */
    export class DataSet {

        /**
         * The x values of the data set
         */
        private x: DataSample;

        /**
         * The y values of the data set
         */
        private y: DataSample;

        /**
         * @param xValues the x values of the data
         * @param yValues the y values of the data
         */
        constructor(xValues: number[], yValues: number[]) {
            if (!xValues || !yValues) {
                return;
            }

            // In case of dimensions having different lengths, use the shortest
            let minWidth: number = Math.min(xValues.length, yValues.length);

            this.x = new DataSample(xValues.slice(0, minWidth));
            this.y = new DataSample(yValues.slice(0, minWidth));
        }

        /**
         * Add a new data point to the sample
         *
         * @param xValue the x value of the new data point to be added
         * @param yValue the y value of the new data point to be added
         */
        addDataPoint(xValue: number, yValue: number) {
            this.x.addData(xValue);
            this.y.addData(yValue);
        }

        /**
         * Concatenates the data from arrays
         *
         * @param xData the x values of the data being added
         * @param yData the y values of the data being added
         */
        concatData(xValues: number[], yValues: number[]) {
            if (!xValues || !yValues) {
                return;
            }

            // In case of dimensions having different lengths, use the shortest
            let minWidth: number = Math.min(xValues.length, yValues.length);

            this.x.concatData(xValues.slice(0, minWidth));
            this.y.concatData(yValues.slice(0, minWidth));
        }

        /**
         * Sorts the DataSet
         * @param sortByY whether or not the DataSet should be sorted by the y values
         */
        sort(sortByY?: boolean) {
            // simple selection sort.
            for (let i = 0; i < this.length() - 1; i++) {
                for (let j = i + 1; j < this.length(); j++) {
                    if (sortByY) {
                        if (this.y.getDataAtIndex(i) > this.y.getDataAtIndex(j)) {
                            swap(this.x, this.y, i, j);
                        }
                    } else {
                        if (this.x.getDataAtIndex(i) > this.x.getDataAtIndex(j)) {
                            swap(this.x, this.y, i, j);
                        }
                    }
                }
            }
            function swap(x: DataSample, y: DataSample, i: number, j: number) {
                let temp: number[] = [x.getDataAtIndex(j), y.getDataAtIndex(j)];
                x.setDataAtIndex(j, x.getDataAtIndex(i));
                y.setDataAtIndex(j, y.getDataAtIndex(i));
                x.setDataAtIndex(i, temp[0]);
                y.setDataAtIndex(i, temp[1]);
            }
        }

        /**
         * Gets the x value of the data point at the given index
         * 
         * @param index the index of the specified data point
         * @returns the x value of the data point at the specified index
         */
        getXAtIndex(index: number): number {
            if (index < 0 || index >= this.length()) {
                return undefined;
            }
            return this.x.getDataAtIndex(index);
        }

        /**
         * Gets the y value of the data point at the given index
         * 
         * @param index the index of the specified data point
         * @returns the x value of the data point at the specified index
         */
        getYAtIndex(index: number): number {
            if (index < 0 || index >= this.length()) {
                return undefined;
            }
            return this.y.getDataAtIndex(index);
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
            return [this.x.getDataAtIndex(index), this.y.getDataAtIndex(index)]
        }

        /**
         * Sets the x value of the data point at the given index
         *
         * @param index the index of the specified data point
         * @param x the new value that is being set
         */
        setXAtIndex(index: number, x: number) {
            if (index < 0 || index >= this.length()) {
                return;
            }
            this.x.setDataAtIndex(index, x);
        }

        /**
         * Sets the y value of the data point at the given index
         *
         * @param index the index of the specified data point
         * @param y the new value that is being set
         */
        setYAtIndex(index: number, y: number) {
            if (index < 0 || index >= this.length()) {
                return;
            }
            this.y.setDataAtIndex(index, y);
        }

        /**
         * Sets the data point at the given index with the given values
         * 
         * @param index the index of the specified data point
         * @param x the x value the data point should be changed to
         * @param y the y value the data point should be changed to
         */
        setDataAtIndex(index: number, x: number, y: number) {
            if (index < 0 || index >= this.length()) {
                return;
            }
            this.x.setDataAtIndex(index, x)
            this.y.setDataAtIndex(index, y)
        }

        /**
         * Gets the average x value of the data
         * 
         * @returns the average x value of the data
         */
        getMeanX(): number {
            return this.x.getMean();
        }

        /**
         * Gets the average y value of the data
         * 
         * @returns the average y value of the data
         */
        getMeanY(): number {
            return this.y.getMean();
        }

        /**
         * Gets the min x value of the data
         * 
         * @returns the min x value of the data
         */
        getMinX(): number {
            return this.x.getMin();
        }

        /**
         * Gets the min y value of the data
         * 
         * @returns the min y value of the data
         */
        getMinY(): number {
            return this.y.getMin();
        }

        /**
         * Gets the max x value of the data
         * 
         * @returns the max x value of the data
         */
        getMaxX(): number {
            return this.x.getMax();
        }

        /**
         * Gets the max y value of the data
         * 
         * @returns the max y value of the data
         */
        getMaxY(): number {
            return this.y.getMax();
        }

        /**
         * Gets the total sum of the x axis of the data
         * 
         * @returns the total sum of the x axis of the data
         */
        getSumX(): number {
            return this.x.getSum();
        }

        /**
         * Gets the total sum of the y axis of the data
         * 
         * @returns the total sum of the y axis of the data
         */
        getSumY(): number {
            return this.y.getSum();
        }

        /**
         * Returns the amount of data points in the data set
         * 
         * @returns the amount of data points in the data set
         */
        length(): number {
            return this.x.getCount();
        }

        /**
         * Gets the sample variance of the x axis of the data
         * 
         * @returns the sample variance of the x axis of the data
         */
        getVarianceX(): number {
            return this.x.getVariance();
        }

        /**
         * Gets the sample variance of the y axis of the data
         * 
         * @returns the sample variance of the y axis of the data
         */
        getVarianceY(): number {
            return this.y.getVariance();
        }

        /**
         * Gets the sample standard deviation of the x axis of the data
         * 
         * @returns the sample standard deviation of the x axis of the data
         */
        getStandardDeviationX(): number {
            return this.x.getStandardDeviation();
        }

        /**
         * Gets the sample standard deviation of the y axis of the data
         * 
         * @returns the sample standard deviation of the y axis of the data
         */
        getStandardDeviationY(): number {
            return this.y.getStandardDeviation();
        }

        /**
         * Gets the population variance of the x axis of the data
         * 
         * @returns the population variance of the x axis of the data
         */
        getPopulationVarianceX(): number {
            return this.x.getPopulationVariance();
        }

        /**
         * Gets the population variance of the y axis of the data
         * 
         * @returns the population variance of the y axis of the data
         */
        getPopulationVarianceY(): number {
            return this.y.getPopulationVariance();
        }

        /**
         * Gets the population standard deviation of the x axis of the data
         * 
         * @returns the population standard deviation of the x axis of the data
         */
        getPopulationStandardDeviationX(): number {
            return this.x.getPopulationStandardDeviation();
        }

        /**
         * Gets the population standard deviation of the y axis of the data
         * 
         * @returns the population standard deviation of the y axis of the data
         */
        getPopulationStandardDeviationY(): number {
            return this.y.getPopulationStandardDeviation();
        }

        /**
         * Finds and returns the coefficients of the line of best fit
         * 
         * @returns the coefficients of the line of best fit in an array 
         *      with the form [slope, intercept]
         */
        getLineOfBestFit(): number[] {
            let slope: number = 0;
            for (let i = 0; i < this.length(); i++) {
                slope += (this.getXAtIndex(i) - this.getMeanX()) * (this.getYAtIndex(i) - this.getMeanY());
            }
            let squareX: number = 0;

            for (let i = 0; i < this.length(); i++) {
                squareX += (this.getXAtIndex(i) - this.getMeanX()) ** 2;
            }
            slope /= squareX;

            let intercept: number = this.getMeanY() - slope * this.getMeanX();

            return [slope, intercept];
        }
    }
} 