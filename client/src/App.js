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

  gerarBoleto() {
    alert("ok");
  }
  insertBoleto = () => {
    let num_boletos = 4;
    for (let i = 1; i <= num_boletos; i++) {
      let target = document.querySelector("#bg_boleto_" + i);
      var num = i;
      ReactDOM.render(
        <div id={"boleto_" + num} className="boletos">
          <div className="tag_boletos">
            <h5>Boleto-{num}</h5>
          </div>
          <div class="div-responsavel">
            <label>Responsável</label>

            <input
              className="boleto-responsavel"
              id={"boleto_" + num + "-responsavel"}
              type="text"
              name="responsavel"
              onChange={this.handleChange}
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

          <br />
        </div>
      </div>
    );
  }
}

export default App;
