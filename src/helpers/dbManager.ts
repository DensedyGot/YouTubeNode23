import { IChannelObject, IArtistObject, IVideosObject } from '../components/IYouTube'

export class dbManager {

  public updateChannel = async (newdatabase: any, channelObject: any, artist: string, debutDate: Date): Promise<any> => {
    /**get the details of the Channel */
    //const banner: string = channelObject.data.items[0].brandingSettings.image.bannerImageUrl;
    const banner: string = "";
    const channelID: string = channelObject.data.items[0].id 
    /**Exit If Twice Second Channel */
    if (channelID === "UCCRb6nYKaT8tzLA8CwDdUtw") {
      return newdatabase;
    }
    /**Exit If Stray Kids Second Channel */
    if (channelID === "UCXhj2pPWvONXmvgHX5wllCA") {
      return newdatabase;
    }
    /**Exit If SEVENTEEN Second Channel */
    if (channelID === "UCpbTKp4B80rE2zHWvQvZpvA") {
      return newdatabase;
    }
    /**Exit If Itzy Second Channel */
    if (channelID === "UCJsfO4nKS3_c24zLbF8rT0A") {
      return newdatabase;
    }
    /**Exit If (G)I-DLE Second Channel */
    if (channelID === "UCt4CKlPRZbIvGekILWHjM_A") {
      return newdatabase;
    }
    /**Exit If GOT7 Second Channel */
    if (channelID === "UCNtZPzvkjjB3EuPMNY71cmA") {
      return newdatabase;
    }
    /**Exit If PENTAGON Second Channel */
    if (channelID === "UC6FUVSZhlKIKtEjKtEjnyNg") {
      return newdatabase;
    }
    /**Exit If NU’EST Second Channel */
    if (channelID === "UCuPsZa_UDlNMD-lPZmgsm-g") {
      return newdatabase;
    }
    /**Exit If STAYC Second Channel */
    if (channelID === "UCPuXEvuQxa9Sj_9J1LaUB6g") {
      return newdatabase;
    }
    /**Exit If 2PM Second Channel */
    if (channelID === "UCahG1TmHgXwdtVf2HZ9VdcA") {
      return newdatabase;
    }
    /**Exit If OH MY GIRL Second Channel */
    if (channelID === "UCfR3kIK-mEKRIvP9lWeZf0Q") {
      return newdatabase;
    }
    /**Exit If SF9 Second Channel */
    if (channelID === "UCA4tBdQ9YIKnSGtKFS_GUsQ") {
      return newdatabase;
    }
    /**Exit If NATURE Second Channel */
    if (channelID === "UC9CMTEkWyU9G6_nAMq2nIOw") {
      return newdatabase;
    }
    /**Exit If TFN Second Channel */
    if (channelID === "UCQ8vhkH3sBN40wxy8RJ3cmA") {
      return newdatabase;
    }
    const logo: string = channelObject.data.items[0].snippet.thumbnails.default.url;
    const latestUpdate: string = new Date().toISOString();
    /**search if Channel Title Exist */
    let channelIndex: number = 0;
    const hasChannelObject: boolean = newdatabase.artists.find((element: IChannelObject, index: number) => {
      channelIndex = index
      return element.channelID === channelID && element.channelArtist.artist === artist
    })
    if (hasChannelObject) {
      newdatabase.artists[channelIndex].channelArtist.artist = artist;
      newdatabase.artists[channelIndex].channelArtist.debutDate = debutDate;
      newdatabase.artists[channelIndex].channelArtist.banner = banner;
      newdatabase.artists[channelIndex].channelArtist.logo = logo;
      newdatabase.artists[channelIndex].channelArtist.latestUpdate = latestUpdate;
      newdatabase.artists[channelIndex].channelArtist.videos = [];
    } else {
      const artistObject: IArtistObject = {
        artist: artist,
        debutDate: debutDate,
        banner: banner,
        logo: logo,
        latestUpdate: latestUpdate,
        videos: []
      }
      const channelObject: IChannelObject = {
        channelID: channelID,
        channelArtist: artistObject
      }
      newdatabase.artists.push(channelObject);
    }

    return newdatabase;
  }

  public updateVideo = async (newdatabase: any, channelObject: any, channelID: string, artist: string): Promise<any> => {
    let officialChannelID: string = channelID;
    /**Add Twice Second Channel */
    if (officialChannelID === "UCCRb6nYKaT8tzLA8CwDdUtw") {
      officialChannelID = "UCzgxx_DM2Dcb9Y1spb9mUJA";
    }
    /**Add Stray Kids Second Channel */
    if (officialChannelID === "UCXhj2pPWvONXmvgHX5wllCA") {
      officialChannelID = "UC9rMiEjNaCSsebs31MRDCRA";
    }
    /**Add SEVENTEEN Second Channel */
    if (officialChannelID === "UCpbTKp4B80rE2zHWvQvZpvA") {
      officialChannelID = "UCfkXDY7vwkcJ8ddFGz8KusA";
    }
    /**Add Itzy Second Channel */
    if (officialChannelID === "UCJsfO4nKS3_c24zLbF8rT0A") {
      officialChannelID = "UCDhM2k2Cua-JdobAh5moMFg";
    }
    /**Add (G)I-DLE Second Channel */
    if (officialChannelID === "UCt4CKlPRZbIvGekILWHjM_A") {
      officialChannelID = "UCritGVo7pLJLUS8wEu32vow";
    }
    /**Add GOT7 Second Channel */
    if (officialChannelID === "UCNtZPzvkjjB3EuPMNY71cmA") {
      officialChannelID = "UC8HEl74jL3bLLwfDP1OALxw";
    }
    /**Add PENTAGON Second Channel */
    if (officialChannelID === "UC6FUVSZhlKIKtEjKtEjnyNg") {
      officialChannelID = "UCw4NcAAtRsjL-cGlBrUnMTQ";
    }
    /**Add NU’EST Second Channel */
    if (officialChannelID === "UCuPsZa_UDlNMD-lPZmgsm-g") {
      officialChannelID = "UCUuyrV8JDv5UAMW2StsL-NA";
    }
    /**Add STAYC Second Channel */
    if (officialChannelID === "UCPuXEvuQxa9Sj_9J1LaUB6g") {
      officialChannelID = "UCod5V2dpnpJLklGvVOv5FcQ";
    }
    /**Add 2PM Second Channel */
    if (officialChannelID === "UCahG1TmHgXwdtVf2HZ9VdcA") {
      officialChannelID = "UCBpzJvEhkemwMOkYLq9yUsA";
    }
    /**Add OH MY GIRL Second Channel */
    if (officialChannelID === "UCfR3kIK-mEKRIvP9lWeZf0Q") {
      officialChannelID = "UC-qYkzKFdekoEniRu_FS3zg";
    }
    /**Add SF9 Second Channel */
    if (officialChannelID === "UCA4tBdQ9YIKnSGtKFS_GUsQ") {
      officialChannelID = "UC8HNshpReWjQv1WpwzhPHjA";
    }
    /**Add NATURE Second Channel */
    if (officialChannelID === "UC9CMTEkWyU9G6_nAMq2nIOw") {
      officialChannelID = "UCVwEjskMa1m7ewjy0FGEHWQ";
    }
    /**Add TFN Second Channel */
    if (officialChannelID === "UCQ8vhkH3sBN40wxy8RJ3cmA") {
      officialChannelID = "UC2dshAPWPLAOdNKl_Aglmhw";
    }
    /**Get Artist Index */
    let channelIndex: number = 0;
    newdatabase.artists.find((element: IChannelObject, index: number) => {
      channelIndex = index
      return element.channelID === officialChannelID && element.channelArtist.artist === artist
    })
    let videoCounter: number = 0;
    /**Get video details in each*/
    channelObject.data.items.map((video: any) => {
      videoCounter++;
      const title: string = video.snippet.title;
      const views: number = Number(video.statistics.viewCount);
      const published: string = video.snippet.publishedAt;
      const videoID: string = video.id;
      const imageURL: string = video.snippet.thumbnails.default.url;
      const newDate: any = new Date(video.snippet.publishedAt)
      const dateToday: any = new Date();
      let dateDiff: number = Math.abs(dateToday - newDate) / (1000 * 60 * 60 * 24);
      dateDiff = (dateDiff < 1) ? 1 : dateDiff;
      const average: number = Math.round(views / dateDiff);
      const trendViews = average * views;
      let videoIndex: number = 0;
      const hasVideoObject: boolean = newdatabase.artists[channelIndex].channelArtist.videos.find((element: IVideosObject, index: number) => {
        videoIndex = index
        return element.videoID === videoID
      })
      if (hasVideoObject) {
        newdatabase.artists[channelIndex].channelArtist.videos[videoIndex].title = title;
        newdatabase.artists[channelIndex].channelArtist.videos[videoIndex].views = views;
        newdatabase.artists[channelIndex].channelArtist.videos[videoIndex].average = average;
        newdatabase.artists[channelIndex].channelArtist.videos[videoIndex].trendViews = trendViews;
        newdatabase.artists[channelIndex].channelArtist.videos[videoIndex].published = published;
        newdatabase.artists[channelIndex].channelArtist.videos[videoIndex].videoID = videoID;
        newdatabase.artists[channelIndex].channelArtist.videos[videoIndex].imageURL = imageURL;
      } else {
        const videoItem: IVideosObject = {
          title: title,
          views: views,
          average: average,
          trendViews: trendViews,
          published: published,
          videoID: videoID,
          imageURL: imageURL
        }
        newdatabase.artists[channelIndex].channelArtist.videos.push(videoItem)
      }
    });
    return newdatabase;
  }


}