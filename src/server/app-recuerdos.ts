"use strict";

import {ProceduresRecuerdos} from "./procedures-recuerdos";

import "backend-plus";
import {Context, Express, ProcedureDef} from "backend-plus";

import { NextFunction } from "express-serve-static-core";

import { recuerdos           } from "./table-recuerdos";
import { usuarios            } from "./table-usuarios";

import "./types-recuerdos";
import {defConfig} from "./def-config"
import { AppBackend } from "backend-plus";

// type MenuDefinition = {menu:MenuInfo[]}

export type Constructor<T> = new(...args: any[]) => T;
export function emergeAppRecuerdos<T extends Constructor<AppBackend>>(Base:T){
  return class AppRecuerdos extends Base{
    constructor(...args:any[]){ 
        super(args); 
    }

    addSchrödingerServices(mainApp:Express, baseUrl:string){
        super.addSchrödingerServices(mainApp, baseUrl);
        //@ts-ignore
        mainApp.use(function(req:Request,res:Response, next:NextFunction){
            next();
        })
    }
    addLoggedServices(){
        super.addLoggedServices();
    }
    postConfig(){
        super.postConfig();
    }
    configStaticConfig(){
        super.configStaticConfig();
        this.setStaticConfig(defConfig);
    }
    async getProcedures():Promise<ProcedureDef[]>{
        var be=this;
        var pd= await super.getProcedures()
        return pd.concat(ProceduresRecuerdos.map(be.procedureDefCompleter.bind(be)));
    }
    getMenu(context:Context):{menu:any[]}{
        var contenidoMenuPrincipal=[
            //{menuType:'proc', name:'tableDef/generate', label:'generar tablas'},
            {menuType:'menu', name:'recuerdos', menuContent:[
                {menuType:'registrar'         , name:'registrar'      },
                {menuType:'buscar_cercanos'   , name:'buscar_cercanos'},
                {menuType:'ver_ultimos'       , name:'ver_ultimos'    , label:'ver últimos'},
            ]},
        ];
        if(context.user.rol=='admin'){
            contenidoMenuPrincipal.push(
                {menuType:'menu', name:'configurar', menuContent:[
                    {menuType:'table', name:'usuarios'},
                    {menuType:'table', name:'tipos'   },
                ]}
            )
        }
        return {menu:contenidoMenuPrincipal};
    }
    prepareGetTables(){
        super.prepareGetTables();
        this.getTableDefinition={
            ...this.getTableDefinition
            , usuarios            
            , recuerdos
        }
    }
  }
}