import { resourceManager } from '@kit.LocalizationKit';

export class ResourceHelper {
  private resManager: resourceManager.ResourceManager;

  constructor(context: Context) {
    this.resManager = context.resourceManager;
  }

  getString(resource: Resource, defaultValue: string = ''): string {
    let result: string = defaultValue;
    try {
      ;
      result = this.resManager.getStringSync(resource);
    } catch (e) {
      console.error(`resourceManager.getStringSync failed, error code: ${e.code}, message: ${e.message}.`)
    }
    return result;
  }
}