using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using UnityEngine;

using UnityEngine.AI;


public class Object : MonoBehaviour
{
    public NavMeshAgent agent;
    public float speed = 1;
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        Vector3 targetPosition = Camera.main.transform.position;

        agent.SetDestination(targetPosition);
        agent.speed = speed;
    }
}
