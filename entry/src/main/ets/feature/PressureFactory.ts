import { Unit } from '../model/Units';
import { PressureUnit } from '../model/PressureUnit';
import { MeasureFactory } from './MeasureFactory';


function convertPascalTo(unit: PressureUnit, value: number): number {
  switch(unit) {
    case PressureUnit.Pascal: return value;
    case PressureUnit.Bar: return (value / PASCALS_IN_BAR);
    case PressureUnit.Psi: return (value / PASCALS_IN_PSI);
  }
}

function convertBarTo(unit: PressureUnit, value: number): number {
  switch(unit) {
    case PressureUnit.Pascal: return (value * PASCALS_IN_BAR);
    case PressureUnit.Bar: return value;
    case PressureUnit.Psi: return (value * PSIS_IN_BAR);
  }
}

function convertPsiTo(unit: PressureUnit, value: number): number {
  switch (unit) {
    case PressureUnit.Pascal: return (value * PASCALS_IN_PSI);
    case PressureUnit.Bar: return (value / PSIS_IN_BAR);
    case PressureUnit.Psi: return value;
  }
}

type PressureConverters = {
  [key in PressureUnit]: (unit: PressureUnit, value: number) => number;
};

const pressureConverters: PressureConverters = {
  pascal: convertPascalTo,
  bar: convertBarTo,
  psi: convertPsiTo
}

export class PressureFactory implements MeasureFactory {
  static create(): PressureFactory {
    return new PressureFactory();
  }

  getUnits(): Unit[] {
    return Object.values(PressureUnit);
  }

  convert(fromUnit: Unit, toUnit: Unit, value: number): number {
    return pressureConverters[fromUnit as PressureUnit](toUnit as PressureUnit, value);
  }
}

const PASCALS_IN_BAR = 100000;
const PASCALS_IN_PSI = 6894.7572931783;
const PSIS_IN_BAR = 14.503773773;