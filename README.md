# device-manager-graphql

This is a GraphQL API gateway, working in combination with Aloes [device-manager](https://framagit.org/aloes/device-manager) APIs.

It does two main tasks :

- wrap REST endpoints into GraphQL Queries / Mutations
- bridge MQTT events to make them available via GraphQL Subscription

The project is developped with Loopback 4, custom cache strategy is implemented per endpoint.

It internally uses [openapi-to-graphql](https://github.com/IBM/openapi-to-graphql) to translates OpenAPI to GraphQL types and resolvers.

## Examples

### Login

#### Mutation

```graphql
mutation login($email: String!, $password: String!) {
  userLogin(userCredentialInput: {email: $email, password: $password}) {
    id
    ttl
    userId
  }
}
```

#### Variables

```js
{
  "email":  "",
  "password": ""
}
```

### Find user by Id and relations

Here is an example query to get user's dependencies :

#### Query

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

#### Variables

```js
{
  "apiKey": "you_user_token",
  "ownerId": "your_user_id",
  "deviceLimit": 50
  "deviceSkip": 10
  "sensorLimit": 20
  "sensorSkip": 0
}
```

### Find devices and relations

To find a complete set of all devices and their relations included.

#### Query

```graphql
query findDevices($apiKey: String!, $ownerId: String!, $deviceLimit: Int!) {
  auth: viewerApiKey(apiKey: $apiKey) {
    devices: findDevices(filter: {limit: $deviceLimit}) {
      accessPointUrl
      apiKey
      clientKey
      createdAt
      description
      devEui
      frameCounter
      icons
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
      sensors(
        measurementFilter: {
          limit: 10
          order: ["ASC"]
          # where: { rp: "0s" }
        }
      ) {
        # colors
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
          ...findResourcesByType
        }
        measurements {
          time
          value
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

fragment findResourcesByType on SensorResources {
  __typename
  ... on Acidity {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
  }
  ... on Altitude {
    _5601
    _5602
    _5603
    _5604
    _5700
    _5701
    _5750
  }
  ... on Actuation {
    _5750
    _5850
    _5851
    #_5852
    _5853
  }
  ... on AudioClip {
    _5522
    _5523
    _5524
    _5548
    _5750
  }
  ... on AnalogInput {
    _5600
    _5601
    _5602
    _5603
    _5604
    _5605
    _5750
  }
  ... on AnalogOutput {
    _5603
    _5604
    _5650
    _5750
  }
  ... on Accelerometer {
    _5603
    _5604
    _5701
    _5702
    _5703
    _5704
  }
  ... on AddressableTextDisplay {
    _5527
    _5528
    _5529
    _5530
    _5531
    _5545
    _5546
    _5750
  }
  ... on Barometer {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
  }
  ... on Bitmap {
    _5750
    _5910
    _5911
    _5912
  }
  ... on Buzzer {
    _5521
    _5525
    _5548
    _5750
    _5850
  }
  ... on Color {
    _5701
    _5706
    _5750
  }
  ... on Conductivity {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
  }
  ... on Concentration {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
  }
  ... on Current {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
  }
  ... on Depth {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
  }
  ... on Distance {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
  }
  ... on Direction {
    _5601
    _5602
    _5605
    _5705
    _5750
  }
  ... on DigitalInput {
    _5500
    _5501
    _5502
    _5503
    _5504
    _5505
    _5750
    _5751
  }
  ... on DigitalOutput {
    _5550
    _5551
    _5750
  }
  ... on Energy {
    _5701
    _5750
    _5805
    _5822
  }
  ... on Frequency {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
  }
  ... on Gyrometer {
    _5508
    _5509
    _5510
    _5511
    _5512
    _5513
    _5603
    _5604
    _5605
    _5701
    _5702
    _5703
    _5704
    _5750
  }
  ... on GpsLocation {
    _5514
    _5515
    _5516
    _5517
    _5518
    _5705
  }
  ... on GenericSensor {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
    _5751
  }
  ... on HandoverEvent {
    _3
    _4
    _6032
    _6033
  }
  ... on HumiditySensor {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
  }
  ... on IlluminanceSensor {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
  }
  ... on LevelControl {
    _5548
    _5750
    _5852
    _5854
  }
  ... on LightControl {
    _5701
    _5706
    _5750
    _5805
    _5820
    _5850
    _5851
  }
  ... on Load {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
  }
  ... on Loudness {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
  }
  ... on LoadControl {
    _5750
    _5823
    _5824
    _5825
    _5826
    _5827
    _5828
  }
  ... on Magnetometer {
    _5701
    _5702
    _5703
    _5704
    _5705
  }
  ... on MultipleAxisJoystick {
    _5500
    _5501
    _5702
    _5703
    _5704
    _5750
  }
  ... on MultistateSelector {
    _5547
    _5750
  }
  ... on OnOffSwitch {
    _5500
    _5501
    _5750
    _5852
    _5854
  }
  ... on Percentage {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
  }
  ... on Positioner {
    _5519
    _5520
    _5536
    _5537
    _5538
    _5601
    _5602
    _5605
    _5750
  }
  ... on Power {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
  }
  ... on PowerControl {
    _5750
    _5805
    _5820
    _5850
    _5851
    _5852
  }
  ... on PowerFactor {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
  }
  ... on PowerMeasurment {
    _5605
    _5800
    _5801
    _5802
    _5803
    _5804
    _5805
  }
  ... on PowerupLog {
    _1
    _2
    _3
    _4
    _10
  }
  ... on PresenceSensor {
    _5500
    _5501
    _5505
    _5751
    _5903
    _5904
  }
  ... on Pressure {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
  }
  ... on PushButton {
    _5500
    _5501
    _5750
  }
  ... on Rate {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
  }
  ... on RadioLinkFailureEvent {
    _1
  }
  ... on SetPoint {
    _5701
    _5706
    _5750
    _5900
  }
  ... on Stopwatch {
    _5501
    _5544
    _5750
    _5850
  }
  ... on TemperatureSensor {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
  }
  ... on Time {
    _5506
    _5507
    _5750
  }
  ... on Timer {
    _5501
    _5521
    _5523
    _5525
    _5526
    _5534
    _5538
    _5543
    _5544
    _5750
  }
  ... on UpDownControl {
    _5532
    _5533
    _5541
    _5542
    _5750
  }
  ... on Voltage {
    _5601
    _5602
    _5603
    _5604
    _5605
    _5700
    _5701
    _5750
  }
}
```

#### Variables

```js
{
  "apiKey": "you_user_token",
  "ownerId": "your_user_id",
  "deviceLimit": 50
}
```

### Update a device by Id

#### Mutation

```graphql
mutation updateDeviceById($apiKey: String!, $deviceId: String!, $deviceInput: JSON!) {
  mutationViewerApiKey(apiKey: $apiKey) {
    updateDeviceById(deviceId: $deviceId, device2Input: $deviceInput) {
      name
      type
    }
  }
}
```

#### Variables

```js
{
  "apiKey": "you_user_token",
  "deviceId": "your_device_id",
  "deviceInput": {
    "description": "new description",
    "frameCounter": 1,
    "lastSignal": "2019-07-12T09:08:54.099Z",
    "messageProtocol": "aloeslight",
    "messageProtocolVersion": "0.5",
    "name": "camera",
    "qrCode": "http://192.168.244.1&device_id=your_device_id&apikey=device_api_key",
    "transportProtocol": "aloeslight",
    "transportProtocolVersion": "0.5",
    "type": "camera"
  }
}
```

### Replace a device by Id

#### Mutation

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

#### Variables

```js
{
  "apiKey": "you_user_token",
  "deviceId": "your_device_id",
  "deviceInput": {
    "accessPointUrl": "http://192.168.244.1",
    "apiKey": "device_api_key",
    "clientKey": "device-client_key",
    "createdAt": "2019-06-15T11:49:12.564Z",
    "description": "",
    "devEui": "5CCF7F2C2A4D",
    "frameCounter": 1,
    "id": "your_device_id",
    "lastSignal": "2019-07-12T09:08:54.099Z",
    "messageProtocol": "aloeslight",
    "messageProtocolVersion": "0.5",
    "name": "camera",
    "ownerId": "your_user_id",
    "qrCode": "http://192.168.244.1&device_id=your_device_id&apikey=device_api_key",
    "status": false,
    "transportProtocol": "aloeslight",
    "transportProtocolVersion": "0.5",
    "type": "camera"
  }
}
```

### Listen to devices ( by owner ) events

First you should set your subscription URL.
Then, provide `username` (your_user_id) and `password` (you_user_token) in the connection parameters.

#### Subscription

```graphql
subscription watchDevices($ownerId: String!, $method: String!) {
  devicesEventListener(deviceTopicInput: {method: $method, ownerId: $ownerId}) {
    name
    type
  }
}
```

#### Variables

```js
{
  "method": "POST",
  "ownerId": "your_user_id"
}
```

### License

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)
