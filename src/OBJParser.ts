import { VertexData } from './Model';
import { Float32Vector3, Float32Vector2 } from './float32vector';

export class OBJParser {
    static parse(objData: string) : {verticies: VertexData[], indicies: number[]} {
        const data = OBJParser.extractOBJData(objData);

        const fiMap: string[] = []; // data.fから重複を取り除いたもの
        const indexArray: number[] = [];
        data.f.forEach((f) => {
            let index = fiMap.findIndex(item => item === f);
            if (index === -1) {
                // 新規
                index = fiMap.length;
                const newItem = f;
                fiMap.push(newItem);
            }
            indexArray.push(index);
        });

        const vertexArrayTmp: string[][] = [];
        const texCoordArrayTmp: string[][] = [];
        const normalArrayTmp: string[][] = [];
        fiMap.forEach((fi) => {
            const splitData = fi.split('/');
            if (splitData.length !== 3) console.error('fのデータが不正です。');
            const vertex = Number(splitData[0]) - 1;
            const texCoord = Number(splitData[1]) - 1;
            const normal = Number(splitData[2]) - 1;
            vertexArrayTmp.push(data.v[vertex]);
            texCoordArrayTmp.push(data.vt[texCoord]);
            normalArrayTmp.push(data.vn[normal]);
        });

        const vertexArrayTmp2: string[] = vertexArrayTmp.reduce((ac, current) => ac.concat(current));
        const texCoordArrayTmp2: string[] = texCoordArrayTmp.reduce((ac, current) => ac.concat(current));
        const normalArrayTmp2: string[] = normalArrayTmp.reduce((ac, current) => ac.concat(current));

        const vertexArray: number[] = vertexArrayTmp2.map(item => Number(item));
        const texCoordArray: number[] = texCoordArrayTmp2.map(item => Number(item));
        const normalArray: number[] = normalArrayTmp2.map(item => Number(item));

        const vertexDataArray: VertexData[] = [];
        while(true) {
            if (vertexArray.length <= 0) break;
            const vertex = vertexArray.splice(0, 3);
            const normal = normalArray.splice(0, 3);
            const textureCoord = texCoordArray.splice(0, 2);

            const data = new VertexData(
                new Float32Vector3(vertex[0], vertex[1], vertex[2]),
                new Float32Vector3(normal[0], normal[1], normal[2]),
                new Float32Vector2(textureCoord[0], textureCoord[1])
            );
            vertexDataArray.push(data);
        }
        
        return {
            verticies: vertexDataArray,
            indicies: indexArray,
        };
    }

    // objデータから'v','vn','f'を抽出し
    // {
    //    v: [ [1,0,0,], [0,1,0], ... ],
    //    vn: [ [1,0,0,], [0,0,1], ... ],
    //    f: [ '2//1', '3//1', '1//1', ... ],
    // }
    // の形式で返却
    static extractOBJData(objData: string) {
        const out: { v: string[][], vt: string[][], vn: string[][], f: string[] } = {
            v: [],
            vt: [],
            vn: [],
            f: [],
        };

        const newLine = /\r\n|\r|\n/;
        const lines = objData.split(newLine);
        const f: string[][] = [];
        lines.forEach((line) => {
            const words = line.split(' ');
            const id = words.shift();

            switch (id) {
                case 'v':
                    out.v.push(words);
                    break;
                case 'vt':
                    out.vt.push(words);
                    break;
                case 'vn':
                    out.vn.push(words);
                    break;
                case 'f':
                    if (words.length !== 3) console.error('三角面でないポリゴンが含まれています。');
                    f.push(words);
                    break;
                default:
                    break;
            }
        });

        const newF = f.reduce((ac, current) => ac.concat(current));
        out.f = newF;

        return out;
    }
}
