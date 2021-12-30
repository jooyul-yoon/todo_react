// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    titleColor: string;
    navBgColor: string;
    textColor: string;
    accentColor: string;
    tabBgColor: string;
    boardColor: string;
    cardColor: string;
    greenColor: string;
    redColor: string;
    whiteColor: string;
    blackColor: string;
    toggleBorder: string;
    gradient: string;
  }
}
