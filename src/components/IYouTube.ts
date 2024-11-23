import {
  IContextualMenuProps,
  CheckboxVisibility,
  ConstrainMode,
  DetailsListLayoutMode,
  IColumn,
  IGroup,
  SelectionMode,
} from '@fluentui/react';

export interface IArtistDetailsListState {
  canResizeColumns?: boolean;
  checkboxVisibility?: CheckboxVisibility;
  columns: IColumn[];
  constrainMode?: ConstrainMode;
  contextualMenuProps?: IContextualMenuProps;
  groupItemLimit?: number;
  groups?: IGroup[];
  isHeaderVisible?: boolean;
  isLazyLoaded?: boolean;
  isSortedDescending?: boolean;
  items: IArtistItems[];
  layoutMode?: DetailsListLayoutMode;
  selectionMode?: SelectionMode;
  sortedColumnKey?: string;
  selectionCount: number;
  announcedMessage?: string;
}

export interface IArtistItems {
  order: number;
  channel: string;
  channelID: string;
  logo: string;
  artist: string;
  debutDate: Date;
  channelURL: string;
  videos: number;
  views: number;
  average: number;
  trendViews: number;
}

export interface IChannelObject {
  channelID: string;
  channelArtist: IArtistObject;
}

export interface IArtistObject {
  artist: string;
  debutDate: Date;
  banner: string;
  logo: string;
  latestUpdate: string;
  videos: IVideosObject[];
}

export interface IVideoItems {
  order: number;
  videoID: string;
  videoURL: string;
  imageURL: string;
  title: string;
  artist: string;
  views: number;
  average: number;
  trendViews: number;
  published: string;
  publishedDate: Date;
  channelID: string;
}

export interface IVideosObject {
  title: string;
  views: number;
  average: number;
  trendViews: number;
  published: string;
  videoID: string;
  imageURL: string;
}

export interface IYouTubePlaylistInsert {
  order: number;
  videoID: string;
  range: string;
  trueNumber: string;
  title: string;
}