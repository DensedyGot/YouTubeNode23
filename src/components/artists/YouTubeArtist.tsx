import React from 'react';
import { IArtistItems } from '../IYouTube';
import {
  DetailsList,
  IColumn,
  SelectionMode,
  ConstrainMode,
  Label,
  Image,
  MessageBar,
  MessageBarType,
  SearchBox
} from '@fluentui/react';
import { DataParser } from '../../helpers/dataParser';
import { styles } from '../../models/styles';
import {
  Link
} from "react-router-dom";

const artistsPasscode: string = "MPWVCA"

export interface IYouTubeVideosProps {
  lastUpdate: Date;
}

export interface IYouTubeArtistsState {
  artistItems: IArtistItems[];
  artistColumns: IColumn[];
  loading: boolean;
  searchText: string;
}

export default class YouTubeArtists extends React.Component<IYouTubeVideosProps, IYouTubeArtistsState> {
  private dataParser = new DataParser();
  //private dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC', timeZoneName: 'short' };
  private dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  private styles: styles = new styles();

  private onSearchChanges = (event?: React.ChangeEvent<HTMLInputElement> | undefined, newValue?: string | undefined) => {
    this.setState({ searchText: (newValue) ?? "" });
  }

  private createArtistColumns = (): IColumn[] => {
    return [
      {
        key: 'order',
        fieldName: 'order',
        name: "",
        maxWidth: 25,
        minWidth: 25,
        isSorted: false,
        isSortedDescending: false,
        isResizable: true
      },
      {
        key: 'banner',
        name: "Banner",
        maxWidth: 300,
        minWidth: 300,
        isSorted: false,
        isSortedDescending: false,
        isResizable: true,
        onRender: (item: IArtistItems) => (
          // <Image src={item.channel} width={300}>
          // </Image>
          <Label>No Picture</Label>
        )
      },
      {
        key: 'logo',
        name: "Logo",
        maxWidth: 50,
        minWidth: 50,
        isSorted: false,
        isSortedDescending: false,
        isResizable: true,
        onRender: (item: IArtistItems) => (
          <Image src={item.logo} width={50}>
          </Image>
        )
      },
      {
        key: 'channel',
        name: "Channel",
        minWidth: 125,
        isSorted: false,
        isSortedDescending: false,
        isResizable: true,
        onColumnClick: this.artistViewsSort,
        onRender: (item: IArtistItems) => (
          <a href={item.channelURL} target="_blank" rel="noreferrer">
            {item.artist} Channel
          </a>
        )
      },
      {
        key: 'artist',
        name: "Artist",
        minWidth: 75,
        isSorted: false,
        isSortedDescending: false,
        isResizable: true,
        onColumnClick: this.artistViewsSort,
        onRender: (item: IArtistItems) => (
          <Link to={`/videos/${item.channelID}`}>{item.artist}</Link>
        )
      },
      {
        key: 'videos',
        name: "Videos",
        minWidth: 50,
        isSorted: false,
        isSortedDescending: false,
        isResizable: true,
        onColumnClick: this.artistViewsSort,
        onRender: (item: IArtistItems) => (
          <span>{item.videos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        )
      },
      {
        key: 'views',
        name: "Views",
        minWidth: 100,
        isSorted: false,
        isSortedDescending: false,
        isResizable: true,
        onColumnClick: this.artistViewsSort,
        onRender: (item: IArtistItems) => (
          <span>{item.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        )
      },
      {
        key: 'average',
        name: "Average",
        minWidth: 75,
        isSorted: false,
        isSortedDescending: false,
        isResizable: true,
        onColumnClick: this.artistViewsSort,
        onRender: (item: IArtistItems) => (
          <span>{item.average.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        )
      }
    ]
  }

  private artistViewsSort = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const newColumns: IColumn[] = this.state.artistColumns.slice();
    const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
    let sorting: boolean = false;
    newColumns.forEach((newCol: IColumn) => {
      if (newCol.key === currColumn.key) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        sorting = currColumn.isSortedDescending
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    })
    let newItems: IArtistItems[] = [];
    switch (currColumn.key) {
      case "channel":
        newItems = this.dataParser.getArtistItemsByChannel(this.state.artistItems, sorting);
        this.setState({
          artistItems: newItems
        });
        break;
      case "artist":
        newItems = this.dataParser.getArtistItemsByChannel(this.state.artistItems, sorting);
        this.setState({
          artistItems: newItems
        });
        break;
      case "videos":
        newItems = this.dataParser.getArtistItemsByVideos(this.state.artistItems, sorting);
        this.setState({
          artistItems: newItems
        });
        break;
      case "views":
        newItems = this.dataParser.getArtistItemsByViews(this.state.artistItems, sorting);
        this.setState({
          artistItems: newItems
        });
        break;
      case "average":
        newItems = this.dataParser.getArtistItemsByAverage(this.state.artistItems, sorting);
        this.setState({
          artistItems: newItems
        });
        break;
    }
    this.setState({
      artistColumns: newColumns,
      artistItems: newItems
    })
  }

  private showVideos = (): React.ReactElement<{}> => {
    return (
      <>
        <Label styles={styles.labelStyles}>KPOP Artists</Label>
        <Label styles={styles.labelSubStyles}>Last Update {this.props.lastUpdate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</Label>
        <SearchBox placeholder={"Search by Artist"} styles={this.styles.searchTextStyles()} onChange={this.onSearchChanges} iconProps={this.styles.searchTextIconStyles()}/>
        <DetailsList
          items={this.state.artistItems}
          columns={this.state.artistColumns}
          selectionMode={SelectionMode.none}
          constrainMode={ConstrainMode.horizontalConstrained}
        />
      </>
    )
  }

  private dontShowVideos = (): React.ReactElement<{}> => {
    return (
      <>
        <MessageBar
          messageBarType={MessageBarType.blocked}
          isMultiline={false}
          //onDismiss={p.resetChoice}
          dismissButtonAriaLabel="Close"
          truncated={true}
          overflowButtonAriaLabel="See more"
        >
          <b>You are not allowed to view the content of this page</b>
        </MessageBar>
      </>
    )
  }

  constructor(props: IYouTubeVideosProps) {
    super(props);
    this.state = {
      artistItems: [],
      artistColumns: [],
      loading: true,
      searchText: ""
    }
  }

  async componentDidMount() {
    this.setState({
      artistItems: await this.dataParser.getArtistItemsInitial(),
      artistColumns: this.createArtistColumns(),
    })
  }

  public render(): React.ReactElement<{}> {
    return (
      <>
        {
          this.showVideos()
        }
      </>
    )
  }
}