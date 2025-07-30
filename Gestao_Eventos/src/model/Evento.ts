import { IEvento } from "./interface"

export class Evento implements IEvento{
    id: String
    nome: String
    data: String
    local: String
    capacidadeMaxima: number  
    participantesAtuais: number 
    status: String

    constructor(id: String, nome: String, data: String, local: String,  capacidadeMaxima: number, participantesAtuais: number, status: String) {
        this.id = id;
        this.nome = nome;
        this.data = data;
        this.local = local;
        this.capacidadeMaxima = capacidadeMaxima;
        this.participantesAtuais = participantesAtuais;
        this.status = status;
      }

    exibirDetalhes(): void {
        console.log(`Id: ${this.id} \nNome: ${this.nome} \nData: ${this.data} \nLocal: ${this.local} \n Capacidade Máxima: ${this.capacidadeMaxima} \nParticipantes Atuais: ${this.participantesAtuais} \nStatus: ${this.status}`);
        console.log(`------------------------------`);
      }

  }

