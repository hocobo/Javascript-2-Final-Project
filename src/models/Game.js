

class Game {

    static type = 'Game';

    get type() {
        return Game.type;
    }


    id = 0;
    name = '';
    rating = 0;
    released = '';
    background_image = '';
    genres = [];




    get getGenres(){
        let gameGenres = '';
        let count = this.genres.length;
        this.genres.forEach(genre => {
            gameGenres += genre.name;
            count--;
            if(count > 0){
                gameGenres += ', ';
            }
        })
        return gameGenres;
    }


}


export default Game;