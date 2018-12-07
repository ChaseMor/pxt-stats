namespace stats {

    export class Sample {

        private data: number[];

        private mean: number;

        private sum: number;

        private std: number;

        private var: number;

        constructor(data: number[]) {
            this.data = data;
        }

        getMean(): number {
            if (!this.mean) {
                this.mean = this.getSum() / this.getCount();
            }
            return this.mean;
        }

        getSum(): number {
            if (!this.sum) {
                this.sum = 0;
                for (let value of this.data) {
                    this.sum += value;
                }
            }
            return this.sum;
        }

        getCount(): number {
            return this.data.length;
        }

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

        getStandardDeviation(): number {
            if (!this.std) {
                this.std = Math.sqrt(this.getVariance());
            }
            return this.std;
        }


    }
} 