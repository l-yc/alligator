import Sidebar from '@/components/sidebar';
import Table from '@/components/dataTable';
import { log } from '@/modules/log';

console.clear();

window.onload = () => {
  let sidebar: Sidebar = new Sidebar('#sidebar');

  fetch('/api/hatchlings/get')
    .then(res => res.json())
    .then(data => {
      let table: Table = new Table('#hatchling-list', data.hatchlings, [
        { name: 'Manage', key: 'id' }
      ]);
    });
};
