import ajax from './request';

export class API {
  public HomepageModules(params: {[key: string]: any} = {}):Promise<void> {
    return ajax<void>('post','/homepageModules',params)
  };
  public IntroductionModules(params: {[key: string]: any} = {}):Promise<void> {
    return ajax<void>('post','/introductionModules',params)
  };
}

export default new API();
