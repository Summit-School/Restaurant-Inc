import React from "react";

const FoodList = ({ order }) => {
  let foodTotal = 0;
  order.food.map((food) => {
    foodTotal += food.price * food.quantity;
  });

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  return (
    <ul>
      {order.food.map((item, index) => (
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
        <span className="total-price">{formatMoney(foodTotal)} FCFA</span>
      </li>
    </ul>
  );
};

export default FoodList;
