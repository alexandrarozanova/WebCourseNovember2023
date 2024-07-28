document.addEventListener("DOMContentLoaded", function () {
    const people = [
        {name: "Иван", age: 20},
        {name: "Максим", age: 29},
        {name: "Александра", age: 27},
        {name: "Александр", age: 29},
        {name: "Ольга", age: 30},
        {name: "Ольга", age: 51},
        {name: "Мария", age: 14},
        {name: "Татьяна", age: 48},
        {name: "Иван", age: 20},
        {name: "Петр", age: 18}
    ];

    const averagePeopleAge = _.chain(people)
        .meanBy("age")
        .value();

    console.log("1. Средний возраст людей из списка: " + averagePeopleAge);

    const peopleWithAgeFrom20To30 = _.chain(people)
        .filter(p => p.age >= 20 && p.age <= 30)
        .sortBy("age")
        .value();

    console.log("2. Список людей с возрастом от 20 до 30 включительно, отсортированный по возрастанию: ");
    peopleWithAgeFrom20To30.forEach(p => console.log(p.name + ", " + p.age));

    const peopleUniqueNameWithAgeFrom20To30 = _.chain(people)
        .filter(p => p.age >= 20 && p.age <= 30)
        .uniqBy("name")
        .sortBy("age")
        .reverse()
        .value();

    console.log("3. Список людей с уникальным именем в возрасте от 20 до 30 включительно, отсортированный по убыванию: ");
    peopleUniqueNameWithAgeFrom20To30.forEach(p => console.log(p.name));

    const peopleNameFrequency = _.chain(people)
        .countBy("name")
        .value();

    console.log("4. Объект в формате в формате ключ: значение (имя: кол-во людей с данным именем):");
    _.forIn(peopleNameFrequency, (frequency, name) => console.log(name + ": " + frequency));
});