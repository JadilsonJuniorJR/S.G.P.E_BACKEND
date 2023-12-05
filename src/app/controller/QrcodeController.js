import qrcode from 'qrcode'
import crypto from 'crypto'

class QrcodeController {

  create(req, res) {
    const id_req = req.body.dados.id_evento;
    const opc = req.body.dados.opc
    console.log(opc)
    // CRIANDO E CALCULANDO UM HASH
    const hash = crypto.createHash('sha256').update(id_req).digest('hex');
    console.log(hash)
    let url
    if(opc == 1){
      url = `https://master--magenta-squirrel-060088.netlify.app/inicio/inscricao_participante`
    }else{
      url = `http://localhost:3000/inicio/confirmacao_participante`
    }

    const combinedData = `${url}?id=${hash}`;
    qrcode.toDataURL(combinedData, (err, qr) => {
      if (err) {
        res.status(500).json({ error: 'Erro na geração do QR Code' });
      } else {
        res.send(qr);
        console.log("Imagem Gerada")
      }
    });
  }


  // store(req, res) {
  //   const nome_req = req.body.dados.nome_evento;
  //   const id_req = req.body.dados.id_evento;

  //   qrcode.toFile('qrcode.png', combinedData, (err) => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       console.log('QR code salvo como qrcode.png');
  //     }
  //   });

  // }

}

// Padrao Singleton
export default new QrcodeController()