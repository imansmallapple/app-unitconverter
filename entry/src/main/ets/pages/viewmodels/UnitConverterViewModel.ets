import { Unit } from '../../model/Units';
import { measures, measureFactories, MeasureFactory } from '../../feature/MeasureFactory'
import { formatConversion } from '../../feature/ConversionFormatter';

export enum ConversionError {
  None,
  InvalidValue
}

@Observed
export class MeasurementUnit {
  unit: Unit;

  constructor(unit: Unit) {
    this.unit = unit;
  }
}

@Observed
export class UnitConverterViewModel {
  private measureFactory?: MeasureFactory;
  private measureIndex: number = 0;
  units: Unit[] = [];
  sourceUnit?: MeasurementUnit;
  targetUnit?: MeasurementUnit;
  conversionResult: string = '';
  value: string = '';
  conversionError: ConversionError = ConversionError.None;

  constructor() {
    this.setMeasure(0);
  }

  getMeasures() {
    return measures;
  }

  getCurrentMeasure() {
    return measures[this.measureIndex];
  }

  getCurrentMeasureIndex() {
    return this.measureIndex;
  }

  setMeasure(index: number) {
    this.measureIndex = index;
    const m = measures[this.measureIndex];
    this.measureFactory = measureFactories[m]();
    this.units = this.measureFactory!.getUnits();
    this.sourceUnit = new MeasurementUnit(this.units[0]);
    this.targetUnit = new MeasurementUnit(this.units[1]);
    this.convert();
  }

  exchangeUnits() {
    const temp = this.sourceUnit;
    this.sourceUnit = this.targetUnit;
    this.targetUnit = temp;
    this.convert();
  }

  convertValue(value: string) {
    this.value = value;
    this.convert();
  }

  convert() {
    if (this.value == '') {
      this.conversionResult = '';
    } else {
      const v = Number(this.value);
      if (isNaN(v)) {
        this.conversionResult = '';
        this.conversionError = ConversionError.InvalidValue;
      } else {
        this.conversionResult = formatConversion(
          this.measureFactory!.convert(this.sourceUnit.unit, this.targetUnit.unit, v)
        );
        this.conversionError = ConversionError.None;
      }
    }
  }
}