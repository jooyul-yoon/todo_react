// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    /* General */
    bgColor: string;
    textColor: string;
    cardColor: string;

    /* Nav Bar */
    navBgColor: string;
    toggleBorder: string;
    gradient: string;

    /* Crypto */
    coinTabActive: string;
    coinIncrease: string;
    coinDecrease: string;

    /* To-do, Trello */
    sidebarColor: string;
    boardColor: string;
    textboxColor: string;

    whiteColor: string;
    blackColor: string;
    lightGrayColor: string;
    lightAccent: string;
    darkAccent: string;
    accentColor: string;
  }
}
