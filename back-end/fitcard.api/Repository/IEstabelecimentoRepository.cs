using System;
using System.Collections.Generic;
using fitcard.api.Model;

namespace fitcard.api.Repository
{
  public interface IEstabelecimentoRepository
  {
    void Adicionar(Estabelecimento estabelecimento);
    void Alterar(Estabelecimento estabelecimento, string id); 
    IEnumerable<Estabelecimento> ListarEstabelecimentos();
    Estabelecimento ObterPorId(string id);
    void Remover(Estabelecimento estabelecimento);
  }
}