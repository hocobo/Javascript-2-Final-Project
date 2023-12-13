import GameCollection from "@/models/GameCollection";
import Game from "@/models/Game";

class GameCollectionFactory {
    static createFromRawgDatabase (results) {
        const collection = new GameCollection();


        results.results.forEach(result => {
            let newGame = false;

            newGame = Object.assign(new Game(), result);

            if(newGame) {
                collection.addItem(newGame);
            }

        });
        return collection.reverse();
    }
}
export default GameCollectionFactory