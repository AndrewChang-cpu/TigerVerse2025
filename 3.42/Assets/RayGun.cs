using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Diagnostics.SymbolStore;

//using System.Diagnostics;
using UnityEngine;

public class RayGun : MonoBehaviour
{
    public LayerMask layerMask;
    public OVRInput.RawButton shootingButton;
    public GameObject linePrefab;
    public GameObject rayImpactPrefab;
    public Transform shootingPoint;
    public float maxLineDistance = 5;
    public float lineShowTimer = 0.3f;
    public AudioSource source;
    public AudioClip shootingAudioClip;

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
        source.PlayOneShot(shootingAudioClip);

        Ray ray = new Ray(shootingPoint.position, shootingPoint.forward);
        bool hasHit = Physics.Raycast(ray, out RaycastHit hit, maxLineDistance, layerMask);
        Vector3 endPoint = Vector3.zero;

        if (hasHit)
        {
            // stop the ray
            endPoint = hit.point;

            RagdollActivator activator = hit.transform.GetComponentInParent<RagdollActivator>();

            if (activator)
            {
                activator.ActivateRagdoll();
            }

            Quaternion rayImpactRotation = Quaternion.LookRotation(-hit.normal); 
            GameObject rayImpact = Instantiate(rayImpactPrefab, hit.point, rayImpactRotation);
            Destroy(rayImpact, 1);
        }
        else
        {
            endPoint = shootingPoint.position + shootingPoint.forward * maxLineDistance;
        }


        LineRenderer line = Instantiate(linePrefab).GetComponent<LineRenderer>();
        line.positionCount = 2;
        line.SetPosition(0, shootingPoint.position);

        line.SetPosition(1, endPoint);

        Destroy(line.gameObject, lineShowTimer);
    }
}
