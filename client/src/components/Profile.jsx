import React from 'react';

const Profile = () => {
  const user = localStorage.getItem('user');
  const localUser = JSON.parse(user);

  return (
    <>
      {localUser && (
        <>
          <p>First name: {localUser.firstName}</p>
          <p>Last name: {localUser.lastName}</p>
          <p>Email: {localUser.email}</p>
        </>
      )}
    </>
  );
};

export default Profile;
