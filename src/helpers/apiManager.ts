import { YouTubeAPIs } from './YouTubeAPIs';
import { dbManager } from './dbManager';
import artistsToProcess from '../data/artistsToProcess.json';
import database from '../data/database.json';
import databaseList from '../data/databaseList.json';
import playlist from '../data/playlistToProcess.json';
import { writeJSON } from './writeJSON';
import { IVideoItems } from '../components/IYouTube';

export class apiManager {
  private YouTubeAPIs = new YouTubeAPIs();
  private dbManager = new dbManager();
  private writeJSON = new writeJSON();

  public processChannel = async (): Promise<any> => {
    const newdatabase = database;
    let a: number = 0;
    for (a = 0; a < artistsToProcess.artists.length; a++) {
      const artist: string = artistsToProcess.artists[a].artist;
      const channelID: string = artistsToProcess.artists[a].channelID;
      const debutDate: Date = new Date(artistsToProcess.artists[a].debut)
      /**Get the Channel on each Artist */
      await this.YouTubeAPIs.getChannel(channelID).then(async (channelObject: any) => {
        /**Update the Channel in the database */
        await this.dbManager.updateChannel(newdatabase, channelObject, artist, debutDate).then(async (newdatabase: any) => {
          /**Get the Playlists in each Channel */
          let playListIDs: string[] = [];
          let i: number = 0;
          let nextPageToken: string = "";
          let noPlaylist: number = 0;
          /**Skip CHannel */
          if (channelID === "XXXXXXXXXXXXXXXXX") {
            //Do Nothing
          }
          /**Skip Playlist  */
          else if (channelID === "XXXXXXXXXXXXX" && artist === "XXXXXXXXXXXXXX") {
            playListIDs.push("XXXXXXXXXXXXXXXXXXXXX");
          }
          else {
            await this.YouTubeAPIs.getPlaylist(channelID, nextPageToken).then((playlistObject: any) => {
              noPlaylist = playlistObject.data.pageInfo.totalResults;
            });
            for (i = 1; i <= Math.ceil(noPlaylist / 50); i++) {
              await this.YouTubeAPIs.getPlaylist(channelID, nextPageToken).then((playlistObject: any) => {
                playlistObject.data.items.map((playlist: any) => {
                  /**remove some playlist from  BTS*/
                  if (playlist.id === "PL5hrGMysD_GvbJrUtduLrsAaiXI171ujJ") return;
                  if (playlist.id === "PL5hrGMysD_GvvJn4HJ97UkZ0dYjFrQsiv") return;
                  if (playlist.id === "PL5hrGMysD_GvSWsr6ZwxfpXXi7n8MZHvV") return;
                  if (playlist.id === "PL5hrGMysD_Gu0VW6byB3mskbmv1jowZDh") return;
                  if (playlist.id === "PL5hrGMysD_GvBs1esKMWLZjbtWYgL57yf") return;
                  if (playlist.id === "PL5hrGMysD_GtHhLoEJ9d6Xvj504OgNRQl") return;
                  if (playlist.id === "PL5hrGMysD_Gur00LZhF4EHRwkVLcl26Ix") return;
                  /**remove some playlist from ITZY */
                  if (playlist.id === "PLnje7IHR9mTaEJaJWQjH8FA6b7rDqBizy") return;
                  if (playlist.id === "PLnje7IHR9mTb010nvTUC1pt9gzITPUdWL") return;
                  if (playlist.id === "PLnje7IHR9mTZvt-nyqypc943vY0UzPTde") return;
                  if (playlist.id === "PLnje7IHR9mTbphFVxARy-BPe01yvRB3dJ") return;
                  if (playlist.id === "PLnje7IHR9mTYZvzVDgXVyNoleXN6pNACo") return;
                  /**select playlist for Artist*/
                  if (channelID === "XXXXXXXXXXXXXXXXXXXXXX"
                    && playlist.id !== "XXXXXXXXXXXXXXXXXXXXX"
                    && playlist.id !== "XXXXXXXXXXXXXXXXXX"
                    && artist === "XXXXXXXXXXXXXXXX") return;
                  else playListIDs.push(playlist.id);
                });
                if (!playlistObject.data.nextPageToken) {
                  nextPageToken = ""
                } else if (playlistObject.data.nextPageToken === "") {
                  nextPageToken = ""
                } else {
                  nextPageToken = playlistObject.data.nextPageToken
                }
              });
            }
          }

          /**Explicit Playlist for Artist */
          if (channelID === "UCNYi_zGmR519r5gYdOKLTjQ" && artist === "Jennie"){
            playListIDs = [];
            playListIDs.push("OLAK5uy_n1UA7cqk32kt_D1bNl5lT_D_976CQ-m8s");
        }
          console.log("Number of Playlist for " + artist + " " + playListIDs.length);
          /**Get the videos in each playlist Items*/
          const videosIDs: string[] = [];
          let b: number = 0;
          const acceptedDate: Date = new Date();
          acceptedDate.setDate(acceptedDate.getDate() - 8);
          if (channelObject.data.items[0].brandingSettings.channel.unsubscribedTrailer) {
            videosIDs.push(channelObject.data.items[0].brandingSettings.channel.unsubscribedTrailer);
          }
          for (b = 0; b < playListIDs.length; b++) {
            let noPlaylistItems: number = 0;
            await this.YouTubeAPIs.getPlaylistItems(playListIDs[b], "").then((playlistItemsObject: any) => {
              noPlaylistItems = playlistItemsObject.data.pageInfo.totalResults;
            });
            let c: number = 0;
            let nextPageTokenPlaylist = "";
            for (c = 1; c <= Math.ceil(noPlaylistItems / 50); c++) {
              await this.YouTubeAPIs.getPlaylistItems(playListIDs[b], nextPageTokenPlaylist).then(async (playlistItemsObject: any) => {
                playlistItemsObject.data.items.map((videoItem: any) => {
                  if (videoItem.contentDetails.videoId === "E07s5ZYygMg") {
                    //do not include Watermelon by harry styles
                  } else if (videosIDs.indexOf(videoItem.contentDetails.videoId) === -1) {
                    //Check video if valid to be included
                    //Should be in the inluded list
                    //Should be publsihed within specific date
                    //use this property videoItem.contentDetails.videoPublishedAt DateTime

                    const publishedDate: Date = new Date(videoItem.contentDetails.videoPublishedAt);
                    if (databaseList.data.indexOf(videoItem.contentDetails.videoId) >= 0) {
                      videosIDs.push(videoItem.contentDetails.videoId);
                    } else if (acceptedDate <= publishedDate) {
                      videosIDs.push(videoItem.contentDetails.videoId);
                    }

                    // videosIDs.push(videoItem.contentDetails.videoId);
                  }
                });
                if (!playlistItemsObject.data.nextPageToken) {
                  nextPageTokenPlaylist = "";
                } else if (playlistItemsObject.data.nextPageToken === "") {
                  nextPageTokenPlaylist = "";
                } else {
                  nextPageTokenPlaylist = playlistItemsObject.data.nextPageToken;
                }
              })
            }
          }

          console.log("Number of Videos for " + artist + " " + videosIDs.length);
          /**Grouped the videos ID into 50 */
          const videosIDsBatch: string[] = [];
          i = 0;
          let k: number = 1;
          let videosIDsItem: string[] = [];
          for (i = 0; i < videosIDs.length; i++) {
            if (i === videosIDs.length - 1) {
              videosIDsItem.push(videosIDs[i]);
              videosIDsBatch.push(videosIDsItem.join(","));
            } else if (k < 50) {
              videosIDsItem.push(videosIDs[i]);
              k++;
            } else {
              videosIDsItem.push(videosIDs[i]);
              videosIDsBatch.push(videosIDsItem.join(","));
              videosIDsItem = [];
              k = 1;
            }
          }
          b = 0;
          for (b = 0; b < videosIDsBatch.length; b++) {
            await this.YouTubeAPIs.getVideos(videosIDsBatch[b]).then(async (videoObject: any) => {
              newdatabase = await this.dbManager.updateVideo(newdatabase, videoObject, channelID, artist);
            })
          }
        })
      })
      this.writeJSON.createJSON(newdatabase, `database.json`);
    }
    console.log("Finished Running API");
    //this.writeJSON.createJSON(newdatabase, `database.json`);
  }

  public uploadVideos = async (): Promise<void> => {
    let i: number = 0;
    for (i = 0; i < playlist.playlist.length; i++) {
      const videoId: string = playlist.playlist[i].videoID;
      const videoTitle: string = playlist.playlist[i].title;
      console.log(`process 1 ${videoId}`);
      await this.YouTubeAPIs.insertToPlayList(videoId);
      console.log(`Finihsed Uploading ${i + 1}. ${videoTitle}`);
    }
    console.log("Finished Uploading Videos");
  }

  public uploadTrendingVideos = async (videoItems: IVideoItems[]): Promise<void> => {
    let i: number = 0;
    for (i = 0; i < videoItems.length; i++) {
      await this.YouTubeAPIs.insertToPlayList(videoItems[i].videoID);
    }
    console.log("Finished Uploading Videos");
  }

}