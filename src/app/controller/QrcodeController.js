import qrcode from 'qrcode'
class QrcodeController {

  store(req, res) {
    // console.log(req.body)
    const nome_req = req.body.dados.nome_evento;
    const id_req = req.body.dados.id_evento;


    qrcode.toDataURL('https://www.google.com/', (err, url) => {
      if (err) {
        res.status(500).json({ error: 'Erro na geração do QR Code' });
      } else {
        res.send(url);
      }
    });

    console.log("Imagem Gerada")

  }

}

// Padrao Singleton
export default new QrcodeController()