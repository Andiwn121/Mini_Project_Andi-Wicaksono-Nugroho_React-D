import { Link } from "react-router-dom";
import { Button } from "antd";

export const MENU_ITEM = [
  {
    label: <Link to="/">Home</Link>,
    key: "/",
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
    key: "2",
  },
]