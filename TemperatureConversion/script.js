document.addEventListener("DOMContentLoaded", function () {
    const celsiusTemperatureTextField = document.getElementById("celsius");
    const fahrenheitTemperatureTextField = document.getElementById("fahrenheit");
    const kelvinTemperatureTextField = document.getElementById("kelvin");
    const conversionButton = document.getElementById("conversion-button");

    let celsiusTemperature = celsiusTemperatureTextField.value;

    conversionButton.disabled = false;

    conversionButton.addEventListener("click", function () {
        celsiusTemperatureTextField.addEventListener("keyup", function () {
            celsiusTemperature = celsiusTemperatureTextField.value;
            celsiusTemperatureTextField.classList.remove("invalid");

            if (isNaN(celsiusTemperature) || celsiusTemperature.length === 0) {
                celsiusTemperatureTextField.classList.add("invalid");
                conversionButton.disabled = true;
            } else {
                conversionButton.disabled = false;
            }
        });

        fahrenheitTemperatureTextField.value = Number(celsiusTemperature) * 9 / 5 + 32;
        kelvinTemperatureTextField.value = Number(celsiusTemperature) + 273.15;
    });
});