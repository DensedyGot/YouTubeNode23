import React, { useState } from 'react';
import { FontWeights, IStackTokens, IStackStyles, ITextStyles, initializeIcons } from '@fluentui/react';
import { FluentProvider, webLightTheme, Button } from "@fluentui/react-components";
import './App.css';
import { CommandBar, ICommandBarItemProps, IIconStyles, Image, Label } from '@fluentui/react';
import './components/customstyling.css';
import { IVideoItems } from './components/IYouTube';
import YouTubeVideosYear from './components/videos/YouTubeVideosYear';
import YouTubeVideosTrending from './components/videos/YouTubeVideosTrending';
import YouTubeVideosYTDTrend from './components/videos/YouTubeVideosYTDTrend';
import YouTubeVideosYTDAlltimeTrend from './components/videos/YouTubeVideosAlltimeTrend';
import YouTubeArtistAlltimeTrending from './components/artists/YouTubeArtistAlltimeTrending';
import YouTubeArtistYTDTrending from './components/artists/YouTubeArtistYTDTrending';
import YouTubeArtistYear from './components/artists/YouTubeArtistYear';
import YouTubeAdmin from './components/admin/YouTubeAdmin';

const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: '960px',
    margin: '0 auto',
    textAlign: 'center',
    color: '#605e5c',
  },
};

const lastUpdate: Date = new Date("November 24, 2024 12:00 AM +8");
const videoItemsViews: IVideoItems[] = [];

initializeIcons();

const iconStyles: IIconStyles = {
  root: {
    color: 'black'
  }
}



export const App: React.FunctionComponent = () => {
  const [navState, SetNavState] = useState<string | undefined>(undefined);
  const _items: ICommandBarItemProps[] = [
    {
      key: 'musicVideos',
      text: 'Music Videos',
      cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
      iconProps: { iconName: 'Video', styles: iconStyles },
      subMenuProps: {
        items: [
          {
            key: 'trendingToday',
            text: 'Trending Today',
            iconProps: { iconName: 'DateTime2', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("TrendingToday")
            }
          },
          {
            key: 'trendingPastYear',
            text: 'Trending Past Year',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("TrendingPastYear")
            }
          },
          {
            key: 'trendingAllTime',
            text: 'Trending All Time',
            iconProps: { iconName: 'Calendar', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("TrendingAllTime")
            }
          },
          {
            key: 'trending2023',
            text: 'Trending 2023',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("Trending2023")
            }
          },
          {
            key: 'trending2022',
            text: 'Trending 2022',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("Trending2022")
            }
          },
          {
            key: 'trending2021',
            text: 'Trending 2021',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("Trending2021")
            }
          },
          {
            key: 'trending2020',
            text: 'Trending 2020',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("Trending2020")
            }
          },
          {
            key: 'trending2019',
            text: 'Trending 2019',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("Trending2019")
            }
          },
          {
            key: 'trending2018',
            text: 'Trending 2018',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("Trending2018")
            }
          },
          {
            key: 'trending2017',
            text: 'Trending 2017',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("Trending2017")
            }
          },
          {
            key: 'trending2016',
            text: 'Trending 2016',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("Trending2016")
            }
          },
          {
            key: 'trending2015',
            text: 'Trending 2015',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("Trending2015")
            }
          },
          {
            key: 'trending2014',
            text: 'Trending 2014',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("Trending2014")
            }
          }
        ],
      },
    },
    {
      key: 'artists',
      text: 'Artists',
      cacheKey: 'myCacheKey1', // changing this key will invalidate this item's cache
      iconProps: { iconName: 'Group', styles: iconStyles },
      subMenuProps: {
        items: [
          {
            key: 'artistTrendingPastYear',
            text: 'Trending Past Year',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("ArtistTrendingPastYear")
            }
          },
          {
            key: 'artistsTrendingAllTime',
            text: 'Trending All Time',
            iconProps: { iconName: 'Calendar', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("ArtistTrendingAllTime")
            }
          },
          {
            key: 'artistTrending2023',
            text: 'Trending 2023',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("ArtistTrending2023")
            }
          },
          {
            key: 'artistTrending2022',
            text: 'Trending 2022',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("ArtistTrending2022")
            }
          },
          {
            key: 'artistTrending2021',
            text: 'Trending 2021',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("ArtistTrending2021")
            }
          },
          {
            key: 'artistTrending2020',
            text: 'Trending 2020',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("ArtistTrending2020")
            }
          },
          {
            key: 'artistTrending2019',
            text: 'Trending 2019',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("ArtistTrending2019")
            }
          },
          {
            key: 'artistTrending2018',
            text: 'Trending 2018',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("ArtistTrending2018")
            }
          },
          {
            key: 'artistTrending2017',
            text: 'Trending 2017',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("ArtistTrending2017")
            }
          },
          {
            key: 'artistTrending2016',
            text: 'Trending 2016',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("ArtistTrending2016")
            }
          },
          {
            key: 'artistTrending2015',
            text: 'Trending 2015',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("ArtistTrending2015")
            }
          },
          {
            key: 'artistTrending2014',
            text: 'Trending 2014',
            iconProps: { iconName: 'DateTime', styles: iconStyles },
            preferMenuTargetAsEventTarget: true,
            onClick: (ev, item) => {
              SetNavState("ArtistTrending2014")
            }
          }
        ]
      }
    },
  ]
  return (
    <FluentProvider theme={webLightTheme}>
      {/* <YouTubeAdmin lastUpdate={new Date()} /> */}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Image
          // src={"http://localhost:3000/favicon.ico"}
          src={"https://kpopyoutube.azurewebsites.net/favicon.ico"}
          width={100}
          height={100}
        />
        <CommandBar
          items={_items}
          overflowItems={[]}
          // overflowButtonProps={[]}
          farItems={[]}
          ariaLabel="Menus"
          primaryGroupAriaLabel="Menus"
          farItemsGroupAriaLabel="Menus"
        />
      </div>
      {(navState === undefined) &&
        <YouTubeVideosTrending
          lastUpdate={lastUpdate}
        />}
      {(navState === "TrendingToday") &&
        <YouTubeVideosTrending
          lastUpdate={lastUpdate}
        />}
      {(navState === "TrendingPastYear") &&
        <YouTubeVideosYTDTrend
          lastUpdate={lastUpdate}
        />}
      {(navState === "TrendingAllTime") &&
        <YouTubeVideosYTDAlltimeTrend
          lastUpdate={lastUpdate}
        />}
      {(navState === "Trending2023") &&
        <YouTubeVideosYear
          lastUpdate={lastUpdate}
          year={2023}
        />}
      {(navState === "Trending2022") &&
        <YouTubeVideosYear
          lastUpdate={lastUpdate}
          year={2022}
        />}
      {(navState === "Trending2021") &&
        <YouTubeVideosYear
          lastUpdate={lastUpdate}
          year={2021}
        />}
      {(navState === "Trending2020") &&
        <YouTubeVideosYear
          lastUpdate={lastUpdate}
          year={2020}
        />}
      {(navState === "Trending2019") &&
        <YouTubeVideosYear
          lastUpdate={lastUpdate}
          year={2019}
        />}
      {(navState === "Trending2018") &&
        <YouTubeVideosYear
          lastUpdate={lastUpdate}
          year={2018}
        />}
      {(navState === "Trending2017") &&
        <YouTubeVideosYear
          lastUpdate={lastUpdate}
          year={2017}
        />}
      {(navState === "Trending2016") &&
        <YouTubeVideosYear
          lastUpdate={lastUpdate}
          year={2016}
        />}
      {(navState === "Trending2015") &&
        <YouTubeVideosYear
          lastUpdate={lastUpdate}
          year={2015}
        />}
      {(navState === "Trending2014") &&
        <YouTubeVideosYear
          lastUpdate={lastUpdate}
          year={2014}
        />}
      {(navState === "ArtistTrendingPastYear") &&
        <YouTubeArtistYTDTrending
          lastUpdate={lastUpdate}
        />}
      {(navState === "ArtistTrendingAllTime") &&
        <YouTubeArtistAlltimeTrending
          lastUpdate={lastUpdate}
        />}
      {(navState === "ArtistTrending2023") &&
        <YouTubeArtistYear
          lastUpdate={lastUpdate}
          year={2023}
        />}
      {(navState === "ArtistTrending2022") &&
        <YouTubeArtistYear
          lastUpdate={lastUpdate}
          year={2022}
        />}
      {(navState === "ArtistTrending2021") &&
        <YouTubeArtistYear
          lastUpdate={lastUpdate}
          year={2021}
        />}
      {(navState === "ArtistTrending2020") &&
        <YouTubeArtistYear
          lastUpdate={lastUpdate}
          year={2020}
        />}
      {(navState === "ArtistTrending2019") &&
        <YouTubeArtistYear
          lastUpdate={lastUpdate}
          year={2019}
        />}
      {(navState === "ArtistTrending2018") &&
        <YouTubeArtistYear
          lastUpdate={lastUpdate}
          year={2018}
        />}
      {(navState === "ArtistTrending2017") &&
        <YouTubeArtistYear
          lastUpdate={lastUpdate}
          year={2017}
        />}
      {(navState === "ArtistTrending2016") &&
        <YouTubeArtistYear
          lastUpdate={lastUpdate}
          year={2016}
        />}
              {(navState === "ArtistTrending2015") &&
        <YouTubeArtistYear
          lastUpdate={lastUpdate}
          year={2015}
        />}
              {(navState === "ArtistTrending2014") &&
        <YouTubeArtistYear
          lastUpdate={lastUpdate}
          year={2014}
        />}
    </FluentProvider>
  );
};
