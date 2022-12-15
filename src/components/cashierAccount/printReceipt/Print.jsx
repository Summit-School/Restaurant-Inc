import "./Print.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Print = (props) => {
  const [drinkTotal, setDrinkTotal] = useState(0);
  const [foodTotal, setFoodTotal] = useState(0);
  const [printDetails, setPrintDetails] = useState();
  const [drinks, setDrinks] = useState([]);
  const [food, setFood] = useState([]);

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
        foodSum += food.price * food.quantity;
      });

      details.order.drinks.map((drink, index) => {
        drinksSum += drink.price * drink.quantity;
      });

      setDrinks(details.order.drinks);
      setFood(details.order.food);

      setDrinkTotal(drinksSum);
      setFoodTotal(foodSum);

      setDrinkTotal(drinksSum);
      setFoodTotal(foodSum);
    }
  }, [location]);

  return (
    <div>
      <div id="printablediv">
        <div className="print-logo">
          <img src="/images/logo.jpeg" alt="" />
        </div>
        <p className="print-title">
          PABLO LOUNGE BUEA: +237677522236/+237681796710{" "}
        </p>
        <hr />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Food</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className="foodlist">
            {food.length > 0
              ? food.map((item, index) => (
                  <tr key={index}>
                    <td className="item">{item.itemName}</td>
                    <td className="item">{item.quantity}</td>
                    <td className="price">
                      {formatMoney(item.price * item.quantity)} FCFA
                    </td>
                  </tr>
                ))
              : "No Orders On Food Made"}

            <tr className="total-list">
              <td className="total">Total price</td>
              <td className="total-price">{formatMoney(foodTotal)} FCFA</td>
            </tr>
          </tbody>
        </table>

        <table className="table table-striped table-two">
          <thead>
            <tr>
              <th>Drink</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className="drinklist">
            {drinks.length > 0
              ? drinks.map((item, index) => (
                  <tr key={index}>
                    <td className="item">{item.itemName}</td>
                    <td className="item">{item.quantity}</td>
                    <td className="price">
                      {formatMoney(item.price * item.quantity)} FCFA
                    </td>
                  </tr>
                ))
              : "No Order On Drinks Made"}
            <tr className="total-list">
              <td className="total">Total price</td>
              <td className="total-price">{formatMoney(drinkTotal)} FCFA</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="print-btn-div">
        <button className="print-btn" onClick={PrintReceipt}>
          print
        </button>
      </div>
    </div>
  );
};

export default Print;
