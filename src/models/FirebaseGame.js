function FirebaseGame(id,data) {
    id = id ?? '';
    data = data ?? {};


    return {
        id: id,
        name: data.name ?? '',
        rating: data.rating ?? 0,
        released: data.released ?? '',
        background_image: data.background_image ?? '',
        genres: data.genres ?? '',
        type: data.gameType ?? 'Game',
        fromFirebase: true,
        favorite: data.favorite ?? 'false',

    }


}


export default FirebaseGame;