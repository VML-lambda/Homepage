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
highlights:
  - title: HEVC/VVC Extension for Phase Holograms
    period: 2022–2030
    description: |-
      Standard video codecs treat all signals as living on a linear number line.

      Phase signals live on a **circle**, so conventional difference computation, clipping, and RD optimization all produce incorrect results.

      We introduced two foundational operations and integrated them into HEVC's RDO, residual computation, and sample reconstruction processes:

      - **Shorter Circular Difference**: Resolves the distance ambiguity between two phase values by always selecting the shorter arc on the phase circle.
      - **Circular Clipping**: Wraps out-of-range values back onto the valid phase interval instead of hard-clipping to the boundary.

       Applied across seven holographic test sequences, the proposed method achieves **–63.3% BD-Rate (phase domain) and –65.5% BD-Rate (NR domain)** compared to standard HEVC. VVC extensions with SAO and deblocking filters are submitted.
    keyFigure: ''
    keyResult: Optics Express 2023
    participants: ''
    relatedLinks:
      - label: Paper
        title: HEVC extension for phase hologram compression
        url: https://doi.org/10.1364/OE.479281
  - title: 'NHVC: Neural Holographic Video Compression with Scalable Architecture'
    period: 2022–2025
    description: |-
      Conventional approaches treat hologram generation and compression as separate pipelines. NHVC is the **first unified end-to-end neural holographic video codec**,  jointly optimizing generation and compression within a single scalable architecture.

       Key design choices:

      - **Deformable convolution** for large receptive fields and implicit temporal motion handling.
      - **Strong band-limiting** to suppress high-order diffraction noise.
      - **Scalable architecture**: a single model supports image/video generation and compression, switchable at inference time.

      NHVC achieves >33 dB NR-PSNR quality, outperforming cascaded baselines by **–75.8% BD-Rate (image)** and **–75.6% BD-Rate (video)**.
    keyFigure: ''
    keyResult: IEEE VR 2024 (Oral)
    participants: ''
    relatedLinks:
      - label: Paper
        title: 'NHVC: Neural Holographic Video Compression with Scalable Architecture'
        url: https://doi.org/10.1109/VR58804.2024.00116
  - title: 'PDA: Phase Distribution Alignment'
    period: ''
    description: |-
      Phase holograms are **shift-invariant**: adding a global constant (mod 2π) leaves the 3D reconstruction unchanged. This means two physically identical holograms can show arbitrarily large phase-domain error — making direct phase comparison unreliable.

      **PDA (Phase Distribution Alignment)** maps each hologram to a unique canonical form before computing error, resolving this ambiguity. PDA-based metrics show **consistently higher correlation with NR-domain metrics** across 13 noise types and 5 strength levels.

      PDA has three demonstrated applications:

      - **Quality evaluation**: reliable phase-domain quality assessment without computationally expensive numerical reconstruction.
      - **Pre-processing for conventional codecs**: –14% BD-Rate with HEVC, –25.41% BD-Rate with VVC phase hologram extension.
      - **Training loss for neural models:** +0.37 dB generation quality and –11% BD-Rate vs. NHVC, with faster training convergence.
    keyFigure: ''
    keyResult: ACM MM 2025 (Oral)
    participants: ''
    relatedLinks:
      - label: Paper
        title: 'Phase Distribution Matters: On the Importance of PDA in Holographic Applications'
        url: https://dl.acm.org/doi/10.1145/3746027.3755797
  - title: 'PaD: Propagation as Data'
    period: ''
    description: |-
      Existing neural hologram generators are optimized for a **fixed propagation distance**.

      Changing the distance, wavelength, or pixel pitch requires full retraining — impractical for real deployments where hardware specifications vary.

      **PaD (Propagation as Data)** treats the propagation kernel as **input data** rather  than a fixed physical operation baked into the architecture. A dedicated Kernel Encoder ingests the propagation kernel at inference time, enabling a **single trained model to generalize to arbitrary propagation conditions without retraining**.

      Architecture highlights: pre-trained LDM image encoder for stable feature extraction; FFC (Fast Fourier Convolution) for feature–kernel fusion; enlarged receptive field for global scene structure modeling.
    keyFigure: ''
    keyResult: IEEE VR Workshop 2024
    participants: ''
    relatedLinks:
      - label: Paper
        title: 'PaD: Neural Phase Hologram Generation with Variable Distance Support'
        url: https://doi.org/10.1109/VRW62533.2024.00200
url: /about/3dv/
---

The 3D Video Coding (3DV) team conducts research across two major frontiers of next-generation 3D media: **phase-aware hologram compression (Learned-based/hand-crafted based)** and **3D Gaussian Splatting (3DGS)**

### Holography

Holography reproduces the full light field of objects in space, eliminating the vergence-accommodation conflict of conventional 3D displays. Phase hologram data, however, has two properties that make standard image processing fundamentally unsuitable:

- **2π-Periodicity (Circularity)**: Phase values are defined on a circular manifold, causing conventional difference, clipping, and loss computations to fail.
- **Randomness**: Phase distributions approximate uniform distributions, frustrating the statistical assumptions of existing compression models and neural networks.

3DV formalizes both properties at every layer of the pipeline — from conventional codec extensions (HEVC, VVC) to end-to-end neural video compression (NHVC), phase-aware activation functions (FlexMU), and neural hologram generation under variable propagation conditions (PaD). The team's work spans **17+ publications and 22+ patent applications**, with industry partnerships at Samsung and ETRI.

### 3D Gaussian Splatting

3DGS represents 3D scenes as millions of learnable Gaussian ellipsoids, enabling **real-time novel-view synthesis at >100 fps** — far exceeding NeRF in speed.
