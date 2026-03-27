---
title: Neural Image & Video Coding
shortName: NVC
subtitle: Next-generation neural network-based visual data compression
focusNumber: '01'
image: /img/about/NVC_E2E-based.png
youtubeId: ''
weight: 1
teamLead: ''
teamMembers: []
highlights:
  - title: Block-based Learned Image Compression
    period: 2024–
    description: |-
      State-of-the-art LIC models process entire feature maps as network inputs, making peak memory a hard bottleneck for high-resolution content. Block-based processing mitigates this but triggers blocking artifacts.

       We mathematically derive the **minimum overlap** required to reproduce Full-image LIC results exactly, modeling how overlap propagates layer-by-layer through a CNN using a recursive formula. Several implementation techniques are applied on top of this theoretical foundation.

      **The result**: artifact-free reconstruction with **zero BD-rate loss** compared to Full-image inference, while **significantly reducing peak memory** and peak MACs across 2K and 4K resolutions.
    keyFigure: ''
    keyResult: CVPR 2026 accepted — 'Block-based Learned Image Compression without Blocking Artifacts'
    participants: ''
    relatedLinks:
      - label: Paper
        title: Block-based Learned Image Compression without Blocking Artifacts
        url: ''
  - title: Lightweight Building Blocks (SCM & SC-Gate)
    period: 2024–
    description: |-
      We design lightweight backbone blocks deployable in two separate contexts.

      **SCM (for NNVC / standard codec tools)**: A Spatial-then-Channel Mixing block applied to NN-based super-resolution and in-loop filtering. The NN-based super-resolution tool has been **adopted into the NNVC codec software**, and the in-loop filtering tool has been **advanced to the Exploration Experiment (EE) stage** within the JVET standardization process — a formal milestone toward standard inclusion.

       **SC-Gate (for LIC)**: Eliminates all global modeling (Self-attention, Mamba, Bi-RWKV) and uses a single depth-wise convolution for spatial mixing combined with an element-wise gating mechanism. At 28.8% of LALIC's per-block complexity, it  achieves **–15.84% BD-rate vs. VTM 9.1**, with gains validated on high-resolution  datasets (Tecnick 1K, CLIC up to 2K).
    keyFigure: ''
    keyResult: –15.84% BD-rate vs. VTM 9.1 and NNVC SR tool adoption
    participants: ''
    relatedLinks:
      - label: '- label: "Standard"'
        title: NNVC Super-resolution — JVET codec adoption
        url: ''
  - title: Generative Compression
    period: 2025–
    description: |-
      MSE-optimized codecs produce over-smoothed, perceptually unrealistic reconstructions at low bitrates. The key insight is that a compressed image should (1) lie on the manifold of real images (**Realism**) while (2) remaining consistent with the original (**Fidelity**).

      We mathematically formulate the transform and quantization characteristics of AI-based codecs and derive explicit constraints for diffusion model sampling. **This constrained diffusion decoding keeps reconstructions on the real-image manifold without sacrificing semantic consistency** — outperforming existing generative codecs in fidelity while matching their realism.
    keyFigure: ''
    keyResult: ''
    participants: ''
    relatedLinks: []
url: /about/nvc/
---

We research **end-to-end optimized neural network-based image and video compression** technologies that go beyond traditional hand-crafted codecs (AVC, HEVC, VVC, etc.).  Beyond compression gains, we directly confront the core barrier to practical deployment -- **computational complexity**.

By leveraging learned image coding, we aim to replace conventional hand-crafted approaches and achieve significantly more efficient compression of visual data.

### Key Approaches

- **Tool-based Approach**: Easily adaptable to existing codec architectures with straightforward extension to inter-coding.
- **End-to-End Approach**: A completely new design that demonstrates excellent performance in image compression, with ongoing research into video extension.
- **Quantization**: Applying hardware-friendly quantization to learned compression models — maintaining rate-distortion performance while reducing inference latency for practical deployment.
