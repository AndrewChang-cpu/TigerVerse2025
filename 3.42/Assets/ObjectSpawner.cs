using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Meta.XR.MRUtilityKit;

public class ObjectSpawner : MonoBehaviour
{
    public float spawnTimer = 1;
    public GameObject prefabToSpawn;
    public float minEdgeDistance = 0.3f;
    public float normalOffset;

    public MRUKAnchor.SceneLabels spawnLabels; // Fixed typo here (was spanwLabels)

    private float timer;

    public int spawnTry = 1000;

    void Start()
    {
    }

    void Update()
    {
        if (MRUK.Instance == null || !MRUK.Instance.IsInitialized) // Fixed check here
        {
            return;
        }

        timer += Time.deltaTime;

        if (timer > spawnTimer)
        {
            SpawnObject();
            timer -= spawnTimer;
        }
    }

    public void SpawnObject()
    {
        MRUKRoom room = MRUK.Instance.GetCurrentRoom();

        int currentTry = 0;

        while (currentTry < spawnTry)
        {
            bool hasFoundPosition = room.GenerateRandomPositionOnSurface(MRUK.SurfaceType.VERTICAL, minEdgeDistance, LabelFilter.Included(spawnLabels), out Vector3 pos, out Vector3 norm);

            if (hasFoundPosition)
            {
                Vector3 randomPositionNormalOffset = pos + norm * normalOffset;
                randomPositionNormalOffset.y = 0;
                Instantiate(prefabToSpawn, randomPositionNormalOffset, Quaternion.identity);

                return;
            }
            else
            {
                currentTry++;
            }
        }

        

        
    }
}
