---
layout: default
title: ESP32 Sensor
description: Temperatur Sensor mit MQTT
image: /assets/img/esp32.jpg
tags: [ESP32, IoT]
repo: https://github.com/janniselef/esp32-sensor
---

# ESP32 Sensor

Temperatur Sensor mit ESP32.

## Repository

[GitHub Repo]({{ page.repo }})

## Hardware

- ESP32
- BME280

## Firmware

```cpp
void setup() {
Serial.begin(115200);
}