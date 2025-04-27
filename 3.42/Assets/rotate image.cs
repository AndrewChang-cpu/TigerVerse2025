using UnityEngine;

public class FlipTexture : MonoBehaviour
{
    public MeshRenderer meshRenderer;

    void Start()
    {
        Mesh mesh = meshRenderer.GetComponent<MeshFilter>().mesh;
        Vector2[] uvs = mesh.uv;

        for (int i = 0; i < uvs.Length; i++)
        {
            uvs[i].y = 1.0f - uvs[i].y; // Flip the y-component of UVs
        }

        mesh.uv = uvs;
    }
}
