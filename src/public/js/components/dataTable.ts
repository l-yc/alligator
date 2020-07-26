import { log } from '@/modules/log';

export default class DataTable {
  private el: HTMLElement;
  private data: any[];

  constructor(selector: string, data: any[], actions: any[]) {
    let elem: HTMLElement | null = document.querySelector(selector);
    if (elem === null) { throw 'Table element not found!'; }
    else this.el = elem;

    this.data = data;
    this.populateTable(actions);
    this.attachListeners();
  }

  private populateTable(actions: any[]) {
    for (let h of this.data) {
      let row = document.createElement('tr');
      Object.keys(h).forEach((k: string) => {
        let cell: HTMLElement = document.createElement('td');
        if (k === 'id') {
          cell.innerText = h[k].substr(0,8);
        } else {
          cell.innerText = h[k];
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
      this.el.appendChild(row);
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
