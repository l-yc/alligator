import Sidebar from '@/components/sidebar';
import DataTable from '@/components/dataTable';
import { log } from '@/modules/log';

import * as ace from 'ace-builds'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-textmate'

console.clear();

window.onload = () => {
  let sidebar: Sidebar = new Sidebar('#sidebar');

  const main: HTMLElement | null = document.querySelector('main');
  if (!main || !main.dataset.id) {
    log('main element not found');
    return;
  }

  const editor = ace.edit('editor', {
    mode: 'ace/mode/javascript',
    theme: 'ace/theme/textmate',
    maxLines: 16,
    minLines: 16
    //fontSize: 14
  });

  fetch('/api/hatchlings/get?' + new URLSearchParams({
    id: main.dataset.id
  }))
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      if (!data.success) throw new Error('Server response was not ok');

      let h = data.hatchlings[0];
      //let list: DataList = new DataList('#hatchling-info', h, [
      //  { name: 'Manage', key: 'id' }
      //]);
      editor.setValue(h.code);
    });
};
