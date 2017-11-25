const html = require('src/html');

const data = [
  { title: 'Arduino Uno', price: 20 },
  { title: 'LittleBits Space Kit', price: 21 },
];

test('can create html from array', () => {
  expect(html(data)).toContain('<p>title: Arduino Uno.price: 20</p>');
  expect(html(data)).toContain('<p>title: LittleBits Space Kit.price: 21</p>');
});

test('can create html from object', () => {
  const product = data[0];
  expect(html(product)).toContain('<p>title: Arduino Uno.price: 20</p>');
});
