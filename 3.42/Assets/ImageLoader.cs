using System.Collections;
using UnityEngine;
using UnityEngine.Networking;
using SimpleJSON; // JSON parser

public class ImageLoader : MonoBehaviour
{
    public string supabaseUrl = "https://qoxgoiqvsrahxvwjeely.supabase.co/rest/v1/global";
    public string apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFveGdvaXF2c3JhaHh2d2plZWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2ODkwMDIsImV4cCI6MjA2MTI2NTAwMn0.LBSUpWU7kUlFc7TVSzIxdjMbA5z-TVDCSa_gtJVaK0Q";
    public Renderer targetRenderer; // Assign this in the Inspector

    void Start()
    {
        Debug.Log("!!!!!!!!!!!!!!!!!!!!ImageLoader Start() called!");
        StartCoroutine(FetchAndLoadImage());
    }

    IEnumerator FetchAndLoadImage()
    {
        UnityWebRequest request = UnityWebRequest.Get(supabaseUrl + "?select=selected_image_url");
        request.SetRequestHeader("apikey", apiKey);
        request.SetRequestHeader("Authorization", "Bearer " + apiKey);

        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError("Error fetching URL: " + request.error);
            yield break;
        }

        string jsonResponse = request.downloadHandler.text;
        Debug.Log("Supabase raw response: " + jsonResponse);

        var jsonArray = JSON.Parse(jsonResponse);

        if (jsonArray == null || jsonArray.Count == 0)
        {
            Debug.LogError("No image URL found in response");
            yield break;
        }

        string rawUrl = jsonArray[0]["selected_image_url"];
        Debug.Log("Fetched raw URL: " + rawUrl);

        // Clean up any accidental double slashes
        string cleanedUrl = rawUrl.Replace("/images//", "/images/") + "?download=1";
        Debug.Log("Cleaned URL: " + cleanedUrl);

        StartCoroutine(DownloadImage(cleanedUrl));
    }

    IEnumerator DownloadImage(string finalUrl)
    {
        Debug.Log("Downloading from: " + finalUrl);

        UnityWebRequest imageRequest = UnityWebRequestTexture.GetTexture(finalUrl);
        yield return imageRequest.SendWebRequest();

        if (imageRequest.result == UnityWebRequest.Result.Success)
        {
            Debug.Log("Texture download success!");
            Texture2D texture = DownloadHandlerTexture.GetContent(imageRequest);
            targetRenderer.material.mainTexture = texture;
        }
        else
        {
            Debug.LogError("Error downloading image: " + imageRequest.error);
        }
    }
}
