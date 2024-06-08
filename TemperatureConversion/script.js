document.addEventListener("DOMContentLoaded", function () {
    const celsiusTemperatureTextField = document.getElementById("celsius");
    const conversionButton = document.getElementById("conversion-button");

    let celsiusTemperature = celsiusTemperatureTextField.value;

    const convertTemperature = function () {
        conversionButton.disabled = false;
        conversionButton.classList.add("enabled");

        conversionButton.addEventListener("click", function () {
            const fahrenheitTemperatureTextField = document.getElementById("fahrenheit");
            fahrenheitTemperatureTextField.value = (Number(celsiusTemperature) * 9 / 5) + 32;

            const kelvinTemperatureTextField = document.getElementById("kelvin");
            kelvinTemperatureTextField.value = (Number(celsiusTemperature)) + 273.15;
        });
    };

    if (celsiusTemperature === "") {
        celsiusTemperatureTextField.value = 0;
        convertTemperature();
    }

    celsiusTemperatureTextField.addEventListener("keyup", function () {
        celsiusTemperature = celsiusTemperatureTextField.value;
        celsiusTemperatureTextField.classList.remove("invalid");

        if (isNaN(celsiusTemperature) || celsiusTemperature.length === 0) {
            celsiusTemperatureTextField.classList.add("invalid");

            conversionButton.disabled = true;
            conversionButton.classList.remove("enabled");
            conversionButton.classList.add("disabled");
        } else {
            conversionButton.classList.remove("disabled");
            conversionButton.classList.add("enabled");
            convertTemperature();
        }
    });
});