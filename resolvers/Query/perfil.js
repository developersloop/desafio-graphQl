const db = require('../../config/db')

module.exports = {
    async perfis() {
        return await db('perfis')
                    .select('id',
                            'nome',
                            'rotulo')
    },
    async perfil(_, { filtro }) {

        const { id, nome } = filtro;
        return await  db('perfis')
                    .where(function(){
                        this.where('id',id)
                            .orWhere('nome','like', `%${nome}%`)
                    })
                      .select('id',
                              'nome',
                              'rotulo')
                      .first();
    }
}