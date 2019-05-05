
export default () => {
    /* eslint-disable no-restricted-globals*/
      self.addEventListener("message", e => {
        // eslint-disable-line no-restricted-globals
        if (!e) return;
          const {mangas} = e.data.args;
          const curDate = new Date().toString().substr(0,15);
          console.log(curDate)
          let items="<p>Latest Manga Updates!</p>";
          mangas.forEach(manga => {
            if(new Date(manga.ld*1000).toString().substr(0,15)===curDate){
                items+=`<p>${manga.t}</p>`
            }
          });
            
          console.log(items);

  
  
        postMessage({});
      });
    };
    