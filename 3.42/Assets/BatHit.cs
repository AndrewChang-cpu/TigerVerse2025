using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BatHit : MonoBehaviour
{
    public float hitForce = 500f; // Adjust as needed for good impact

    private void OnTriggerEnter(Collider other)
    {
        Rigidbody rb = other.attachedRigidbody;
        if (rb != null)
        {
            // Calculate direction away from bat
            Vector3 forceDirection = other.transform.position - transform.position;
            forceDirection.y = 1f; // Optional: add a bit of upward force
            rb.AddForce(forceDirection.normalized * hitForce, ForceMode.Impulse);
        }
    }
}