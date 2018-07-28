export declare const shaderDefinitionArray: {
    id: string;
    fixedUniforms: string[];
    customUniforms: ({
        type: string;
        name: string;
        options: {
            default: number[];
            index?: undefined;
        };
    } | {
        type: string;
        name: string;
        options: {
            default: number;
            index?: undefined;
        };
    } | {
        type: string;
        name: string;
        options: {
            default: string;
            index: number;
        };
    })[];
}[];
