import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPEN_MAPS_API_KEY_DASHA;

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
      const url = `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${lon}&lat=${lat}&kinds=cultural%2Cnatural%2Chistoric&apikey=${apiKey}`;
      const results = await axios(url);
      return {
        lon: lon,
        lat: lat,
        sites: results.data.features
      };
    }
  } catch (err) {
    console.log(err);
  }
};

const getWiki = async wikiData => {
  try {
    if (wikiData) {
      const url = `https://api.opentripmap.com/0.1/en/places/xid/${wikiData}?apikey=${apiKey}`;
      const results = await axios(url);
      // console.log(results)
      return {
        name: results.data.name,
        image: results.data.image,
        rate: results.data.rate,
        text: results.data.wikipedia_extracts.text,
      };
    }
  } catch (err) {
    console.log(err);
  }
};


// console.log(await getGeoname('London'), 'response');
// console.log(await getWiki('Q2073943'));
export { getRadius, getWiki };
