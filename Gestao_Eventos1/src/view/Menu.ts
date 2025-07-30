import inquirer from 'inquirer';
import { v4 as uuidv4 } from 'uuid';
import { IEvento } from '../model/interface'; 
import '../controller/EventoController'

export async function promptParaDetalhesDoAluno(): Promise<IEvento> {
  return await inquirer.prompt([
        {
            type: 'input',
            name: 'nome',
            message: 'Digite o nome do evento?',
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
    ]);
}

export async function promptMenuPrincipal(): Promise<string> {
    const resposta = await inquirer.prompt([
      {
        type: 'list',
        name: 'menu',
        message: 'O que você gostaria de fazer?',
        choices: ['Adicionar Novo Evento', 'Listar Todos os Eventos', 'Buscar Eventos', 'Atualizar Evento','Cancelar Evento', 'Registrar Participante', 'Sair'],
      },
    ]);
  
    return resposta.menu;
  }