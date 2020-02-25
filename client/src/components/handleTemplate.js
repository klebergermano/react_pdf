import React, { Component } from "react";

export const handleTemplate = (
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
) => {
  return `
      <div class="bg_boleto">
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
              <h3><span>SETA CURSOS </span><b>RECIBO DE PAGAMENTO</b></h3>
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
};
