import styled from "styled-components";

export const NavBarContainer = styled.div`
  /* https://d25unujvh7ui3r.cloudfront.net/css/navbar.css */
  /* reset */

  body,
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  a:hover {
    color: #fff;
  }

  /*  */

  .nav-wrap {
    z-index: 998;
    display: flex;
    position: fixed;
    width: 100%;
    height: 60px;
    align-items: center;
    padding: 0 15px;
    text-align: center;
    background-color: #e6e7ec;
    top: 0px;
    border-bottom-right-radius: 10%;
  }

  /*  */

  .col-logo {
    /* display: inline-block; */
    flex-basis: 15%;
    min-width: 250px;
  }

  .col-logo img {
    width: 100%;
    padding: 10px 0;
  }

  /*  */

  .col-menu {
    /* display: inline-block; */
    /* flex-basis: 50%; */
    flex-grow: 1;
    margin-left: 10px;
  }

  .col-menu .menu-list {
    display: flex;
    &.hide {
      display: none;
    }
  }

  .menu-item {
    position: relative;
    cursor: pointer;
  }

  .menu-item:not(:last-child) {
    margin-right: 15px;
  }

  .menu-link {
    padding: 25px 10px;
    font-size: 15px;
    color: #7a7a7a;
    cursor: pointer;

    &:hover {
      color: #21ade5;
    }
  }

  .menu-item.has-submenu,
  .menu-item.has-submenu .menu-link {
    cursor: default;
  }

  .menu-item {
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 0%;
      height: 3px;
      background-color: #21ade5;
      visibility: hidden;
      transition: width 150ms ease-in-out;
    }
  }

  .menu-item:hover {
    &::after {
      width: 100%;
      visibility: visible;
    }
  }

  .menu-list .menu-item.has-submenu::after {
    display: none;
  }

  /* submenu */

  .menu-item.has-submenu {
    cursor: default;
  }

  .has-submenu.highlighted {
    color: #21ade5;
  }

  .drop-down-wrap {
    visibility: hidden;
    position: absolute;
    top: 22px;
    width: 100%;
    opacity: 0;
    transition: visibility 0.3s ease, opacity 0.3s ease-in-out,
      top 0.3s ease-in-out;
    z-index: 999;
  }

  .drop-down-list {
    margin: 0;
    display: inline-block;
    box-shadow: 2px 2px 3px 0px #00000038;
  }

  .has-submenu:hover {
    .drop-down-wrap {
      visibility: visible;
      position: absolute;
      top: 43px;
      opacity: 1;
    }
  }

  .drop-down-item {
    cursor: pointer;
    text-align: left;
    background-color: #fff;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    &:hover {
      background-color: #21ade5;
    }
  }

  .submenu-link {
    display: block;
    font-size: 12px;
    color: #7a7a7a;
    cursor: pointer;
    padding: 5px 10px;
    white-space: nowrap;
  }

  .menu-item.active .menu-link {
    color: #21ade5;
    pointer-events: none;
  }

  .drop-down-item.active {
    background-color: #21ade5;
  }
  .drop-down-item.active .submenu-link {
    color: #fff;
    pointer-events: none;
  }

  .drop-down-item.highlighted .submenu-link {
    color: #fff;
  }

  /*  */

  .col-login {
    flex-basis: 9%;
  }

  .col-login .login-list {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .menu-logged-in {
    display: none;
  }

  .logged-in .menu-logged-in {
    display: inline-block;
  }

  .logged-in .menu-logged-out {
    display: none;
  }

  .login-list .login-item {
    min-width: 100px;
  }

  .login-item .menu-link:hover {
    color: #000;
  }

  .login-list .menu-link.boxed {
    padding: 10px 6px;
    /* padding: 0; */
    color: #fff;
    background-color: #21ade5;
    border-radius: 6px;
  }

  .login-list .menu-link.boxed:hover {
    background-color: #189cd1;
  }

  @media (max-width: 1246px) {
    .menu-link {
      font-size: 12px;
    }

    .submenu-link {
      font-size: 10px;
    }
  }

  /**********/
  /* mobile */
  /**********/

  .mobile-menu-btn {
    visibility: hidden;
    position: absolute;
    top: 0%;
    right: 0%;
    padding: 14px;
    cursor: pointer;
    color: #7a7a7a;
    transition: color 0.2s ease;
  }

  .mobile-menu-btn:hover {
    color: #21ade5;
  }

  @media (max-width: 1090px) {
    .nav-wrap {
      border-bottom-right-radius: 0;
    }

    .col-menu,
    .col-login {
      visibility: hidden;
      opacity: 0;
      transition: all 0.3s ease;
    }

    .nav-wrap.mobile-menu-on .col-menu,
    .nav-wrap.mobile-menu-on .col-login {
      visibility: visible;
      opacity: 1;
    }

    .mobile-menu-btn {
      visibility: visible;
    }

    .nav-wrap {
      flex-direction: column;
      height: 52px;
      /* -> 315px? */
    }

    .col-menu {
      position: relative;
      top: -2px;
      width: calc(100% + 30px);
      margin-left: 0;
      background-color: #e6e7ec;
    }

    .menu-list {
      flex-direction: column;
    }

    . em {
      padding-bottom: 6px;
    }

    .menu-link {
      padding: 0;
    }

    .menu-list .menu-item.highlighted::after,
    .menu-list .menu-item.active::after {
      visibility: hidden;
    }

    .menu-item:not(:last-child) {
      margin-right: 0;
    }

    /* submenu */
    .has-submenu .drop-down-item {
      text-align: center;
    }

    .drop-down-wrap {
      top: 0px;
      transition: none;
    }

    .drop-down-list {
      display: block;
      box-shadow: none;
    }

    .has-submenu.active .drop-down-wrap {
      visibility: visible;
      position: relative;
      top: 0px;
      opacity: 1;
    }

    /* login */
    .col-login {
      position: relative;
      top: -2px;
      width: calc(100% + 30px);
      background-color: #e6e7ec;
    }

    .login-list {
      height: 34px;
    }

    .menu-link {
      display: block;
    }

    .login-list .menu-link.boxed {
      padding: 2px 5px;
      margin-right: 5px;
    }

    //모바일에서 파란줄 안보이기
    .menu-item:hover {
      &::after {
        width: 0%;
        visibility: hidden;
      }
    }
  }

  /* deactivated */

  .menu-item.deactivated,
  .menu-item.deactivated .menu-link {
    cursor: default;
  }

  .menu-item.deactivated .menu-link::after {
    display: inline-block;
    content: "COMING SOON";
    position: absolute;
    /* white-space: nowrap; */
    top: -12%;
    left: 0px;
    width: 100%;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.2px;
    border: 2px solid #b5b5b5;
    border-radius: 10px;
    background-color: #fff;
    padding: 3px 5px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .menu-item.deactivated .menu-link:hover::after {
    opacity: 1;
  }
`;
