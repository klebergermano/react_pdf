import React, { Component } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./assets/css/style.css";

import "./App.css";

class App extends Component {
  state = {
    boleto_1: {
      n_lanc: "",
      responsavel: "",
      aluno: "",
      parcela: "",
      vencimento: "",
      valor: "",
      desconto: "",
      valor_total: "",
      curso: "",
      RA: "",
      template: ""
    }
  };

  showState = () => {
    console.log(this.state);
  };

  handleTemplate(
    n_lanc,
    responsavel,
    aluno,
    curso,
    parcela,
    vencimento,
    valor,
    desconto,
    valor_total,
    RA
  ) {
    return ` <div class="bg_boleto">
    <div class="bloco_cliente">
      <table style="width:100%">
        <tr width="100%">
          <td colspan="10">
            <b>Responsável:</b>
            <span class="responsavel_cliente">${responsavel}</span>
          </td>
        </tr>
        <tr>
          <td class="font_6" colspan="6">
            <b>Aluno(a):</b
            ><span class="aluno_cliente"> ${aluno}</span>
          </td>
        </tr>

        <tr>
          <td class="font_6" colspan="1">
            <span class="label_top"><b>Nº Lanç.</b></span>
            ${n_lanc}
          </td>

          <td colspan="1">
            <span class="label_top"><b>Parcela</b></span>
           ${parcela}
          </td>
          <td colspan="1">
            <span class="label_top"><b>Vencimento</b></span>
            ${vencimento}
          </td>
        </tr>

        <tr>
          <td colspan="1">
            <span class="label_top"><b>Valor</b></span>
            R$ ${valor}
          </td>
          <td colspan="1">
            <span class="label_top"><b>Desconto</b></span>

            R$ ${desconto}
          </td>
          <td colspan="1">
            <span class="label_top"><b>Valor Total</b></span>

            R$ ${valor_total}
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <b>Curso:</b><span class="curso_cliente"> ${curso}</span>
          </td>
        </tr>
        <tr>
          <td colspan="5"><b>Obs.: </b></td>
        </tr>
        <tr>
          <td colspan="3"></td>
        </tr>
        <tr>
          <td colspan="2">
            <span class="RA_cliente">Via do aluno: RA${RA}</span>
          </td>

          <td colspan="3">
            <br /><span class="data_cliente"> Data ___/___/____</span><br />
          </td>
        </tr>
      </table>
    </div>
    <!-------------------------------------------------------------->
    <div class="bloco_destaque">
      <table style="width:100%">
        <tr width="100%">
          <td colspan="4" class="seta_nome">
            <h3><span>SETA CURSOS </span>RECIBO DE PAGAMENTO</h3>
          </td>
          <td class="font_6" colspan="1"><b>Nº Lanç.</b> ${n_lanc}</td>
        </tr>
        <tr>
          <td colspan="5">
            <b>Responsável: </b
            ><span class="responsavel">${responsavel}</span>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <b>Aluno(a): </b><span class="responsavel">${aluno}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="label_top"><b>Parcela</b></span>
            <span class="value"> ${parcela}</span>
          </td>
          <td>
            <span class="label_top"><b>Vencimento</b></span>
            <span class="value"> ${vencimento}</span>
          </td>
          <td>
            <span class="label_top"><b>Valor</b></span>
            <span class="value"> R$ ${valor}</span>
          </td>
          <td>
            <span class="label_top"><b>Desconto</b></span>
            <span class="value"> R$ ${desconto} </span>
          </td>
          <td>
            <span class="label_top"><b>Valor Total</b></span>
            <span class="valor_total">
              <span class="cifrao_total">R$</span> <b>${valor_total}</b></span
            >
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <b>Curso: </b><span class="curso">${curso}</span>
          </td>
        </tr>
        <tr>
          <td colspan="5"><b>Obs.: </b></td>
        </tr>
        <tr>
          <td colspan="4"></td>
          <td><span class="RA">Via da escola: RA${RA}</span></td>
        </tr>
        <tr>
          <td colspan="5" class="ass">
            <span class="ass_label">Ass.: </span
            ><span class="data_destaque">Data ___/___/____</span>
            <hr />
          </td>
        </tr>
      </table>
    </div>
  </div>               
  `;
  }

  handleChange = e => {
    let id = e.target.id;
    let split = id.split("-");
    let boleto = split[0];
    let campo = split[1];
    let value = e.target.value;

    this.setState(
      prevState => {
        let boleto_1 = Object.assign({}, prevState.boleto_1); // creating copy of state variable jasper
        boleto_1[campo] = value; // update the name property, assign a new value
        return { boleto_1 }; // return new object jasper object
      },
      () => {
        let n_lanc = this.state[boleto].n_lanc;
        let responsavel = this.state[boleto].responsavel;
        let curso = this.state[boleto].curso;
        let aluno = this.state[boleto].aluno;
        let parcela = this.state[boleto].parcela;
        let vencimento = this.state[boleto].vencimento;
        let valor = this.state[boleto].valor;
        let desconto = this.state[boleto].desconto;
        let valor_total = this.state[boleto].valor_total;
        let RA = this.state[boleto].RA;
        let template = this.handleTemplate(
          n_lanc,
          responsavel,
          aluno,
          curso,
          parcela,
          vencimento,
          valor,
          desconto,
          valor_total,
          RA
        );

        this.setState(prevState => {
          let boleto_1 = Object.assign({}, prevState[boleto]); // creating copy of state variable jasper
          boleto_1.template = template; // update the name property, assign a new value
          return { boleto_1 }; // return new object jasper object
        });
        console.log(this.state.boleto_1.template);
      }
    );
  };
  createAndDownloadPdf = () => {
    axios
      .post("/create-pdf", this.state)
      .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
      .then(res => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          {" "}
          <div id="boleto_1" className="boletos">
            <div class="div-responsavel">
              <label>Responsável </label>

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
                placeholder="Valor"
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
        </div>
      </div>
    );
  }
}

export default App;
