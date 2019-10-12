const subAB = (a, b = 2) => {
    return a + b
}

const fahrenheitToCelsius = (temp) => (temp - 32)/1.8

const celsiusToFahrenheit = (temp) => (temp * 1.8) + 32

module.exports = {
    subAB,
    fahrenheitToCelsius,
    celsiusToFahrenheit
}