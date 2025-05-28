import React, { useState } from 'react';

function EditProfile(props) {
  const [name, setName] = useState(props.name || '');
  const [bio, setBio] = useState(props.bio || '');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSave({ name, bio });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Bio:
        <textarea value={bio} onChange={handleBioChange} />
      </label>
      <br />
      <button type="submit">Save</button>
    </form>
  );
}

export default EditProfile;