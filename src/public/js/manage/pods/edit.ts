import Sidebar from '@/components/sidebar';
import DataTable from '@/components/dataTable';
import { log } from '@/modules/log';

console.clear();

window.onload = () => {
  let sidebar: Sidebar = new Sidebar('#sidebar');

  const main: HTMLElement | null = document.querySelector('main');
  if (!main || !main.dataset.id) {
    log('main element not found');
    return;
  }

  fetch('/api/pods/get?' + new URLSearchParams({
    id: main.dataset.id
  }))
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      if (!data.success) throw new Error('Server response was not ok');

      let p = data.pods[0];
      p.hatchlings.forEach(h => {
        log(h);
      });
      //let list: DataList = new DataList('#hatchling-info', h, [
      //  { name: 'Manage', key: 'id' }
      //]);
    });
};
