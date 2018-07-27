import { Model } from './Model';
import { modelDefinitions } from './data/models';
import { OBJParser } from './OBJParser';

export class ModelManager {
    static instance: ModelManager = new ModelManager();

    protected _models: Model[] = [];

    protected constructor() {}

    loadModels() {
        const promises = modelDefinitions.map(modelDefinition => {
            return fetch(modelDefinition.path)
                        .then(response => response.text())
                        .then(text => {
                            const data = OBJParser.parse(text);
                            const model = new Model(
                                modelDefinition.id,
                                data.verticies,
                                new Uint16Array(data.indicies)
                            );
                            model.calcTangents();
                            model.calcInterleavedValues();
                            this._models.push(model);
                        });
        });

        return Promise.all(promises);
    }

    find(id: string): Model | undefined {
        return this._models.find(model => model.id === id);
    }
}
