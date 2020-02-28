import React, { Component } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { handleTemplate } from "./components/handleTemplate";
//import Boleto from "./components/boleto";
import "./assets/css/style.css";
import ReactDOM from "react-dom";

import "./App.css";

class App extends Component {
  state = {
    boleto_master: {
      n_carne: "",
      n_folha: "",
      n_lanc: "",
      responsavel: "",
      parcela: "1",
      vencimento: "",
      valor: "",
      desconto: "",
      valor_total: "",
      curso: "",
      RA: "",
      aluno: "",

      template: ""
    },
    boleto_1: {
      n_carne: "",
      n_folha: "",
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
    },
    boleto_2: {
      n_carne: "",
      n_folha: "",
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
    },
    boleto_3: {
      n_carne: "",
      n_folha: "",
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
    },
    boleto_4: { template: "" },
    boleto_5: {
      n_lanc: "",
      responsavel: "Responsavel 5",
      aluno: "Aluno 5",
      parcela: "",
      vencimento: "",
      valor: "",
      desconto: "",
      valor_total: "",
      curso: "",
      RA: "",
      template: ""
    },
    boleto_6: { template: "" },
    boleto_7: { template: "" },
    boleto_8: { template: "" },
    boleto_9: { template: "" },
    boleto_10: { template: "" },
    boleto_11: { template: "" },
    boleto_12: { template: "" },
    boleto_13: { template: "" },
    boleto_14: { template: "" },
    boleto_15: { template: "" },
    boleto_16: { template: "" },
    boleto_17: { template: "" },
    boleto_18: { template: "" },
    boleto_19: { template: "" },
    boleto_20: { template: "" },
    boleto_21: { template: "" },
    boleto_22: { template: "" },
    boleto_23: { template: "" },
    boleto_24: { template: "" }
  };

  showState = () => {
    console.log(this.state);
  };

  handleChange = e => {
    let id = e.target.id;
    let split = id.split("-");
    let boleto = split[0];
    let campo = split[1];
    let value = e.target.value;

    this.setState(
      prevState => ({
        [boleto]: {
          // object that we want to update
          ...prevState[boleto], // keep all other key-value pairs
          [campo]: value // update the value of specific key
        }
      }),
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

        //invoc handleTemplate to create Template
        let template = handleTemplate(
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

        this.setState(prevState => ({
          [boleto]: {
            // object that we want to update
            ...prevState[boleto], // keep all other key-value pairs
            template: template // update the value of specific key
          }
        }));
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

  gerarBoleto() {
    alert("ok");
  }

  handleTesteChange = e => {
    this.setState({ teste: e.target.value });
  };
  changeValueTeste = () => {
    this.setState({ teste: "xxxxxxxxxxxxxxx" });
  };

  showMasterStatus = () => {
    console.log(this.state);
  };
  setValues = () => {
    this.setState({ boleto_1: { responsavel: "okkkkk22222k" } });
  };
  insertBoleto = () => {
    let num_boletos = this.state.boleto_master.parcela;

    let n_carne;
    let n_folha;
    let n_lanc;
    let responsavel;
    let curso;
    let aluno;
    let parcela;
    let vencimento;
    let valor;
    let desconto;
    let valor_total;
    let RA;

    for (let i = 1; i <= num_boletos; i++) {
      var boleto_visible = document.querySelector("#boleto_" + i);
      boleto_visible.style.display = "block";

      var boleto = "boleto_" + i;
      n_carne = this.state.boleto_master.n_carne;
      n_folha = this.state.boleto_master.n_folha;
      //decimals
      let valor_decimal = parseInt(this.state.boleto_master.valor)
        .toFixed(2)
        .replace(/[.]/, ",");

      let desconto_decimal = parseInt(this.state.boleto_master.desconto)
        .toFixed(2)
        .replace(/[.]/, ",");
      let valor_total_decimal = parseInt(this.state.boleto_master.valor_total)
        .toFixed(2)
        .replace(/[.]/, ",");

      n_lanc =
        "C" +
        (n_carne + "").padStart(3, "0") +
        "B" +
        (parseInt(n_folha) + i - 1 + "").padStart(3, "0");

      RA = (parseInt(this.state.boleto_master.RA) + "").padStart(3, "0");
      let vencimento_data = this.state.boleto_master.vencimento;
      vencimento_data = vencimento_data.replace(/-/g, ",", 2);

      var data = new Date(vencimento_data);
      var dia = data.getDate();
      var mes = data.getMonth() + i - 1;
      var ano = data.getFullYear();
      var data_f = new Date(ano, mes, dia);
      var dia_f = data_f.getDate();
      var mes_f = data_f.getMonth() + 1;
      var ano_f = data_f.getFullYear();
      vencimento = dia_f + " / " + mes_f + " / " + ano_f;

      /*
      this.state.boleto_master.vencimento.split("-");
      vencimento_data[1] = parseInt(vencimento_data[1]) + 1;
      alert(vencimento_data[1]);
      */

      curso = this.state.boleto_master.curso;
      aluno = this.state.boleto_master.aluno;
      parcela = i + "/" + this.state.boleto_master.parcela;
      valor = valor_decimal;
      desconto = desconto_decimal;
      valor_total = valor_total_decimal;
      responsavel = this.state.boleto_master.responsavel;

      //invoc handleTemplate to create Template
      let template = handleTemplate(
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

      this.setState({
        [boleto]: {
          n_carne: n_carne,
          n_folha: n_folha,
          n_lanc: n_lanc,
          responsavel: responsavel,
          aluno: aluno,
          parcela: parcela,
          vencimento: vencimento,
          valor: valor,
          desconto: desconto,
          valor_total: valor_total,
          curso: curso,
          RA: RA,
          template: template
        }
      });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <button onClick={this.showMasterStatus}>Mostrar Valores</button>

          <div className="bg_buttons">
            <button id="btn_download_pdf" onClick={this.createAndDownloadPdf}>
              Download PDF
            </button>
          </div>
          <div id="boleto_master" className="boletos">
            <div class="div-responsavel">
              <label>Responsável</label>

              <input
                className="boleto-responsavel"
                id="boleto_master-responsavel"
                type="text"
                name="responsavel"
                onChange={this.handleChange}
              />
            </div>

            <div class="div-aluno">
              <label>Aluno </label>

              <input
                className="boleto-aluno"
                id="boleto_master-aluno"
                type="text"
                name="aluno"
                onChange={this.handleChange}
              />
            </div>
            <div class="div-curso">
              <label>Curso </label>

              <input
                className="boleto-curso"
                id="boleto_master-curso"
                type="text"
                name="curso"
                onChange={this.handleChange}
              />
            </div>
            <div class="div-n-lanc">
              <label>Nº Lanç.</label>
              <div>
                <label>C:</label>
                <input
                  className="boleto-n_carne"
                  id="boleto_master-n_carne"
                  type="text"
                  placeholder=""
                  name="n_carne"
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>B:</label>

                <input
                  className="boleto-n_folha"
                  id="boleto_master-n_folha"
                  type="text"
                  placeholder=""
                  name="n_folha"
                  onChange={this.handleChange}
                />
              </div>
              {/*
                     <input
                className="boleto-n_lanc"
                id="boleto_master-n_lanc"
                type="text"
                placeholder=""
                name="n_lanc"
                onChange={this.handleChange}
              />
               */}
            </div>
            <div class="div-n-parcela">
              <label>Parcela </label>
              <input
                className="boleto-parcela"
                id="boleto_master-parcela"
                type="number"
                name="parcela"
                onChange={this.handleChange}
                value={this.state.boleto_master.parcela}
              />
            </div>
            <div class="div-vencimento">
              <label>Vencimento </label>
              <input
                className="boleto-vencimento"
                id="boleto_master-vencimento"
                type="date"
                name="vencimento"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>
                Valor <span>R$</span>
              </label>
              <input
                className="boleto-valor"
                id="boleto_master-valor"
                type="texto"
                name="valor"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>
                Desconto <span>R$</span>
              </label>
              <input
                className="boleto-desconto"
                id="boleto_master-desconto"
                type="texto"
                name="desconto"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>
                Valor Total <span>R$</span>
              </label>
              <input
                className="boleto-valor_total"
                id="boleto_master-valor_total"
                type="texto"
                name="valor_total"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>R.A </label>
              <input
                className="boleto-RA"
                id="boleto_master-RA"
                type="texto"
                name="RA"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div>
            <button id="btn_gerar_boleto" onClick={this.insertBoleto}>
              Gerar Boletos
            </button>
          </div>

          {/*-------------------------------Boleto 1 --------------------------------------------------------------*/}
          <div id="boleto_1" className="boletos">
            <div className="tag_boletos">
              <h5>Boleto - 1</h5>
            </div>
            <div class="div-responsavel">
              <label>Responsável</label>

              <input
                className="boleto-responsavel"
                id="boleto_1-responsavel"
                type="text"
                name="responsavel"
                onChange={this.handleChange}
                value={this.state.boleto_1.responsavel}
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
                value={this.state.boleto_1.aluno}
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
                value={this.state.boleto_1.curso}
              />
            </div>
            <div>
              <label>Nº Lanç.</label>

              <input
                className="boleto-n_lanc"
                id="boleto_1-n_lanc"
                type="text"
                placeholder=""
                name="n_lanc"
                onChange={this.handleChange}
                value={
                  "C" +
                  (this.state.boleto_master.n_carne + "").padStart(3, "0") +
                  "B" +
                  (
                    parseInt(this.state.boleto_master.n_folha) +
                    0 +
                    ""
                  ).padStart(3, "0")
                }
              />
            </div>
            <div>
              <label>Parcela </label>
              <input
                className="boleto-parcela"
                id="boleto_1-parcela"
                type="text"
                name="parcela"
                onChange={this.handleChange}
                value={this.state.boleto_1.parcela}
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
                value={this.state.boleto_1.vencimento}
              />
            </div>
            <div>
              <label>
                Valor <span>R$</span>
              </label>
              <input
                className="boleto-valor"
                id="boleto_1-valor"
                type="texto"
                name="valor"
                onChange={this.handleChange}
                value={this.state.boleto_1.valor}
              />
            </div>
            <div>
              <label>
                Desconto <span>R$</span>
              </label>
              <input
                className="boleto-desconto"
                id="boleto_1-desconto"
                type="texto"
                name="desconto"
                onChange={this.handleChange}
                value={this.state.boleto_1.desconto}
              />
            </div>
            <div>
              <label>
                Valor Total <span>R$</span>
              </label>
              <input
                className="boleto-valor_total"
                id="boleto_1-valor_total"
                type="texto"
                name="valor_total"
                onChange={this.handleChange}
                value={this.state.boleto_1.valor_total}
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
                value={this.state.boleto_1.RA}
              />
            </div>
          </div>
          {/*---------------------------------------------------------------------------------------------*/}
          {/*-------------------------------Boleto 2 --------------------------------------------------------------*/}
          <div id="boleto_2" className="boletos">
            <div className="tag_boletos">
              <h5>Boleto - 2</h5>
            </div>
            <div class="div-responsavel">
              <label>Responsável</label>

              <input
                className="boleto-responsavel"
                id="boleto_2-responsavel"
                type="text"
                name="responsavel"
                onChange={this.handleChange}
                value={this.state.boleto_2.responsavel}
              />
            </div>

            <div class="div-aluno">
              <label>Aluno </label>

              <input
                className="boleto-aluno"
                id="boleto_2-aluno"
                type="text"
                name="aluno"
                onChange={this.handleChange}
                value={this.state.boleto_2.aluno}
              />
            </div>
            <div class="div-curso">
              <label>Curso </label>

              <input
                className="boleto-curso"
                id="boleto_2-curso"
                type="text"
                name="curso"
                onChange={this.handleChange}
                value={this.state.boleto_2.curso}
              />
            </div>
            <div>
              <label>Nº Lanç.</label>

              <input
                className="boleto-n_lanc"
                id="boleto_2-n_lanc"
                type="text"
                placeholder=""
                name="n_lanc"
                onChange={this.handleChange}
                value={
                  "C" +
                  (this.state.boleto_master.n_carne + "").padStart(3, "0") +
                  "B" +
                  (
                    parseInt(this.state.boleto_master.n_folha) +
                    1 +
                    ""
                  ).padStart(3, "0")
                }
              />
            </div>
            <div>
              <label>Parcela </label>
              <input
                className="boleto-parcela"
                id="boleto_2-parcela"
                type="text"
                name="parcela"
                onChange={this.handleChange}
                value={this.state.boleto_2.parcela}
              />
            </div>
            <div>
              <label>Vencimento </label>
              <input
                className="boleto-vencimento"
                id="boleto_2-vencimento"
                type="texto"
                name="vencimento"
                onChange={this.handleChange}
                value={this.state.boleto_2.vencimento}
              />
            </div>
            <div>
              <label>Valor </label>
              <input
                className="boleto-valor"
                id="boleto_2-valor"
                type="texto"
                name="valor"
                onChange={this.handleChange}
                value={this.state.boleto_2.valor}
              />
            </div>
            <div>
              <label>Desconto </label>
              <input
                className="boleto-desconto"
                id="boleto_2-desconto"
                type="texto"
                name="desconto"
                onChange={this.handleChange}
                value={this.state.boleto_2.desconto}
              />
            </div>
            <div>
              <label>Valor Total </label>
              <input
                className="boleto-valor_total"
                id="boleto_2-valor_total"
                type="texto"
                name="valor_total"
                onChange={this.handleChange}
                value={this.state.boleto_2.valor_total}
              />
            </div>
            <div>
              <label>R.A </label>
              <input
                className="boleto-RA"
                id="boleto_2-RA"
                type="texto"
                name="RA"
                onChange={this.handleChange}
                value={this.state.boleto_2.RA}
              />
            </div>
          </div>
          {/*---------------------------------------------------------------------------------------------*/}
          {/*-------------------------------Boleto 3 --------------------------------------------------------------*/}
          <div id="boleto_3" className="boletos">
            <div className="tag_boletos">
              <h5>Boleto - 3</h5>
            </div>
            <div class="div-responsavel">
              <label>Responsável</label>

              <input
                className="boleto-responsavel"
                id="boleto_3-responsavel"
                type="text"
                name="responsavel"
                onChange={this.handleChange}
                value={this.state.boleto_3.responsavel}
              />
            </div>

            <div class="div-aluno">
              <label>Aluno </label>

              <input
                className="boleto-aluno"
                id="boleto_3-aluno"
                type="text"
                name="aluno"
                onChange={this.handleChange}
                value={this.state.boleto_3.aluno}
              />
            </div>
            <div class="div-curso">
              <label>Curso </label>

              <input
                className="boleto-curso"
                id="boleto_3-curso"
                type="text"
                name="curso"
                onChange={this.handleChange}
                value={this.state.boleto_3.curso}
              />
            </div>
            <div>
              <label>Nº Lanç.</label>

              <input
                className="boleto-n_lanc"
                id="boleto_3-n_lanc"
                type="text"
                placeholder=""
                name="n_lanc"
                onChange={this.handleChange}
                value={
                  "C" +
                  (this.state.boleto_master.n_carne + "").padStart(3, "0") +
                  "B" +
                  (
                    parseInt(this.state.boleto_master.n_folha) +
                    2 +
                    ""
                  ).padStart(3, "0")
                }
              />
            </div>
            <div>
              <label>Parcela </label>
              <input
                className="boleto-parcela"
                id="boleto_3-parcela"
                type="text"
                name="parcela"
                onChange={this.handleChange}
                value={this.state.boleto_3.parcela}
              />
            </div>
            <div>
              <label>Vencimento </label>
              <input
                className="boleto-vencimento"
                id="boleto_3-vencimento"
                type="texto"
                name="vencimento"
                onChange={this.handleChange}
                value={this.state.boleto_3.vencimento}
              />
            </div>
            <div>
              <label>Valor </label>
              <input
                className="boleto-valor"
                id="boleto_3-valor"
                type="texto"
                name="valor"
                onChange={this.handleChange}
                value={this.state.boleto_3.valor}
              />
            </div>
            <div>
              <label>Desconto </label>
              <input
                className="boleto-desconto"
                id="boleto_3-desconto"
                type="texto"
                name="desconto"
                onChange={this.handleChange}
                value={this.state.boleto_3.desconto}
              />
            </div>
            <div>
              <label>Valor Total </label>
              <input
                className="boleto-valor_total"
                id="boleto_3-valor_total"
                type="texto"
                name="valor_total"
                onChange={this.handleChange}
                value={this.state.boleto_3.valor_total}
              />
            </div>
            <div>
              <label>R.A </label>
              <input
                className="boleto-RA"
                id="boleto_3-RA"
                type="texto"
                name="RA"
                onChange={this.handleChange}
                value={this.state.boleto_3.RA}
              />
            </div>
          </div>
          {/*---------------------------------------------------------------------------------------------*/}

          <br />
        </div>
      </div>
    );
  }
}

export default App;
