using UnityEngine;

public class RagdollActivator : MonoBehaviour
{
    private Rigidbody[] ragdollBodies;
    private Animator animator;
    private bool isRagdoll = false;

    void Start()
    {
        // Find Animator (if any)
        animator = GetComponentInChildren<Animator>();

        // Find all Rigidbodies under this GameObject
        ragdollBodies = GetComponentsInChildren<Rigidbody>();

        // At start, freeze all body parts
        foreach (var rb in ragdollBodies)
        {
            rb.isKinematic = true;
        }
    }

    void OnCollisionEnter(Collision collision)
    {
        if (isRagdoll) return; // Already activated

        //if (collision.relativeVelocity.magnitude > 0.5f) // Hit hard enough
        //{
            ActivateRagdoll();
        //}
    }

    void ActivateRagdoll()
    {
        isRagdoll = true;

        if (animator != null)
            animator.enabled = false; // Turn off standing animation

        foreach (var rb in ragdollBodies)
        {
            rb.isKinematic = false; // Unfreeze body parts to fall
        }
    }
}
