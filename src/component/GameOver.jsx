
const GameOver = ({ retry, score }) => {
  return (
    <div className="text-center text-amber-50">
      <h1 className="text-4xl font-bold mb-4">
        Game Over!
      </h1>

      <h2 className="text-xl mb-6">
        A tua pontuação foi:{" "}
        <span className="text-cyan-400 font-bold">
          {score}
        </span>
      </h2>

      <button
        onClick={retry}
        className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition"
      >
        Voltar ao início
      </button>
    </div>
  );
};

export default GameOver;
