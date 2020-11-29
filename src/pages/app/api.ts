// import {CurUser, LoginRequest, Notices, RegisterRequest, guest} from 'entity/session';

// import {ProjectConfig} from 'entity';
import ajax from '../../common/request';

// export function setCookie(name: string, value: string, expiredays: number) {
//   const exdate = new Date();
//   exdate.setDate(exdate.getDate() + expiredays);
//   document.cookie = `${name}=${escape(value)};expires=${exdate.toUTCString()};path=/`;
// }

export class API {
  public getHomepageData():Promise<void> {
    return ajax<void>('post','/api/homepageModules')
  }
}

export default new API();
