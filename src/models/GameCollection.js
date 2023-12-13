import GameDecorator from "@/models/GameDecorator";
import Game from "@/models/Game";
import UserGame from "@/models/UserGame";

function GameCollection() {
    let arr = [];
    let sortDirection = true;
    arr.addItem = function(item){
        this.push(new GameDecorator(item));
        return this;
    }
    arr.priorityAdjustment = function() {
        for(let game of this){
            game.priority = this.indexOf(game) + 1;
        }
        return this;
    }

    arr.sortCollectionLowercase = function(sortType) {
        this.sort((a,b) =>{
            let ga = a[sortType].toLowerCase(), gb = b[sortType].toLowerCase();
            if (ga < gb){
                return -1
            }
            if (ga > gb){
                return 1
            }
            return 0
        })
        if(sortDirection){
            sortDirection = !sortDirection;
            return this;
        }else{
            sortDirection = !sortDirection
            return this.reverse();
        }
    }
    arr.sortCollection = function(sortType) {
        this.sort((a,b) =>{
            let ga = a[sortType], gb = b[sortType];
            if (ga < gb){
                return -1
            }
            if (ga > gb){
                return 1
            }
            return 0
        })
        if(sortDirection){
            sortDirection = !sortDirection;
            return this;
        }else{
            sortDirection = !sortDirection
            return this.reverse();
        }
    }
    arr.filterOnSearch = function(searchTerm) {
        return this.filter(g => {

            return g.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
        })

    }
    return arr;
}
export default GameCollection;
