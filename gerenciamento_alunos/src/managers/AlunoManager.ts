import { IAluno } from "../interfaces/IAluno";
import { Aluno } from "../models/Aluno";
import * as fs from 'fs';
import * as path from 'path';

export class AlunoManager {

private alunos: IAluno[] = [];

private get caminhoArquivo(): string {
  const dir = path.join(__dirname, '../../database');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return path.join(dir, 'alunos.json');
}

constructor() {
  this.carregarAlunosDoArquivo();
}

carregarAlunosDoArquivo(): void {
  const caminho = this.caminhoArquivo;
  if (fs.existsSync(caminho)) {
    const dados = fs.readFileSync(caminho, 'utf-8');
    this.alunos = JSON.parse(dados);
  }
}

salvarAlunosNoArquivo(): void {
  const caminho = this.caminhoArquivo;
  fs.writeFileSync(caminho, JSON.stringify(this.alunos, null, 2));
}

adicionarAluno(novoAluno: IAluno): void {
    const existe = this.alunos.find(p => p.matricula.toLowerCase() === novoAluno.matricula.toLowerCase());
    if (existe) {
      console.log(`Erro: O aluno com matrícula '${novoAluno.matricula}' já está cadastrado!`);
      return;
    }

    this.alunos.push(novoAluno);
    this.salvarAlunosNoArquivo();
        console.log(`Aluno '${novoAluno.nome}' cadastrado com sucesso!`);
  }


public listarAlunos(): void {
  if (this.alunos.length === 0) {
    console.log('Nenhum aluno cadastrado.');
    return;
  }

  console.log('--- Lista de Alunos ---');

  this.alunos.forEach(aluno => {
    const alunoObj = new Aluno(aluno.nome, aluno.idade, aluno.matricula);
    alunoObj.exibirDetalhes();
  });
}
  }

