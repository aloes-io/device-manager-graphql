# device-manager-graphql

This is a GraphQL API gateway, working in combination with Aloes [device-manager](https://framagit.org/aloes/device-manager) APIs.

It does two main tasks :

- wrap REST endpoints into GraphQL Queries / Mutations
- bridge MQTT events to make them available via GraphQL Subscription

The project is developped with Loopback 4, custom cache strategy is implemented per endpoint.

It internally uses [openapi-to-graphql](https://github.com/IBM/openapi-to-graphql) to translates OpenAPI to GraphQL types and resolvers.

### Examples

#### Find user by Id and relations

Here is an example query to get user's dependencies :

```graphql
query findUserById(
  $userId: String!
  $apiKey: String!
  $deviceLimit: Int
  $deviceSkip: Int
  $sensorLimit: Int
  $sensorSkip: Int
) {
  viewerApiKey(apiKey: $apiKey) {
    user: findUserById(
      userId: $userId
      deviceFilter: {limit: $deviceLimit, skip: $deviceSkip}
      sensorFilter: {limit: $sensorLimit, skip: $sensorSkip}
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

#### Find devices and relations

```graphql
query findDevices($apiKey: String!, $ownerId: String!, $deviceLimit: Int!) {
  auth: viewerApiKey(apiKey: $apiKey) {
    devices: findDevices(
      filter: {where: {transportProtocol: {regexp: "aloes/i"}}, limit: $deviceLimit}
    ) {
      accessPointUrl
      apiKey
      clientKey
      createdAt
      description
      devEui
      frameCounter
      id
      lastSignal
      messageProtocol
      messageProtocolVersion
      name
      ownerId
      # qrCode
      status
      transportProtocol
      transportProtocolVersion
      type
      sensors(measurementFilter: {limit: 10, order: ["ASC"]}) {
        colors
        description
        devEui
        deviceId
        frameCounter
        icons
        id
        inPrefix
        lastSignal
        messageProtocol
        messageProtocolVersion
        name
        nativeNodeId
        nativeResource
        nativeSensorId
        nativeType
        outPrefix
        ownerId
        resource
        transportProtocol
        transportProtocolVersion
        type
        resources {
          _5500
          _5501
          _5502
          _5503
          _5504
          _5506
          _5507
          _5508
          _5509
          _5510
          _5511
          _5512
          _5513
          _5514
          _5515
          _5516
          _5517
          _5518
          _5519
          _5520
          _5521
          _5521
          _5522
          _5524
          _5525
          _5526
          _5527
          _5528
          _5529
          _5531
          _5532
          _5533
          _5534
          _5536
          _5537
          _5538
          _5541
          _5542
          _5543
          _5544
          _5545
          _5546
          _5547
          _5548
          _5550
          _5551
          _5600
          _5601
          _5602
          _5603
          _5604
          _5650
          _5700
          _5701
          _5702
          _5703
          _5704
          _5705
          _5706
          _5800
          _5801
          _5802
          _5803
          _5804
          _5805
          _5806
          _5810
          _5811
          _5812
          _5813
          _5814
          _5815
          _5816
          _5820
          _5821
          _5850
          _5851
          _5852
          _5853
          _5854
          _5900
          _5903
          _5904
          _5910
          _5912
          _5913
        }
        measurements {
          time
          value
          sensorId
          nodeId
        }
      }
      sensorsCount {
        count
      }
    }
    devicesCount(where: {ownerId: $ownerId}) {
      count
    }
  }
}
```

#### Update a device by Id

```graphql
mutation replaceDeviceById($apiKey: String!, $deviceId: String!, $deviceInput: DeviceInput!) {
  mutationViewerApiKey(apiKey: $apiKey) {
    replaceDeviceById(deviceId: $deviceId, deviceInput: $deviceInput) {
      name
      type
    }
  }
}
```

#### Listen to devices ( by owner ) creation/update

```graphql
subscription watchDevices($ownerId: String!, $method: String!) {
  devicesEventListener(deviceTopicInput: {method: $method, ownerId: $ownerId}) {
    name
    type
  }
}
```

### License

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)
