import ajax from '../../common/request';

export class API {
  public HomepageModules(params: {[key: string]: any} = {}):Promise<void> {
    return ajax<void>('post','/homepageModules',params)
  }
}

export default new API();
