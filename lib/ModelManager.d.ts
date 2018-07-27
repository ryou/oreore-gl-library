import { Model } from './Model';
export declare class ModelManager {
    static instance: ModelManager;
    protected _models: Model[];
    protected constructor();
    loadModels(): Promise<void[]>;
    find(id: string): Model | undefined;
}
