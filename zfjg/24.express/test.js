let reg = /user\/([^\/]+?)\/([^\/]+?)/;
let url = '/user/Michael/8';
let result = url.match(reg);

console.log(result);
console.log(result[0]);

/*
* [ 'user/Michael/8',
  'Michael',
  '8',
  index: 1,
  input: '/user/Michael/8' ]
*
* */