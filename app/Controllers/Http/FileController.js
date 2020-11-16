'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {
  async store ({ request, response }) {
    try {
      if(!request.file('file')) return
        // Se não te arquivo
        const upload = request.file('file', { size: '2mb' })
        const fileName = `${Date.now()}.${upload.subtype}`
          // Renomeia o arquivo para a data da criação.extension
        await upload.moved(Helpers.tmpPath('uploads'), {
          name: fileName
        })

        await upload.move(Helpers.tmpPath('uploads'), {
          name: fileName
        })

        if(!upload.moved()){
          throw upload.error()
        }
        const file = await File.create({
          file: fileName,
          name: upload.clientName,
          type: upload.type,
          subtype: upload.subtype
        })

        return file

    } catch (error) {
      console.log(error);
      return response
      .status(error.status)
      .send({ error: { message: 'Erro no upload do arquivo'}})
    }
  }
}

module.exports = FileController
