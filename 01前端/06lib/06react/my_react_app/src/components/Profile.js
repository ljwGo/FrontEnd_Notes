import React from 'react';

function Profile(props) {
  return (
    <div>
      <div>Hello</div>
      <h1>{props.name}</h1>
      <p>{props.bio}</p>
    </div>
  );
}

export default Profile;