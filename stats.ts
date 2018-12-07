namespace stats {

    /**
     * Gets the average of the two numbers
     * 
     * @param a The first number
     * @param b The second number
     * @returns the average of the two numbers
     */
    export function average(a: number, b: number) {
        return (a + b) / 2;
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
