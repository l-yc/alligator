import Sidebar from '@/components/sidebar';
import { DataTable, DataAction, DataActionCookbook } from '@/components/dataTable';
import { log } from '@/modules/log';

console.clear();

window.onload = () => {
  let sidebar: Sidebar = new Sidebar('#sidebar');

  fetch('/api/pods/get')
    .then(res => res.json())
    .then(data => {
      let table: DataTable<any> = new DataTable('#pod-list', 
        [ 'id', 'name' ],
        data.pods, 
        [
          <DataAction<any>> { name: 'Manage', key: 'id', operation: DataActionCookbook.navigate }
        ]
      );
    });
};
