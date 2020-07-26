export default class Sidebar {
  private el: HTMLElement;

  constructor(selector: string) {
    let elem: HTMLElement | null = document.querySelector(selector);
    if (elem === null) { throw 'Sidebar element not found!'; }
    else this.el = elem;

    this.attachListeners();
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
