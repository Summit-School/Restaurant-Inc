import { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { onSnapshotFetchMenuItems } from "../../../api/firebase/menu.api.ts";

const Drinks = ({ drinks }) => {
  const [drinksList, setDrinkList] = useState([]);

  useEffect(() => {
    onSnapshotFetchMenuItems((response) => {
      let drinList = response.drinks.filter(
        (drink) => drink.disabled === false
      );
      setDrinkList(drinList);
      drinks = drinksList;
    });
  }, []);

  const actionDrinks = (action, index) => {
    if (action === "add") {
      drinksList[index].quantity = +drinksList[index].quantity + 1;
      setDrinkList([...drinksList]);
    }
    if (action === "remove" && drinksList[index].quantity > 0) {
      drinksList[index].quantity = +drinksList[index].quantity - 1;
      setDrinkList([...drinksList]);
    }
  };
  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  return (
    <>
      {drinksList
        ? drinksList.map((item, index) => (
            <tr key={index}>
              <td>{item.itemName}</td>
              <td>{formatMoney(item.price)} FCFA</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  className="minus"
                  onClick={() => actionDrinks("remove", index)}
                >
                  <AiOutlineMinus />
                </button>
                <button
                  className="plus"
                  onClick={() => actionDrinks("add", index)}
                >
                  <AiOutlinePlus />
                </button>
              </td>
            </tr>
          ))
        : "<p>No Menu Item</p>"}
    </>
  );
};

export default Drinks;
