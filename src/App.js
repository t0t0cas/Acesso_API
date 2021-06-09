//****************************/
//App.js
//****************************/

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

//import compentes 
import Tabela from './Tabela'

/**
 * Função que irá ler os dados da API
 */
async function getFotos(){
  //ler os dados da api
  let recivefotos = await fetch("/api/FotografiaAPI");
  
  if(!recivefotos.ok){
    //não foi recebido o código 200 do HTTP
    console.error("Não foi possível ler os dados da API. Código: " + recivefotos.status);
  }
  return await recivefotos.json();
}

/**
 * Componente principal do meu projeto
 */
class App extends React.Component{

  /**
   * Construtor da classe -> tem sempre este nome
   * @param {} props 
   */
  constructor(props){
    super(props); // <--- esta é SEMPRE a primeira instrução

    this.state ={
      /**
       * array que irá conter os dados das Fotos, vindas da API
       */
      fotos: []
    }
  }

  /**
   * Quando o objeto é criado, executa o código aqui escrito
   * Vamos usar este método para carregar os dados da API
   */
  componentDidMount(){
    this.loadFotos();
  }

  /**
   * Carrega as fotos da API e adiciona-as ao array 'fotos'
   */
  async loadFotos(){
    /**
     * Taferas:
     * - 1. Ler os dados da API (fetch)
     * - 2. atualizar os dados na var. state
     */
    try {
      // 1.
      let fotosAPI = await getFotos();

      //2.
      this.setState({
        fotos:fotosAPI
      });
    }catch (erro){ 
      console.error("Erro na leitura dos dados da API", erro);
    }
  }

  render(){
    const{fotos}=this.state;
    return (
    <div className="container">
      {/*este componente - Tabela - irá apresentar os dados das 'fotos' no ecrã 
         as 'fotos' devem ser lidas na API */}
      <Tabela dadosFotos={fotos} />
    </div>);
  }

}

export default App;
