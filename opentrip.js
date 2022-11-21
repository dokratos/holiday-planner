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
      //https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=4.897070&lat=52.377956&kinds=Cultural&apikey=5ae2e3f221c38a28845f05b6801bf7a81426f0f05a98e2455f5e262e

      let url = `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${lon}&lat=${lat}&kinds=cultural%2Cnatural%2Chistoric&apikey=${apiKey}`;
      const results = await axios(url);
      return results.data.features;
    }
  } catch (err) {
    console.log(err);
  }
};

// const getWiki = async wikiData => {
//   const { lon, lat } = await getGeoname(query);

//   try {
//     if (wikiData) {
//       //https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=4.897070&lat=52.377956&kinds=Cultural&apikey=5ae2e3f221c38a28845f05b6801bf7a81426f0f05a98e2455f5e262e

//       let url = `https://www.wikidata.org/wiki/Special:EntityData/${wikiData}`;
//       const results = await axios(url);
//       return results.data.features;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };





// console.log(await getGeoname('London'), 'response');
// console.log(await getMap());
console.log(await getRadius('Utrecht'), 'response');
export default getRadius;
