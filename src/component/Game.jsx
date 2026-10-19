
import { useState, useRef } from "react";

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!letter.trim()) return;

    verifyLetter(letter);
    setLetter("");

    letterInputRef.current?.focus();
  };

  return (
    <div className="text-white flex flex-col items-center py-10 px-4">
      <p className="text-lg mb-6">
        Pontuação:{" "}
        <span className="font-bold text-cyan-400">{score}</span>
      </p>

      <h1 className="text-3xl font-bold mb-2">
        Adivinha a palavra
      </h1>

      <h3 className="text-lg text-slate-300 mb-8">
        Dica sobre a palavra:
        <span className="text-cyan-400 ml-2">
          {pickedCategory}
        </span>
      </h3>

      <p className="mb-6">
        Ainda tens {guesses} tentativas.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {letters.map((currentLetter, i) => (
          <span
            key={i}
            className="w-12 h-12 flex items-center justify-center bg-slate-700 rounded-lg text-2xl font-bold"
          >
            {guessedLetters.includes(currentLetter)
              ? currentLetter
              : ""}
          </span>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="text-slate-300">
          Tenta adivinhar uma letra
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            name="letter"
            maxLength={1}
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
            required
            autoComplete="off"
            aria-label="Introduzir uma letra"
            className="w-14 h-14 text-center text-2xl font-bold text-black rounded-lg border-2 border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          />

          <button
            type="submit"
            className="px-6 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition"
          >
            Jogar
          </button>
        </form>
      </div>

      <div className="mt-8 text-center">
        <p className="text-slate-300 mb-2">
          Letras erradas:
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {wrongLetters.map((wrongLetter, i) => (
            <span
              key={i}
              className="text-red-400 font-bold"
            >
              {wrongLetter.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
