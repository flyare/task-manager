const { subAB, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')

test('sub function A and B', () => {
    const subab = subAB(1,2)
    expect(subab).toBe(3)
})

test('sub function with default value B', () => {
    const subab = subAB(2)
    expect(subab).toBe(4)
})

test("32 C celsius to 0 F fahrenheit", () => {
    const f = celsiusToFahrenheit(0)
    expect(f).toBe(32)
})

test("32 F fahrenheit to 0 Celsius", () => {
    const c = fahrenheitToCelsius(32)
    expect(c).toBe(0)
})

test("Async test demo", (done) => {
    setTimeout(() => {
        expect(1).toBe(1)
        done()
    }, 2000);
})