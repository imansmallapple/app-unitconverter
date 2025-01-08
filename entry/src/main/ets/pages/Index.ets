import { ResourceHelper } from '../resources/ResourceHelper';
import { measureLabels } from '../resources/MeasureLabels';
import { UnitSelector } from '../components/UnitSelector';
import { UnitConverterViewModel, ConversionError } from './viewmodels/UnitConverterViewModel';

@Entry
@Component
struct Index {
  @State unitConverter: UnitConverterViewModel = new UnitConverterViewModel();
  private resManager!: ResourceHelper;

  aboutToAppear(): void {
    this.resManager = new ResourceHelper(getContext());
  }

  aboutToDisappear() {
    this.resManager?.release();
  }

  getMeasureLabel(measure: string): Resource {
    return $r(`app.string.measure_${measure}`);
  }

  getCurrentMeasureLabel(): string {
    const measure = this.unitConverter.getCurrentMeasure();
    return this.resManager.getString(Object(measureLabels)[measure], measure);
  }

  onValueChange(value: string) {
      this.unitConverter.convertValue(value);
  }

  build() {
    Column() {
      Row() {
        Text($r('app.string.EntryAbility_label'))
          .fontSize(28)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)
      }
      .width('100%')
      .height(64)
      .justifyContent(FlexAlign.Center)
      .alignItems(VerticalAlign.Center)
      .backgroundColor(0x08205E)

      Column() {
        Row() {
          Text($r('app.string.measure'))
            .fontSize(28)
            .fontWeight(FontWeight.Bold)
          Select(this.unitConverter.getMeasures()
            .map<SelectOption>((val) => ({ value: this.getMeasureLabel(val) }))
          )
            .onSelect((index: number) => {
              this.unitConverter.setMeasure(index);
            })
            .margin(10)
            .selected(this.unitConverter.getCurrentMeasureIndex())
            .value(this.getCurrentMeasureLabel())
        }
        .width('100%')
        .justifyContent(FlexAlign.Start)
        Divider()
        Row() {
          Column() {
            UnitSelector({
              caption: $r('app.string.from'),
              units: this.unitConverter.units,
              value: this.unitConverter.sourceUnit,
              onUnitChange: (() => {
                this.unitConverter.convert();
              })
            })
            TextInput({ text: this.unitConverter.value, placeholder: $r('app.string.conversion_prompt') })
              .fontSize(CONVERSION_TEXT_FONT_SIZE)
              .textAlign(TextAlign.End)
              .placeholderColor(Color.Grey)
              .placeholderFont({ size: CONVERSION_TEXT_FONT_SIZE })
              .inputFilter(INPUT_REGEX_DIGITS_AND_DOT)
              .fieldStyle()
              .onChange((value: string) => this.onValueChange(value))
            if (this.unitConverter.conversionError == ConversionError.InvalidValue) {
              Text(this.resManager.getString($r('app.string.invalid_input_value')))
                .width('80%')
                .height(ERROR_MESSAGE_HEIGHT)
                .textAlign(TextAlign.Center)
                .fontColor(Color.White)
                .backgroundColor(TEXT_INPUT_BORDER_COLOR)
            } else {
              Blank().height(ERROR_MESSAGE_HEIGHT)
            }
            UnitSelector({
              caption: $r('app.string.to'),
              units: this.unitConverter.units,
              value: this.unitConverter.targetUnit,
              onUnitChange: (() => {
                this.unitConverter.convert();
              })
            })
            Text(this.unitConverter.conversionResult)
              .fontSize(CONVERSION_TEXT_FONT_SIZE)
              .textAlign(TextAlign.End)
              .fieldStyle()
              .backgroundColor(0xD4EFFF)
          }
          .width('80%')
          Column() {
            Image($r('app.media.up_down'))
              .width(ICON_BUTTON_SIZE)
              .height(ICON_BUTTON_SIZE)
              .onClick(() => {
                this.unitConverter.exchangeUnits()
              })
          }
          .width('20%')
          .alignItems(HorizontalAlign.End)
        }
        .width('100%')
        .justifyContent(FlexAlign.Start)
      }
      .height('100%')
      .width('100%')
      .padding(10)
      .backgroundColor(0xE7f6FF)
    }
  }
}

@Styles function fieldStyle () {
  .width('100%')
  .height(52)
  .padding({ right: 16 })
  .border({
    width: 2,
    color: TEXT_INPUT_BORDER_COLOR,
    radius: 20
  })
  .backgroundColor('#FFFFFF')
}

const INPUT_REGEX_DIGITS_AND_DOT = '[0-9.]';
const ERROR_MESSAGE_HEIGHT = 20;
const CONVERSION_TEXT_FONT_SIZE = 28;
const ICON_BUTTON_SIZE = 48;
const TEXT_INPUT_BORDER_COLOR = 0x2B7AFF;