import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, View, Image } from 'react-native';


export default function App() {


  const [pokemons, setPokemons] = useState([])




  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon', {
      //executando o metodo GET dentro da api, para consulta
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(Response => Response.json())
    .then(data => {
      setPokemons(data.results)
    })
  }, [])



  return (
  
      <SafeAreaView>
        <FlatList 
        data={pokemons}
        keyExtractor={(pokemon) => pokemon.name }
        contentContainerStyle={{ flexGrow: 1}}
        renderItem={PokemonShow}
        />
      </SafeAreaView>
  
  )
}

function PokemonShow(item){


  const { name, url } = item.item
 //na api a imagem esta separada do link original por isso estou usando o replace para subistituir
 //o valor de uma url pela outra que contem a imagem, definido pelo ID de cada url para cada imagem referente

  const pokemonNumber = url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')

  const imageUrl = 'https://pokeres.bastionbot.org/images/pokemon/'+pokemonNumber+'.png'




  return(
    <View style={{ flexDirection: 'row'}} >
      <Image style ={{width: 50, height: 50}} source={{ uri: imageUrl }}/>
      <Text>{name}</Text>
    </View>
  )
}
