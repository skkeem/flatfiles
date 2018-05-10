new Promise((ful, rej) => {
  setTimeout(() => {
    ful(Promise.reject());
  },1000);
});
