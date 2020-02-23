const db = require('../../config/db')

module.exports = {
    async perfis() {
        return await db('perfis')
                    .join('usuarios_perfis',
                          'perfis.id',
                          'usuarios_perfis.perfil_id')
                   
    },
    async perfil(_, { filtro }) {

        const { id, nome } = filtro;
        return await db('perfis')
                    .join('usuarios_perfis',
                          'perfis.id',
                          'usuarios_perfis.perfil_id')
                    .where(function(){
                        this.where('id',id) 
                            .orWhere('nome','like', `%${nome}%`)
                    })
                    .first()
    }
}

