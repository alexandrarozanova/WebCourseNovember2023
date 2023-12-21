(function () {
    function sortArrayByDescending(array) {
        array.sort((number1, number2) => number2 - number1);
    }

    function getArrayFiveFirstElements(array, elementsCount) {
        return array.slice(0, elementsCount);
    }

    function getArrayFiveLastElements(array, elementsCount) {
        return array.slice(-elementsCount);
    }

    function getArrayEvenNumbersSum(array) {
        return array.reduce(function (sum, number) {
            if (number % 2 === 0) {
                sum += number;
            }

            return sum;
        }, 0);
    }

    function fillArray(array) {
        for (let i = 0; i < array.length; i++) {
            array[i] = i + 1;
        }
    }

    function getArraySquaresEvenNumbersList(array) {
        return array.filter((number) => number % 2 === 0).map((number) => number * number);
    }

    const numbersArray = [1, 10, 15, 25, 2, 5, 9, 3, 6, 11, 7, 77];

    console.log("Массив чисел:");
    console.log(numbersArray);

    sortArrayByDescending(numbersArray);
    console.log("Отсортированный по убыванию массив чисел:");
    console.log(numbersArray);

    console.log("Пять первых чисел массива:");
    console.log(getArrayFiveFirstElements(numbersArray, 5));

    console.log("Пять последних чисел массива:");
    console.log(getArrayFiveLastElements(numbersArray, 5));

    const arrayEvenNumbersSum = getArrayEvenNumbersSum(numbersArray);
    console.log("Сумма четных чисел массива:");
    console.log(arrayEvenNumbersSum);

    const array = new Array(100);

    fillArray(array);
    console.log("Массив чисел:");
    console.log(array);

    const arraySquaresEvenNumbersList = getArraySquaresEvenNumbersList(array);
    console.log("Список квадратов четных чисел данного массива:");
    console.log(arraySquaresEvenNumbersList);
})();