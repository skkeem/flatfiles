const fs = require('fs');

// Input : path
// Output : Promise for list of all files(not directory) in the given path.
function getFiles(path) {
  return new Promise((ful_lstat, rej_lstat) => {
    fs.lstat(path, (err, stats) => {
      if (err)
        return rej_lstat(path);

      // Base case: is File
      if (stats.isFile()) {
        return ful_lstat([path]);
      }
      // Inductive case: is Directory
      else if(stats.isDirectory()) {
        const ret = new Promise((ful_readdir, rej_readdir) => {

          fs.readdir(path, (err, files) => {
            if (err)
              return rej_readdir(path);

            const promises = files.map(file => getFiles(path+'/'+file));

            return ful_readdir(Promise.all(promises));
          });
        });

        return ful_lstat(ret);
      }
    });
  });
}

getFiles('./a').then(values => console.log(values));
console.log('==여기 위로 뭐 프린트 되면 차감==')
