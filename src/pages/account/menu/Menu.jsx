import "./Menu.css";
import Layout from "../../../components/layout/Layout";
import AddMenu from "../../../components/account/menu/AddMenu";
import MenuList from "../../../components/account/menu/MenuList";

const Menu = () => {
  return (
    <Layout>
      <div className="menu-page-wrapper container">
        <div className="add-menu">
          <AddMenu />
        </div>
        <div className="menu-list">
          <MenuList />
        </div>
      </div>
    </Layout>
  );
};

export default Menu;
