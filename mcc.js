const axios = require('axios');
const autoBind = require('auto-bind');

const BASE_URL = 'https://cryptum.halodotapi.com';
/**
 * setup options
 */
const options = {
  json: true,
  headers: {
    Authorization:
      'Cryptum-Token YOUR_TOKEN',
    'Cryptum-API-Version': '2.3-alpha',
  },
};

class Cryptum {
  constructor() {
    this.rootUrl = BASE_URL;
    this.mccStats = 'games/hmcc/stats/players/';
    autoBind(this);
  }

  urlFor(endpoint) {
    return `${this.rootUrl}/${endpoint}`;
  }

  async fetch(endpoint) {
    const res = await axios.get(this.urlFor(endpoint), options);
    if (res.status !== 200) {
      throw new Error(`${res.status}`);
    }
    return res.data;
  }

  /**
   * Get player MCC XP
   * @param {*} gamertag
   */
  async mccXP(gamertag) {
    if (!gamertag) {
      return new Error('No gamertag was provided');
    }
    return this.fetch(`${this.mccStats}${gamertag}/xp`);
  }

  /**
   * Get Player MCC ranked positions
   * @param {*} gamertag
   */
  async mccRanks(gamertag) {
    if (!gamertag) {
      return new Error('No gamertag was provided');
    }
    return this.fetch(`${this.mccStats}${gamertag}/ranks?platform=xbox-one`);
  }

  /**
   * Get Player MCC recent-matches
   * @param {*} gamertag
   */
  async mccRecentMatches(gamertag) {
    if (!gamertag) {
      return new Error('No gamertag was provided');
    }
    return this.fetch(`${this.mccStats}${gamertag}/recent-matches?page=1`);
  }

  /**
   * Get Player MCC service-record
   * @param {*} gamertag
   */
  async mccServiceRecord(gamertag) {
    if (!gamertag) {
      return new Error('No gamertag was provided');
    }
    return this.fetch(`${this.mccStats}${gamertag}/service-record`);
  }

  /**
   * Get Player MCC appearance
   * @param {*} gamertag
   */
  async mccAppearance(gamertag) {
    if (!gamertag) {
      return new Error('No gamertag was provided');
    }
    return this.fetch(`/games/hmcc/appearance/players/${gamertag}`);
  }

  /**
   * Get the MCC message of the day
   */
  async mccMOTD() {
    return this.fetch(`/games/hmcc/motd?language=en-US`);
  }

  /**
   * Get the MCC message of the day IMAGE
   */
  async mccMOTDImage() {
    return this.fetch('/games/hmcc/motd/images/h3-flight-mongoose.jpg');
  }

  /**
   * Get custom UGC data
   * @param {*} id
   * @abstract Test ID  = 70bc732a-6a31-4300-9ca2-82292c78098b
   */
  async mccUGC(id) {
    if (!id) {
      return new Error('No ID was provided');
    }
    return this.fetch(`/games/hmcc/ugc/items/${id}`);
  }

  /**
   * Get player MCC Game Variants
   * @param {*} gamertag
   */
  async mccGameVariants(gamertag) {
    if (!gamertag) {
      return new Error('No gamertag was provided');
    }
    return this.fetch(
      `/games/hmcc/ugc/players/${gamertag}/gamevariants?count=25&skip=0`,
    );
  }

  /**
   * Get player MCC Map Variants
   * @param {*} gamertag
   */
  async mccMapVariants(gamertag) {
    if (!gamertag) {
      return new Error('No gamertag was provided');
    }
    return this.fetch(
      `/games/hmcc/ugc/players/${gamertag}/mapvariants?count=25&skip=0`,
    );
  }

  /**
   * Game logo URL's and titles
   */
  async mccMetadata() {
    return this.fetch('/games/hmcc/metadata/engines');
  }

  /**
   * Get the latest screenshot or select optional (page)
   * @param {*} gamertag
   * @param {*} page optional
   */
  async mccScreenShot(gamertag, page = 1) {
    if (!gamertag) {
      return new Error('No gamertag was provided');
    }
    return this.fetch(
      `/games/hmcc/media/players/${gamertag}/screenshots?page=${page}&language=en-US`,
    );
  }

  /**
   * Get the latest game clip or select optional (page)
   * @param {*} gamertag
   * @param {*} page optional
   */
  async mccClips(gamertag, page = 1) {
    if (!gamertag) {
      return new Error('No gamertag was provided');
    }
    return this.fetch(
      `/games/hmcc/media/players/${gamertag}/clips?page=${page}&language=en-US`,
    );
  }
}
module.exports = Cryptum;
