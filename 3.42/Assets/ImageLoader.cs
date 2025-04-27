using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class ImageLoader : MonoBehaviour
{
    public string imageUrl;
    public Renderer targetRenderer; // Set this in Inspector too (drag your dummy's MeshRenderer here)
    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(DownloadImage());
    }

    IEnumerator DownloadImage()
    {
        UnityWebRequest request = UnityWebRequestTexture.GetTexture(imageUrl);
        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            Debug.Log("Downloaded texture successfully");
            Texture2D texture = DownloadHandlerTexture.GetContent(request);
            targetRenderer.material.mainTexture = texture;
        }
        else
        {
            Debug.Log("error");
            Debug.LogError(request.error);
        }
    }
}
