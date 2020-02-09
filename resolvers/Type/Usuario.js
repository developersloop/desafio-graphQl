const db = require('../../config/db')

module.exports = {
    async perfis({ perfil_id }) {
        return await db('perfis')
                    .where({ id:perfil_id })
                    .select('id',
                            'nome',
                            'rotulo')
    }
}