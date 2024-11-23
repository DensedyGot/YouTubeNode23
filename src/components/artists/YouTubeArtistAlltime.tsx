import React from 'react';
import { IArtistItems } from '../IYouTube';
import {
  IColumn,
  SelectionMode,
  Label,
  SearchBox,
  ShimmeredDetailsList
} from '@fluentui/react';
import { DataParser } from '../../helpers/dataParser';
import { styles } from '../../models/styles';
import {
  Link
} from "react-router-dom";
import { isTypeNode } from 'typescript';

export interface IYouTubeVideosProps {
  lastUpdate: Date;
}

export interface IYouTubeArtistsState {
  artistItems: IArtistItems[];
  origArtistItems: IArtistItems[];
  artistColumns: IColumn[];
  loading: boolean;
  searchText: string;
}

export default class YouTubeArtistsAlltime extends React.Component<IYouTubeVideosProps, IYouTubeArtistsState> {
  private dataParser = new DataParser();
  private styles: styles = new styles();

  constructor(props: IYouTubeVideosProps) {
    super(props);
    this.state = {
      artistItems: [],
      origArtistItems: [],
      artistColumns: [],
      loading: true,
      searchText: ""
    }
  }

  async componentDidMount() {
    this.setState({
      artistItems: await this.dataParser.getArtistItemsInitial(),
      artistColumns: this.createArtistColumns()
    }, () => {
      this.setState({ origArtistItems: this.state.artistItems });
      this.setState({ loading: false })
    })
  }

  componentDidUpdate(previousProps: IYouTubeVideosProps, previousState: IYouTubeArtistsState) {
    if (previousState.searchText !== this.state.searchText) {
      this.setState({
        loading: true
      }, async () => {
        let filteredVideos: IArtistItems[] = this.state.origArtistItems;
        filteredVideos = filteredVideos.filter((item: IArtistItems) => {
          return item.artist.toLowerCase().includes(this.state.searchText.toLowerCase().trim());
        })
        this.setState({ artistItems: filteredVideos }, () => {
          this.setState({ loading: false })
        })
      })
    }
  }

  public render(): React.ReactElement<{}> {
    const { lastUpdate } = this.props;
    const { loading, artistItems, artistColumns } = this.state;
    return (
      <>
        <Label styles={styles.labelStyles}>KPOP Artists</Label>
        <Label styles={styles.labelSubStyles}>{'All Time Views by Artist'}</Label>
        <Label styles={styles.labelSubStyles}>Last Update {this.props.lastUpdate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</Label>
        <SearchBox placeholder={"Search by Artist"} styles={this.styles.searchTextStyles()} onChange={this.onSearchChanges} iconProps={this.styles.searchTextIconStyles()} />
        <ShimmeredDetailsList
          enableShimmer={loading}
          items={artistItems}
          columns={artistColumns}
          selectionMode={SelectionMode.none}
        />
      </>
    )
  }

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
        key: 'channel',
        name: "Channel",
        minWidth: 200,
        isSorted: false,
        isSortedDescending: false,
        isResizable: true,
        // onColumnClick: this.artistViewsSort,
        onRender: (item: IArtistItems) => (
          <a href={item.channelURL} target="_blank" rel="noreferrer">
            {item.artist} Channel
          </a>
        )
      },
      {
        key: 'artist',
        name: "Artist",
        minWidth: 200,
        isSorted: false,
        isSortedDescending: false,
        isResizable: true,
        // onColumnClick: this.artistViewsSort,
        onRender: (item: IArtistItems) => (
          // <Link to={`/videosPublic/${item.channelID}`}>{item.artist}</Link>
          item.artist
        )
      },
      {
        key: 'generation',
        name: "Generation",
        minWidth: 200,
        isSorted: false,
        isSortedDescending: false,
        isResizable: true,
        // onColumnClick: this.artistViewsSort,
        onRender: (item: IArtistItems) => (
          (item.debutDate < new Date("January 2, 1970")) ?
            <span><b><u>Pre Debut</u></b></span> :
            (item.debutDate > new Date(new Date().setFullYear(new Date().getFullYear() - 1))) ?
              <span><b>Rookie</b></span> :
              (item.debutDate > new Date(new Date().setFullYear(new Date().getFullYear() - 2))) ?
                <span>2nd Year</span> :
                (item.debutDate > new Date(new Date().setFullYear(new Date().getFullYear() - 3))) ?
                  <span>3rd Year</span> :
                  (item.debutDate > new Date(new Date().setFullYear(new Date().getFullYear() - 4))) ?
                    <span>4th Year</span> :
                    (item.debutDate > new Date(new Date().setFullYear(new Date().getFullYear() - 5))) ?
                      <span>5th Year</span> :
                      (item.debutDate > new Date(new Date().setFullYear(new Date().getFullYear() - 6))) ?
                        <span>6th Year</span> :
                        (item.debutDate > new Date("January 2, 2018")) ?
                          <span>4th Generation</span> :
                          (item.debutDate > new Date("January 9, 2012")) ?
                            <span>3rd Generation</span> :
                            (item.debutDate > new Date("February 5, 2003")) ?
                              <span>2nd Generation</span> :
                              <span>1st Generation</span>
        )
      },
      {
        key: 'videos',
        name: "Videos",
        minWidth: 150,
        isSorted: false,
        isSortedDescending: false,
        isResizable: true,
        // onColumnClick: this.artistViewsSort,
        onRender: (item: IArtistItems) => (
          <span>{item.videos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        )
      },
      {
        key: 'views',
        name: "Views",
        minWidth: 150,
        isSorted: false,
        isSortedDescending: false,
        isResizable: true,
        // onColumnClick: this.artistViewsSort,
        onRender: (item: IArtistItems) => (
          <span>{item.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        )
      },
      // {
      //   key: 'average',
      //   name: "Average",
      //   minWidth: 150,
      //   isSorted: false,
      //   isSortedDescending: false,
      //   isResizable: true,
      //   onColumnClick: this.artistViewsSort,
      //   onRender: (item: IArtistItems) => (
      //     <span>{item.average.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
      //   )
      // }
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

}