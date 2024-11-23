import React from 'react';
import { IArtistItems } from '../IYouTube';
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

export interface IYouTubeVideosProps {
  lastUpdate: Date;
}

export interface IYouTubeAdminState {
  channelID: string
  playlistID: string
  artistCode: string
  videoList: string
  channelList: string

}

export default class YouTubeAdmin extends React.Component<IYouTubeVideosProps, IYouTubeAdminState> {
  private dataParser = new DataParser();
  private dbManager = new dbManager();
  private writeJSON = new writeJSON();
  private apiManager = new apiManager();

  constructor(props: IYouTubeVideosProps) {
    super(props);
    this.state = {
      videoList: "",
      channelID: "",
      playlistID: "",
      artistCode: "",
      channelList: ""
    }
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

}