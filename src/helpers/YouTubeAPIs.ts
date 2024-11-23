import YouTube from '../helpers/YouTube';
import { writeJSON } from './writeJSON';

const KEY: string = "AIzaSyDGbg-5pVjJX-YVV3xtQOpeFpHLcCS7oBM";
// const KEY: string = "AIzaSyAKgsSdtz3wkpEkjkZk4xSS3rt5Rsp74Ss";
// const KEY: string = "AIzaSyCEPvMXke-BrJQ-ZvPBLhWdTgrZiUiH-Xg";
// const KEY: string = "AIzaSyAn3vxuIolDnWlCndCpNAjZvZJdguvhrLw";


export class YouTubeAPIs {
  private writeJSON = new writeJSON()

  public getVideos = async (videoList: string): Promise<any> => {
    const response = await YouTube.get('/videos', {
      params: {
        part: 'snippet,statistics',
        id: videoList,
        key: KEY
      }
    });
    return response
  }

  public getPopularVideos = async (): Promise<any> => {
    const response = await YouTube.get('/videos', {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        maxResults: 50,
        regionCode: 'US',
        videoCategoryId: 10,
        key: KEY
      }
    });
    return response
  }

  public insertToPlayList = async (videoID: string): Promise<any> => {
    const response = await YouTube.post(`/playlistItems?part=snippet&key=${KEY}`,
      {
        "snippet": {
          "playlistId": "PL1GbmmLv69JCh_jfeab_G4RHTc2ulPDvl",
          "resourceId": {
            "videoId": `${videoID}`,
            "kind": "youtube#video"
          }
        }
      }).catch((reason: any) => {
        console.log("insertToPlayList Error", reason);
      });
    return response
  }

  public searchVideo = async (): Promise<any> => {
    const response = await YouTube.get('/channels', {
      params: {
        part: 'snippet',
        maxResults: 50,
        order: "viewCount",
        relevanceLanguage: "ko",
        type: "video",
        key: KEY
      }
    });
    return response;
  }

  public getPlaylistItems = async (playlistID: string, nextPageToken: string): Promise<any> => {
    const response = await YouTube.get('/playlistItems', {
      params: {
        part: 'contentDetails',
        maxResults: 50,
        pageToken: nextPageToken,
        playlistId: playlistID,
        key: KEY
      }
    });
    return response;
  }

  public getPlaylist = async (channelID: string, nextPageToken: string): Promise<any> => {
    const response = await YouTube.get('/playlists', {
      params: {
        part: 'snippet',
        maxResults: 50,
        pageToken: nextPageToken,
        channelId: channelID,
        key: KEY
      }
    });
    return response;
  }

  public getChannel = async (channelID: string): Promise<any> => {
    const response = await YouTube.get('/channels', {
      params: {
        part: 'snippet,contentDetails,statistics,brandingSettings',
        id: channelID,
        key: KEY
      }
    });
    return response
  }
}