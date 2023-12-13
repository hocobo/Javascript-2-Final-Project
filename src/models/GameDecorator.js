import {db} from "@/firebase";
function GameDecorator(game){

    game.priority = 1;

    game.completed = 'No';

    game.favorite = game.favorite === 'true';


    game.favoriteGame = function(item) {
        this.favorite = true;
        db.collection('games')
            .doc(item.id)
            .update({favorite:'true'})

    }

    game.unfavoriteGame = function(item) {
        this.favorite = false;
        db.collection('games')
            .doc(item.id)
            .update({favorite:'false'})
    }

    game.isFavorite = function() {
        return this.favorite === true;
    }
    game.editModal = false;

    game.removeModal = false;

    return game;
}

export default GameDecorator