const fs = require('fs');

function flatten(arr) {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

// Input : path
// Output : Promise for list of all files(not directory) in the given path.
function flatFiles(path) {
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

            const promises = files.map(file => flatFiles(path+'/'+file));

            return ful_readdir(Promise.all(promises).then(values => flatten(values)));
          });
        });

        return ful_lstat(ret);
      }
    });
  });
}

flatFiles('./a').then(values => console.log(values));
console.log('===There shall be no output above this line===');
