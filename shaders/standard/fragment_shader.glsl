precision highp float;

uniform sampler2D mainTexture;
uniform sampler2D aoTexture;
uniform sampler2D normalTexture;
uniform samplerCube cubemapTexture;
uniform vec4 color;
uniform float metallic;
uniform float normalMagnification;
uniform mat4 modelMatrix;
uniform float normalYMultiple;

uniform vec3 worldCameraPosition;

const float redScale   = 0.298912;
const float greenScale = 0.586611;
const float blueScale  = 0.114478;
const vec3  monochromeScale = vec3(redScale, greenScale, blueScale);

varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec2 vUV;

void main(void){
    // 光源の定義
    vec3 worldLightPosition = vec3(10.0, 10.0, 10.0);

    // 法線マップからワールド法線を算出
    vec4 sampleNormal = texture2D(normalTexture, vUV);
    sampleNormal = (sampleNormal * 2.0) - 1.0; // -1.0 ~ 1.0
    sampleNormal.z *= (1.0 / normalMagnification);
    sampleNormal = normalize(sampleNormal);
    vec3 localNormal = normalize(vTangent) * sampleNormal.x + normalize(vBinormal) * (-1.0 * sampleNormal.y * normalYMultiple) + normalize(vNormal) * sampleNormal.z;
    localNormal = normalize(localNormal);
    vec3 worldNormal = (modelMatrix * vec4(localNormal, 1.0)).xyz;

    // テクスチャによる色の計算
    vec4 sampleColor = texture2D(mainTexture, vUV) * color;

    // 反射の計算
    vec3 viewDirReflection = normalize(reflect(worldCameraPosition - vPosition, worldNormal));

    // 反射色の算出
    vec4 envColor = textureCube(cubemapTexture, viewDirReflection);
    sampleColor.rgb = sampleColor.rgb * (1.0 - metallic) + envColor.rgb * metallic;

    // AOの計算
    vec4 aoColor = texture2D(aoTexture, vUV);
    float ao = pow(aoColor.r * redScale + aoColor.g * greenScale + aoColor.b * blueScale, 1.0);

    // ディフューズの計算
    float diffuse = clamp(dot(normalize(worldNormal), normalize(worldLightPosition)), 0.0, 1.0);

    // スペキュラの計算
    float specular = clamp(dot(viewDirReflection, normalize(worldLightPosition)), 0.0, 1.0);
    specular = pow(specular, 5.0);

    // 環境光の計算
    float ambient = 0.2;

    // 最終的な色の計算
    sampleColor.rgb *= (diffuse + specular + ambient) * ao;

    gl_FragColor = sampleColor;
}
