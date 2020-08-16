import Sidebar from '@/components/sidebar';
import Table from '@/components/dataTable';
import { log } from '@/modules/log';

console.clear();

window.onload = () => {
  let sidebar: Sidebar = new Sidebar('#sidebar');

  fetch('/api/pods/get')
    .then(res => res.json())
    .then(data => {
      let table: Table = new Table('#pod-list', 
        [ 'id', 'name' ],
        data.pods, 
        [
          { name: 'Manage', key: 'id' }
        ]
      );
    });
};
