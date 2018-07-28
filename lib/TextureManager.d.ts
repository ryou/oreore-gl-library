export interface TextureDefinition {
    id: string;
    path: string;
}
export declare class Texture {
    protected _id: string;
    protected _texture: WebGLTexture;
    constructor(_id: string, _texture: WebGLTexture);
    readonly id: string;
    readonly texture: WebGLTexture;
}
export declare class TextureManager {
    static instance: TextureManager;
    protected _gl: WebGLRenderingContext;
    protected _textures: Texture[];
    protected constructor();
    setContext(context: WebGLRenderingContext): void;
    loadTextures(textures: any[]): Promise<{}[]>;
    loadTexture(textureDefinition: TextureDefinition): Promise<{}>;
    loadCubemapTexture(textureDefinition: TextureDefinition): Promise<void>;
    find(id: string): Texture | undefined;
}
