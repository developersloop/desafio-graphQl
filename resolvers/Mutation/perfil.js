const db = require('../../config/db')

const  deletePerfil = async (id,nome) => {
    let idsToDelete =  await db('usuarios_perfis')
                    .innerJoin('perfis','usuarios_perfis.perfil_id','=','perfis.id')
                    .where(function(){
                        this.where({perfil_id:id})
                            .orWhere({nome,})
                    })
                    .select('usuario_id','perfil_id')
                    .first();

            const { usuario_id,perfil_id } = idsToDelete;
            
           await db('usuarios_perfis').where({usuario_id,}).del();
           await db('perfis').where('id',id).del();
           await db('usuarios').where({id:usuario_id}).del();
}
module.exports = {
    async novoPerfil(_, { dados }) {

        const { nome, rotulo }  = dados;
        let createIndex = await db('perfis').insert({ nome,rotulo });

        return await db('perfis')
                        .where('id',createIndex)
                        .select('id','nome','rotulo')
                        .first();
    },
    async excluirPerfil(_, { filtro }) {
        const { id, nome, rotulo } = filtro;

        try {

            await db('usuarios_perfis')
                        .where('perfil_id',id)
                        .then((count) => {
                            if (count == 0) {
                                db('perfis').where('id',id).del();
                                return null;
                            }else { 
                                deletePerfil(id,rotulo);
                            }
                        })

            

            

          } catch (error) {
              return error;
          }
    },
    async alterarPerfil(_, { filtro, dados }) {
         const { id } = filtro;
         const { nome, rotulo } = dados;

         await db('perfis')
                        .where({id,})
                        .update({ nome,rotulo });

        return await db('perfis')
                        .where({id,})
                        .select('id','nome','rotulo')
                        .first();
    }
}