import { Unit } from '../model/Units';
import { TemperatureUnit } from '../model/TemperatureUnit';
import { MeasureFactory } from './MeasureFactory';


function convertCelsiusTo(unit: TemperatureUnit, value: number): number {
  switch(unit) {
    case TemperatureUnit.Celsius: return value;
    case TemperatureUnit.Kelvin: return (value - ABSOLUTE_ZERO_IN_CELSIUS);
    case TemperatureUnit.Fahrenheit:
      return ((value / CELSIUS_KELVIN_TO_FAHRENHEIT_RATIO) + CELSIUS_TO_FAHRENHEIT_OFFSET);
  }
}

function convertKelvinTo(unit: TemperatureUnit, value: number): number {
  switch(unit) {
    case TemperatureUnit.Celsius: return (value + ABSOLUTE_ZERO_IN_CELSIUS);
    case TemperatureUnit.Kelvin: return value;
    case TemperatureUnit.Fahrenheit:
      return ((value / CELSIUS_KELVIN_TO_FAHRENHEIT_RATIO) - KELVIN_TO_FAHRENHEIT_OFFSET);
  }
}

function convertFahrenheitTo(unit: TemperatureUnit, value: number): number {
  switch (unit) {
    case TemperatureUnit.Celsius:
      return ((value - CELSIUS_TO_FAHRENHEIT_OFFSET) * CELSIUS_KELVIN_TO_FAHRENHEIT_RATIO);
    case TemperatureUnit.Kelvin:
      return ((value + KELVIN_TO_FAHRENHEIT_OFFSET) * CELSIUS_KELVIN_TO_FAHRENHEIT_RATIO);
    case TemperatureUnit.Fahrenheit: return value;
  }
}

type TemperatureConverters = {
  [key in TemperatureUnit]: (unit: TemperatureUnit, value: number) => number;
};

const temperatureConverters: TemperatureConverters = {
  celsius: convertCelsiusTo,
  kelvin: convertKelvinTo,
  fahrenheit: convertFahrenheitTo
}

export class TemperatureFactory implements MeasureFactory {
  static create(): TemperatureFactory {
    return new TemperatureFactory();
  }

  getUnits(): Unit[] {
    return Object.values(TemperatureUnit);
  }

  convert(fromUnit: Unit, toUnit: Unit, value: number): number {
    return temperatureConverters[fromUnit as TemperatureUnit](toUnit as TemperatureUnit, value);
  }
}

const ABSOLUTE_ZERO_IN_CELSIUS = -273.15;
const CELSIUS_TO_FAHRENHEIT_OFFSET = 32;
const KELVIN_TO_FAHRENHEIT_OFFSET = 459.67;
const CELSIUS_KELVIN_TO_FAHRENHEIT_RATIO = 5 / 9;
