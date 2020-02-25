

using System;
using System.Collections.Generic;
using System.Linq;
using estabelecimento.Api.Models;

namespace estabelecimento.Api.Repositories
{
  public class EstabelecimentoRepository : IEstabelecimentoRepository
  {
    private readonly List<Estabelecimento> _storage  ;

    public EstabelecimentoRepository()
    {
      _storage = new List<Estabelecimento>();
    }

    public void Adicionar(Estabelecimento estabelecimento)
    {
      _storage.Add(estabelecimento);
    }

    public void Alterar(Estabelecimento estabelecimento)
    {
      var index = _storage.FindIndex(0, 1, x => x.Id == estabelecimento.Id);
      _storage[index] = estabelecimento;  
    }

    public IEnumerable<Estabelecimento> ListarEstabelecimentos()
    {
      return _storage;
    }

    public Estabelecimento ObterPorId(Guid id)
    {
     return _storage.FirstOrDefault(item => item.Id == id);
    }

    public void Remover(Estabelecimento estabelecimento)
    {
      _storage.Remove(estabelecimento);
    }
  }
}
