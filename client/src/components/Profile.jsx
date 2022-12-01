import React from 'react';

const Profile = () => {
  const user = localStorage.getItem('user');
  const localUser = JSON.parse(user);

  return (
    <>
      {localUser && (
        <>
          <p><b>First name</b>: {localUser.firstName}</p>
          <p><b>Last name</b>: {localUser.lastName}</p>
          <p><b>Email</b>: {localUser.email}</p>
        </>
      )}
    </>
  );
};

export default Profile;
