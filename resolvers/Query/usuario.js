const db = require('../../config/db')

module.exports = {
    async usuarios() {
        return await db('usuarios_perfis')
                  .innerJoin('usuarios','usuarios_perfis.usuario_id','=','usuarios.id')
                  .innerJoin('perfis','usuarios_perfis.perfil_id','=','perfis.id')
                  .select('usuarios.id',
                          'usuarios.nome',
                          'usuarios.email',
                          'perfis.id as perfil_id',
                          'perfis.nome as perfil_nome',
                          'perfis.rotulo as perfil_rotulo',
                          'usuarios_perfis.perfil_id')
    },
    async usuario(_, { filtro }) {
        const { id, email } = filtro;
         return  await db('usuarios_perfis')
                  .innerJoin('usuarios','usuarios_perfis.usuario_id','=','usuarios.id')
                  .innerJoin('perfis','usuarios_perfis.perfil_id','=','perfis.id')
                  .where(function(){
                      this.where('usuario_id',id)
                          .orWhere('usuarios.email','like', `%${email}%`)
                  })
                  .select('usuarios.id',
                          'usuarios.nome',
                          'usuarios.email',
                          'perfis.id as perfil_id',
                          'perfis.nome as perfil_nome',
                          'perfis.rotulo as perfil_rotulo',
                          'usuarios_perfis.perfil_id')
                  .first()
        
    },
}