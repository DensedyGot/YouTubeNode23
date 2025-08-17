import React from 'react';
import { IArtistItems, IVideoItems } from '../IYouTube';
import {
  IColumn,
  SelectionMode,
  Label,
  SearchBox,
  ShimmeredDetailsList,
  PrimaryButton
} from '@fluentui/react';
import { DataParser } from '../../helpers/dataParser';
import { styles } from '../../models/styles';
import {
  Link
} from "react-router-dom";
import { dbManager } from '../../helpers/dbManagerManual';
import { writeJSON } from '../../helpers/writeJSON';
import { apiManager } from '../../helpers/apiManager';
import { Selection } from '@fluentui/react/lib/DetailsList';


export interface IYouTubeVideosProps {
  lastUpdate: Date;
}

export interface IYouTubeAdminState {
  channelID: string
  playlistID: string
  artistCode: string
  videoList: string
  channelList: string
  videoItems: IVideoItems[];      // +++
  videoColumns: IColumn[];        // +++
  loading: boolean;               // +++
}

export default class YouTubeAdmin extends React.Component<IYouTubeVideosProps, IYouTubeAdminState> {
  private dataParser = new DataParser();
  private dbManager = new dbManager();
  private writeJSON = new writeJSON();
  private apiManager = new apiManager();
  private selection: Selection;


  constructor(props: IYouTubeVideosProps) {
    super(props);
    this.state = {
      videoList: "",
      channelID: "",
      playlistID: "",
      artistCode: "",
      channelList: "",
      videoItems: [],       // +++
      videoColumns: [],     // +++
      loading: true         // +++
    }
    this.selection = new Selection({
      onSelectionChanged: () => {
        // You can handle selection change here if needed
        console.log(this.selection.getSelection());
      }
    });
  }

  async componentDidMount() {
    this.setState({
      channelID: "UCOmHUn--16B90oW2L6FRR3A",
      artistCode: "bp"
    });
  }

  public render(): React.ReactElement<{}> {
    const { lastUpdate } = this.props;
    return (
      <>
        <PrimaryButton
          onClick={this.apiManager.processChannel}
          text={"Click to run API"}
        ></PrimaryButton>
        <PrimaryButton
          onClick={this.trimDatabase}
          text={"Click to trim databse"}
        ></PrimaryButton>
        <PrimaryButton
          style={{ marginLeft: 10 }}
          onClick={this.exportSelectedAsJSON}
          text="Export Selected as JSON"
        />
        <PrimaryButton
          onClick={this.getArtistsJSONData}
          text={"Click to get artist JSON Data"}
        ></PrimaryButton>
        <PrimaryButton
          onClick={this.removeArtist}
          text={"Remove Channel"}
        ></PrimaryButton>
        <div>
          <Label styles={styles.labelListStyles}>{this.state.videoList}</Label>
        </div>
        <div>
          <Label styles={styles.labelListStyles}>{this.state.channelList}</Label>
        </div>
      </>
    )
  }

  private removeArtist = (): void => {
    this.dataParser.removeArtist("UCA4tBdQ9YIKnSGtKFS_GUsQ");
  }

  private trimDatabase = (): void => {
    this.dbManager.trimDatabase();
  }

  private getArtistsJSONData = (): void => {
    let artistsData: any = this.dbManager.getArtistItemsInitial();
    artistsData = this.dataParser.getArtistItemsByAverage(artistsData, true);
    // eslint-disable-next-line array-callback-return
    artistsData.map((artistData: any) => {
      delete artistData["order"];
      delete artistData["channel"];
      delete artistData["logo"];
      delete artistData["channelURL"];
      delete artistData["videos"];
      delete artistData["views"];
      delete artistData["average"];
      delete artistData["trendViews"];
    })
    /**
      convert on this site https://json-csv.com/
     */
    this.writeJSON.createJSON(artistsData, `artists.json`)
  }

  private exportSelectedAsJSON = (): void => {
    const selectedItems = this.selection.getSelection() as IVideoItems[];

    const exportData = selectedItems.map(item => ({
      artist: item.artist,
      title: item.title,
      videoURL: item.videoURL
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'selected_videos.json';
    link.click();
    URL.revokeObjectURL(url);
  };


}