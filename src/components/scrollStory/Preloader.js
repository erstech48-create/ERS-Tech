import React from "react";
import { CubeSVG } from "./Cube";

export default function Preloader() {
  return (
    <div className="hs-preloader" aria-hidden="true">
      <div className="hs-pl-inner">
        <CubeSVG className="hs-pl-cube" />
        <div className="hs-pl-word">ERS TECH</div>
        <div className="hs-pl-bar"><i /></div>
      </div>
    </div>
  );
}

