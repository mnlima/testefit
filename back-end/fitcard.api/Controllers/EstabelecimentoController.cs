using System;
using System.Collections.Generic;
using fitcard.api.Model;
using fitcard.api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace fitcard.api.Controllers
{
  public class EstabelecimentoController : Controller
  {
    private readonly IEstabelecimentoRepository _repositorio;

    public EstabelecimentoController(IEstabelecimentoRepository repositorio)
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
    public IActionResult AlterarEstabelecimentos(string id, [FromBody]Estabelecimento estabelecimento)
    {
      var estabelecimentoOld = _repositorio.ObterPorId(id);
      if (estabelecimentoOld == null)
      {
        return NotFound();
      }
      estabelecimentoOld = estabelecimento;
      _repositorio.Alterar(estabelecimentoOld, id);
      return Ok(estabelecimentoOld);
    }

    [HttpGet("estabelecimentos/{id}")]
    public IActionResult ObterEstabelecimentos(string id)
    {
      var estabelecimento = _repositorio.ObterPorId(id);
      if (estabelecimento == null)
      {
        return NotFound();
      }

      return Ok(estabelecimento);
    }

    [HttpDelete("estabelecimentos/{id}")]
    public IActionResult RemoverEstabelecimentos(string id)
    {
      var estabelecimento = _repositorio.ObterPorId(id);
      if (estabelecimento == null)
      {
        return NotFound();
      }
      
      _repositorio.Remover(estabelecimento);
      return Ok(estabelecimento);
    }
  }
}