import React from 'react';
import { IVideoItems } from '../IYouTube';
import {
  IColumn,
  SelectionMode,
  Label,
  SearchBox,
  ShimmeredDetailsList
} from '@fluentui/react';
import {
  Link
} from "react-router-dom";
import { DataParser } from '../../helpers/dataParser';
import { styles } from '../../models/styles';

export interface IYouTubeVideosProps {
  lastUpdate: Date;
}

interface IYouTubeVideosState {
  videoItems: IVideoItems[]
  origVideoItems: IVideoItems[]
  videoColumns: IColumn[]
  searchText: string
  loading: boolean
}


export default class YouTubeVideosYTDTrend extends React.Component<IYouTubeVideosProps, IYouTubeVideosState> {
  private dataParser = new DataParser();
  private styles: styles = new styles();


  constructor(props: IYouTubeVideosProps) {
    super(props);
    this.state = {
      videoItems: [],
      origVideoItems:[],
      videoColumns: [],
      searchText: "",
      loading: true
    }
  }

  async componentDidMount() {
    this.setState({
      videoItems: await this.dataParser.getVideoItemsByTop(),
      videoColumns: this.createVideoColumns()
    }, () => {
      this.setState({origVideoItems: this.state.videoItems});
      this.setState({ loading: false })
    })
  }


  componentDidUpdate(previousProps: IYouTubeVideosProps, previousState: IYouTubeVideosState) {
    if (previousState.searchText !== this.state.searchText) {
      this.setState({
        loading: true
      }, async () => {
        let filteredVideos: IVideoItems[] = this.state.origVideoItems;
        filteredVideos = filteredVideos.filter((item: IVideoItems) => {
          return item.title.toLowerCase().includes(this.state.searchText.toLowerCase().trim());
        })
        this.setState({ videoItems: filteredVideos }, () => {
          this.setState({ loading: false })
        })
      })
    }
  }


  public render(): React.ReactElement<{}> {
    const { loading, videoItems, videoColumns } = this.state;
    return (
      <>
        <Label styles={styles.labelStyles}>KPOP Music Videos</Label>
        <Label styles={styles.labelSubStyles}>{'Past Year Trending Videos'}</Label>
        <Label styles={styles.labelSubStyles}>Last Update {this.props.lastUpdate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</Label>
        <SearchBox placeholder={"Search by Title or Artist"} styles={this.styles.searchTextStyles()} onChange={this.onSearchChanges} iconProps={this.styles.searchTextIconStyles()} />
        <ShimmeredDetailsList
          enableShimmer={loading}
          items={videoItems}
          columns={videoColumns}
          selectionMode={SelectionMode.none}
        />
      </>
    )
  }

  // private onSearchText = (e: any, text: string | undefined): void => {
  //   const searchText: string = (text) ? text.toLocaleLowerCase() : "";
  //   this.setState({
  //     videoItems: (searchText.length > 0) ? this.props.videoItems.filter(i => (i.title.toLowerCase().includes(searchText) || i.artist.toLowerCase().includes(searchText))) : this.props.videoItems
  //   });
  // }

  private onSearchChanges = (event?: React.ChangeEvent<HTMLInputElement> | undefined, newValue?: string | undefined) => {
    this.setState({ searchText: (newValue) ?? "" });
  }

  private createVideoColumns = (): IColumn[] => {
    return [
      {
        key: 'order',
        fieldName: 'order',
        name: "",
        //styles: styles.videoOrderColumnStyles,
        maxWidth: 35,
        minWidth: 35,
        isSorted: false,
        isSortedDescending: false,
        isResizable: true,
      },
      {
        key: 'title',
        fieldName: "title",
        name: "Title",
        isSorted: false,
        isSortedDescending: false,
        minWidth: 400,
        isMultiline: true,
        isResizable: true,
        // onColumnClick: this.videoViewsSort,
        onRender: (item: IVideoItems) => (
          <a href={item.videoURL} target="_blank" rel="noreferrer">
            {item.title}
          </a>
        )
      },
      {
        key: 'artist',
        name: "Artist",
        isSorted: false,
        isSortedDescending: false,
        minWidth: 100,
        isResizable: true,
        // onColumnClick: this.videoViewsSort,
        onRender: (item: IVideoItems) => (
          // <Link to={`/videosPublic/${item.channelID}`}>{item.artist}</Link>
          item.artist
        )
      },
      // {
      //   key: 'dayView',
      //   name: "Day View",
      //   isSorted: false,
      //   isSortedDescending: false,
      //   minWidth: 105,
      //   isResizable: true,
      //   onRender: (item: IVideoItems) => (
      //     <span>{item.average.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
      //   )
      // },
      {
        key: 'views',
        fieldName: "views",
        name: "Views",
        isSorted: false,
        isSortedDescending: false,
        minWidth: 100,
        isResizable: true,
        //onColumnClick: this.videoViewsSort,
        onRender: (item: IVideoItems) => (
          <span>{item.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        )
      },
      {
        key: 'published',
        name: "Published",
        isSorted: false,
        isSortedDescending: false,
        minWidth: 150,
        isResizable: true,
        // onColumnClick: this.videoViewsSort,
        onRender: (item: IVideoItems) => (
          // <span>{item.published}</span>
          <span>{new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit' , year: 'numeric'}).format(new Date(item.publishedDate))}</span>
        )
      }
    ]
  }

}