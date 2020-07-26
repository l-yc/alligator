import { log } from '@/modules/log';

export default class DataTable {
  private el: HTMLElement;
  private keys: string[] | undefined;
  private data: any[] | undefined;

  constructor(selector: string, keys: string[] | null, data: any[], actions: any[]) {
    let elem: HTMLElement | null = document.querySelector(selector);
    if (elem === null) throw 'Table element not found!';
    else this.el = elem;

    if (keys) this.keys = keys;
    else this.autoKeys();
    this.populateTable(data, actions);
    this.attachListeners();
  }

  private autoKeys() {
    this.keys = [];
    let headers: HTMLCollection | null = this.el.children[0]?.children;
    if (!headers) throw 'Table does not have headers!';
    if (headers.length !== 1) throw 'Table does not have exactly 1 set of headers';
    if (!headers[0].matches('tr')) throw 'Table has invalid headers';

    let h = headers[0].children;
    if (!h) throw 'Table has empty headers';
    for (let i = 0; i < h.length; ++i) {
      let child: HTMLElement = h[i] as HTMLElement;
      log(child);
      if (!child.matches('th') || !child.innerText) throw 'Table has malformed headers!';
      this.keys.push(child.innerText);
    }
  }

  private populateTable(data: any[], actions: any[]) {
    let tbl: HTMLElement | null = this.el.querySelector('tbody');
    if (!tbl) throw 'Table does not have tbody!';

    this.data = data;
    for (let h of this.data) {
      let row = document.createElement('tr');
      this.keys?.forEach((k: string) => {
        let cell: HTMLElement = document.createElement('td');
        let val: string;
        if (!h[k]) val = 'undefined';
        else {
          if (k === 'id') { // truncate long ids
            cell.innerText = h[k].substr(0,8);
          } else {
            cell.innerText = h[k];
          }
        }
        row.appendChild(cell);
      });

      let cell: HTMLElement = document.createElement('td');
      actions.forEach(a => {
        let btn: any = document.createElement('button');
        btn.innerText = a.name;
        btn.name = a.key;
        btn.value = h[a.key];
        btn.type = 'submit';
        btn.classList.add('btn');
        //btn.formAction = 'manage';
        cell.appendChild(btn);
      });
      row.appendChild(cell);

      log('created row', row);
      tbl.appendChild(row);
    }
  }

  private attachListeners() {
    this.el.addEventListener('click', e => {
      let clicked = e.target as HTMLElement;
      if (clicked.matches('.section > .title')) {
        let navList = clicked.nextElementSibling as HTMLElement;
        if (navList.style.maxHeight) {
          navList.style.maxHeight = '';
        } else {
          navList.style.maxHeight = navList.scrollHeight + "px";
        }
      }
    });
  }
}
