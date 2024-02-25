import CardGame from "../components/CardGame";
import GameControls from "../components/GameControls";
import Title from "../components/Title";

export default function Game() {
  return (
    <div>
      <Title />
      <div className="md:h-24 h-10"></div>
      {/* card wrapper divs */}
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-x-4 gap-y-4">
          <CardGame />
          <div className="h-10"></div>
          <GameControls />
        </div>
      </div>
      <div className="md:h-24 h-10"></div>
    </div>
  );
}
