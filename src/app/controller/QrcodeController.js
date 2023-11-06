import qrcode from 'qrcode'
class QrcodeController {


  create(req, res){
    const nome_req = req.body.dados.nome_evento;
    const id_req = req.body.dados.id_evento;
    const url= `http://localhost:3000/inicio/Cadastrar_usuario`
    const combinedData = `${url}?id:${id_req}`;
    qrcode.toDataURL(combinedData, (err, qr) => {
      if (err) {
        res.status(500).json({ error: 'Erro na geração do QR Code' });
      } else {
        res.send(qr);
        console.log("Imagem Gerada")
      }

      // qrcode.toFile('qrcode.png', combinedData, (err) => {
      //   if (err) {
      //     console.error(err);
      //   } else {
      //     console.log('QR code salvo como qrcode.png');
      //   }
      // });
    });
  }


  store(req, res) {
    // console.log(req.body)
    const nome_req = req.body.dados.nome_evento;
    const id_req = req.body.dados.id_evento;

    qrcode.toFile('qrcode.png', combinedData, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('QR code salvo como qrcode.png');
      }
    });

  }

}

// Padrao Singleton
export default new QrcodeController()