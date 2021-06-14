// *****************************************
// App.js
// *****************************************

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// importar componentes
import Tabela from './Tabela';

/**
 * função que irá ler os dados (fotografias) da API
 */
async function getFotos() {

  // ler os dados da API
  // https://create-react-app.dev/docs/proxying-api-requests-in-development/
  let resposta = await fetch("api/FotografiasAPI");

  if (!resposta.ok) {
    // não foi recebido o código 200 do HTTP
    console.error("Não conseguimos ler os dados da API. Código: " + resposta.status);
  }
  return await resposta.json();
}



/**
 * Componente principal do meu projeto
 */
class App extends React.Component {
  /**
   * Construtor da classe -> tem sempre este nome
   */
  constructor(props) {
    super(props); // <--- esta É SEMPRE a primeira instrução

    this.state = {
      /**
       * array que irá conter os dados das Fotos, vindas da API
       */
      fotos: []
    }
  }

  /**
   * Quando o objeto é criado, executa o código aqui escrito
   * Vamos usá-lo para carregar os dados da API
   */
  componentDidMount() {
    this.LoadFotos();
  }

  /**
   * Carrega as fotos da API e adiciona-as ao array 'fotos'
   */
  async LoadFotos() {
    /* Tarefas:
     *   1. Ler os dados da API (fetch)
         2. atualizar os dados na var. state
     */
    try {
      // 1.
      let fotosVindosDaAPI = await getFotos();

      // 2.
      // esta não é a forma correta: this.state.fotos = fotosVindosDaAPI;
      this.setState({
        fotos: fotosVindosDaAPI
      });
    } catch (erro) {
      console.error("Erro na leitura das fotos da API", erro);
    }
  }


  render() {
    const { fotos } = this.state;
    return (
      <div className="container">
        {/* este componente - Tabela - irá apresentar os dados das 'fotos' no ecrã
            as 'fotos' devem ser lidas na API */}
        <Tabela dadosFotos={fotos} />
      </div>)
  }

}

export default App;