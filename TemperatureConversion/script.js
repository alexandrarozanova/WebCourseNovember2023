const celsiusTemperatureTextField = document.getElementById("celsius");
const conversionButton = document.getElementById("conversion-button");

celsiusTemperatureTextField.addEventListener("keyup", function () {
    const celsiusTemperature = celsiusTemperatureTextField.value;
    celsiusTemperatureTextField.classList.remove("invalid");

    if (isNaN(celsiusTemperature) || celsiusTemperature.length === 0) {
        celsiusTemperatureTextField.classList.add("invalid");

        conversionButton.disabled = true;
        conversionButton.classList.remove("submit");
    } else {
        conversionButton.disabled = false;
        conversionButton.classList.add("submit");

        conversionButton.addEventListener("click", function () {
            const fahrenheitTemperatureTextField = document.getElementById("fahrenheit");
            fahrenheitTemperatureTextField.value = (celsiusTemperature * 9 / 5) + 32;

            const kelvinTemperatureTextField = document.getElementById("kelvin");
            kelvinTemperatureTextField.value = (celsiusTemperature * 1) + 273.15;
        });
    }
});