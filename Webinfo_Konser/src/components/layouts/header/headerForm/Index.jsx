import React from "react";
import "./cardHeader.css"

const CardHeaderOneComponent = (props) => {
  return <div className="headerCardOne">{props.children}</div>;
};
const CardHeaderTwoComponent = (props) => {
  return <div className="headerCardTwo">{props.children}</div>;
};

export { CardHeaderOneComponent, CardHeaderTwoComponent};
