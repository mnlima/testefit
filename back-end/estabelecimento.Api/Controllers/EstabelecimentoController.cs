using System;
using estabelecimento.Api.Models;
using estabelecimento.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace estabelecimento.Api.Controllers
{
  public class estabelecimentoController : Controller
  {
    private readonly IEstabelecimentoRepository _repositorio;

    public estabelecimentoController(IEstabelecimentoRepository repositorio)
    {
      _repositorio = repositorio;
    }

    [HttpGet("estabelecimentos")]
    public IActionResult ListarEstabelecimentos()
    {
      return Ok(_repositorio.ListarEstabelecimentos());
    }

    [HttpPost("estabelecimentos")]
    public IActionResult AdicionarEstabelecimentos([FromBody]Estabelecimento estabelecimento)
    {
      _repositorio.Adicionar(estabelecimento);
      return Ok(estabelecimento);
    }

    [HttpPut("estabelecimentos/{id}")]
    public IActionResult AlterarEstabelecimentos(Guid id, [FromBody]Estabelecimento estabelecimento)
    {
      var estabelecimentoOld = _repositorio.ObterPorId(id);
      if (estabelecimentoOld == null)
      {
        return NotFound();
      }
      estabelecimentoOld = estabelecimento;
      _repositorio.Alterar(estabelecimentoOld);
      return Ok();
    }

    [HttpGet("estabelecimentos/{id}")]
    public IActionResult ObterEstabelecimentos(Guid id)
    {
      var estabelecimento = _repositorio.ObterPorId(id);
      if (estabelecimento == null)
      {
        return NotFound();
      }

      return Ok(estabelecimento);
    }

    [HttpDelete("estabelecimentos/{id}")]
    public IActionResult RemoverEstabelecimentos(Guid id)
    {
      var estabelecimento = _repositorio.ObterPorId(id);
      if (estabelecimento == null)
      {
        return NotFound();
      }
      
      _repositorio.Remover(estabelecimento);
      return Ok("Estabelecimento deletado com sucesso");
    }
  }
}