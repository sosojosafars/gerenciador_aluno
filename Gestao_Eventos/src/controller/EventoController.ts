import { Evento } from "../model/Evento";
import { IEvento } from "../model/interface"


const fs = require("fs");
const path = require("path");

const Database = './src/ev.json';

function ler(): IEvento[]{
    const info = fs.readFileSync(Database, "utf-8");
    return JSON.parse(info);
}

function salvar (p: IEvento[]): void {
    fs.writeFileSync(Database, JSON.stringify(p , null, 2))
}
  
  
function adicionarNovoEvento(novoEvento: IEvento): void {
    const p = ler();
    const eventoExistente = p.find((evento) => evento.id === novoEvento.id);
    if (eventoExistente) {
      console.log(`Evento com ID ${novoEvento.id} já existe.`);
    } else {
      p.push(novoEvento);
      salvar(p);
      console.log(`Evento ${novoEvento.nome} adicionado com sucesso.`);
    }
}

function listarTodososEventos(): void {
    const p = ler();
    if (p.length === 0) {
      console.log("Nenhum evento encontrado.");
    } else {
      p.forEach((evento) => {
        console.log(`Id: ${evento.id} \n Nome: ${evento.nome} \n Data: ${evento.data} \n Local: ${evento.local} \n Capacidade Máxima: ${evento.capacidadeMaxima} \n Participantes Atuais: ${evento.participantesAtuais} \n Status: ${evento.status}`);
      });
  
    }
      
}

function buscarEvento(nome: String, local: String): IEvento | undefined {
    const p = ler();
    return p.find((evento) => evento.nome === nome && evento.local === local);
}

function atualizarEvento(EventoAtualizar: Evento): void {
    const dbFile = path.join(__dirname, '../ev.json');

    if (!fs.existsSync(dbFile)) {
        throw new Error("O banco de dados do evento não existe.");
    }
    let eventoDoBanco: Evento[] = [];
    try {
        const conteudoDoArquivo = fs.readFileSync(dbFile, "utf-8");
        eventoDoBanco = JSON.parse(conteudoDoArquivo); 
    } catch (erro: any) {
        if (erro.code !== "ENOENT") {
            throw erro;
        }
    }

    const index = eventoDoBanco.findIndex(
        (perfil) => perfil.nome.toLowerCase() === EventoAtualizar.nome.toLowerCase()
    );

    if (index === -1) {
        throw new Error(`O aluno ${EventoAtualizar.nome} não foi encontrado para edição.`);
    }

    eventoDoBanco[index] = EventoAtualizar;

    const novoConteudo = JSON.stringify(eventoDoBanco, null, 2);
    fs.writeFileSync(dbFile, novoConteudo, "utf-8");
    console.log(`O aluno ${EventoAtualizar.nome} foi editado com sucesso!`);

}


    function  cancelarEvento(existente: IEvento) {      
      const p = ler();
      const eventoExistente = p.filter((evento) => evento.id !== existente.id);

      if(eventoExistente){
        console.log(`Nenhum aluno com a matrícula "${existente.id}" foi encontrado.`);
    } else {
        salvar(p);
        console.log(` Aluno com matrícula "${existente.id}" foi removido com sucesso.`);
    }

    }
    
    
