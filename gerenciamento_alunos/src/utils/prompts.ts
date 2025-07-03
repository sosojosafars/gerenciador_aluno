import inquirer from 'inquirer';
import { IAluno } from '../interfaces/IAluno';
import { AlunoManager } from '../managers/AlunoManager';

export async function promptParaDetalhesDoAluno(): Promise<IAluno> {
    
  const p = await inquirer.prompt([
        {
            type: 'input',
            name: 'nome',
            message: 'Qual é o seu nome?',
          },
          {
            type: 'input',
            name: 'idade',
            message: 'Qual a sua idade?',
          },
          {
            type: 'input',
            name: 'matricula',
            message: 'Qual é a sua matricula?',
            validate: input => input.trim() !== '' ? true : 'A matrícula não pode ser vazia'
          },
          {
            type: 'confirm',
            name: 'confirmar',
            message: 'Tem certeza?',
            default: true,
          },

    ]);
    return {
      nome: p.nome,
      idade: p.idade,
      matricula: p.matricula,  
    };
}

export async function promptMenuPrincipal(): Promise<string> {
  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'menu',
      message: 'O que você gostaria de fazer?',
      choices: ['Adicionar Aluno', 'Listar Alunos', 'Sair'],
    },
  ]);

  return resposta.menu;
}
