import { useState, useEffect } from "react";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";
import { toast } from "react-toastify";
import {
  onSnapshotFetchMenuItems,
  changeDisableState,
} from "../../../api/firebase/menu.api.ts";

const Foods = () => {
  const [menuList, setMenulist] = useState([]);
  const [editItem, setEditItem] = useState("");
  const [deleteItem, setDeleteItem] = useState("");
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    onSnapshotFetchMenuItems((response) => {
      setMenulist(response.food);
    });
  }, []);
  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  const disableItem = async (item) => {
    setDisable(!disable);

    try {
      const response = await changeDisableState(item.id, disable);
      if (response) {
        toast.success("Item Disabled state changed");
      }
    } catch (error) {
      toast.error("Failed");
      console.error(error);
    }
  };

  return (
    <>
      {menuList
        ? menuList.map((item, index) => (
            <tr key={index}>
              <td>{item.itemName}</td>
              <td>{formatMoney(item.price)} FCFA</td>
              <td className="action-btns">
                <button className="edit-btn" onClick={() => setEditItem(item)}>
                  Edit
                </button>

                {item.disabled === true ? (
                  <button
                    className="disable-btn"
                    style={{ backgroundColor: "orange" }}
                    onClick={() => disableItem(item)}
                  >
                    Enable
                  </button>
                ) : (
                  <button
                    className="disable-btn"
                    style={{ backgroundColor: "blue" }}
                    onClick={() => disableItem(item)}
                  >
                    Disable
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => setDeleteItem(item)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        : "<p>No Menu Item</p>"}
      <div>
        <EditItem
          item={editItem}
          show={!!editItem}
          onHide={() => setEditItem(false)}
        />
        <DeleteItem
          item={deleteItem}
          show={!!deleteItem}
          onHide={() => setDeleteItem(false)}
        />
      </div>
    </>
  );
};

export default Foods;
