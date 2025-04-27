using System.Collections;
using System.Collections.Generic;
//using System.Diagnostics;
using UnityEngine;

public class RayGun : MonoBehaviour
{
    public OVRInput.RawButton shootingButton;
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
    }
}
