import { ResourceHelper } from '../resources/ResourceHelper';
import { unitLabels } from '../resources/UnitLabels';
import { Unit } from '../model/Units';
import { MeasurementUnit } from '../pages/viewmodels/UnitConverterViewModel';

@Component
export struct UnitSelector {
  caption: Resource | string = ''
  @Prop units: Unit[] = []
  @ObjectLink value: MeasurementUnit
  onUnitChange?: () => void;

  private resManager!: ResourceHelper;

  aboutToAppear(): void {
    this.resManager = new ResourceHelper(getContext(this));
  }

  aboutToDisappear() {
    this.resManager?.release();
  }

  getLabel(unit: Unit): string {
    return this.resManager.getString(Object(unitLabels)[unit], unit);
  }
  getSelected(): number {
    if (this.value) return this.units.indexOf(this.value.unit);
    return -1;
  }

  build() {
    Row() {
      Text(this.caption)
        .fontSize(18)
      Select(this.units.map<SelectOption>((val) => ({value: this.getLabel(val)})))
        .value(this.getLabel(this.value?.unit))
        .selected(this.getSelected())
        .onSelect((index: number) => {
          this.value.unit = this.units[index];
          this.onUnitChange?.();
      })
        .margin(10)
    }
    .width('100%')
    .justifyContent(FlexAlign.Start)
  }
}