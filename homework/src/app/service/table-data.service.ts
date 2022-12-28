import { Injectable } from '@angular/core';
import { TableData } from '../utils/constant/table-data';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  constructor() { }

  public GetTableData(): TableData[] {
    let arr: Array<TableData> = [];
    for (let i: number = 1; i < 100; i++) {
      arr.push({
        index: i,
        name: `Sample${i}`,
        type: `Group${(i % 2) + 1}`,
        desc: 'testทดสอบ1234',
        numbers: (i * i) % 10
      });
    }
    return arr;
  }

  public GetTableHeader(): Array<any> {
    return [
      { i: 'index', name: '#'},
      { i: 'name', name: 'name'},
      { i: 'type', name: 'type'},
      { i: 'desc', name: 'description'},
      { i: 'numbers', name: 'remaining'}
    ];
  }
}
