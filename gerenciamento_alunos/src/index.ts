import { IAluno } from "./interfaces/IAluno";
import { AlunoManager } from "./managers/AlunoManager"
import { Aluno } from "./models/Aluno"
import { promptMenuPrincipal } from "./utils/prompts";
import { promptParaDetalhesDoAluno } from "./utils/prompts";

async function main() {
  const alunoManager = new AlunoManager();

  while (true) {
    const escolha = await promptMenuPrincipal();

    if (escolha === 'Adicionar Aluno') {
      const novoAluno = await promptParaDetalhesDoAluno();
      alunoManager.adicionarAluno(novoAluno);
    } else if (escolha === 'Listar Alunos') {
      alunoManager.listarAlunos();
    } else if (escolha === 'Sair') {
      console.log('Saindo do gerenciador de alunos. Até mais!');
      break;
    }
  }
}

main();