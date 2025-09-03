import 'bulma/css/bulma.css';
import cn from 'classnames';
import { useState } from 'react';
import './App.scss';
import { ProductList } from './components/productList';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

function goodList(list, { sortProduct, reverse = '' }) {
  const newGoodList = [...list];

  if (sortProduct) {
    newGoodList.sort((poz1, poz2) => {
      switch (sortProduct) {
        case 'alphabetically':
          return poz1.localeCompare(poz2);

        case 'length':
          return poz1.length - poz2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse === 'reverse') {
    newGoodList.reverse();
  }

  return newGoodList;
}

export const App = () => {
  const [sortProduct, setSortProduct] = useState('');
  const [reverse, setReverse] = useState('');
  const visibleProduct = goodList(goodsFromServer, {
    sortProduct,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortProduct !== 'alphabetically',
          })}
          onClick={() => setSortProduct('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortProduct !== 'length',
          })}
          onClick={() => setSortProduct('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverse !== 'reverse',
          })}
          onClick={() => setReverse(ch => (ch !== 'reverse' ? 'reverse' : ''))}
        >
          Reverse
        </button>

        {(sortProduct || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortProduct('');
              setReverse('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ProductList products={visibleProduct} />
    </div>
  );
};
