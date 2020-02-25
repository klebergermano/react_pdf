import React, { Component } from "react";

export const Boleto = () => {
  return (
    <div id="boleto_1" className="boletos">
      <div class="div-responsavel">
        <label>Responsável</label>

        <input
          className="boleto-responsavel"
          id="boleto_1-responsavel"
          type="text"
          name="responsavel"
          onChange={this.handleChange}
        />
      </div>

      <div class="div-aluno">
        <label>Aluno </label>

        <input
          className="boleto-aluno"
          id="boleto_1-aluno"
          type="text"
          name="aluno"
          onChange={this.handleChange}
        />
      </div>
      <div class="div-curso">
        <label>Curso </label>

        <input
          className="boleto-curso"
          id="boleto_1-curso"
          type="text"
          name="curso"
          onChange={this.handleChange}
        />
      </div>
      <div class="div-n-lanc">
        <label>Nº Lanç.</label>

        <input
          className="boleto-n_lanc"
          id="boleto_1-n_lanc"
          type="text"
          placeholder=""
          name="n_lanc"
          onChange={this.handleChange}
        />
      </div>
      <div>
        <label>Parcela </label>
        <input
          className="boleto-parcela"
          id="boleto_1-parcela"
          type="number"
          name="parcela"
          onChange={this.handleChange}
        />
      </div>
      <div>
        <label>Vencimento </label>
        <input
          className="boleto-vencimento"
          id="boleto_1-vencimento"
          type="texto"
          name="vencimento"
          onChange={this.handleChange}
        />
      </div>
      <div>
        <label>Valor </label>
        <input
          className="boleto-valor"
          id="boleto_1-valor"
          type="texto"
          name="valor"
          onChange={this.handleChange}
        />
      </div>
      <div>
        <label>Desconto </label>
        <input
          className="boleto-desconto"
          id="boleto_1-desconto"
          type="texto"
          name="desconto"
          onChange={this.handleChange}
        />
      </div>
      <div>
        <label>Valor Total </label>
        <input
          className="boleto-valor_total"
          id="boleto_1-valor_total"
          type="texto"
          name="valor_total"
          onChange={this.handleChange}
        />
      </div>
      <div>
        <label>R.A </label>
        <input
          className="boleto-RA"
          id="boleto_1-RA"
          type="texto"
          name="RA"
          onChange={this.handleChange}
        />
      </div>
      <button id="btn_gerar_boleto" onClick={this.createAndDownloadPdf}>
        Download PDF
      </button>
    </div>
  );
};
