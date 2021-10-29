import React from "react";

function LikesPop(props) {
  return props.trigger ? (
    <div className="popup">
      <button onClick={() => props.setTrigger(false)}>close</button>
      <div className="popup">
        <div className="popup-inner">
          <p>{props.children}</p>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default LikesPop;
