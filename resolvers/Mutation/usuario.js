const db = require('../../config/db')
const _ = require('lodash');


module.exports = {
    async novoUsuario(_, { dados }) {
           const { nome,email,senha } = dados;
         
           let newUser = {
                     nome,
                     email,
                     senha
           }
                
             await db('usuarios')
                        .where('email',email)
                        .then((count) => {
                            if (count != 0) {
                                throw new Error('Este email já esta em nossa base de dados!');
                            } 
                        })


            let nomePerfil = dados.perfis[0].nome;
            let rotulo = dados.perfis[0].rotulo;

            let newPerfil = {
                   nome:nomePerfil,
                   rotulo
            }
            
            let lastIdUser = await db('usuarios').insert(newUser);
            let lastIdPerfil = await db('perfis').insert(newPerfil);

            await db('usuarios_perfis').insert({ usuario_id:lastIdUser, perfil_id:lastIdPerfil })

            return await db('usuarios_perfis')
                        .innerJoin('usuarios','usuarios_perfis.usuario_id','=','usuarios.id')
                        .innerJoin('perfis','usuarios_perfis.perfil_id','=','perfis.id')
                        .where({
                              usuario_id:lastIdUser,
                              perfil_id:lastIdPerfil
                        })
                        .select('usuarios.id',
                                'usuarios.nome',
                                'usuarios.email',
                                'perfis.id as perfil_id',
                                'perfis.nome as perfil_nome',
                                'perfis.rotulo as perfil_rotulo',
                                'usuarios_perfis.perfil_id')
                        .first();
       

    },
    async excluirUsuario(_, { filtro }) {
          const { id, email } = filtro;

         await db('usuarios')
                .where('id',id)
                .then((count) => {
                    if (count == 0) {
                        throw new Error('Este usuario não existe');
                    } 
                })
          // delete on cascate
          try {
            
            let idsToDelete = await db('usuarios_perfis')
                            .where({usuario_id:id})
                            .select('usuario_id','perfil_id')
                            .first();

            const { usuario_id,perfil_id } = idsToDelete;
            
            await db('usuarios_perfis').where({usuario_id:id}).del();
            await db('perfis').where('id',perfil_id).del();
            await db('usuarios').where({id:id}).del();

            

          } catch (error) {
              return error;
          }
          
    },
    async alterarUsuario(_, { filtro, dados }) {
        // Implementar
    }
}