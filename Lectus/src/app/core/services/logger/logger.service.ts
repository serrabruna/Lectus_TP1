import { Injectable } from '@angular/core';
import { environment } from '../../../../../src/environments/environment.prod';


@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private readonly apiUrl = environment.apiUrl;

  info(msg: string, extra?: unknown) {
    //enviar um endpoint posteriormente
    console.info(msg, extra ?? '');
  }

  warn(msg: string, extra?: unknown) {
    console.warn(msg, extra ?? '');
  }

  error(msg: string, extra?: unknown) {
    console.error(msg, extra ?? '');
  }
}
