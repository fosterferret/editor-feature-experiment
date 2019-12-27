import React from "react";
import "./ToolTip.css";
import { FaPen } from "react-icons/fa";

export const ToolTip = props => {
  return (
    <div className="tooltip" style={props.toolTipLocStyle}>
      <button className="button-tooltip" onClick={() => props.onHighLight()}>
        <FaPen/>
      </button>
      <button
        className="button-tooltip extra-margin-left"
        onClick={() => props.onComment()}
      >
        <i className="fa fa-comment"></i>
      </button>
    </div>
  );
};
