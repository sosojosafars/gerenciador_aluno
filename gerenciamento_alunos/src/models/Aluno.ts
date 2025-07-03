import { IAluno } from "../interfaces/IAluno";

export class Aluno implements IAluno{
    nome: String
    idade: number
    matricula: String   

    constructor(nome: String, idade: number, matricula: String) {
        this.nome = nome;
        this.idade = idade;
        this.matricula = matricula;
      }

    exibirDetalhes(): void {
        console.log(`Nome: ${this.nome} \nIdade: ${this.idade} \nMatricula: ${this.matricula}`);
        console.log(`------------------------------`);
      }

  }

