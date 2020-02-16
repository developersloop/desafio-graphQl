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

           let verifyEmail = await db('usuarios')
                             .where({email,})
                             .count();

            if(verifyEmail > 0){
                   throw new Error('Este email já esta em nossa base de dados!');
            }

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
        // Implementar
    },
    async alterarUsuario(_, { filtro, dados }) {
        // Implementar
    }
}