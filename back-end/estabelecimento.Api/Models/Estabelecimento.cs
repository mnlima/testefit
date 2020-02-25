using System;

namespace estabelecimento.Api.Models
{
  public class Estabelecimento
  {
    public Estabelecimento()
    {
      Id = Guid.NewGuid();
    }
    public Guid Id { get; }
    public string razaoSocial { get; set; }
    public string nomeFantasia { get; set; }
    public string cnpj { get; set; }
    public string email { get; set; }
    public string endereco { get; set; }
    public string cidade { get; set; }
    public string estado { get; set; }
    public string telefone { get; set; }
    public string dataCadastro { get; set; }
    public string categoria { get; set; }
    public int status { get; set; }
    public string agencia { get; set; }
    public string conta { get; set; }
    
  }
}