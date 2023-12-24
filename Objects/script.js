(function () {
    function getMaxCitiesCountCountries(countries) {
        const maxCitiesCount = countries.reduce((max, countries) => {
            return Math.max(countries.citiesList.length);
        }, 0);

        return countries.filter((countries) => countries.citiesList.length === maxCitiesCount);
    }

    function getCountriesObject(countries) {
        let countriesObject = {};

        countries.forEach((country) => {
            countriesObject[country.countryName] = country.citiesList.reduce((population, city) => population + city.population, 0);
        });

        return countriesObject;
    }

    const countries = [
        {
            countryName: "Россия",
            citiesList: [{name: "Москва", population: 11980000},
                {name: "Санкт-Петербург", population: 5600000},
                {name: "Новосибирск", population: 1567000}]
        },

        {
            countryName: "Германия",
            citiesList: [{name: "Берлин", population: 3645000},
                {name: "Мюнхен", population: 1561000},
                {name: "Гамбург", population: 1814000}]
        },

        {
            countryName: "Япония",
            citiesList: [{name: "Токио", population: 13960000},
                {name: "Киото", population: 1464000},
                {name: "Осака", population: 2685000}]
        },

        {
            countryName: "Китай",
            citiesList: [{name: "Пекин", population: 21540000},
                {name: "Шанхай", population: 26320000},
                {name: "Гуанчжоу", population: 15310000},
                {name: "Шэньчжэнь", population: 17494000}]
        }];

    const maxCitiesCountCountries = getMaxCitiesCountCountries(countries);

    console.log("Страны с максимальным количеством городов:")
    maxCitiesCountCountries.forEach((country) => console.log(country.countryName));

    const countriesObject = getCountriesObject(countries);
    console.log("Объект с информацией по странам в формате 'ключ (название страны): значение (численность населения)':")
    console.log(countriesObject);
})();