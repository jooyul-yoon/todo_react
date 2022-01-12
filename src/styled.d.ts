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

    /* Trello */
    boardColor: string;

    whiteColor: string;
    blackColor: string;
    lightAccent: string;
    darkAccent: string;
    accentColor: string;
  }
}
