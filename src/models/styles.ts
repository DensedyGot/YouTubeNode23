import {
  ILabelStyles,
  initializeIcons,
  mergeStyles,
  ISearchBoxStyles,
  IIconProps
} from '@fluentui/react';

initializeIcons();

export class styles {

  public static labelStyles: ILabelStyles = {
    root: {
      fontSize: 30,
      textAlign: "center",
    }
  }

  public static labelSubStyles: ILabelStyles = {
    root: {
      fontSize: 12,
      textAlign: "center"
    }
  }

  public static labelListStyles: ILabelStyles = {
    root: {
      padding: 20
    }
  }

  public static routerLinkStyles: ILabelStyles = {
    root: {
      padding: 20,
      paddingBottom: 0,
      fontSize: 15,
      textDecoration: 'none',
      textAlign: 'center'
    }
  }

  public static routerSubLinkStyles: ILabelStyles = {
    root: {
      marginTop: -5,
      display: 'inline',
      fontSize: 10,
      textDecoration: 'none',
      textAlign: 'center',
      paddingBottom: 10,
    }
  }

  public static searchTextStylesPhone: ISearchBoxStyles = {
    root: {
      width: "50%",
      marginLeft: "5%",
    }
  }

  public static searchTextStylesTablet: ISearchBoxStyles = {
    root: {
      width: "40%",
      marginLeft: "5%",
    }
  }

  public static searchTextStylesDesktop: ISearchBoxStyles = {
    root: {
      width: "30%",
      marginLeft: "5%",
    }
  }

  public searchTextStyles = (): ISearchBoxStyles => {
    if (window.matchMedia("(max-width: 500px)").matches) {
      return styles.searchTextStylesPhone;
    } else if (window.matchMedia("(max-width: 1000px)").matches) {
      return styles.searchTextStylesTablet;
    } else {
      return styles.searchTextStylesDesktop;
    }
  }

  public searchTextIconStyles = (): IIconProps => {
    return {
      styles: { root: { color: 'black' } }
    }
  }


  public static routerLinkContainer: string = mergeStyles({
    display: 'block',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10
  });

  public static siteCounterLabelStyle: ILabelStyles = {
    root: {
      textAlign: 'center',
      fontSize: 14,
      padding: 30
    }
  }

}