import React, { useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

interface User {
  email: string;
  number: string;
}

const App: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<User[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      alert("Geçerli bir email giriniz");
      return;
    }

    axios
      .post<User[]>("http://localhost:5000/search", {
        email,
        number: number.replace(/-/g, ""),
      })
      .then((response) => {
        setResult(response.data);
      });
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div>
      <h1>Kullanıcı Ara</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number (opsiyonel): </label>
          <InputMask
            mask="99-99-99"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <button type="submit">Ara</button>
      </form>

      {result.length > 0 && (
        <div>
          <h2>Sonuçlar:</h2>
          <ul>
            {result.map((user, index) => (
              <li key={index}>
                {user.email} - {user.number}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
