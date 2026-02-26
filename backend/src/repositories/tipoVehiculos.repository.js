//backend/src/repositories/tipoVehiculos.repository.js
import BaseRepos from "./base.repository";
import TVModels from "../models/tipoVehiculos.models";
export default class TVRepos extends BaseRepos {
    constructor() {
        super(TVModels);
    }
}