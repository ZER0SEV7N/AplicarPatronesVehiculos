//backend/src/repositories/marcas.repository.js
import BaseRepos from "./base.repository";
import marcasModel from "../models/marcas.models";

export default class MarcasRepos extends BaseRepos {
    constructor() {
        super(marcasModel);
    }
}
