import { Request, Response } from "express";
import { pagamentoService } from "../services/mercadoPago-service";
import { ingressoQuery } from "../schema/ingresso-schema"; // ajusta o caminho se precisar

const ingresso = new ingressoQuery(); // instância pra usar os métodos

export const pagamentoController = {
  async criarPreferencia(req: Request, res: Response) {
    try {
      const { titulo, quantidade, valorUnitario, cod_ingresso } = req.body;

      const result = await pagamentoService.criarPreferencia({
        titulo,
        quantidade,
        valorUnitario,
        cod_ingresso,
      });

      res.json({ preferenceId: result.id });
    } catch (error) {
      console.error("Erro ao criar preferência:", error);
      res.status(500).json({ erro: "Erro ao criar preferência de pagamento" });
    }
  },

  async webhook(req: Request, res: Response) {
    try {

      const { data, type, resource, topic } = req.body;

      let paymentId = data?.id;

      // formato antigo (resource + topic)
      if (!paymentId && topic === "payment" && resource) {
        paymentId = resource;
      }

      if (paymentId) {
        const pagamento = await pagamentoService.consultarPagamento(paymentId);
        const cod_ingresso = pagamento.external_reference;
        const statusMp = pagamento.status;

        if (!statusMp || !cod_ingresso) {
          console.warn(
            "Pagamento sem status ou external_reference:",
            paymentId,
          );
          return res.sendStatus(200);
        }

        const codStatus = mapearStatus(statusMp);

        await ingresso.atualizarStatus(Number(cod_ingresso), codStatus);

        console.log(
          `Ingresso ${cod_ingresso} atualizado para status ${statusMp}`,
        );
      }

      res.sendStatus(200);
    } catch (error) {
      console.error("Erro no webhook:", error);
      res.sendStatus(500);
    }
  },
};

function mapearStatus(statusMp: string): number {
  const mapa: Record<string, number> = {
    pending: 2,
    approved: 3,
    rejected: 4,
    in_process: 2,
    in_mediation: 2,
    cancelled: 5,
    authorized: 2,
    refunded: 5,
  };
  return mapa[statusMp] ?? 2;
}
