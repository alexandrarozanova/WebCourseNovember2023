(function () {
    function sortArrayByDescending(numbers) {
        numbers.sort((number1, number2) => number2 - number1);
    }

    function getFirstElements(array, elementsCount) {
        return array.slice(0, elementsCount);
    }

    function getLastElements(array, elementsCount) {
        return array.slice(-elementsCount);
    }

    function getEvenNumbersSum(numbers) {
        return numbers
            .filter(number => number % 2 === 0)
            .reduce((sum, number) => sum + number, 0);
    }

    function fillArray(arrayLength) {
        const array = new Array(arrayLength);

        for (let i = 0; i < array.length; i++) {
            array[i] = i + 1;
        }

        return array;
    }

    function getEvenNumbersSquares(numbers) {
        return numbers
            .filter(number => number % 2 === 0)
            .map(number => number * number);
    }

    const array1 = [1, 10, 15, 25, 2, 5, 9, 3, 6, 11, 7, 77];

    console.log("Массив чисел:");
    console.log(array1);

    sortArrayByDescending(array1);
    console.log("Отсортированный по убыванию массив чисел:");
    console.log(array1);

    console.log("Пять первых чисел массива:");
    console.log(getFirstElements(array1, 5));

    console.log("Пять последних чисел массива:");
    console.log(getLastElements(array1, 5));

    const arrayEvenNumbersSum = getEvenNumbersSum(array1);
    console.log("Сумма четных чисел массива:");
    console.log(arrayEvenNumbersSum);

    const array2 = fillArray(100);
    console.log("Массив чисел:");
    console.log(array2);

    const evenNumbersSquares = getEvenNumbersSquares(array2);
    console.log("Список квадратов четных чисел данного массива:");
    console.log(evenNumbersSquares);
})();