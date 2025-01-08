interface MeasureLabels {
  length: Resource;
  pressure: Resource;
  temperature: Resource;
  volume: Resource;
  weight: Resource;
}

export const measureLabels: MeasureLabels = {
  length: $r('app.string.measure_length'),
  pressure: $r('app.string.measure_pressure'),
  temperature: $r('app.string.measure_temperature'),
  volume: $r('app.string.measure_volume'),
  weight: $r('app.string.measure_weight')
};