import { log } from '@/modules/log';

export default class DataList<T> {
  private el: HTMLElement;
  private keys: string[] | null;
  private data: T | undefined;

  constructor(
    selector: string,
    data: T,
    keys?: string[]
  ) {
    let elem: HTMLElement | null = document.querySelector(selector);
    if (elem === null) throw 'List element not found!';
    else this.el = elem;

    if (keys) this.keys = keys;
    else this.autoKeys(data);

    this.populateTable(data);
  }

  private autoKeys(data: T) {
    this.keys = Object.keys(data);
    if (!this.keys) throw 'Invalid keys!';
  }

  private populateTable(data: T) {
    let tbl: HTMLElement | null = this.el.querySelector('tbody');
    if (!tbl) throw 'Table does not have tbody!';

    this.data = data;
    this.keys?.forEach(k => {
      let row = document.createElement('tr');

      let header: HTMLElement = document.createElement('th');
      header.innerText = k;

      let cell: HTMLElement = document.createElement('td');
      cell.innerText = data[k] || 'undefined';

      row.appendChild(header);
      row.appendChild(cell);
      tbl?.appendChild(row);
    })
  }
}
