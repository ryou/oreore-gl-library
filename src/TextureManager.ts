import { textures } from './data/textures';

export interface TextureDefinition {
    id: string;
    path: string;
};

export class Texture {
    constructor(protected _id: string, protected _texture: WebGLTexture) {}

    get id() {
        return this._id;
    }

    get texture() {
        return this._texture;
    }
}

export class TextureManager {
    static instance: TextureManager = new TextureManager();
    protected _gl: WebGLRenderingContext;
    protected _textures: Texture[] = [];

    protected constructor() {}

    setContext(context: WebGLRenderingContext) {
        this._gl = context;
    }

    loadTextures() {
        const promises = textures.map(textureDefinition => {
            const type = textureDefinition.type;
            switch(type) {
                case 'normal':
                    return this.loadTexture(textureDefinition);
                case 'cubemap':
                    return this.loadCubemapTexture(textureDefinition);
                default:
                    console.error(`texture type ${type} is invalid.`);
                    return Promise.resolve();
            }
        });

        return Promise.all(promises);
    }

    loadTexture(textureDefinition: TextureDefinition) {
        return new Promise((resolve, reject) => {
            const image = new Image();

            image.onload = () => {
                const tex = this._gl.createTexture();
                this._gl.bindTexture(
                    this._gl.TEXTURE_2D,
                    tex
                );
                this._gl.texImage2D(
                    this._gl.TEXTURE_2D,
                    0,
                    this._gl.RGBA,
                    this._gl.RGBA,
                    this._gl.UNSIGNED_BYTE,
                    image
                );
                this._gl.generateMipmap(this._gl.TEXTURE_2D);
                this._gl.bindTexture(
                    this._gl.TEXTURE_2D,
                    null
                );
                if (tex !== null) {
                    const texture = new Texture(textureDefinition.id, tex);
                    this._textures.push(texture);
    
                    resolve();
                } else {
                    reject();
                }
            };

            image.src = textureDefinition.path;
        });
    }

    loadCubemapTexture(textureDefinition: TextureDefinition) {
        const imageArray = [
            {
                name: 'posx.jpg',
                target: this._gl.TEXTURE_CUBE_MAP_POSITIVE_X,
            },
            {
                name: 'posy.jpg',
                target: this._gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
            },
            {
                name: 'posz.jpg',
                target: this._gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
            },
            {
                name: 'negx.jpg',
                target: this._gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
            },
            {
                name: 'negy.jpg',
                target: this._gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            },
            {
                name: 'negz.jpg',
                target: this._gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
            },
        ];

        const promises = imageArray.map(image => {
            return new Promise<{ target: number, data: HTMLImageElement }>((resolve) => {
                const imageElement = new Image;
                imageElement.onload = () => {
                    resolve({
                        target: image.target,
                        data: imageElement,
                    });
                };
                imageElement.src = textureDefinition.path + '/' + image.name;
            });
        });

        return Promise.all(promises)
            .then(images => {
                const tex = this._gl.createTexture();
                this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP, tex);
                images.forEach(image => {
                    this._gl.texImage2D(
                        image.target,
                        0,
                        this._gl.RGBA,
                        this._gl.RGBA,
                        this._gl.UNSIGNED_BYTE,
                        image.data
                    );
                });
                this._gl.generateMipmap(this._gl.TEXTURE_CUBE_MAP);

                this._gl.texParameteri(
                    this._gl.TEXTURE_CUBE_MAP,
                    this._gl.TEXTURE_MIN_FILTER,
                    this._gl.LINEAR
                );
                this._gl.texParameteri(
                    this._gl.TEXTURE_CUBE_MAP,
                    this._gl.TEXTURE_MAG_FILTER,
                    this._gl.LINEAR
                );
                this._gl.texParameteri(
                    this._gl.TEXTURE_CUBE_MAP,
                    this._gl.TEXTURE_WRAP_S,
                    this._gl.CLAMP_TO_EDGE
                );
                this._gl.texParameteri(
                    this._gl.TEXTURE_CUBE_MAP,
                    this._gl.TEXTURE_WRAP_T,
                    this._gl.CLAMP_TO_EDGE
                );

                if (tex !== null) {
                    const texture = new Texture(textureDefinition.id, tex);
                    this._textures.push(texture);
                } else {
                    console.error(`cubemap texture ${textureDefinition.id} load failed.`);
                }

                this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP, null);
            });
    }

    find(id: string) {
        return this._textures.find(texture => texture.id == id);
    }
}
