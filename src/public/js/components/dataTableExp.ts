import { log } from '@/modules/log';

const DataActionCookbook = {
  navigate: <T>(action: DataAction<T>, entry: T) => {
    let btn: any = document.createElement('button');
    btn.innerText = action.name;
    btn.name = action.alias || action.key;
    btn.value = entry[action.key]; // FIXME: should be a dict with string keys but idk how to type this properly

    btn.type = 'submit';
    btn.classList.add('btn');
    //btn.formAction = 'manage';
    return btn;
  }
}

interface DataAction<T> {
  name: string,
  key: string,
  alias: string | null,
  operation(action: DataAction<T>, entry: T): HTMLButtonElement
};

enum DataTableOrientation {
  HORIZONTAL,
  VERTICAL
};

class DataTable<T> {
  private el: HTMLElement;
  private keys: string[] | undefined;
  private data: any[] | undefined;
  private orientation: DataTableOrientation; 

  constructor(
      selector: string,
      keys: string[] | null,
      data: T[],
      actions: DataAction<T>[],
      orientation?: DataTableOrientation,
  ) {
    let elem: HTMLElement | null = document.querySelector(selector);
    if (elem === null) throw 'Table element not found!';
    else this.el = elem;

    this.orientation = orientation || DataTableOrientation.VERTICAL;
    if (keys) this.keys = keys;
    else this.autoKeys();

    this.populateTable(data, actions);
    this.attachListeners();
  }

  private autoKeys() {
    this.keys = [];
    if (this.orientation === DataTableOrientation.VERTICAL) {
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
    } else {
      let tbl: HTMLElement | null = this.el.querySelector('tbody');
      if (!tbl) throw 'Table does not have tbody!';

      let rows: HTMLCollection | null = tbl.children;
      if (!rows || rows.length === 0) throw 'Table is empty!';
      for (let i = 0; i < rows.length; ++i) {
        let row: HTMLElement = rows[i] as HTMLElement;
        if (!row.matches('tr')) throw 'Table has malformed rows!';
        let child: HTMLElement | null = row.children?.item(0) as (HTMLElement | null);
        log(child);
        if (!child || !child.matches('th') || !child.innerText) throw 'Table has malformed headers!';
        this.keys.push(child.innerText);
      }
    }
  }

  private populateTable(data: any[], actions: any[]) {
    let tbl: HTMLElement | null = this.el.querySelector('tbody');
    if (!tbl) throw 'Table does not have tbody!';

    this.data = data;
    if (this.orientation === DataTableOrientation.VERTICAL) {
      for (let h of this.data) {
        let row = document.createElement('tr');
        this.keys?.forEach((k: string) => {
          let cell: HTMLElement = document.createElement('td');
          if (!h[k]) {
              cell.innerText = 'undefined';
          } else if (k === 'id') { // truncate long ids
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
        tbl.appendChild(row);
      }
    } else {
      if (!this.keys) throw 'Table keys are not defined!';

      let rows: HTMLCollection = tbl.children;
      for (let h of this.data) {
        for (let i = 0; i < this.keys.length; ++i) {
          let k = this.keys[i];
          let cell: HTMLElement = document.createElement('td');
          if (!h[k]) {
            cell.innerText = 'undefined';
          } else if (k === 'id') { // truncate long ids
            cell.innerText = h[k].substr(0,8);
          } else {
            cell.innerText = h[k];
          }
          rows[i].appendChild(cell);
        }
      }
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

export default DataTable;
export { DataTable, DataAction, DataActionCookbook };
