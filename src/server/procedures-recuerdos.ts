"use strict";

import { ProcedureDef } from "./types-recuerdos";
export * from "./types-recuerdos";

/*
var changing = require('best-globals').changing;
var bestGlobals = require('best-globals');
var fs = require('fs-extra');
var path = require('path');
var likear = require('like-ar');
*/

export const ProceduresRecuerdos : ProcedureDef[] = [
    {
        action:'recuerdo_registrar',
        parameters:[
            {name:"recuerdo"              , typeName:'bigint'                    },
            {name:"tipo"                  , typeName:'text'                      },
            {name:"contenido"             , typeName:'text'                      },
            {name:"p_latitud"             , typeName:'decimal'                   },
            {name:"p_longitud"            , typeName:'decimal'                   },
            {name:"timestamp"             , typeName:'bigint'                    },
            {name:"c_latitud"             , typeName:'decimal'                   },
            {name:"c_longitud"            , typeName:'decimal'                   },
        ],
        coreFunction:async function(context, parameters){
            var be=context.be;
            var tableRecuerdos = be.tableStructures.recuerdos(context);
            await context.client.query(
                `insert into recuerdos (${tableRecuerdos.fields.map(f=>f.name).join(',')})
                    values (${tableRecuerdos.fields.map((_,i)=>'$'+(i+1)).join(',')})
                `,
                tableRecuerdos.fields.map(f=>f.name=='usuario'?context.username:parameters[f.name])
            ).execute();
            return 'ok';
        }
    },
];

