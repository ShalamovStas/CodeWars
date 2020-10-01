// 0-10, into 5-moons scale Your final rating should be rounded to "0.5". Input is always valid.

var startType = {
    FULL: "FULL",
    HALF: "HALF"
};

var startRes = {
    FULL: "./res/star.png",
    HALF: "./res/star-half.png"
};

class Star {
    type;
    res
}

var stars = [];

var purchaseApp = angular.module("purchaseApp", []);
purchaseApp.controller("purchaseController", function($scope) {
    $scope.stars = stars;
    console.log("run")


    function initDefaultStars() {
        for (let index = 0; index < 3; index++) {
            var star = {};
            star.res = startRes.FULL;
            $scope.stars.push(star);
        }
        var star = {};
        star.res = startRes.HALF;
        $scope.stars.push(star);

        var star = {};
        star.res = startRes.HALF;
        $scope.stars.push(star);
    }

    initDefaultStars();
    console.log(stars);

    function rate(rating) {
        let rateBar = [];
        let val = (0.5 * rating).toString().split('.');
        if (val.length == 1)
            val.push("0");
        console.log(val)
        if (val[0] && val[1]) {
            for (let index = 0; index < val[0]; index++) {
                rateBar.push('o')
            }
            if (rating == 10)
                return rateBar.join('')
            let flag = 0.5 * rating - val[0]
            console.log(flag)
            if (flag >= 0.75)
                rateBar.push('o');
            else if (flag >= 0.25 && flag < 0.75)
                rateBar.push('c');
            else
                rateBar.push('x');

            for (let index = 1; index < 5 - val[0]; index++) {
                rateBar.push('x');
            }
        }
        return rateBar.join('')
    }


    function minifyRate(rating) {
        let rateBar = [];
        let val = (0.5 * rating).toString().split('.');
        if (val.length == 1)
            val.push("0");
        if (val[0] && val[1]) {
            for (let index = 0; index < val[0]; index++) {
                rateBar.push('o')
            }
            if (rating == 10)
                return rateBar.join('')
            let flag = 0.5 * rating - val[0]
            console.log(flag)
            if (flag >= 0.75)
                rateBar.push('o');
            else if (flag >= 0.25 && flag < 0.75)
                rateBar.push('c');
            else
                rateBar.push('x');

            for (let index = 1; index < 5 - val[0]; index++) {
                rateBar.push('x');
            }
        }
        return rateBar.join('')
    }

    // console.log(rate(3.9)); //ooxxx
    // console.log("ooxxx");
    // console.log(rate(1.8)); //oxxxx
    // console.log("oxxxx");

    // console.log(rate(7.2)); //ooocx
    // console.log("ooocx");

    // console.log(rate(5.0)); //oocxx
    // console.log("oocxx");

    // console.log(rate(2.5));
    // console.log("ocxxx");

    // console.log(rate(6.5));
    // console.log("ooocx");

    // console.log(rate(6.0));
    // console.log("oooxx");

    // console.log(rate(10));
    // console.log("ooooo");

});