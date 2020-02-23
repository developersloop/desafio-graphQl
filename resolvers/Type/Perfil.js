const db = require('../../config/db')

module.exports = {
    async usuarios(perfil) {
        console.log('adad');
        return await db('usuarios')
                     .join('usuarios_perfis',
                           'usuarios.id',
                           'usuarios_perfis.usuario_id'
                     )
                     .where({perfil_id:perfil.id})
    }
}