namespace stats {

    /**
     * A 2-dimensional sampling of data
     */
    export class DataSet {

        /**
         * The x values of the data set
         */
        private _x: DataSample;

        /**
         * The y values of the data set
         */
        private _y: DataSample;

        /**
         * The sample covariance of the data set
         */
        private _covariance: number;

        /**
         * The sample correlation of the data set
         */
        private _correlation: number;

        /**
         * The population covariance of the data set
         */
        private _covariancePop: number;

        /**
         * The population correlation of the data set
         */
        private _correlationPop: number;

        /**
         * The slope of the line of best fit
         */
        private _slope: number;

        /**
         * The intercept of the line of best fit
         */
        private _intercept: number;

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

            this._x = new DataSample(xValues.slice(0, minWidth));
            this._y = new DataSample(yValues.slice(0, minWidth));
        }

        /**
         * Add a new data point to the sample
         *
         * @param xValue the x value of the new data point to be added
         * @param yValue the y value of the new data point to be added
         */
        addDataPoint(xValue: number, yValue: number) {
            this._x.addData(xValue);
            this._y.addData(yValue);
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

            this._x.concatData(xValues.slice(0, minWidth));
            this._y.concatData(yValues.slice(0, minWidth));
        }

        /**
         * Sorts the DataSet
         * @param sortByY whether or not the DataSet should be sorted by the y values
         */
        sort(sortByY?: boolean) {
            // simple selection sort.
            for (let i = 0; i < this.length - 1; i++) {
                for (let j = i + 1; j < this.length; j++) {
                    if (sortByY) {
                        if (this._y.getDataAtIndex(i) > this._y.getDataAtIndex(j)) {
                            swap(this._x, this._y, i, j);
                        }
                    } else {
                        if (this._x.getDataAtIndex(i) > this._x.getDataAtIndex(j)) {
                            swap(this._x, this._y, i, j);
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
            if (index < 0 || index >= this.length) {
                return undefined;
            }
            return this._x.getDataAtIndex(index);
        }

        /**
         * Gets the y value of the data point at the given index
         * 
         * @param index the index of the specified data point
         * @returns the x value of the data point at the specified index
         */
        getYAtIndex(index: number): number {
            if (index < 0 || index >= this.length) {
                return undefined;
            }
            return this._y.getDataAtIndex(index);
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
            return [this._x.getDataAtIndex(index), this._y.getDataAtIndex(index)]
        }

        /**
         * Sets the x value of the data point at the given index
         *
         * @param index the index of the specified data point
         * @param x the new value that is being set
         */
        setXAtIndex(index: number, x: number) {
            if (index < 0 || index >= this.length) {
                return;
            }
            this._x.setDataAtIndex(index, x);
            this.clearProperties();
        }

        /**
         * Sets the y value of the data point at the given index
         *
         * @param index the index of the specified data point
         * @param y the new value that is being set
         */
        setYAtIndex(index: number, y: number) {
            if (index < 0 || index >= this.length) {
                return;
            }
            this._y.setDataAtIndex(index, y);
            this.clearProperties();
        }

        /**
         * Sets the data point at the given index with the given values
         * 
         * @param index the index of the specified data point
         * @param x the x value the data point should be changed to
         * @param y the y value the data point should be changed to
         */
        setDataAtIndex(index: number, x: number, y: number) {
            if (index < 0 || index >= this.length) {
                return;
            }
            this._x.setDataAtIndex(index, x);
            this._y.setDataAtIndex(index, y);
        }

        /**
         * Clears all pre-computed values
         */
        private clearProperties() {
            this._covariance = undefined;
            this._covariancePop = undefined;
            this._correlation = undefined;
            this._correlationPop = undefined;
            this._slope = undefined;
            this._intercept = undefined;
        }

        /**
         * Gets the average x value of the data
         * 
         * @returns the average x value of the data
         */
        get meanX(): number {
            return this._x.mean;
        }

        /**
         * Gets the average y value of the data
         * 
         * @returns the average y value of the data
         */
        get meanY(): number {
            return this._y.mean;
        }

        /**
         * Gets the min x value of the data
         * 
         * @returns the min x value of the data
         */
        get minX(): number {
            return this._x.min;
        }

        /**
         * Gets the min y value of the data
         * 
         * @returns the min y value of the data
         */
        get minY(): number {
            return this._y.min;
        }

        /**
         * Gets the max x value of the data
         * 
         * @returns the max x value of the data
         */
        get maxX(): number {
            return this._x.max;
        }

        /**
         * Gets the max y value of the data
         * 
         * @returns the max y value of the data
         */
        get maxY(): number {
            return this._y.max;
        }

        /**
         * Gets the total sum of the x axis of the data
         * 
         * @returns the total sum of the x axis of the data
         */
        get sumX(): number {
            return this._x.sum;
        }

        /**
         * Gets the total sum of the y axis of the data
         * 
         * @returns the total sum of the y axis of the data
         */
        get sumY(): number {
            return this._y.sum;
        }

        /**
         * Returns the amount of data points in the data set
         * 
         * @returns the amount of data points in the data set
         */
        get length(): number {
            return this._x.length;
        }

        /**
         * Gets the sample variance of the x axis of the data
         * 
         * @returns the sample variance of the x axis of the data
         */
        get varianceX(): number {
            return this._x.variance;
        }

        /**
         * Gets the sample variance of the y axis of the data
         * 
         * @returns the sample variance of the y axis of the data
         */
        get varianceY(): number {
            return this._y.variance;
        }

        /**
         * Gets the sample standard deviation of the x axis of the data
         * 
         * @returns the sample standard deviation of the x axis of the data
         */
        get standardDeviationX(): number {
            return this._x.standardDeviation;
        }

        /**
         * Gets the sample standard deviation of the y axis of the data
         * 
         * @returns the sample standard deviation of the y axis of the data
         */
        get standardDeviationY(): number {
            return this._y.standardDeviation;
        }

        /**
         * Gets the population variance of the x axis of the data
         * 
         * @returns the population variance of the x axis of the data
         */
        get varianceXPopulation(): number {
            return this._x.variancePopulation;
        }

        /**
         * Gets the population variance of the y axis of the data
         * 
         * @returns the population variance of the y axis of the data
         */
        get varianceYPopulation(): number {
            return this._y.variancePopulation;
        }

        /**
         * Gets the population standard deviation of the x axis of the data
         * 
         * @returns the population standard deviation of the x axis of the data
         */
        get standardDeviationXPopulation(): number {
            return this._x.standardDeviationPopulation;
        }

        /**
         * Gets the population standard deviation of the y axis of the data
         * 
         * @returns the population standard deviation of the y axis of the data
         */
        get standardDeviationYPopulation(): number {
            return this._y.standardDeviationPopulation;
        }

        /**
         * Finds and returns the coefficients of the line of best fit
         * 
         * @returns the coefficients of the line of best fit in an array 
         *      with the form [slope, intercept]
         */
        get lineOfBestFit(): number[] {
            let slope: number = 0;
            for (let i = 0; i < this.length; i++) {
                slope += (this.getXAtIndex(i) - this.meanX) * (this.getYAtIndex(i) - this.meanY);
            }
            let squareX: number = 0;

            for (let i = 0; i < this.length; i++) {
                squareX += (this.getXAtIndex(i) - this.meanX) ** 2;
            }
            slope /= squareX;
            this._slope = slope;
            this._intercept = this.meanY - slope * this.meanX;

            return [this._slope, this._intercept];
        }

        /**
         * Gets the slope of the line of best fit
         * 
         * @returns the slope of the line of best fit
         */
        get slope(): number {
            if (!this._slope) {
                this.lineOfBestFit;
            }
            return this._slope;
        }

        /**
         * Gets the intercept of the line of best fit
         * 
         * @returns the intercept of the line of best fit
         */
        get intercept(): number {
            if (!this._intercept) {
                this.lineOfBestFit;
            }
            return this._intercept;
        }
        
        /**
         * Gets the sample covariance of the data
         * 
         * @returns the sample covariance of the data
         */
        get covariance(): number {
            if (!this._covariance) {
                let sum: number = 0;
                for (let i = 0; i < this.length; i++) {
                    sum += (this.getXAtIndex(i) - this.meanX) * (this.getYAtIndex(i) - this.meanY);
                }
                this._covariance = sum / (this.length - 1);
            }
            return this._covariance;
        }
        
        /**
         * Gets the population covariance of the data
         * 
         * @returns the population covariance of the data
         */
        get covariancePopulation(): number {
            if (!this._covariance) {
                let sum: number = 0;
                for (let i = 0; i < this.length; i++) {
                    sum += (this.getXAtIndex(i) - this.meanX) * (this.getYAtIndex(i) - this.meanY);
                }
                this._covariance = sum / this.length;
            }
            return this._covariancePop;
        }

        /**
         * Gets the sample correlation of the data
         * 
         * @returns the sample correlation of the data
         */
        get correlation(): number {
            if (!this._correlation) {
                this._correlation = this.covariance
                    / (this._x.standardDeviation 
                    * this._y.standardDeviation);
            }
            return this._correlation;
        }

        /**
         * Gets the population correlation of the data
         * 
         * @returns the population correlation of the data
         */
        get correlationPopulation(): number {
            if (!this._correlationPop) {
                this._correlationPop = this.covariancePopulation
                    / (this._x.standardDeviationPopulation 
                    * this._y.standardDeviationPopulation);
            }
            return this._correlationPop;
        }
    }
} 