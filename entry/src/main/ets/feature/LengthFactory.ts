import { Unit } from '../model/Units';
import { Kilo } from '../model/MetricSystem';
import { LengthUnit } from '../model/LengthUnit';
import { MeasureFactory } from './MeasureFactory';

function convertMeterTo(unit: LengthUnit, value: number): number {
  switch(unit) {
    case LengthUnit.Meter: return value;
    case LengthUnit.Kilometer: return value / Kilo;
    case LengthUnit.Mile: return value / METERS_IN_MILE;
    case LengthUnit.Foot: return (value * FEET_IN_METER);
    case LengthUnit.Inch: return (value * INCHES_IN_METER);
  }
}

function convertKilometerTo(unit: LengthUnit, value: number): number {
  return convertMeterTo(unit, value * Kilo);
}

function convertMileTo(unit: LengthUnit, value: number): number {
  switch(unit) {
    case LengthUnit.Meter: return value * METERS_IN_MILE;
    case LengthUnit.Kilometer: return (value * METERS_IN_MILE) / Kilo;
    case LengthUnit.Mile: return value;
    case LengthUnit.Foot: return (value * FEET_IN_MILE);
    case LengthUnit.Inch: return (value * INCHES_IN_MILE);
  }
}

function convertFootTo(unit: LengthUnit, value: number): number {
  switch (unit) {
    case LengthUnit.Meter: return (value / FEET_IN_METER);
    case LengthUnit.Kilometer: return (value / FEET_IN_METER) / Kilo;
    case LengthUnit.Mile: return (value / FEET_IN_MILE);
    case LengthUnit.Foot: return value;
    case LengthUnit.Inch: return (value * INCHES_IN_FOOT);
  }
}

function convertInchTo(unit: LengthUnit, value: number): number {
  switch (unit) {
    case LengthUnit.Meter: return (value / INCHES_IN_METER);
    case LengthUnit.Kilometer: return (value / INCHES_IN_METER) / Kilo;
    case LengthUnit.Mile: return (value / INCHES_IN_MILE);
    case LengthUnit.Foot: return (value / INCHES_IN_FOOT);
    case LengthUnit.Inch: return value;
  }
}

type LengthConverters = {
  [key in LengthUnit]: (unit: LengthUnit, value: number) => number;
};

const lengthConverters: LengthConverters = {
  meter: convertMeterTo,
  kilometer: convertKilometerTo,
  mile: convertMileTo,
  foot: convertFootTo,
  inch: convertInchTo
}

export class LengthFactory implements MeasureFactory {
  static create(): LengthFactory {
    return new LengthFactory();
  }

  getUnits(): Unit[] {
    return Object.values(LengthUnit);
  }

  convert(fromUnit: Unit, toUnit: Unit, value: number): number {
    return lengthConverters[fromUnit as LengthUnit](toUnit as LengthUnit, value);
  }
}

const METERS_IN_MILE = 1609.344;
const FEET_IN_MILE = 5280;
const FEET_IN_METER = 3.280839895;
const INCHES_IN_MILE = 63360;
const INCHES_IN_METER = 39.3700787402;
const INCHES_IN_FOOT = 12;
