import React from "react";
import logospacevoyager from "../../assets/logo/logo-space-voyager.svg";
export default function LogoMini() {
  return (
    <>
      <div>
        <div className="w-52">
          <a href="/">
            <img src={logospacevoyager} alt="logo du site space voyager" />
          </a>
        </div>
      </div>
    </>
  );
}
