import { Measure } from '../model/Measure';
import { Unit } from '../model/Units';
import { LengthFactory } from './LengthFactory';
import { PressureFactory } from './PressureFactory';
import { TemperatureFactory } from './TemperatureFactory';
import { VolumeFactory } from './VolumeFactory';
import { WeightFactory } from './WeightFactory';

export interface MeasureFactory {
  getUnits(): Unit[]
  convert(fromUnit: Unit, toUnit: Unit, value: number): number
}

type MeasureFactories = {
  [key in Measure]: () => MeasureFactory;
};

export const measureFactories: MeasureFactories = {
  length: () => LengthFactory.create(),
  weight: () => WeightFactory.create(),
  volume: () => VolumeFactory.create(),
  temperature: () => TemperatureFactory.create(),
  pressure: () => PressureFactory.create()
}

export const measures = Object.keys(measureFactories);
