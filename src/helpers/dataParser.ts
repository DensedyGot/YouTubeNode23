import moment from 'moment';
import { IArtistItems, IVideoItems, IChannelObject } from '../components/IYouTube';
import database from '../data/database.json';
// import database from '../data/database - Copy.json';
import { writeJSON } from './writeJSON';

export class DataParser {

  private writeJSON = new writeJSON();


  private getArtistItems = (): IArtistItems[] => {
    const artistItems: IArtistItems[] = [];
    database.artists.map((channel: any) => {
      let views: number = 0;
      let average: number = 0;
      let trendViews: number = 0;
      channel.channelArtist.videos.map((video: any) => {
        views = views + video.views;
        average = average + video.average;
        trendViews = trendViews + video.trendViews;
      })
      average = Math.round(average);
      const artistItem: IArtistItems = {
        order: 0,
        channel: channel.channelArtist.banner,
        channelID: channel.channelID,
        logo: channel.channelArtist.logo,
        artist: channel.channelArtist.artist,
        debutDate: new Date(channel.channelArtist.debutDate),
        channelURL: `https://www.youtube.com/channel/${channel.channelID}`,
        videos: channel.channelArtist.videos.length,
        views: views,
        trendViews: trendViews,
        average: average
      };
      artistItems.push(artistItem);
    });
    /**Filter Artist  */
    const filteredartistItems: IArtistItems[] = [];
    artistItems.map((artist: IArtistItems) => {
      if (artist.videos > 0) {
        filteredartistItems.push(artist);
      }
    });
    return filteredartistItems;
  }

  private getArtistYTDItems = (): IArtistItems[] => {
    const artistItems: IArtistItems[] = [];
    database.artists.map((channel: any) => {
      let views: number = 0;
      let average: number = 0;
      let trendViews: number = 0;
      let videosCount: number = 0;
      const dateYesteryear: Date = new Date("August 17, 2024 12:00 AM +8");
      channel.channelArtist.videos.map((video: any) => {
        if (new Date((new Date(video.published)).toUTCString()) >= dateYesteryear) {
          views = views + video.views;
          average = average + video.average;
          trendViews = trendViews + video.trendViews;
          videosCount++;
        }
      })
      average = Math.round(average);
      const artistItem: IArtistItems = {
        order: 0,
        channel: channel.channelArtist.banner,
        channelID: channel.channelID,
        logo: channel.channelArtist.logo,
        artist: channel.channelArtist.artist,
        debutDate: new Date(channel.channelArtist.debutDate),
        channelURL: `https://www.youtube.com/channel/${channel.channelID}`,
        videos: videosCount,
        views: views,
        trendViews: trendViews,
        average: average
      };
      artistItems.push(artistItem);
    });
    /**Filter Artist  */
    const filteredartistItems: IArtistItems[] = [];
    artistItems.map((artist: IArtistItems) => {
      if (artist.videos > 0) {
        filteredartistItems.push(artist);
      }
    });
    return filteredartistItems;
  }

  public getArtistItemsInitial = (): IArtistItems[] => {
    const artistItems: IArtistItems[] = this.getArtistItems();
    artistItems.sort((a, b) => {
      return b.views - a.views;
    })
    let itemOrder: number = 0;
    artistItems.map((artistItem: any) => {
      itemOrder++;
      artistItem.order = itemOrder;
    })
    return artistItems;
  }

  public getArtistItemsYTDTrendingInitials = (): IArtistItems[] => {
    const artistItems: IArtistItems[] = this.getArtistYTDItems();
    artistItems.sort((a, b) => {
      return b.trendViews - a.trendViews;
    })
    let itemOrder: number = 0;
    artistItems.map((artistItem: any) => {
      itemOrder++;
      artistItem.order = itemOrder;
    })
    return artistItems;
  }

  public getArtistItemsByYearInitials = (year: number): IArtistItems[] => {
    const artistItems: IArtistItems[] = this.getArtistItemsByYear(year);
    artistItems.sort((a, b) => {
      return b.trendViews - a.trendViews;
    })
    let itemOrder: number = 0;
    artistItems.map((artistItem: any) => {
      itemOrder++;
      artistItem.order = itemOrder;
    })
    return artistItems;
  }

  public getArtistItemsByYear = (year: number): IArtistItems[] => {
    const artistItems: IArtistItems[] = [];
    database.artists.map((channel: any) => {
      let views: number = 0;
      let average: number = 0;
      let trendViews: number = 0;
      let videosCount: number = 0;
      const startYear: Date = new Date(`January 1, ${year} 12:00 AM +8`);
      const endYear: Date = new Date(`December 31, ${year} 11:59 PM +8`);
      channel.channelArtist.videos.map((video: any) => {
        if (new Date((new Date(video.published)).toUTCString()) >= startYear) {
          if (new Date((new Date(video.published)).toUTCString()) <= endYear) {
            views = views + video.views;
            average = average + video.average;
            trendViews = trendViews + video.trendViews;
            videosCount++;
          }
        }
      })
      average = Math.round(average);
      const artistItem: IArtistItems = {
        order: 0,
        channel: channel.channelArtist.banner,
        channelID: channel.channelID,
        logo: channel.channelArtist.logo,
        artist: channel.channelArtist.artist,
        debutDate: new Date(channel.channelArtist.debutDate),
        channelURL: `https://www.youtube.com/channel/${channel.channelID}`,
        videos: videosCount,
        views: views,
        trendViews: trendViews,
        average: average
      };
      artistItems.push(artistItem);
    });
    /**Filter Artist  */
    const filteredartistItems: IArtistItems[] = [];
    artistItems.map((artist: IArtistItems) => {
      if (artist.videos > 0) {
        filteredartistItems.push(artist);
      }
    });
    console.log("No of artists", filteredartistItems.length);
    return filteredartistItems;
  }

  public getArtistItemsYTDAverageInitials = (): IArtistItems[] => {
    const artistItems: IArtistItems[] = this.getArtistYTDItems();
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

  public getArtistItemsYTDInitials = (): IArtistItems[] => {
    const artistItems: IArtistItems[] = this.getArtistYTDItems();
    artistItems.sort((a, b) => {
      return b.views - a.views;
    })
    let itemOrder: number = 0;
    artistItems.map((artistItem: any) => {
      itemOrder++;
      artistItem.order = itemOrder;
    })
    return artistItems;
  }

  public getArtistItemsAlltimeTrendingInitials = (): IArtistItems[] => {
    const artistItems: IArtistItems[] = this.getArtistItems();
    artistItems.sort((a, b) => {
      return b.trendViews - a.trendViews;
    })
    let itemOrder: number = 0;
    artistItems.map((artistItem: any) => {
      itemOrder++;
      artistItem.order = itemOrder;
    })
    return artistItems;
  }

  public getArtistItemsAlltimeAverageInitials = (): IArtistItems[] => {
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

  public getArtistItemsByChannel = (artistItems: IArtistItems[], sorting: boolean): IArtistItems[] => {
    if (sorting) {
      artistItems.sort((a, b) => {
        const x = a.artist.toLowerCase();
        const y = b.artist.toLowerCase();
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      });
    } else {
      artistItems.sort((a, b) => {
        const x = a.artist.toLowerCase();
        const y = b.artist.toLowerCase();
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }
    let itemOrder: number = 0;
    artistItems.map((artistItem: any) => {
      itemOrder++;
      artistItem.order = itemOrder;
    })
    return artistItems;
  }

  public getArtistItemsByVideos = (artistItems: IArtistItems[], sorting: boolean): IArtistItems[] => {
    if (sorting) {
      artistItems.sort((a, b) => {
        return b.videos - a.videos;
      });
    } else {
      artistItems.sort((a, b) => {
        return a.videos - b.videos;
      });
    }
    let itemOrder: number = 0;
    artistItems.map((artistItem: any) => {
      itemOrder++;
      artistItem.order = itemOrder;
    })
    return artistItems;
  }

  public getArtistItemsByViews = (artistItems: IArtistItems[], sorting: boolean): IArtistItems[] => {
    if (sorting) {
      artistItems.sort((a, b) => {
        return b.views - a.views;
      });
    } else {
      artistItems.sort((a, b) => {
        return a.views - b.views;
      });
    }
    let itemOrder: number = 0;
    artistItems.map((artistItem: any) => {
      itemOrder++;
      artistItem.order = itemOrder;
    })
    return artistItems;
  }

  public getArtistItemsByAverage = (artistItems: IArtistItems[], sorting: boolean): IArtistItems[] => {
    if (sorting) {
      artistItems.sort((a, b) => {
        return b.average - a.average;
      });
    } else {
      artistItems.sort((a, b) => {
        return a.average - b.average;
      });
    }
    let itemOrder: number = 0;
    artistItems.map((artistItem: any) => {
      itemOrder++;
      artistItem.order = itemOrder;
    })
    return artistItems;
  }

  public getVideoItems = (): IVideoItems[] => {
    const videoItems: IVideoItems[] = [];
    database.artists.map((channel: any) => {
      channel.channelArtist.videos.map((video: any) => {
        const videoURL: string = `https://www.youtube.com/watch?v=${video.videoID}`;
        const imageURL: string = video.imageURL
        const title: string = video.title
        const artist: string = channel.channelArtist.artist
        const views: number = video.views;
        const average: number = video.average;
        const trendViews: number = video.trendViews;
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const newDate: any = new Date((new Date(video.published)).toUTCString());
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
    console.log("No of videos", videoItems.length); 
    return videoItems;
  }

  public getVideoItemsByInitial = (): IVideoItems[] => {
    const videoItems: IVideoItems[] = this.getVideoItems();
    videoItems.sort((a, b) => {
      return b.average - a.average;
    });
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems.slice(0, 5000);
  }

  public getVideoItemsByInitialViews = (): IVideoItems[] => {
    const videoItems: IVideoItems[] = this.getVideoItems();
    videoItems.sort((a, b) => {
      return b.views - a.views;
    });
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems.slice(0, 5000);
  }

  public getVideoItemsByTrending = (): IVideoItems[] => {
    let videoItems: IVideoItems[] = this.getVideoItems();
    const dateYesteryear: Date = new Date("August 17, 2024 12:00 AM +8");
    videoItems = videoItems.filter((item: IVideoItems) => new Date((new Date(item.publishedDate)).toUTCString()) >= dateYesteryear);
    for (let i = 0; i < videoItems.length; i++) {
      const a: any = moment(new Date("August 17, 2025 12:00 AM +8"));
      let publishedDate: Date = new Date(videoItems[i].publishedDate);
      publishedDate = new Date(publishedDate.toUTCString());
      const b: any = moment(publishedDate);
      let days = moment(a).diff(b, "days", true);
      days = (days < 1) ? 1 : days;
      let weeks = moment(a).diff(b, "weeks", true);
      weeks = (weeks < 1) ? 1 : weeks;
      let months = moment(a).diff(b, "months", true);
      months = (months < 1) ? 1 : months;
      let seasons = moment(a).diff(b, "months", true) / 3;
      seasons = (seasons < 1) ? 1 : seasons;
      let years = moment(a).diff(b, "years", true);
      years = (years < 1) ? 1 : years;
      videoItems[i].average = videoItems[i].views / days / weeks / months / seasons / years;
    }
    videoItems = videoItems.filter((item: IVideoItems) => item.average >= 100000);
    videoItems.sort((a, b) => {
      return b.average - a.average;
    });
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems.slice(0, 5000);
  }

  public getVideoItemsByTop = (): IVideoItems[] => {
    let videoItems: IVideoItems[] = this.getVideoItems();
    const dateYesteryear: Date = new Date("August 17, 2024 12:00 AM +8");
    videoItems = videoItems.filter((item: IVideoItems) => new Date((new Date(item.publishedDate)).toUTCString()) >= dateYesteryear);
    //videoItems = videoItems.filter((item: IVideoItems) => item.average >= 100000000000);
    videoItems.sort((a, b) => {
      return b.trendViews - a.trendViews;
    });
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems.slice(0, 5000);
  }

  public getVideoItemsByViews = (): IVideoItems[] => {
    let videoItems: IVideoItems[] = this.getVideoItems();
    const dateYesteryear: Date = new Date("August 17, 2024 12:00 AM +8");
    videoItems = videoItems.filter((item: IVideoItems) => new Date((new Date(item.publishedDate)).toUTCString()) >= dateYesteryear);
    //videoItems = videoItems.filter((item: IVideoItems) => item.average >= 100000000000);
    videoItems.sort((a, b) => {
      return b.trendViews - a.trendViews;
    });
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems.slice(0, 5000);
  }

  public getVideoItemsAverageByTop = (): IVideoItems[] => {
    let videoItems: IVideoItems[] = this.getVideoItems();
    const dateYesteryear: Date = new Date("August 17, 2024 12:00 AM +8");
    videoItems = videoItems.filter((item: IVideoItems) => new Date((new Date(item.publishedDate)).toUTCString()) >= dateYesteryear);
    //videoItems = videoItems.filter((item: IVideoItems) => item.average >= 100000000000);
    videoItems.sort((a, b) => {
      return b.average - a.average;
    });
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems.slice(0, 5000);
  }



  public getVideoItemsByAlltimeTrend = (): IVideoItems[] => {
    const videoItems: IVideoItems[] = this.getVideoItems();
    videoItems.sort((a, b) => {
      return b.trendViews - a.trendViews;
    });
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems.slice(0, 5000);
  }

  public getVideoItemsByAlltimeAverage = (): IVideoItems[] => {
    const videoItems: IVideoItems[] = this.getVideoItems();
    videoItems.sort((a, b) => {
      return b.average - a.average;
    });
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems.slice(0, 5000);
  }

  public getVideoItemsByInitialYear = (): IVideoItems[] => {
    let videoItems: IVideoItems[] = this.getVideoItems();
    const dateYesteryear: Date = new Date("August 17, 2024 12:00 AM +8");
    videoItems = videoItems.filter((item: IVideoItems) => new Date((new Date(item.publishedDate)).toUTCString()) >= dateYesteryear);
    videoItems.sort((a, b) => {
      return b.views - a.views;
    });
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems.slice(0, 5000);
  }

  public getVideoItemsByYear = (yearNo: number): IVideoItems[] => {
    let videoItems: IVideoItems[] = this.getVideoItems();
    const startYear: Date = new Date(`January 1, ${yearNo} 12:00 AM +8`);
    videoItems = videoItems.filter((item: IVideoItems) => new Date((new Date(item.publishedDate)).toUTCString()) >= startYear);
    const endYear: Date = new Date(`December 31, ${yearNo} 11:59 PM +8`);
    videoItems = videoItems.filter((item: IVideoItems) => new Date((new Date(item.publishedDate)).toUTCString()) <= endYear);
    videoItems.sort((a, b) => {
      return b.trendViews - a.trendViews;
    });
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems.slice(0, 5000);
  }

  public getVideoItemsByAverage = (): IVideoItems[] => {
    const videoItems: IVideoItems[] = this.getVideoItems();
    videoItems.sort((a, b) => {
      return b.average - a.average;
    });
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems;
  }

  public getVideoItemsByViewsV1 = (): IVideoItems[] => {
    let videoItems: IVideoItems[] = this.getVideoItems();
    const dateYesteryear: Date = new Date("June 7, 2023 12:00 AM +8"); //change this
    videoItems = videoItems.filter((item: IVideoItems) => new Date((new Date(item.publishedDate)).toUTCString()) >= dateYesteryear);
    videoItems.sort((a, b) => {
      return b.views - a.views;
    });
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems.slice(0, 5000);
  }

  public getVideoItemsByPublished = (videoItems: IVideoItems[], sorting: boolean): IVideoItems[] => {
    if (sorting) {
      videoItems.sort((a, b) => {
        const ia: any = a.publishedDate;
        const ib: any = b.publishedDate;
        return ib - ia;
      });
    } else {
      videoItems.sort((a, b) => {
        const ia: any = a.publishedDate;
        const ib: any = b.publishedDate;
        return ia - ib;
      });
    }
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems;
  }

  public getVideoItemsByTitle = (videoItems: IVideoItems[], sorting: boolean): IVideoItems[] => {
    if (sorting) {
      videoItems.sort((a, b) => {
        const x = a.title.toLowerCase();
        const y = b.title.toLowerCase();
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      });
    } else {
      videoItems.sort((a, b) => {
        const x = a.title.toLowerCase();
        const y = b.title.toLowerCase();
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems;
  }

  public getVideoItemsByArtist = (videoItems: IVideoItems[], sorting: boolean): IVideoItems[] => {
    if (sorting) {
      videoItems.sort((a, b) => {
        const x = a.artist.toLowerCase();
        const y = b.artist.toLowerCase();
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      });
    } else {
      videoItems.sort((a, b) => {
        const x = a.artist.toLowerCase();
        const y = b.artist.toLowerCase();
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems;
  }

  public getFilteredVideosInitial = (channelID: string): IVideoItems[] => {
    let videoItems: IVideoItems[] = this.getVideoItems();
    videoItems = videoItems.filter((element: any) => {
      return element.channelID === channelID
    });
    videoItems.sort((a, b) => {
      return b.trendViews - a.trendViews;
    });
    let itemOrder: number = 0;
    videoItems.map((videoItem: any) => {
      itemOrder++;
      videoItem.order = itemOrder;
    })
    return videoItems.slice(0, 5000);
    //return videoItems;
  }

  public getArtistFromData = (videoItems: IVideoItems[]): string => {
    if (videoItems.length > 0) {
      return videoItems[0].artist
    } else {
      return ""
    }
  }

  public removeArtist = (channelID: string): void => {
    const newArtists: IChannelObject[] = [];
    database.artists.map((channel: any) => {
      if (channel.channelID !== channelID) {
        const channelItem: IChannelObject = {
          channelID: channel.channelID,
          channelArtist: channel.channelArtist
        };
        newArtists.push(channelItem);
      }
    });
    const newdatabase: any = {
      artists: newArtists
    }
    this.writeJSON.createJSON(newdatabase, `database.json`);
  }

}