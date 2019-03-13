namespace stats {


    
    /**
     * Gets the mean value of the array
     * 
     * @param data the data that the mean is calculated from
     * @returns the mean value of the array
     */
    export function mean(data: number[]) {
        let sample = new DataSample(data);
        return sample.mean;
    }
    
    /**
     * Gets the median value of the array
     * 
     * @param data the data that the median is calculated from
     * @returns the median value of the array
     */
    export function median(data: number[]) {
        let sample = new DataSample(data);
        return sample.median;
    }

    /**
     * Gets the sum of the values in the array
     * 
     * @param data the data that the sum is calculated from
     * @returns the sum of the values in the array
     */
    export function sum(data: number[]) {
        let sample = new DataSample(data);
        return sample.sum;
    }

    /**
     * Gets the sample standard deviation of the values in the array
     * 
     * @param data the data that the standard deviation is calculated from
     * @returns the sample standard deviation of the values in the array
     */
    export function standardDeviation(data: number[]) {
        let sample = new DataSample(data);
        return sample.standardDeviation;
    }

    /**
     * Gets the population standard deviation of the values in the array
     * 
     * @param data the data that the standard deviation is calculated from
     * @returns the population standard deviation of the values in the array
     */
    export function standardDeviationPopulation(data: number[]) {
        let sample = new DataSample(data);
        return sample.standardDeviationPopulation;
    }

    /**
     * Gets the sample variance of the values in the array
     * 
     * @param data the data that the variance is calculated from
     * @returns the sample variance of the values in the array
     */
    export function variance(data: number[]) {
        let sample = new DataSample(data);
        return sample.variance;
    }

    /**
     * Gets the population variance of the values in the array
     * 
     * @param data the data that the variance is calculated from
     * @returns the population variance of the values in the array
     */
    export function variancePopulation(data: number[]) {
        let sample = new DataSample(data);
        return sample.variancePopulation;
    }

    /**
     * Gets the smallest value of the array
     * 
     * @param data the data that the min is calculated from
     * @returns the smallest value of the array
     */
    export function min(data: number[]) {
        let sample = new DataSample(data);
        return sample.min;
    }

    /**
     * Gets the largest value of the array
     * 
     * @param data the data that the max is calculated from
     * @returns the largest value of the array
     */
    export function max(data: number[]) {
        let sample = new DataSample(data);
        return sample.max;
    }

    /**
     * Gets the sample covariance of the two arrays
     * 
     * @param xValues the x values used
     * @param yValues the y values used
     * @returns the sample covariance of the two arrays
     */
    export function covariance(xValues: number[], yValues: number[]) {
        let sample = new DataSet(xValues, yValues);
        return sample.covariance;
    }

    /**
     * Gets the population covariance of the two arrays
     * 
     * @param xValues the x values used
     * @param yValues the y values used
     * @returns the population covariance of the two arrays
     */
    export function covariancePopulation(xValues: number[], yValues: number[]) {
        let sample = new DataSet(xValues, yValues);
        return sample.covariancePopulation;
    }

    /**
     * Gets the sample correlation of the two arrays
     * 
     * @param xValues the x values used
     * @param yValues the y values used
     * @returns the sample correlation of the two arrays
     */
    export function correlation(xValues: number[], yValues: number[]) {
        let sample = new DataSet(xValues, yValues);
        return sample.correlation;
    }

    /**
     * Gets the population correlation of the two arrays
     * 
     * @param xValues the x values used
     * @param yValues the y values used
     * @returns the population correlation of the two arrays
     */
    export function correlationPopulation(xValues: number[], yValues: number[]) {
        let sample = new DataSet(xValues, yValues);
        return sample.correlationPopulation;
    }

    /**
     * Gets the line of best fit of the two arrays
     * returns the 2 element array of the form [slope, intercept]
     * 
     * @param xValues the x values used
     * @param yValues the y values used
     * @returns the line of best fit of the two arrays
     */
    export function lineOfBestFit(xValues: number[], yValues: number[]) {
        let sample = new DataSet(xValues, yValues);
        return sample.lineOfBestFit;
    }
    

    /**
     * Sorts the given Array
     * 
     * @param data the data that is to be sorted
     * @returns the sorted array
     */
    export function sort(data: number[]) {
        let sample = new DataSample(data);
        sample.sort();
        return sample.getData();
    }

    /**
     * Gets the factorial of the number given
     * @param n the number the operation is perfomed on
     * @returns the factorial of the number given
     */
    export function factorial(n: number): number {
        if (n < 0) {
            return -1;
        }
        let output: number = 1;
        for (let i = 1; i <= n; i++) {
            output *= i;
        }
        return output;
    }

    /**
     * Gets the number of permutations of given the total number of 
     * options and the how many are used/chosen.
     * Will result in -1 if more is chosen then are used
     *
     * @param total the total number of possibilities
     * @param chosen the number of possibilites used
     * @returns the number of permutations possible
     */
    export function permutations(total: number, chosen: number): number {
        if (chosen > total) {
            return -1;
        }
        let output: number = 1;
        for (let i = total; i > total - chosen; i--) {
            output *= i;
        }
        return output;
    }

    /**
     * Gets the number of combination of given the total number of 
     * options and the how many are used/chosen.
     * Will result in -1 if more is chosen then are used
     *
     * @param total the total number of possibilities
     * @param chosen the number of possibilites chosen
     * @returns the number of combinations possible
     */
    export function choose(total: number, chosen: number): number {
        if (chosen > total) {
            return -1;
        }
        return Math.idiv(permutations(total, chosen), factorial(chosen));
    }
}
