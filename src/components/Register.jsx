import { useState } from 'react';

export default function Register({ onNext }) {
  const [form, setForm] = useState({
    nrc: '', name: '', phone: '', email: '', password: ''
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registered:', form);
    onNext(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="nrc" placeholder="NRC" autoSave="false" onChange={handleChange} />
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="email" type='email' placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}
