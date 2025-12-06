import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'desconto',
  pure: true
})
export class DescontoPipe implements PipeTransform {

  transform(valor: number, percentual: number): number {
    let perc = Math.min(Math.max(percentual, 0), 100);
    let desc = valor * (1 - perc / 100);
    return Math.round(desc * 100) / 100;
  }

}