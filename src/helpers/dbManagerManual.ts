import database from '../data/database.json';
// import database from '../data/database - Copy.json';
// import databaseYesterday from '../data/database20220425.json';
// import databaseYesterweek from '../data/database20220419.json';
// import databaseYestermonth from '../data/database20220326.json';
// import databaseYesteryear from '../data/database20210426.json';
import { IChannelObject, IVideosObject, IArtistItems, IVideoItems } from '../components/IYouTube';
import { writeJSON } from './writeJSON';

export class dbManager {
  private writeJSON = new writeJSON();

  public trimDatabase = (): void => {
    const videoItems: IVideoItems[] = [];
    const videoList: string[] = [];
    database.artists.map((channel: any) => {
      channel.channelArtist.videos.map((video: any) => {
        const videoURL: string = `https://www.youtube.com/watch?v=${video.videoID}`;
        const imageURL: string = video.imageURL;
        const title: string = video.title;
        const artist: string = channel.channelArtist.artist;
        const views: number = video.views;
        const average: number = video.average;
        const trendViews: number = video.trendViews;
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const newDate: any = new Date(video.published);
        const published: string = newDate.toLocaleDateString("en-US", dateOptions);
        const channelID: string = channel.channelID;
        const videoItem: IVideoItems = {
          order: 0,
          videoID: video.videoID,
          videoURL: videoURL,
          imageURL: imageURL,
          title: title,
          artist: artist,
          views: views,
          average: average,
          trendViews: trendViews,
          published: published,
          publishedDate: new Date(newDate),
          channelID: channelID
        }
        videoItems.push(videoItem)
      })
    });
    let videoItemsTotal = videoItems;
    let videoItemsAverage = videoItems;
    const videoItemsTrend = videoItems;
    videoItemsTotal.sort((a, b) => {
      return b.views - a.views;
    });
    videoItemsTotal = videoItemsTotal.slice(0, 5000);
    const topViewCount = videoItems[4999].views;
    videoItemsAverage.sort((a, b) => {
      return b.average - a.average;
    });
    videoItemsAverage = videoItemsAverage.slice(0, 5000);
    const topViewAverage = videoItems[4999].average;
    videoItemsTrend.sort((a, b) => {
      return b.trendViews - a.trendViews;
    });
    const topViewTrend = videoItems[4999].trendViews;
    const acceptedDate: Date = new Date();
    acceptedDate.setDate(acceptedDate.getDate() - 8);
    const newdatabase: any = database;
    newdatabase.artists.map((artist: IChannelObject) => {
      const newVideosObjects: IVideosObject[] = [];
      artist.channelArtist.videos.map((videos: IVideosObject, index: number) => {
        const publishedDate: Date = new Date(videos.published);

        if (videos.views >= topViewCount) {
          const newVideosObject: IVideosObject = {
            title: videos.title,
            average: videos.average,
            views: videos.views,
            trendViews: videos.trendViews,
            published: videos.published,
            videoID: videos.videoID,
            imageURL: videos.imageURL
          }
          newVideosObjects.push(newVideosObject);
          videoList.push(videos.videoID);
        } else if (videos.average >= topViewAverage) {
          const newVideosObject: IVideosObject = {
            title: videos.title,
            average: videos.average,
            views: videos.views,
            trendViews: videos.trendViews,
            published: videos.published,
            videoID: videos.videoID,
            imageURL: videos.imageURL
          }
          newVideosObjects.push(newVideosObject);
          videoList.push(videos.videoID);
        } else if (videos.trendViews >= topViewTrend) {
          const newVideosObject: IVideosObject = {
            title: videos.title,
            average: videos.average,
            views: videos.views,
            trendViews: videos.trendViews,
            published: videos.published,
            videoID: videos.videoID,
            imageURL: videos.imageURL
          }
          newVideosObjects.push(newVideosObject);
          videoList.push(videos.videoID);
        } else if (acceptedDate <= publishedDate) {
          const newVideosObject: IVideosObject = {
            title: videos.title,
            average: videos.average,
            views: videos.views,
            trendViews: videos.trendViews,
            published: videos.published,
            videoID: videos.videoID,
            imageURL: videos.imageURL
          }
          newVideosObjects.push(newVideosObject);
          videoList.push(videos.videoID);
        }
      });
      artist.channelArtist.videos = newVideosObjects;
    });
    this.writeJSON.createJSON(newdatabase, `database.json`);
    this.writeJSON.createJSON({"data":  videoList}, `databaseList.json`);
  }

  private getArtistItems = (): IArtistItems[] => {
    const artistItems: IArtistItems[] = [];
    database.artists.map((channel: any) => {
      let views: number = 0;
      let average: number = 0;
      let trendAlltimeViews: number = 0;
      channel.channelArtist.videos.map((video: any) => {
        views = views + video.views;
        average = average + video.average;
        trendAlltimeViews = trendAlltimeViews + video.trendViews;
      })
      average = Math.round(average);
      const artistItem: IArtistItems = {
        order: 0,
        channel: channel.channelArtist.banner,
        channelID: channel.channelID,
        logo: channel.channelArtist.logo,
        artist: channel.channelArtist.artist,
        debutDate: channel.channelArtist.debutDate,
        channelURL: `https://www.youtube.com/channel/${channel.channelID}`,
        videos: channel.channelArtist.videos.length,
        views: views,
        trendViews: trendAlltimeViews,
        average: average
      };
      artistItems.push(artistItem);
    });
    /**Filter Artist  */
    const filteredartistItems: IArtistItems[] = [];
    artistItems.map((artist: IArtistItems) => {
       filteredartistItems.push(artist);
    });
    return filteredartistItems;
  }

  public getArtistItemsInitial = (): IArtistItems[] => {
    const artistItems: IArtistItems[] = this.getArtistItems();
    artistItems.sort((a, b) => {
      return b.average - a.average;
    })
    let itemOrder: number = 0;
    artistItems.map((artistItem: any) => {
      itemOrder++;
      artistItem.order = itemOrder;
    })
    return artistItems;
  }

}