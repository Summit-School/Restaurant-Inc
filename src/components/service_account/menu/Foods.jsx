import { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { onSnapshotFetchMenuItems } from "../../../api/firebase/menu.api.ts";

const Foods = ({ foods }) => {
  const [menuList, setMenulist] = useState([]);

  useEffect(() => {
    onSnapshotFetchMenuItems((response) => {
      let foodList = response.food.filter((food) => food.disabled === false);
      setMenulist(foodList);
      foods = foodList;
    });
  }, []);

  const actionFood = (action, index) => {
    if (action === "add") {
      menuList[index].quantity = +menuList[index].quantity + 1;
      setMenulist([...menuList]);
    }
    if (action === "remove" && menuList[index].quantity > 0) {
      menuList[index].quantity = +menuList[index].quantity - 1;
      setMenulist([...menuList]);
    }
  };

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  return (
    <>
      {menuList
        ? menuList.map((item, index) => (
            <tr key={index}>
              <td>{item.itemName}</td>
              <td>{formatMoney(item.price)} FCFA</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  className="minus"
                  onClick={() => actionFood("remove", index)}
                >
                  <AiOutlineMinus />
                </button>
                <button
                  className="plus"
                  onClick={() => actionFood("add", index)}
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

export default Foods;
