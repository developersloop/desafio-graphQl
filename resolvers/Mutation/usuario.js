const db = require('../../config/db')

module.exports = {
    async novoUsuario(_, { dados }) {
           const { nome,email,senha,...perfis } = dados;

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

            // let lastIdUser = await db('usuarios').insert(newUser);
            let lastIdPerfil = await db('perfis').insert(perfis);

            perfis.forEach(element => {
                console.log(element);    
            });
            // console.log(lastIdPerfil);

            // let user = await db('usuarios')
            //             .where({'id':lastIdUser})
            //             .select('id',
            //                     'nome',
            //                     'email')
            //             .first();
            
            console.log(user);
    },
    async excluirUsuario(_, { filtro }) {
        // Implementar
    },
    async alterarUsuario(_, { filtro, dados }) {
        // Implementar
    }
}