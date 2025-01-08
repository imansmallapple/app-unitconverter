import resourceManager from '@ohos.resourceManager';

export class ResourceHelper {
  private resManager: resourceManager.ResourceManager;

  constructor(context: Context) {
    this.resManager = context.resourceManager;
  }

  release(): void {
    this.resManager?.release()
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