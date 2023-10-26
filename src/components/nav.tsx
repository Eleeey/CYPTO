import  { useState, useEffect } from "react";
import { Button, Menu, Typography, } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
// import { icons } from "antd/es/image/PreviewGroup";
// import icon from "../img/icons8-cryptocurrency-64.png";
// import icon2 from "../img/icons8-cryptocurrency-50.png";
// import "bootstrap/dist/css/bootstrap.css";

const Nav = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    //@ts-ignore
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    //@ts-ignore
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <>
      <div className="logo-container">
        <Typography.Title level={2} className="logo">
          <Link className="text-secondary" to="/">
            CYPTO
          </Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {/* nav items */}
      {activeMenu && (
        <Menu className="menu" theme="light">
          <Menu.Item className="menu-items" icon={<HomeOutlined />}>
            <Link to={"/"}>Home</Link>
          </Menu.Item>
          <Menu.Item className="menu-items" icon={<FundOutlined />}>
            <Link to={"/cryptocurrencies"}>Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item className="menu-items" icon={<MoneyCollectOutlined />}>
            <Link to={"/exchanges"}>Exchanges</Link>
          </Menu.Item>
          <Menu.Item className="menu-items" icon={<BulbOutlined />}>
            <Link to={"/news"}>News</Link>
          </Menu.Item>
        </Menu>
      )}
    </>
  );
};

export default Nav;
