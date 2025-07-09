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

  public editarAluno(AlunoBuscar: IAluno): void {
        const dbFile = path.join(__dirname, '../../database/alunos.json');
    
        if (!fs.existsSync(dbFile)) {
            throw new Error("O banco de dados de alunos não existe.");
        }
        let alunosDoBanco: IAluno[] = [];
        try {
            const conteudoDoArquivo = fs.readFileSync(dbFile, "utf-8");
            alunosDoBanco = JSON.parse(conteudoDoArquivo); 
        } catch (erro: any) {
            if (erro.code !== "ENOENT") {
                throw erro;
            }
        }
    
        const index = alunosDoBanco.findIndex(
            (perfil) => perfil.nome.toLowerCase() === AlunoBuscar.nome.toLowerCase()
        );
    
        if (index === -1) {
            throw new Error(`O aluno ${AlunoBuscar.nome} não foi encontrado para edição.`);
        }
    
        alunosDoBanco[index] = AlunoBuscar;
    
        const novoConteudo = JSON.stringify(alunosDoBanco, null, 2);
        fs.writeFileSync(dbFile, novoConteudo, "utf-8");
        console.log(`O aluno ${AlunoBuscar.nome} foi editado com sucesso!`);

    }

 public async deletarAluno(matricula: string): Promise<void> {
  const quantidadeAntes = this.alunos.length;

  this.alunos = this.alunos.filter((aluno) => aluno.matricula !== matricula);

  const quantidadeDepois = this.alunos.length;

  if (quantidadeDepois === quantidadeAntes) {
    console.log(`Nenhum aluno com a matrícula "${matricula}" foi encontrado.`);
  } else {
    await this.salvarAlunosNoArquivo();
    console.log(` Aluno com matrícula "${matricula}" foi removido com sucesso.`);
  }
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

