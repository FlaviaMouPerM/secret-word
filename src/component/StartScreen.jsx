export const StartScreen = ({startGame}) => {
  return (
    <div className="text-center">
      <h1 className="text-[50px] text-[oklch(70%_0.14_182.503)] font-bold">
        Secret Word
      </h1>
      <p className="text-[oklch(98.7%-0.022-95.277)]">
        Click no Botão para começar a jogar
      </p>
      <button onClick={startGame} className="px-6 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition mt-6"
>
        Play Game
      </button>
    </div>
  );
};