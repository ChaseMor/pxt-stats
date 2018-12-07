let arr: number[] = [];

for (let i = 0; i < 160; i++) {
    arr.push(1);
}

let normGen: stats.NormalDistribution = new stats.NormalDistribution(80, 10);
for (let i = 0; i < 20000; i++) {
    let num: number = Math.trunc(normGen.generateRandom());

    if (num >= 0 && num < 160) {
        arr[num] += 0.1;
    }

}

game.onPaint(function () {
    for (let i = 0; i < arr.length; i++) {
        screen.setPixel(i, 120 - arr[i], 1);
    }
})