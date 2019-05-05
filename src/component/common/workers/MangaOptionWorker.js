export default () => {
  /* eslint-disable no-restricted-globals*/
    self.addEventListener("message", e => {
      // eslint-disable-line no-restricted-globals
      if (!e) return;
        const args = e.data.args;
        let {chapters} = args;
        let options="";
        chapters.forEach((chapter, index) => {
          if(chapter[3]===args.currentChapter){
            options+=`<option selected value='${chapter[3]}*${index}'>${chapter[0]}</option>`
          }else{
            options+=`<option value='${chapter[3]}*${index}'>${chapter[0]}</option>`
          }
        });
        


      postMessage({options});
    });
  };
  