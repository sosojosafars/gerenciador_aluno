import { IEvento } from "./model/interface";
import { Evento } from "./model/Evento";
import  "./src/controller";
import { promptMenuPrincipal } from "./view/Menu";
import { promptParaDetalhesDoAluno } from "./view/Menu";

async function main() {
  const eventoMa = new EventoController();

  while (true) {
    const escolha = await promptMenuPrincipal();

    if (escolha === 'Adicionar Novo Evento') {
      const novoAluno = await promptParaDetalhesDoAluno();
      eventoMa.adicionarAluno(novoAluno);
    } else if (escolha === 'Listar Todos os Eventos') {
      eventoMa.listarAlunos();
    }else if (escolha === 'Buscar Evento') {
        const buscarevento = await promptParaDetalhesDoAluno();
        eventoMa.buscarevento(buscarevento);
    }else if (escolha === 'Atualizar Evento') {
      const eventoatualizar = await promptParaDetalhesDoAluno();
      eventoMa.atualizarevento(eventoatualizar);
    } else if (escolha === 'Cancelar Evento') {
      const eventocancelar = await promptParaDetalhesDoAluno();
      eventoMa.cancelarevento(eventocancelar.id.toString());
     }else if (escolha === 'Registrar Participante') {
        const registropart = await promptParaDetalhesDoAluno();
        eventoMa.participanteregistro(registropart);
     } 
     else if (escolha === 'Sair') {
        console.log('Saindo do gerenciador de alunos. Até mais!');
     break;
    } 
    }
  
}
main();