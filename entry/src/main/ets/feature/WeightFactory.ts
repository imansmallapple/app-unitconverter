import { Unit } from '../model/Units';
import { Kilo } from '../model/MetricSystem';
import { WeightUnit } from '../model/WeightUnit';
import { MeasureFactory } from './MeasureFactory';

function convertGramTo(unit: WeightUnit, value: number): number {
  switch(unit) {
    case WeightUnit.Gram: return value;
    case WeightUnit.Kilogram: return value / Kilo;
    case WeightUnit.Pound: return (value / GRAMS_IN_POUND);
  }
}

function convertKilogramTo(unit: WeightUnit, value: number): number {
  return convertGramTo(unit, value * Kilo);
}

function convertPoundTo(unit: WeightUnit, value: number): number {
  switch(unit) {
    case WeightUnit.Gram: return (value * GRAMS_IN_POUND);
    case WeightUnit.Kilogram: return (value * GRAMS_IN_POUND) / Kilo;
    case WeightUnit.Pound: return value;
  }
}

type WeightConverters = {
  [key in WeightUnit]: (unit: WeightUnit, value: number) => number;
};

const weightConverters: WeightConverters = {
  gram: convertGramTo,
  kilogram: convertKilogramTo,
  pound: convertPoundTo
}

export class WeightFactory implements MeasureFactory {
  static create(): WeightFactory {
    return new WeightFactory();
  }

  getUnits(): Unit[] {
    return Object.values(WeightUnit);
  }

  convert(fromUnit: Unit, toUnit: Unit, value: number): number {
    return weightConverters[fromUnit as WeightUnit](toUnit as WeightUnit, value);
  }
}

const GRAMS_IN_POUND = 453.59237;