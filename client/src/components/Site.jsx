import React,  { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppProvider';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Site = () => {
  const { siteData, setSiteData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  let { site } = useParams();

  useEffect(() => {
    const getData = async (site) => {
      const response = await axios.get(`/api/sites/${site}`);
      setSiteData(response.data);
      setIsLoading(false);
    }

    getData(site);
  }, []);

  if (isLoading) {
    return <>Loading...</>
  }

  const handleAddClick = async e => {
    e.preventDefault();
    try {
      return await axios.patch('/api/favorites', siteData);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <h2>title: {siteData.name}</h2> 
      <img alt={siteData.name} src={siteData.image} />
      <p>desc: {siteData.text}</p>
      <p>rate: {siteData.rate}</p>
      <button onClick={handleAddClick}>Add</button>
      <button><Link to='/favorites'>Fave</Link></button>

    </>
  )
}

export default Site;