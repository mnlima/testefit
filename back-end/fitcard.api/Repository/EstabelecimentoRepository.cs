using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using fitcard.api.Model;
using MySql.Data.MySqlClient;

namespace fitcard.api.Repository
{
  public class EstabelecimentoRepository : IEstabelecimentoRepository
  {
    private readonly string _connectionString;

    public EstabelecimentoRepository(string connectionString)
    {
      _connectionString = connectionString;   // Injetando a string de conexão no construtor da classe
    }

    public void Alterar(Estabelecimento estabelecimento, string id)
    {
      using (MySqlConnection connection = new MySqlConnection(_connectionString))
      {
        connection.Open();
        MySqlCommand command = connection.CreateCommand();
        command.CommandText = "UPDATE estabelecimento "
        + "SET razaoSocial = @razaoSocial, nomeFantasia = @nomeFantasia, cnpj = @cnpj, email = @email,"
        + "endereco = @endereco, cidade = @cidade, estado = @estado, telefone = @telefone,"
        + "dataCadastro = @dataCadastro, categoria = @categoria, status = @status, agencia = @agencia, conta = @conta "
        + "WHERE id = @id";

        command.Parameters.AddWithValue("?id ", id);
        command.Parameters.AddWithValue("?razaoSocial", estabelecimento.razaoSocial);
        command.Parameters.AddWithValue("?nomeFantasia ", estabelecimento.nomeFantasia);
        command.Parameters.AddWithValue("?cnpj", estabelecimento.cnpj);
        command.Parameters.AddWithValue("?email", estabelecimento.email);
        command.Parameters.AddWithValue("?endereco", estabelecimento.endereco);
        command.Parameters.AddWithValue("?cidade", estabelecimento.cidade);
        command.Parameters.AddWithValue("?estado", estabelecimento.estado);
        command.Parameters.AddWithValue("?telefone", estabelecimento.telefone);
        command.Parameters.AddWithValue("?dataCadastro ", estabelecimento.dataCadastro);
        command.Parameters.AddWithValue("?categoria ", estabelecimento.categoria);
        command.Parameters.AddWithValue("?status ", estabelecimento.status);
        command.Parameters.AddWithValue("?agencia ", estabelecimento.agencia);
        command.Parameters.AddWithValue("?conta ", estabelecimento.conta);

        command.ExecuteNonQuery();
        connection.Close();
        // connection.Query<Estabelecimento>($"INSERT INTO estabelecimento(razaoSocial,cnpj) VALUE({estabelecimento.razaoSocial},{estabelecimento.cnpj})");
      }
    }

    public IEnumerable<Estabelecimento> ListarEstabelecimentos()
    {
      using (MySqlConnection connection = new MySqlConnection(_connectionString))
      {
        return connection.Query<Estabelecimento>("SELECT * FROM estabelecimento ORDER BY razaoSocial ASC");
      }
    }

    public void Adicionar(Estabelecimento estabelecimento)
    {
      using (MySqlConnection connection = new MySqlConnection(_connectionString))
      {
        connection.Open();
        MySqlCommand command = connection.CreateCommand();
        command.CommandText = "INSERT INTO estabelecimento"
        + "(razaoSocial,nomeFantasia ,cnpj,email,endereco,cidade,estado,telefone,dataCadastro,categoria,status,agencia,conta)"
        + "VALUE(@razaoSocial,@nomeFantasia ,@cnpj,@email,@endereco,@cidade,@estado,@telefone,@dataCadastro,@categoria,@status,@agencia,@conta)";

        command.Parameters.AddWithValue("?razaoSocial", estabelecimento.razaoSocial);
        command.Parameters.AddWithValue("?nomeFantasia ", estabelecimento.nomeFantasia);
        command.Parameters.AddWithValue("?cnpj", estabelecimento.cnpj);
        command.Parameters.AddWithValue("?email", estabelecimento.email);
        command.Parameters.AddWithValue("?endereco", estabelecimento.endereco);
        command.Parameters.AddWithValue("?cidade", estabelecimento.cidade);
        command.Parameters.AddWithValue("?estado", estabelecimento.estado);
        command.Parameters.AddWithValue("?telefone", estabelecimento.telefone);
        command.Parameters.AddWithValue("?dataCadastro ", estabelecimento.dataCadastro);
        command.Parameters.AddWithValue("?categoria ", estabelecimento.categoria);
        command.Parameters.AddWithValue("?status ", estabelecimento.status);
        command.Parameters.AddWithValue("?agencia ", estabelecimento.agencia);
        command.Parameters.AddWithValue("?conta ", estabelecimento.conta);

        command.ExecuteNonQuery();
        connection.Close();
        // connection.Query<Estabelecimento>($"INSERT INTO estabelecimento(razaoSocial,cnpj) VALUE({estabelecimento.razaoSocial},{estabelecimento.cnpj})");
      }
    }

    public Estabelecimento ObterPorId(string id)
    {
      using (MySqlConnection connection = new MySqlConnection(_connectionString))
      {
        return connection.QueryFirst<Estabelecimento>($"SELECT * FROM estabelecimento WHERE id = {id}");
      }
    }

    public void Remover(Estabelecimento estabelecimento)
    {
      using (MySqlConnection connection = new MySqlConnection(_connectionString))
      {
        connection.Open();
        MySqlCommand command = connection.CreateCommand();

        command.CommandText = $"DELETE FROM estabelecimento WHERE id = @id";
        command.Parameters.AddWithValue("?id ", estabelecimento.Id);
        command.ExecuteNonQuery();
        connection.Close();
        // connection.Query<Estabelecimento>($"DELETE FROM estabelecimento WHERE id = {estabelecimento.Id}");
      }
    }
  }
}