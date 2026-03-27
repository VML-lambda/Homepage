---
title: Neural Holography & 3D Vision
shortName: 3DV
subtitle: Phase-aware holographic processing and compression, and feed-forward 3D GS compression
focusNumber: '03'
image: /img/about/Hologram.png
youtubeId: ''
weight: 3
teamLead: ''
teamMembers: []
highlights: []
url: /about/3dv/
---

The 3D Video Coding (3DV) team conducts research across two major frontiers of next-generation 3D media: **phase-aware hologram compression (Learned-based/hand-crafted based)** and **feed-forward 3D Gaussian Splatting (3DGS)**

### Holography

Holography reproduces the full light field of objects in space, eliminating the vergence-accommodation conflict of conventional 3D displays. Phase hologram data, however, has two properties that make standard image processing fundamentally unsuitable:

- **2π-Periodicity (Circularity)**: Phase values are defined on a circular manifold, causing conventional difference, clipping, and loss computations to fail.

- **Randomness**: Phase distributions approximate uniform distributions, frustrating the statistical assumptions of existing compression models and neural networks.

3DV formalizes both properties at every layer of the pipeline — from conventional codec extensions (HEVC, VVC) to end-to-end neural video compression (NHVC), phase-aware activation functions (FlexMU), and neural hologram generation under variable propagation conditions (PaD). The team's work spans **17+ publications and 22+ patent applications**, with industry partnerships at Samsung and ETRI.

### 3D Gaussian Splatting

3DGS represents 3D scenes as millions of learnable Gaussian ellipsoids, enabling **real-time novel-view synthesis at >100 fps** — far exceeding NeRF in speed. We research **feed-forward joint generation and compression**: a trained network produces and compresses a complete 3DGS representation from multi-view images in a single forward pass, achieving state-of-the-art rate-distortion performance without per-scene fine-tuning.
