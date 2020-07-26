class Data {
  constructor() {}

  public getHatchlings(filter: any): any {
    const hatchlings = [
      { id: '0a00c85d531755f41573fc46cd8f3335', name: 'dummy1', code: 'console.log(\'test\')' },
      { id: '6b55da91031efccd97bdf7a7bf4280ac', name: 'dummy2', code: '' },
      { id: 'a04109510f428fea59c4554fc0598721', name: 'dummy3', code: '' },
      { id: '21033c1b2b557a30132ec1b6c8a6ab29', name: 'dummy4', code: '' },
      { id: 'fd8c0864e15b5a5479bf96d0196cfb2a', name: 'dummy5', code: '' },
      { id: 'acd615b1a0e9ca174d6d89ea58e1e755', name: 'dummy6', code: '' },
      { id: '413866e257853db42241a2d06bf8a16d', name: 'dummy7', code: '' },
      { id: 'abcfeb8523046956d29f3f7cc19f7b89', name: 'dummy8', code: '' }
    ];

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
