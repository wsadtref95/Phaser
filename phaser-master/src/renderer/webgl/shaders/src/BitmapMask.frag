#define SHADER_NAME PHASER_BITMAP_MASK_FS

precision mediump float;

uniform vec2 uResolution;
uniform sampler2D uMainSampler;
uniform sampler2D uMaskSampler;
uniform bool uInvertMaskAlpha;

void main ()
{
    vec2 uv = gl_FragCoord.xy / uResolution;

    vec4 mainColor = texture2D(uMainSampler, uv);
    vec4 maskColor = texture2D(uMaskSampler, uv);

    if (!uInvertMaskAlpha)
    {
        mainColor *= maskColor.a;
    }
    else
    {
        mainColor *= (1.0 - maskColor.a);
    }

    gl_FragColor = mainColor;
}