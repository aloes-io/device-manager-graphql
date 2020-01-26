# device-manager-graphql

This is a GraphQL Server, wrapping Aloes device-manager REST endpoints.

The project is developped with Loopback 4, custom cache strategy is implemented per endpoint.

It internally uses [openapi-to-graphql](https://github.com/IBM/openapi-to-graphql) to translates OpenAPI to GraphQL types and resolvers.


### Example 

Here is an example query 

```graphql
 query findUserByIdAndRelationsWithVars($userId: String!, 
    $apiKey: String!,
    $deviceLimit: Int, 
    $deviceSkip: Int, 
    $sensorLimit: Int, 
    $sensorSkip: Int) {
    viewerApiKey(
      apiKey: $apiKey
    ) {
      findUserById(
        userId: $userId
        deviceFilter: { limit: $deviceLimit, skip: $deviceSkip }
        sensorFilter: { limit: $sensorLimit, skip: $sensorSkip }
      ) {
        firstName
        email
        devices {
          id
          name
          devEui
          type
          status
          createdAt
          sensors {
            id
            name
            type
            nativeNodeId
            nativeSensorId
            lastSignal
          }
          sensorsCount {
          	count
        	}
        }
        devicesCount {
          count
        }
      }
    }
  }
```

### License 

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
