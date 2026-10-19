
import Game from "./component/Game";
import GameOver from "./component/GameOver";
import { StartScreen } from "./component/StartScreen";
import { WordsList } from "./data/Words";
import { useEffect, useState, useCallback } from "react";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [word] = useState(WordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(word);

    const category =
      categories[Math.floor(Math.random() * categories.length)];

    const palavra =
      word[category][
        Math.floor(Math.random() * word[category].length)
      ];

    return { palavra, category };
  }, [word]);

  const clearLetterStates = useCallback(() => {
    setGuessedLetters([]);
    setWrongLetters([]);
    setGuesses(guessesQty);
  }, []);


  const startGame = useCallback(() => {
    clearLetterStates();

    const { palavra, category } = pickWordAndCategory();

    setPickedWord(palavra);
    setPickedCategory(category);
    setLetters(palavra.toLowerCase().split(""));
    setGameStage(stages[1].name);
  }, [pickWordAndCategory, clearLetterStates]);


  const verifyLetter = (letter) => {
    const normalizedLetter = letter.trim().toLowerCase();

    if (!normalizedLetter) return;

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((previous) => [
        ...previous,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((previous) => [
        ...previous,
        normalizedLetter,
      ]);

      setGuesses((previous) => previous - 1);
    }
  };


  useEffect(() => {
    if (gameStage === "game" && guesses <= 0) {
      setGameStage(stages[2].name);
    }
  }, [guesses, gameStage]);

  // Verificar se o jogador acertou todas as letras
  useEffect(() => {
    if (gameStage !== "game" || letters.length === 0) {
      return;
    }

    const uniqueLetters = [...new Set(letters)];

    const hasWon = uniqueLetters.every((letter) =>
      guessedLetters.includes(letter)
    );

    if (hasWon) {
      setScore((previous) => previous + 100);
      startGame();
    }
  }, [guessedLetters, letters, gameStage, startGame]);

  // Voltar ao ecrã inicial
  const retry = () => {
    clearLetterStates();
    setLetters([]);
    setPickedWord("");
    setPickedCategory("");
    setScore(0);
    setGameStage(stages[0].name);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
      {gameStage === "start" && (
        <StartScreen startGame={startGame} />
      )}

      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}

      {gameStage === "end" && (
        <GameOver retry={retry} score={score} />
      )}
    </div>
  );
}

export default App;
