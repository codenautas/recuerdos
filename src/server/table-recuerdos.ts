"use strict";

import {TableDefinition, TableContext} from "./types-recuerdos";

export function recuerdos(context:TableContext):TableDefinition {
    var admin=context.user.rol==='admin' || context.forDump;
    return {
        name:'recuerdos',
        elementName:'recuerdo',
        allow:{update:true},
        fields:[
            {name:"usuario"               , typeName:'text'                      },
            {name:"recuerdo"              , typeName:'bigint'                    },
            {name:"tipo"                  , typeName:'text'                      },
            {name:"contenido"             , typeName:'text'                      },
            {name:"p_latitud"             , typeName:'decimal'                   },
            {name:"p_longitud"            , typeName:'decimal'                   },
            {name:"timestamp"             , typeName:'bigint'                    },
            {name:"c_latitud"             , typeName:'decimal'                   },
            {name:"c_longitud"            , typeName:'decimal'                   },
        ],
        primaryKey:['usuario','recuerdo'],
        foreignKeys:[
            {references:'usuarios', fields:['usuario']},
        ],
        sql:{
            where:admin?'true':'usuario = '+context.be.db.quoteLiteral(context.username)
        }
    };
}
