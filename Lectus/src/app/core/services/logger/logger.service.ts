import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  info (msg: string, extra?: unknown){
    //enviar um endpoint posteriormente
    console.info(msg, extra ?? '');
  }
//oi
  warn(msg: string, extra?: unknown){
    console.warn(msg, extra ?? '');
  }

  error(msg: string, extra?: unknown){
    console.error(msg, extra ?? '');
  }
}
