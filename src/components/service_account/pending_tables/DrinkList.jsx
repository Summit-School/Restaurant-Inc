import React from "react";

const DrinkList = ({ order }) => {
  let drinkTotal = 0;
  order.drinks.map((drink) => {
    drinkTotal += drink.price * drink.quantity;
  });

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  return (
    <ul>
      {order.drinks.map((item, index) => (
        <li key={index}>
          <span className="item">{item.itemName}</span>
          <span className="item">{item.quantity}</span>
          <span className="price">
            {formatMoney(item.price * item.quantity)} FCFA
          </span>
        </li>
      ))}
      <li className="mt-3 total-list">
        <span className="total">Total price</span>
        <span className="total-price">{formatMoney(drinkTotal)} FCFA</span>
      </li>
    </ul>
  );
};

export default DrinkList;
