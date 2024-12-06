import { Unit } from '../model/Units';
import { VolumeUnit } from '../model/VolumeUnit';
import { MeasureFactory } from './MeasureFactory';

function convertLiterTo(unit: VolumeUnit, value: number): number {
  switch(unit) {
    case VolumeUnit.Liter: return value;
    case VolumeUnit.GallonUS: return (value / LITERS_IN_US_GALLON);
    case VolumeUnit.GallonUK: return (value / LITERS_IN_UK_GALLON);
  }
}

function convertGallonUsTo(unit: VolumeUnit, value: number): number {
  switch(unit) {
    case VolumeUnit.Liter: return (value * LITERS_IN_US_GALLON);
    case VolumeUnit.GallonUS: return value;
    case VolumeUnit.GallonUK: return (value / US_GALLONS_IN_UK_GALLON);
  }
}

function convertGallonUkTo(unit: VolumeUnit, value: number): number {
  switch(unit) {
    case VolumeUnit.Liter: return (value * LITERS_IN_UK_GALLON);
    case VolumeUnit.GallonUS: return (value * US_GALLONS_IN_UK_GALLON);
    case VolumeUnit.GallonUK: return value;
  }
}

type VolumeConverters = {
  [key in VolumeUnit]: (unit: VolumeUnit, value: number) => number;
};

const volumeConverters: VolumeConverters = {
  liter: convertLiterTo,
  gallon_us: convertGallonUsTo,
  gallon_uk: convertGallonUkTo
}

export class VolumeFactory implements MeasureFactory {
  static create(): VolumeFactory {
    return new VolumeFactory();
  }

  getUnits(): Unit[] {
    return Object.values(VolumeUnit);
  }

  convert(fromUnit: Unit, toUnit: Unit, value: number): number {
    return volumeConverters[fromUnit as VolumeUnit](toUnit as VolumeUnit, value);
  }
}

const LITERS_IN_US_GALLON = 3.785411784;
const LITERS_IN_UK_GALLON = 4.54609;
const US_GALLONS_IN_UK_GALLON = 1.2009499255;