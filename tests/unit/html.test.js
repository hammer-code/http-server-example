import html from 'src/html';
import { InvalidArgumentError } from 'src/error';

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

test('cannot create html from empty array', () => {
  const tryToCreateHTML = () => {
    html([]);
  };

  expect(tryToCreateHTML).toThrow(InvalidArgumentError);
  expect(tryToCreateHTML).toThrow('data: Array argument should has at least one object element.');
});
