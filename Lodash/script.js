(function () {
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

    const averagePeopleAge = _.meanBy(people, "age");
    console.log("1. Средний возраст людей из списка: " + averagePeopleAge);

    const peopleWithAgeFrom20To30 = _.chain(people)
        .filter(p => p.age >= 20 && p.age <= 30)
        .sortBy("age")
        .value();

    console.log("2. Список людей с возрастом от 20 до 30 включительно, отсортированный по возрастанию: ");
    console.log(peopleWithAgeFrom20To30);

    const peopleUniqueNameWithAgeFrom20To30 = _.chain(people)
        .filter(p => p.age >= 20 && p.age <= 30)
        .map("name")
        .uniq()
        .sort()
        .reverse()
        .value();

    console.log("3. Список людей с уникальным именем в возрасте от 20 до 30 включительно, отсортированный по убыванию: ");
    console.log(peopleUniqueNameWithAgeFrom20To30);

    const peopleNamesFrequency = _.countBy(people, "name");

    console.log("4. Объект в формате в формате ключ: значение (имя: кол-во людей с данным именем):");
    _.forIn(peopleNamesFrequency, (frequency, name) => console.log(name + ": " + frequency));
})();