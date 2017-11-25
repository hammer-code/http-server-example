const csv = require('src/csv');

const data = [
  { title: 'Arduino Uno', price: 20 },
  { title: 'LittleBits Space Kit', price: 21 },
];

test('can create csv from array', () => {
  expect(csv(data)).toContain('title,price');
  expect(csv(data)).toContain('Arduino Uno,20');
  expect(csv(data)).toContain('LittleBits Space Kit,21');
});

test('can create csv from object', () => {
  const product = data[0];
  expect(csv(product)).toContain('title,price');
  expect(csv(product)).toContain('Arduino Uno,20');
  expect(csv(product)).not.toContain('LittleBits Space Kit,21');
});
