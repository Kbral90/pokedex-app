export interface User {
    id: string,
    user : string,
    password: string,
    nombre: string,
    apellidos: string,
    dob : string, 
    equipo : string,
    action: string
}

export interface pokeList{
    index: number,
    name: string,
    url: string,
    action: string
}

export interface pokeData{
    index: number,
    name: string,
    image: {url: string},
    action: string
}

export interface UserPok{
    idUser?: number,
    idPokem?: number
}

export interface favUserPok{
    index: number,
    idUser?: number,
    idPokem?: number
}


