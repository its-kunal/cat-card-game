import  { useEffect } from "react";
import catCard from "../assets/catCard.svg";
import diffuseCard from "../assets/diffuse.svg";
import explodeCard from "../assets/explode.svg";
import shuffleCard from "../assets/shuffle.svg";
import cardSvg from "../assets/Card.svg";
import { useAppDispatch, useAppSelector } from "../store/app";
import { popCard, startGame } from "../features/game";

// enum Cards {
//   CAT = "CAT",
//   DEFUSE = "DEFUSE",
//   SHUFFLE = "SHUFFLE",
//   EXPLODE = "EXPLODE",
//   HIDDEN = "HIDDEN",
// }

// const cards = Object.values(Cards);

const cardMap = {
  CAT: catCard,
  DEFUSE: diffuseCard,
  SHUFFLE: shuffleCard,
  EXPLODE: explodeCard,
  HIDDEN: cardSvg,
};

export default function CardGame() {
  const currentCard = useAppSelector((state) => state.game.currentCard);
  const dispatch = useAppDispatch();
  const cardLen = useAppSelector((state) => state.game.cardLen);
  const message = useAppSelector((state) => state.game.message);
  const popCardHandler = () => {
    dispatch(popCard());
  };
  const cardCSS = "md:w-32 w-20 first:ml-0 -ml-5";
  useEffect(() => {
    dispatch(startGame());
  }, []);
  return (
    <div className="mx-auto">
      <div className="flex items-center">
        {currentCard === "HIDDEN" ? (
          <img
            src={cardMap[currentCard]}
            alt=""
            className={cardCSS}
            onClick={popCardHandler}
          />
        ) : (
          <img
            src={cardMap[currentCard]}
            alt=""
            className={cardCSS}
            onClick={popCardHandler}
          />
        )}

        {cardLen > 0 ? (
          Array(cardLen)
            .fill(0)
            .map((_v, idx) => {
              return (
                <img
                  src={cardMap["HIDDEN"]}
                  alt=""
                  className={cardCSS}
                  key={idx}
                />
              );
            })
        ) : (
          <></>
        )}
      </div>
      <div className="h-10"></div>

      <div className="text-center">
        {message.length > 0 ? <>Message: {message}</> : <></>}
      </div>
    </div>
  );
}
