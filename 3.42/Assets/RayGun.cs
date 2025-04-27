using System.Collections;
using System.Collections.Generic;
//using System.Diagnostics;
using UnityEngine;

public class RayGun : MonoBehaviour
{
    public OVRInput.RawButton shootingButton;
    public GameObject linePrefab;
    public Transform shootingPoint;
    public float maxLineDistance = 5;
    public float lineShowTimer = 0.3f;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if(OVRInput.GetDown(shootingButton))
        {
            Shoot();
        }

    }

    public void Shoot()
    {
        Debug.Log("Pew Pew");

        LineRenderer line = Instantiate(linePrefab).GetComponent<LineRenderer>();
        line.positionCount = 2;
        line.SetPosition(0, shootingPoint.position);

        Vector3 endPoint = shootingPoint.position + shootingPoint.forward * maxLineDistance;
        line.SetPosition(1, endPoint);

        Destroy(line.gameObject, lineShowTimer);
    }
}
