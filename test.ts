let arr: number[] = [];
let data: number[] = [];

for (let i = 0; i < 160; i++) {
    arr.push(1);
}

let normGen: stats.NormalGenerator = new stats.NormalGenerator(80, 10);
let geoGen: stats.GeometricGenerator = new stats.GeometricGenerator(1 / 20);

for (let i = 0; i < 20000; i++) {
    let num: number = Math.trunc(geoGen.generateRandom());
    data.push(num);
    if (num >= 0 && num < 160) {
        arr[num] += 0.1;
    }
}

let sample: stats.DataSample = new stats.DataSample(data);

console.logValue("mean", sample.getMean());
console.logValue("sum", sample.getSum());
console.logValue("count", sample.getCount());
console.logValue("variance", sample.getVariance());
console.logValue("std dev", sample.getStandardDeviation());

game.onPaint(function () {
    for (let i = 0; i < arr.length; i++) {
        screen.setPixel(i, 120 - arr[i], 1);
    }
})