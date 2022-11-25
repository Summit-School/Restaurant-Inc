import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Print = (props) => {
  const [drinkTotal, setDrinkTotal] = useState(0);
  const [foodTotal, setFoodTotal] = useState(0);
  const [printDetails, setPrintDetails] = useState();
  console.log(printDetails);

  const location = useLocation();

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

  useEffect(() => {
    if (location.state) {
      const details = location.state.details;
      setPrintDetails(details);

      let drinksSum = 0;
      let foodSum = 0;

      details.order.food.map((food, index) => {
        drinksSum += food.price * food.quantity;
      });

      details.order.drinks.map((drink, index) => {
        foodSum += drink.price * drink.quantity;
      });

      setDrinkTotal(drinksSum);
      setFoodTotal(foodSum);
    }
  }, [location]);

  return (
    <div>
      <ul>
        {printDetails.order.food.length > 0
          ? printDetails.order.food.map((item, index) => (
              <li key={index}>
                <span className="item">{item.itemName}</span>
                <span className="item">{item.quantity}</span>
                <span className="price">
                  {formatMoney(item.price * item.quantity)} FCFA
                </span>
              </li>
            ))
          : "No Orders On Food Made"}

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
