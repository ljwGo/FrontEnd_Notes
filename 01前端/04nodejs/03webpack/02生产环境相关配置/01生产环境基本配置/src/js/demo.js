const a = 'wgaga';

const p = new Promise((resolve) => {
  setTimeout(() => {
    resolve('hahahah');
  }, 2000);
});

p.then((value) => {
  console.log(value);
});

console.log(a);
