# Environmental Variables

Authors: Priyanshu Mahey

Created: 3/27/2024

Updated: 33/27/2024

## Overview

This is an overview of what the general plans for the project are. This includes the project's goals, objectives, and the general roadmap.

## Roadmap

The primary initial goals are:

1. Recording neurotech headset data
2. Storing data in a new ubiquitous format
3. Displaying data in a user-friendly way
4. Replaying recorded neurotech data
5. Simulation of different neurotech headsets

Later on, the focuses will shift to development of the following:

1. Data analysis tools
2. Data visualization tools
3. Software Development Kits (SDKs) for neurotech headsets
4. Integration with other neurotech software
5. Machine Learning models and pipelines

### Recording Neurotech Headset Data

One of the primary goals is to be able to create some "headset runners" which serve as a way to acquire data from the headset and then pass the data into a format the frontend can then work with.
These runners are first going to be built in Rust as simpler servers that exist only to send data to the frontend.
They will later be built in a variety of other languages in order to enable developers to use whichever programming language they would like.

The data format in which the data is stored in will be a new format that is designed to be ubiquitous across all neurotech headsets.

### Replaying Neurotech Headset Data

### Simulating Neurotech Headset Data
