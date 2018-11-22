"use strict";

import { AppBackend } from "backend-plus";
import { emergeAppRecuerdos } from "./app-recuerdos";

var AppRecuerdos = emergeAppRecuerdos(AppBackend)

new AppRecuerdos().start();
