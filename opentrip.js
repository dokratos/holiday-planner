import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPEN_MAPS_API_KEY_ILIANA;

const getGeoname = async query => {  
  try {
      if (query !== undefined) {
        const url = `https://api.opentripmap.com/0.1/en/places/geoname?name=${query}&apikey=${apiKey}`;
        const results = await axios(url);
        return results.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

const getRadius = async query => {
  const { lon, lat } = await getGeoname(query);

  try {
    if (lon && lat) {
      const url = `https://api.opentripmap.com/0.1/en/places/radius?radius=6000&lon=${lon}&lat=${lat}&kinds=cultural%2Cnatural%2Chistoric&rate=3h&limit=2000&apikey=${apiKey}`;
      const results = await axios(url);
      const filteredSites = results.data.features.filter(site => {
        if (site.properties.name) return site;
      });
      return {
        lon: lon,
        lat: lat,
        sites: filteredSites,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

const getWiki = async wikiData => {
  try {
    if (wikiData) {
      const url = `https://api.opentripmap.com/0.1/en/places/xid/${wikiData.id}?apikey=${apiKey}`;
      const results = await axios(url);
      return {
        siteId: results.data.xid,
        name: results.data.name,
        city: results.data.address.city,
        image: results.data.preview?.source,
        text: results.data.wikipedia_extracts?.text,
        point: results.data.point,
      };
    }
  } catch (err) {
    return (err);
  }
};

const getCityImage = async listName => {
  const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${listName}+city&image_type=photo`;
  const results = await axios(url);
  if(results.data.hits.length === 0 ) {
    return 'https://pixabay.com/get/g7aeab1da38416c3a92dab8274d4544fdf1aad97182a55252df69882322c3bf4491f90310425a452be2ce8094eccb75f7e4f1091ea741c58a90c1f5eaeb829121_640.jpg'
  }
  return results.data.hits[0].webformatURL;
}

export { getRadius, getWiki, getCityImage };
