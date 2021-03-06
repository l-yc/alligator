const pods = [
  { id: '0a00c85d531755f41573fc46cd8f3335', name: 'pod1', hatchlings: ['0a00c85d531755f41573fc46cd8f3335', '6b55da91031efccd97bdf7a7bf4280ac'] },
  { id: '6b55da91031efccd97bdf7a7bf4280ac', name: 'pod2', hatchlings: [] },
  { id: 'a04109510f428fea59c4554fc0598721', name: 'pod3', hatchlings: [] },
  { id: '21033c1b2b557a30132ec1b6c8a6ab29', name: 'pod4', hatchlings: [] },
  { id: 'fd8c0864e15b5a5479bf96d0196cfb2a', name: 'pod5', hatchlings: [] },
  { id: 'acd615b1a0e9ca174d6d89ea58e1e755', name: 'pod6', hatchlings: [] },
  { id: '413866e257853db42241a2d06bf8a16d', name: 'pod7', hatchlings: [] },
  { id: 'abcfeb8523046956d29f3f7cc19f7b89', name: 'pod8', hatchlings: [] }
];

const hatchlings = [
  { id: '0a00c85d531755f41573fc46cd8f3335', name: 'hatchling1', code: 'console.log(\'test\')' },
  { id: '6b55da91031efccd97bdf7a7bf4280ac', name: 'hatchling2', code: '' },
  { id: 'a04109510f428fea59c4554fc0598721', name: 'hatchling3', code: '' },
  { id: '21033c1b2b557a30132ec1b6c8a6ab29', name: 'hatchling4', code: '' },
  { id: 'fd8c0864e15b5a5479bf96d0196cfb2a', name: 'hatchling5', code: '' },
  { id: 'acd615b1a0e9ca174d6d89ea58e1e755', name: 'hatchling6', code: '' },
  { id: '413866e257853db42241a2d06bf8a16d', name: 'hatchling7', code: '' },
  { id: 'abcfeb8523046956d29f3f7cc19f7b89', name: 'hatchling8', code: '' }
];

class Data {
  constructor() {}

  public getPods(filter: any): any {
    return pods.filter(p => {
      let ok = true;
      Object.keys(filter).forEach(k => {
        ok = ok && (p[k] === filter[k]);
      }); 
      return ok;
    }).map(p => {
      p.hatchlings = p.hatchlings.map(id => {
        return hatchlings.find(h => h.id == id);
      }).filter(h => !!h);
      return p;
    });
  }

  public getHatchlings(filter: any): any {
    return hatchlings.filter(h => {
      let ok = true;
      Object.keys(filter).forEach(k => {
        ok = ok && (h[k] === filter[k]);
      }); 
      return ok;
    });
  }
}

export default Data;
