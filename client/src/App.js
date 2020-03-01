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
    boleto_1: { template: "" },
    boleto_2: { template: "" },
    boleto_3: { template: "" },
    boleto_4: { template: "" },
    boleto_5: { template: "" },
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
        if (campo === "valor_total") {
        } else if (campo === "valor" || campo === "desconto") {
          let valor_total =
            parseInt(this.state[boleto].valor) -
            parseInt(this.state[boleto].desconto);

          this.setState(prevState => ({
            [boleto]: {
              // object that we want to update
              ...prevState[boleto], // keep all other key-value pairs

              // update the value of specific key
              valor_total: valor_total
            }
          }));
        }
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
    document.querySelector("#load_img").style.display = "block";

    axios
      .post("/create-pdf", this.state)
      .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
      .then(res => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      })
      .then(() => {
        document.querySelector("#load_img").style.display = "none";
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
    let max_boletos = 12;
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
    if (num_boletos > 12) {
      num_boletos = max_boletos;
    }
    for (let i = 1; i <= num_boletos; i++) {
      var boleto_master = document.querySelector("#boleto_master");
      boleto_master.style = "padding-top:130px";
      var bg_buttons = document.querySelector(".bg_buttons");
      bg_buttons.style.display = "block";

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
      var dia_f2 = (parseInt(dia_f) + "").padStart(2, "0");

      var mes_f = data_f.getMonth() + 1;
      var mes_f2 = (parseInt(mes_f) + "").padStart(2, "0");
      var ano_f = data_f.getFullYear();
      vencimento = dia_f2 + " / " + mes_f2 + " / " + ano_f;

      /*
      this.state.boleto_master.vencimento.split("-");
      vencimento_data[1] = parseInt(vencimento_data[1]) + 1;
      alert(vencimento_data[1]);
      */

      curso = this.state.boleto_master.curso;
      aluno = this.state.boleto_master.aluno;

      if (this.state.boleto_master.parcela > max_boletos) {
        parcela = i + "/" + max_boletos;
      } else {
        parcela = i + "/" + this.state.boleto_master.parcela;
      }
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
        <div id="load_img">
          <img alt="loader" src={require("./assets/img/loader_pdf.gif")} />
        </div>
        <div className="container">
          {/* <button onClick={this.showMasterStatus}>Mostrar Valores</button>
           */}
          <div className="bg_buttons">
            <button id="btn_download_pdf" onClick={this.createAndDownloadPdf}>
              Download PDF
            </button>
          </div>

          <div id="boleto_master" className="boletos">
            <main id="bg_blocks_master">
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
                <select
                  className="boleto-curso"
                  id="boleto_master-curso"
                  name="curso"
                  onChange={this.handleChange}
                >
                  <option disabled selected></option>

                  <option>Informática</option>
                  <option>Informática Básica</option>
                  <option>Inglês</option>
                  <option>Inglês Básico</option>
                  <option>Excel Avançado</option>
                </select>
              </div>
              {/*
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
              */}

              <div class="div-n-lanc">
                <label>Nº Lanç.</label>
                <div>
                  <label>C:</label>
                  <input
                    className="boleto-n_carne"
                    id="boleto_master-n_carne"
                    type="number"
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
                    type="number"
                    placeholder=""
                    name="n_folha"
                    onChange={this.handleChange}
                  />
                </div>
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
                  type="number"
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
                  type="number"
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
                  type="number"
                  name="valor_total"
                  onChange={this.handleChange}
                  value={this.state.boleto_master.valor_total}
                />
              </div>
              <div>
                <label>R.A </label>
                <input
                  className="boleto-RA"
                  id="boleto_master-RA"
                  type="number"
                  name="RA"
                  onChange={this.handleChange}
                />
              </div>
              <div id="bg_btn_gerar_boleto">
                <button id="btn_gerar_boleto" onClick={this.insertBoleto}>
                  Gerar Boletos
                </button>
              </div>
            </main>
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
          {/*-------------------------------Boleto 4 --------------------------------------------------------------*/}
          <div id="boleto_4" className="boletos">
            <div className="tag_boletos">
              <h5>Boleto - 4</h5>
            </div>
            <div class="div-responsavel">
              <label>Responsável</label>

              <input
                className="boleto-responsavel"
                id="boleto_4-responsavel"
                type="text"
                name="responsavel"
                onChange={this.handleChange}
                value={this.state.boleto_4.responsavel}
              />
            </div>

            <div class="div-aluno">
              <label>Aluno </label>

              <input
                className="boleto-aluno"
                id="boleto_4-aluno"
                type="text"
                name="aluno"
                onChange={this.handleChange}
                value={this.state.boleto_4.aluno}
              />
            </div>
            <div class="div-curso">
              <label>Curso </label>

              <input
                className="boleto-curso"
                id="boleto_4-curso"
                type="text"
                name="curso"
                onChange={this.handleChange}
                value={this.state.boleto_4.curso}
              />
            </div>
            <div>
              <label>Nº Lanç.</label>

              <input
                className="boleto-n_lanc"
                id="boleto_4-n_lanc"
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
                    3 +
                    ""
                  ).padStart(3, "0")
                }
              />
            </div>
            <div>
              <label>Parcela </label>
              <input
                className="boleto-parcela"
                id="boleto_4-parcela"
                type="text"
                name="parcela"
                onChange={this.handleChange}
                value={this.state.boleto_4.parcela}
              />
            </div>
            <div>
              <label>Vencimento </label>
              <input
                className="boleto-vencimento"
                id="boleto_4-vencimento"
                type="texto"
                name="vencimento"
                onChange={this.handleChange}
                value={this.state.boleto_4.vencimento}
              />
            </div>
            <div>
              <label>Valor </label>
              <input
                className="boleto-valor"
                id="boleto_4-valor"
                type="texto"
                name="valor"
                onChange={this.handleChange}
                value={this.state.boleto_4.valor}
              />
            </div>
            <div>
              <label>Desconto </label>
              <input
                className="boleto-desconto"
                id="boleto_4-desconto"
                type="texto"
                name="desconto"
                onChange={this.handleChange}
                value={this.state.boleto_4.desconto}
              />
            </div>
            <div>
              <label>Valor Total </label>
              <input
                className="boleto-valor_total"
                id="boleto_4-valor_total"
                type="texto"
                name="valor_total"
                onChange={this.handleChange}
                value={this.state.boleto_4.valor_total}
              />
            </div>
            <div>
              <label>R.A </label>
              <input
                className="boleto-RA"
                id="boleto_4-RA"
                type="texto"
                name="RA"
                onChange={this.handleChange}
                value={this.state.boleto_4.RA}
              />
            </div>
          </div>
          {/*---------------------------------------------------------------------------------------------*/}
          {/*-------------------------------Boleto 5 --------------------------------------------------------------*/}
          <div id="boleto_5" className="boletos">
            <div className="tag_boletos">
              <h5>Boleto - 5</h5>
            </div>
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
                value={this.state.boleto_5.curso}
              />
            </div>
            <div>
              <label>Nº Lanç.</label>

              <input
                className="boleto-n_lanc"
                id="boleto_5-n_lanc"
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
                    4 +
                    ""
                  ).padStart(3, "0")
                }
              />
            </div>
            <div>
              <label>Parcela </label>
              <input
                className="boleto-parcela"
                id="boleto_5-parcela"
                type="text"
                name="parcela"
                onChange={this.handleChange}
                value={this.state.boleto_5.parcela}
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
                value={this.state.boleto_5.vencimento}
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
                value={this.state.boleto_5.valor}
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
                value={this.state.boleto_5.desconto}
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
                value={this.state.boleto_5.valor_total}
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
                value={this.state.boleto_5.RA}
              />
            </div>
          </div>
          {/*---------------------------------------------------------------------------------------------*/}
          {/*-------------------------------Boleto 6 --------------------------------------------------------------*/}
          <div id="boleto_6" className="boletos">
            <div className="tag_boletos">
              <h5>Boleto - 6</h5>
            </div>
            <div class="div-responsavel">
              <label>Responsável</label>

              <input
                className="boleto-responsavel"
                id="boleto_6-responsavel"
                type="text"
                name="responsavel"
                onChange={this.handleChange}
                value={this.state.boleto_6.responsavel}
              />
            </div>

            <div class="div-aluno">
              <label>Aluno </label>

              <input
                className="boleto-aluno"
                id="boleto_6-aluno"
                type="text"
                name="aluno"
                onChange={this.handleChange}
                value={this.state.boleto_6.aluno}
              />
            </div>
            <div class="div-curso">
              <label>Curso </label>

              <input
                className="boleto-curso"
                id="boleto_6-curso"
                type="text"
                name="curso"
                onChange={this.handleChange}
                value={this.state.boleto_6.curso}
              />
            </div>
            <div>
              <label>Nº Lanç.</label>

              <input
                className="boleto-n_lanc"
                id="boleto_6-n_lanc"
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
                    5 +
                    ""
                  ).padStart(3, "0")
                }
              />
            </div>
            <div>
              <label>Parcela </label>
              <input
                className="boleto-parcela"
                id="boleto_6-parcela"
                type="text"
                name="parcela"
                onChange={this.handleChange}
                value={this.state.boleto_6.parcela}
              />
            </div>
            <div>
              <label>Vencimento </label>
              <input
                className="boleto-vencimento"
                id="boleto_6-vencimento"
                type="texto"
                name="vencimento"
                onChange={this.handleChange}
                value={this.state.boleto_6.vencimento}
              />
            </div>
            <div>
              <label>Valor </label>
              <input
                className="boleto-valor"
                id="boleto_6-valor"
                type="texto"
                name="valor"
                onChange={this.handleChange}
                value={this.state.boleto_6.valor}
              />
            </div>
            <div>
              <label>Desconto </label>
              <input
                className="boleto-desconto"
                id="boleto_6-desconto"
                type="texto"
                name="desconto"
                onChange={this.handleChange}
                value={this.state.boleto_6.desconto}
              />
            </div>
            <div>
              <label>Valor Total </label>
              <input
                className="boleto-valor_total"
                id="boleto_6-valor_total"
                type="texto"
                name="valor_total"
                onChange={this.handleChange}
                value={this.state.boleto_6.valor_total}
              />
            </div>
            <div>
              <label>R.A </label>
              <input
                className="boleto-RA"
                id="boleto_6-RA"
                type="texto"
                name="RA"
                onChange={this.handleChange}
                value={this.state.boleto_6.RA}
              />
            </div>
          </div>
          {/*---------------------------------------------------------------------------------------------*/}

          {/*-------------------------------Boleto 7 --------------------------------------------------------------*/}
          <div id="boleto_7" className="boletos">
            <div className="tag_boletos">
              <h5>Boleto - 7</h5>
            </div>
            <div class="div-responsavel">
              <label>Responsável</label>

              <input
                className="boleto-responsavel"
                id="boleto_7-responsavel"
                type="text"
                name="responsavel"
                onChange={this.handleChange}
                value={this.state.boleto_7.responsavel}
              />
            </div>

            <div class="div-aluno">
              <label>Aluno </label>

              <input
                className="boleto-aluno"
                id="boleto_7-aluno"
                type="text"
                name="aluno"
                onChange={this.handleChange}
                value={this.state.boleto_7.aluno}
              />
            </div>
            <div class="div-curso">
              <label>Curso </label>

              <input
                className="boleto-curso"
                id="boleto_7-curso"
                type="text"
                name="curso"
                onChange={this.handleChange}
                value={this.state.boleto_7.curso}
              />
            </div>
            <div>
              <label>Nº Lanç.</label>

              <input
                className="boleto-n_lanc"
                id="boleto_7-n_lanc"
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
                    6 +
                    ""
                  ).padStart(3, "0")
                }
              />
            </div>
            <div>
              <label>Parcela </label>
              <input
                className="boleto-parcela"
                id="boleto_7-parcela"
                type="text"
                name="parcela"
                onChange={this.handleChange}
                value={this.state.boleto_7.parcela}
              />
            </div>
            <div>
              <label>Vencimento </label>
              <input
                className="boleto-vencimento"
                id="boleto_7-vencimento"
                type="texto"
                name="vencimento"
                onChange={this.handleChange}
                value={this.state.boleto_7.vencimento}
              />
            </div>
            <div>
              <label>Valor </label>
              <input
                className="boleto-valor"
                id="boleto_7-valor"
                type="texto"
                name="valor"
                onChange={this.handleChange}
                value={this.state.boleto_7.valor}
              />
            </div>
            <div>
              <label>Desconto </label>
              <input
                className="boleto-desconto"
                id="boleto_7-desconto"
                type="texto"
                name="desconto"
                onChange={this.handleChange}
                value={this.state.boleto_7.desconto}
              />
            </div>
            <div>
              <label>Valor Total </label>
              <input
                className="boleto-valor_total"
                id="boleto_7-valor_total"
                type="texto"
                name="valor_total"
                onChange={this.handleChange}
                value={this.state.boleto_7.valor_total}
              />
            </div>
            <div>
              <label>R.A </label>
              <input
                className="boleto-RA"
                id="boleto_7-RA"
                type="texto"
                name="RA"
                onChange={this.handleChange}
                value={this.state.boleto_7.RA}
              />
            </div>
          </div>
          {/*---------------------------------------------------------------------------------------------*/}

          {/*-------------------------------Boleto 8 --------------------------------------------------------------*/}
          <div id="boleto_8" className="boletos">
            <div className="tag_boletos">
              <h5>Boleto - 8</h5>
            </div>
            <div class="div-responsavel">
              <label>Responsável</label>

              <input
                className="boleto-responsavel"
                id="boleto_8-responsavel"
                type="text"
                name="responsavel"
                onChange={this.handleChange}
                value={this.state.boleto_8.responsavel}
              />
            </div>

            <div class="div-aluno">
              <label>Aluno </label>

              <input
                className="boleto-aluno"
                id="boleto_8-aluno"
                type="text"
                name="aluno"
                onChange={this.handleChange}
                value={this.state.boleto_8.aluno}
              />
            </div>
            <div class="div-curso">
              <label>Curso </label>

              <input
                className="boleto-curso"
                id="boleto_8-curso"
                type="text"
                name="curso"
                onChange={this.handleChange}
                value={this.state.boleto_8.curso}
              />
            </div>
            <div>
              <label>Nº Lanç.</label>

              <input
                className="boleto-n_lanc"
                id="boleto_8-n_lanc"
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
                    7 +
                    ""
                  ).padStart(3, "0")
                }
              />
            </div>
            <div>
              <label>Parcela </label>
              <input
                className="boleto-parcela"
                id="boleto_8-parcela"
                type="text"
                name="parcela"
                onChange={this.handleChange}
                value={this.state.boleto_8.parcela}
              />
            </div>
            <div>
              <label>Vencimento </label>
              <input
                className="boleto-vencimento"
                id="boleto_8-vencimento"
                type="texto"
                name="vencimento"
                onChange={this.handleChange}
                value={this.state.boleto_8.vencimento}
              />
            </div>
            <div>
              <label>Valor </label>
              <input
                className="boleto-valor"
                id="boleto_8-valor"
                type="texto"
                name="valor"
                onChange={this.handleChange}
                value={this.state.boleto_8.valor}
              />
            </div>
            <div>
              <label>Desconto </label>
              <input
                className="boleto-desconto"
                id="boleto_8-desconto"
                type="texto"
                name="desconto"
                onChange={this.handleChange}
                value={this.state.boleto_8.desconto}
              />
            </div>
            <div>
              <label>Valor Total </label>
              <input
                className="boleto-valor_total"
                id="boleto_8-valor_total"
                type="texto"
                name="valor_total"
                onChange={this.handleChange}
                value={this.state.boleto_8.valor_total}
              />
            </div>
            <div>
              <label>R.A </label>
              <input
                className="boleto-RA"
                id="boleto_8-RA"
                type="texto"
                name="RA"
                onChange={this.handleChange}
                value={this.state.boleto_8.RA}
              />
            </div>
          </div>
          {/*---------------------------------------------------------------------------------------------*/}

          {/*-------------------------------Boleto 9 --------------------------------------------------------------*/}
          <div id="boleto_9" className="boletos">
            <div className="tag_boletos">
              <h5>Boleto - 9</h5>
            </div>
            <div class="div-responsavel">
              <label>Responsável</label>

              <input
                className="boleto-responsavel"
                id="boleto_9-responsavel"
                type="text"
                name="responsavel"
                onChange={this.handleChange}
                value={this.state.boleto_9.responsavel}
              />
            </div>

            <div class="div-aluno">
              <label>Aluno </label>

              <input
                className="boleto-aluno"
                id="boleto_9-aluno"
                type="text"
                name="aluno"
                onChange={this.handleChange}
                value={this.state.boleto_9.aluno}
              />
            </div>
            <div class="div-curso">
              <label>Curso </label>

              <input
                className="boleto-curso"
                id="boleto_9-curso"
                type="text"
                name="curso"
                onChange={this.handleChange}
                value={this.state.boleto_9.curso}
              />
            </div>
            <div>
              <label>Nº Lanç.</label>

              <input
                className="boleto-n_lanc"
                id="boleto_9-n_lanc"
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
                    8 +
                    ""
                  ).padStart(3, "0")
                }
              />
            </div>
            <div>
              <label>Parcela </label>
              <input
                className="boleto-parcela"
                id="boleto_9-parcela"
                type="text"
                name="parcela"
                onChange={this.handleChange}
                value={this.state.boleto_9.parcela}
              />
            </div>
            <div>
              <label>Vencimento </label>
              <input
                className="boleto-vencimento"
                id="boleto_9-vencimento"
                type="texto"
                name="vencimento"
                onChange={this.handleChange}
                value={this.state.boleto_9.vencimento}
              />
            </div>
            <div>
              <label>Valor </label>
              <input
                className="boleto-valor"
                id="boleto_9-valor"
                type="texto"
                name="valor"
                onChange={this.handleChange}
                value={this.state.boleto_9.valor}
              />
            </div>
            <div>
              <label>Desconto </label>
              <input
                className="boleto-desconto"
                id="boleto_9-desconto"
                type="texto"
                name="desconto"
                onChange={this.handleChange}
                value={this.state.boleto_9.desconto}
              />
            </div>
            <div>
              <label>Valor Total </label>
              <input
                className="boleto-valor_total"
                id="boleto_9-valor_total"
                type="texto"
                name="valor_total"
                onChange={this.handleChange}
                value={this.state.boleto_9.valor_total}
              />
            </div>
            <div>
              <label>R.A </label>
              <input
                className="boleto-RA"
                id="boleto_9-RA"
                type="texto"
                name="RA"
                onChange={this.handleChange}
                value={this.state.boleto_9.RA}
              />
            </div>
          </div>
          {/*---------------------------------------------------------------------------------------------*/}

          {/*-------------------------------Boleto 10 --------------------------------------------------------------*/}
          <div id="boleto_10" className="boletos">
            <div className="tag_boletos">
              <h5>Boleto - 10</h5>
            </div>
            <div class="div-responsavel">
              <label>Responsável</label>

              <input
                className="boleto-responsavel"
                id="boleto_10-responsavel"
                type="text"
                name="responsavel"
                onChange={this.handleChange}
                value={this.state.boleto_10.responsavel}
              />
            </div>

            <div class="div-aluno">
              <label>Aluno </label>

              <input
                className="boleto-aluno"
                id="boleto_10-aluno"
                type="text"
                name="aluno"
                onChange={this.handleChange}
                value={this.state.boleto_10.aluno}
              />
            </div>
            <div class="div-curso">
              <label>Curso </label>

              <input
                className="boleto-curso"
                id="boleto_10-curso"
                type="text"
                name="curso"
                onChange={this.handleChange}
                value={this.state.boleto_10.curso}
              />
            </div>
            <div>
              <label>Nº Lanç.</label>

              <input
                className="boleto-n_lanc"
                id="boleto_10-n_lanc"
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
                    9 +
                    ""
                  ).padStart(3, "0")
                }
              />
            </div>
            <div>
              <label>Parcela </label>
              <input
                className="boleto-parcela"
                id="boleto_10-parcela"
                type="text"
                name="parcela"
                onChange={this.handleChange}
                value={this.state.boleto_10.parcela}
              />
            </div>
            <div>
              <label>Vencimento </label>
              <input
                className="boleto-vencimento"
                id="boleto_10-vencimento"
                type="texto"
                name="vencimento"
                onChange={this.handleChange}
                value={this.state.boleto_10.vencimento}
              />
            </div>
            <div>
              <label>Valor </label>
              <input
                className="boleto-valor"
                id="boleto_10-valor"
                type="texto"
                name="valor"
                onChange={this.handleChange}
                value={this.state.boleto_10.valor}
              />
            </div>
            <div>
              <label>Desconto </label>
              <input
                className="boleto-desconto"
                id="boleto_10-desconto"
                type="texto"
                name="desconto"
                onChange={this.handleChange}
                value={this.state.boleto_10.desconto}
              />
            </div>
            <div>
              <label>Valor Total </label>
              <input
                className="boleto-valor_total"
                id="boleto_10-valor_total"
                type="texto"
                name="valor_total"
                onChange={this.handleChange}
                value={this.state.boleto_10.valor_total}
              />
            </div>
            <div>
              <label>R.A </label>
              <input
                className="boleto-RA"
                id="boleto_10-RA"
                type="texto"
                name="RA"
                onChange={this.handleChange}
                value={this.state.boleto_10.RA}
              />
            </div>
          </div>
          {/*---------------------------------------------------------------------------------------------*/}

          {/*-------------------------------Boleto 11 --------------------------------------------------------------*/}
          <div id="boleto_11" className="boletos">
            <div className="tag_boletos">
              <h5>Boleto - 11</h5>
            </div>
            <div class="div-responsavel">
              <label>Responsável</label>

              <input
                className="boleto-responsavel"
                id="boleto_11-responsavel"
                type="text"
                name="responsavel"
                onChange={this.handleChange}
                value={this.state.boleto_11.responsavel}
              />
            </div>

            <div class="div-aluno">
              <label>Aluno </label>

              <input
                className="boleto-aluno"
                id="boleto_11-aluno"
                type="text"
                name="aluno"
                onChange={this.handleChange}
                value={this.state.boleto_11.aluno}
              />
            </div>
            <div class="div-curso">
              <label>Curso </label>

              <input
                className="boleto-curso"
                id="boleto_11-curso"
                type="text"
                name="curso"
                onChange={this.handleChange}
                value={this.state.boleto_11.curso}
              />
            </div>
            <div>
              <label>Nº Lanç.</label>

              <input
                className="boleto-n_lanc"
                id="boleto_11-n_lanc"
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
                    10 +
                    ""
                  ).padStart(3, "0")
                }
              />
            </div>
            <div>
              <label>Parcela </label>
              <input
                className="boleto-parcela"
                id="boleto_11-parcela"
                type="text"
                name="parcela"
                onChange={this.handleChange}
                value={this.state.boleto_11.parcela}
              />
            </div>
            <div>
              <label>Vencimento </label>
              <input
                className="boleto-vencimento"
                id="boleto_11-vencimento"
                type="texto"
                name="vencimento"
                onChange={this.handleChange}
                value={this.state.boleto_11.vencimento}
              />
            </div>
            <div>
              <label>Valor </label>
              <input
                className="boleto-valor"
                id="boleto_11-valor"
                type="texto"
                name="valor"
                onChange={this.handleChange}
                value={this.state.boleto_11.valor}
              />
            </div>
            <div>
              <label>Desconto </label>
              <input
                className="boleto-desconto"
                id="boleto_11-desconto"
                type="texto"
                name="desconto"
                onChange={this.handleChange}
                value={this.state.boleto_11.desconto}
              />
            </div>
            <div>
              <label>Valor Total </label>
              <input
                className="boleto-valor_total"
                id="boleto_11-valor_total"
                type="texto"
                name="valor_total"
                onChange={this.handleChange}
                value={this.state.boleto_11.valor_total}
              />
            </div>
            <div>
              <label>R.A </label>
              <input
                className="boleto-RA"
                id="boleto_11-RA"
                type="texto"
                name="RA"
                onChange={this.handleChange}
                value={this.state.boleto_11.RA}
              />
            </div>
          </div>
          {/*---------------------------------------------------------------------------------------------*/}

          {/*-------------------------------Boleto 12 --------------------------------------------------------------*/}
          <div id="boleto_12" className="boletos">
            <div className="tag_boletos">
              <h5>Boleto - 12</h5>
            </div>
            <div class="div-responsavel">
              <label>Responsável</label>

              <input
                className="boleto-responsavel"
                id="boleto_12-responsavel"
                type="text"
                name="responsavel"
                onChange={this.handleChange}
                value={this.state.boleto_12.responsavel}
              />
            </div>

            <div class="div-aluno">
              <label>Aluno </label>

              <input
                className="boleto-aluno"
                id="boleto_12-aluno"
                type="text"
                name="aluno"
                onChange={this.handleChange}
                value={this.state.boleto_12.aluno}
              />
            </div>
            <div class="div-curso">
              <label>Curso </label>

              <input
                className="boleto-curso"
                id="boleto_12-curso"
                type="text"
                name="curso"
                onChange={this.handleChange}
                value={this.state.boleto_12.curso}
              />
            </div>
            <div>
              <label>Nº Lanç.</label>

              <input
                className="boleto-n_lanc"
                id="boleto_12-n_lanc"
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
                    11 +
                    ""
                  ).padStart(3, "0")
                }
              />
            </div>
            <div>
              <label>Parcela </label>
              <input
                className="boleto-parcela"
                id="boleto_12-parcela"
                type="text"
                name="parcela"
                onChange={this.handleChange}
                value={this.state.boleto_12.parcela}
              />
            </div>
            <div>
              <label>Vencimento </label>
              <input
                className="boleto-vencimento"
                id="boleto_12-vencimento"
                type="texto"
                name="vencimento"
                onChange={this.handleChange}
                value={this.state.boleto_12.vencimento}
              />
            </div>
            <div>
              <label>Valor </label>
              <input
                className="boleto-valor"
                id="boleto_12-valor"
                type="texto"
                name="valor"
                onChange={this.handleChange}
                value={this.state.boleto_12.valor}
              />
            </div>
            <div>
              <label>Desconto </label>
              <input
                className="boleto-desconto"
                id="boleto_12-desconto"
                type="texto"
                name="desconto"
                onChange={this.handleChange}
                value={this.state.boleto_12.desconto}
              />
            </div>
            <div>
              <label>Valor Total </label>
              <input
                className="boleto-valor_total"
                id="boleto_12-valor_total"
                type="texto"
                name="valor_total"
                onChange={this.handleChange}
                value={this.state.boleto_12.valor_total}
              />
            </div>
            <div>
              <label>R.A </label>
              <input
                className="boleto-RA"
                id="boleto_12-RA"
                type="texto"
                name="RA"
                onChange={this.handleChange}
                value={this.state.boleto_12.RA}
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
