class PosicionamentoRainha {
  private tamanhoTabuleiro: number;
  private solucoes: number[][];
  
  constructor(tamanhoTabuleiro: number) {
    this.tamanhoTabuleiro = tamanhoTabuleiro;
    this.solucoes = [];
  }
  
  resolver(): number[][] {
    const tabuleiro: number[][] = [];
    for (let i = 0; i < this.tamanhoTabuleiro; i++) {
      tabuleiro.push(new Array(this.tamanhoTabuleiro).fill(0));
    }
    
    this.posicionarRainhas(tabuleiro, 0);
    
    return this.solucoes;
  }  
  
  private posicionarRainhas(tabuleiro: number[][], coluna: number): void {
    if (coluna === this.tamanhoTabuleiro) {
      // Encontrou uma solução, adicione-a à lista de soluções
      const novaSolucao = this.clonarTabuleiro(tabuleiro);
      if (!this.existeSolucao(novaSolucao)) {
        this.solucoes.push(novaSolucao);
      }
      return;
    }
    
    for (let linha = 0; linha < this.tamanhoTabuleiro; linha++) {
      if (this.estaSeguro(tabuleiro, linha, coluna)) {
        tabuleiro[linha][coluna] = 1; // Colocar uma rainha na posição atual
        
        // Tenta recursivamente posicionar as rainhas na próxima coluna
        this.posicionarRainhas(tabuleiro, coluna + 1);
        
        tabuleiro[linha][coluna] = 0; // Remover a rainha para voltar atrás
      }
    }
  }
  
  private estaSeguro(tabuleiro: number[][], linha: number, coluna: number): boolean {
    // Verificar se existe uma rainha na mesma linha
    for (let j = 0; j < coluna; j++) {
      if (tabuleiro[linha][j] === 1) {
        return false;
      }
    }
    
    // Verificar se existe uma rainha na diagonal superior esquerda
    for (let i = linha, j = coluna; i >= 0 && j >= 0; i--, j--) {
      if (tabuleiro[i][j] === 1) {
        return false;
      }
    }
    
    // Verificar se existe uma rainha na diagonal inferior esquerda
    for (let i = linha, j = coluna; i < this.tamanhoTabuleiro && j >= 0; i++, j--) {
      if (tabuleiro[i][j] === 1) {
        return false;
      }
    }
    
    return true;
  }
  
  private clonarTabuleiro(tabuleiro: number[][]): number[][] {
    return tabuleiro.map(linha => [...linha]);
  }
  
  private existeSolucao(novaSolucao: number[][]): boolean {
    for (let i = 0; i < this.solucoes.length; i++) {
      if (this.compararTabuleiros(novaSolucao, this.solucoes[i])) {
        return true;
      }
    }
    return false;
  }
  
  private compararTabuleiros(tabuleiro1: number[][], tabuleiro2: number[][]): boolean {
    for (let i = 0; i < this.tamanhoTabuleiro; i++) {
      for (let j = 0; j < this.tamanhoTabuleiro; j++) {
        if (tabuleiro1[i][j] !== tabuleiro2[i][j]) {
          return false;
        }
      }
    }
    return true;
  }
}

// Exemplo de uso
const tamanhoTabuleiro = 8; // Altere isso para o tamanho desejado do tabuleiro
const posicionamentoRainha = new PosicionamentoRainha(tamanhoTabuleiro);
const solucoes = posicionamentoRainha.resolver();

console.log(`Número de soluções para o problema das ${tamanhoTabuleiro} rainhas: ${solucoes.length}`);
console.log("Soluções:");
solucoes.forEach((solucao, indice) => {
  console.log(`Solução ${indice + 1}:`);
  solucao.forEach(linha => {
    console.log(linha.join(" "));
  });
  console.log();
});
