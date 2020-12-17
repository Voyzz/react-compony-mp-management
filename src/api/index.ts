import ajax from './request';

export class API {
  public HomepageModules(params: {[key: string]: any} = {}):Promise<void> {
    return ajax<void>('post','/homepageModules',params)
  };
  public IntroductionModules(params: {[key: string]: any} = {}):Promise<void> {
    return ajax<void>('post','/introductionModules',params)
  };
  public AddProduct(params: {[key: string]: any} = {}):Promise<void> {
    return ajax<void>('post','/addProduct',params)
  };
  public GetProductList(params: {[key: string]: any} = {}):Promise<void> {
    return ajax<void>('post','/getProductList',params)
  };
  public UpdateProduct(params: {[key: string]: any} = {}):Promise<void> {
    return ajax<void>('post','/updateProduct',params)
  };
  public DeleteProduct(params: {[key: string]: any} = {}):Promise<void> {
    return ajax<void>('post','/deleteProduct',params)
  };
}

export default new API();
