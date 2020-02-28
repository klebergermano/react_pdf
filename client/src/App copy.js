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
    teste: "aaaaaa",
    boleto_master: {
      n_lanc: "",
      responsavel: "aaa",
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
    },
    boleto_2: {
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
    let num_boletos = 1;
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
      n_lanc = this.state.boleto_master.n_lanc;
      curso = this.state.boleto_master.curso;
      aluno = this.state.boleto_master.aluno;
      parcela = this.state.boleto_master.parcela;
      vencimento = this.state.boleto_master.vencimento;
      valor = this.state.boleto_master.valor;
      desconto = this.state.boleto_master.desconto;
      valor_total = this.state.boleto_master.valor_total;
      RA = this.state.boleto_master.RA;
      responsavel = "ok";

      let target = document.querySelector("#bg_boleto_" + i);
      var num = i;
      ReactDOM.render(
        <div id={"boleto_" + num} className="boletos">
          <div className="tag_boletos">
            <h5>Boleto - {num}</h5>
          </div>
          <div class="div-responsavel">
            <label>Responsável</label>

            <input
              className="boleto-responsavel"
              id={"boleto_" + num + "-responsavel"}
              type="text"
              name="responsavel"
              onChange={this.handleChange}
              value="bbbbbbbbbbbbbbbbbb"
            />
          </div>

          <div class="div-aluno">
            <label>Aluno </label>

            <input
              className="boleto-aluno"
              id={"boleto_" + num + "-aluno"}
              type="text"
              name="aluno"
              onChange={this.handleChange}
            />
          </div>
          <div class="div-curso">
            <label>Curso </label>

            <input
              className="boleto-curso"
              id={"boleto_" + num + "-curso"}
              type="text"
              name="curso"
              onChange={this.handleChange}
            />
          </div>
          <div class="div-n-lanc">
            <label>Nº Lanç.</label>

            <input
              className="boleto-n_lanc"
              id={"boleto_" + num + "-n_lanc"}
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
              id="boleto_master-parcela"
              type="number"
              name="parcela"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Vencimento </label>
            <input
              className="boleto-vencimento"
              id={"boleto_" + num + "-vencimento"}
              type="texto"
              name="vencimento"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Valor </label>
            <input
              className="boleto-valor"
              id={"boleto_" + num + "-valor"}
              type="texto"
              name="valor"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Desconto </label>
            <input
              className="boleto-desconto"
              id={"boleto_" + num + "-desconto"}
              type="texto"
              name="desconto"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Valor Total </label>
            <input
              className="boleto-valor_total"
              id={"boleto_" + num + "-valor_total"}
              type="texto"
              name="valor_total"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>R.A </label>
            <input
              className="boleto-RA"
              id={"boleto_" + num + "-RA"}
              type="texto"
              name="RA"
              onChange={this.handleChange}
            />
          </div>
        </div>,
        target
      );
    }
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <input
            type="text"
            value={this.state.teste}
            onChange={this.handleTesteChange}
          />
          <button onClick={this.changeValueTeste}>Change Value</button>
          <button onClick={this.showMasterStatus}>Mostrar Valores</button>
          <br />
          <br />
          <button onClick={this.setValues}>Setar Valores</button>
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

              <input
                className="boleto-n_lanc"
                id="boleto_master-n_lanc"
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
                id="boleto_master-parcela"
                type="number"
                name="parcela"
                onChange={this.handleChange}
                value="1"
              />
            </div>
            <div>
              <label>Vencimento </label>
              <input
                className="boleto-vencimento"
                id="boleto_master-vencimento"
                type="texto"
                name="vencimento"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Valor </label>
              <input
                className="boleto-valor"
                id="boleto_master-valor"
                type="texto"
                name="valor"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Desconto </label>
              <input
                className="boleto-desconto"
                id="boleto_master-desconto"
                type="texto"
                name="desconto"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Valor Total </label>
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

          <br />
          <br />
          <br />
          <br />
          <br />
          {/**
          
          
          
           */}

          <div id="bg_boleto_1"></div>
          <div id="bg_boleto_2"></div>
          <div id="bg_boleto_3"></div>
          <div id="bg_boleto_4"></div>
          <div id="bg_boleto_5"></div>
          <div id="bg_boleto_6"></div>
          <div id="bg_boleto_7"></div>
          <div id="bg_boleto_8"></div>
          <div id="bg_boleto_9"></div>
          <div id="bg_boleto_10"></div>
          <div id="bg_boleto_11"></div>
          <div id="bg_boleto_12"></div>
          <div id="bg_boleto_13"></div>
          <div id="bg_boleto_14"></div>
          <div id="bg_boleto_15"></div>
          <div id="bg_boleto_16"></div>
          <div id="bg_boleto_17"></div>
          <div id="bg_boleto_18"></div>
          <div id="bg_boleto_19"></div>
          <div id="bg_boleto_20"></div>
          <div id="bg_boleto_21"></div>
          <div id="bg_boleto_22"></div>
          <div id="bg_boleto_23"></div>
          <div id="bg_boleto_24"></div>

          <div id="boleto_5" className="boletos">
            <div class="div-responsavel">
              <label>Responsável</label>

              <input
                className="boleto-responsavel"
                id="boleto_5-responsavel"
                type="text"
                name="responsavel"
                onChange={this.handleChange}
                value={this.state.boleto_5.responsavel}
              />
            </div>

            <div class="div-aluno">
              <label>Aluno </label>

              <input
                className="boleto-aluno"
                id="boleto_5-aluno"
                type="text"
                name="aluno"
                onChange={this.handleChange}
                value={this.state.boleto_5.aluno}
              />
            </div>
            <div class="div-curso">
              <label>Curso </label>

              <input
                className="boleto-curso"
                id="boleto_5-curso"
                type="text"
                name="curso"
                onChange={this.handleChange}
              />
            </div>
            <div class="div-n-lanc">
              <label>Nº Lanç.</label>

              <input
                className="boleto-n_lanc"
                id="boleto_5-n_lanc"
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
                id="boleto_5-parcela"
                type="number"
                name="parcela"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Vencimento </label>
              <input
                className="boleto-vencimento"
                id="boleto_5-vencimento"
                type="texto"
                name="vencimento"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Valor </label>
              <input
                className="boleto-valor"
                id="boleto_5-valor"
                type="texto"
                name="valor"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Desconto </label>
              <input
                className="boleto-desconto"
                id="boleto_5-desconto"
                type="texto"
                name="desconto"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Valor Total </label>
              <input
                className="boleto-valor_total"
                id="boleto_5-valor_total"
                type="texto"
                name="valor_total"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>R.A </label>
              <input
                className="boleto-RA"
                id="boleto_5-RA"
                type="texto"
                name="RA"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <br />
        </div>
      </div>
    );
  }
}

export default App;
