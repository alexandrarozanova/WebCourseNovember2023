(function () {
    function getMaxCitiesCountCountries(countries) {
        const maxCitiesCount = countries.reduce((maxCitiesCount, country) => Math.max(maxCitiesCount, country.cities.length), 0);

        return countries.filter(country => country.cities.length === maxCitiesCount);
    }

    function getCountriesPopulations(countries) {
        const countriesPopulations = {};

        countries.forEach(country => {
            countriesPopulations[country.name] = country.cities.reduce((totalPopulation, city) => totalPopulation + city.population, 0)
        });
        return countriesPopulations;
    }

    const countries = [
        {
            name: "Россия",
            cities: [
                {
                    name: "Москва",
                    population: 11980000
                },
                {
                    name: "Санкт-Петербург",
                    population: 5600000
                },
                {
                    name: "Новосибирск",
                    population: 1567000
                }
            ]
        },
        {
            name: "Германия",
            cities: [
                {
                    name: "Берлин",
                    population: 3645000
                },
                {
                    name: "Мюнхен",
                    population: 1561000
                },
                {
                    name: "Гамбург",
                    population: 1814000
                }
            ]
        },
        {
            name: "Япония",
            cities: [
                {
                    name: "Токио",
                    population: 13960000
                },
                {
                    name: "Киото",
                    population: 1464000
                },
                {
                    name: "Осака",
                    population: 2685000
                }
            ]
        },
        {
            name: "Китай",
            cities: [
                {
                    name: "Пекин",
                    population: 21540000
                },
                {
                    name: "Шанхай",
                    population: 26320000
                },
                {
                    name: "Гуанчжоу",
                    population: 15310000
                },
                {
                    name: "Шэньчжэнь",
                    population: 17494000
                }
            ]
        }
    ];

    const maxCitiesCountCountries = getMaxCitiesCountCountries(countries);

    console.log("Страны с максимальным количеством городов:");
    maxCitiesCountCountries.forEach(country => console.log(country.name));

    const countriesPopulations = getCountriesPopulations(countries);
    console.log("Объект с информацией по странам в формате 'ключ (название страны): значение (численность населения)':");
    console.log(countriesPopulations);
})();