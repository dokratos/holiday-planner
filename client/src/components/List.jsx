import React, { useContext } from 'react';
import { AppContext } from '../AppProvider';

const List = () => {
  const { lists } = useContext(AppContext);
  // const sites = lists?.map(list => list.sites.filter(site => site.name === list.listName));
  console.log(lists);
  return (
    <>
    list
    </>
  )
}

export default List;
