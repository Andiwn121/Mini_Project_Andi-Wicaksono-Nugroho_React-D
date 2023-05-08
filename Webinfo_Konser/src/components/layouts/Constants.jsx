import { Link } from "react-router-dom";
import { Button } from "antd";

export const MENU_ITEM = [
  {
    label: <Link to="/home">Home</Link>,
    key: "/home",
  },
  {
    label: <Link to="/data-konser">Konser</Link>,
    key: "/data-konser"
  },
  {
    label: "Artis",
    key: "3"
  },
  {
    label: "Display User",
    key: "4"
  },
  {
    label: (
      <Link to="/">
        <Button
          type="primary"
          onClick={() => {
            localStorage.removeItem("token");
          }}
          danger
        >
          Logout
        </Button>
      </Link>
    ),
    key: "5",
  },
]