using System;
using System.Collections.Generic;
using estabelecimento.Api.Models;

namespace estabelecimento.Api.Repositories
{
  public interface IEstabelecimentoRepository
  {
    void Adicionar(Estabelecimento estabelecimento);
    void Alterar(Estabelecimento estabelecimento); 
    IEnumerable<Estabelecimento> ListarEstabelecimentos();
    Estabelecimento ObterPorId(Guid id);
    void Remover(Estabelecimento estabelecimento);
  }
}