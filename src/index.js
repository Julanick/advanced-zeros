module.exports = function getZerosCount(number, base) {
    function getSimpleMultipliers(num) {
        var array = [1];

        for (var i = 2; i <= num;) {
            if (num % i == 0) {
                array.push(i);
                num = num / i;
            }
            else {
                i++;
            }
        }

        return array;
    }

    function div(val, by) { // division without remainder
        return (val - val % by) / by;
    }

    function uniq(a) { // return array with uniq elements 
        return a.sort().filter(function (item, pos, ary) {
            return !pos || item != ary[pos - 1];
        })
    }

    var multipliers = getSimpleMultipliers(base);

    var uniqMultipliers = uniq(multipliers);

    var zerosCounter = 0;

    for (var m = 1; m < uniqMultipliers.length; m++) {

        var numberOfMultipliers = 0;
        var multiplier = uniqMultipliers[m];

        for (var i = 1; Math.pow(multiplier, i) <= number; i++) {
            numberOfMultipliers += div(number, Math.pow(multiplier, i));
        }

        var possibleZerosNumber = div(numberOfMultipliers, multipliers.filter(x => x === multiplier).length)

        if (zerosCounter == 0) zerosCounter = possibleZerosNumber;

        zerosCounter = Math.min(zerosCounter, possibleZerosNumber);
    }

    return zerosCounter;
}