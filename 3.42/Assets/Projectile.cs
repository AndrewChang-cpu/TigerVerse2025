using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Projectile : MonoBehaviour
{
    public Vector3 initialVelocity = new Vector3(-500f, 0, -500f); // move along +X axis

    void Start()
    {
        Rigidbody rb = GetComponent<Rigidbody>();
        rb.velocity = initialVelocity;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
