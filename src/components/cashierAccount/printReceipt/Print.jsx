import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Print = (props) => {
  console.log(props.order.order);
  const [drinkTotal, setDrinkTotal] = useState(0);
  const [foodTotal, setFoodTotal] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);

  const PrintReceipt = () => {
    let printContents = document.getElementById("printablediv").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  return (
    <div>
      <ul>
        {/* {props.order.order.food.length > 0
          ? props.order.order.food.map((item, index) => (
              <li key={index}>
                <span className="item">{item.itemName}</span>
                <span className="item">{item.quantity}</span>
                <span className="price">
                  {formatMoney(item.price * item.quantity)} FCFA
                </span>
              </li>
            ))
          : "No Orders On Food Made"} */}

        <li className="mt-3 total-list">
          <span className="total">Total price</span>
          <span className="total-price">{formatMoney(foodTotal)} FCFA</span>
        </li>
      </ul>
      <ul>
        {/* {props.order.order.drinks.length > 0
          ? props.order.order.drinks.map((item, index) => (
              <li key={index}>
                <span className="item">{item.itemName}</span>
                <span className="item">{item.quantity}</span>
                <span className="price">
                  {formatMoney(item.price * item.quantity)} FCFA
                </span>
              </li>
            ))
          : "No Order On Drinks Made"} */}
        <li className="mt-3 total-list">
          <span className="total">Total price</span>
          <span className="total-price">{formatMoney(drinkTotal)} FCFA</span>
        </li>
      </ul>
      <button to="/print">print</button>
    </div>
  );
};

export default Print;
