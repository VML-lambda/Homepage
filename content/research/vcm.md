---
title: Video Coding for Machines
shortName: VCM
subtitle: Optimized visual compression for machine vision tasks
focusNumber: '02'
image: /img/about/FCM.png
youtubeId: ''
weight: 2
teamLead: ''
teamMembers: []
highlights:
  - title: 'MPEG-FCM: Feature Coding for Machines — International Standard'
    period: 2024-
    description: |-
      We are core contributors to **ISO/IEC 23088-2 (MPEG Feature Coding for Machines)**,  the international standard for compressing neural network feature maps in split inference pipelines.

      Since the standard's inception, our proposals have been **adopted across 10 FCTM versions** — including L-MSFCv2, lightFCTM, PWD, and NN Inner Codec — advancing the test model from v1.0 to the current v9.0. We attend every MPEG plenary meeting, contributing technical proposals, cross-check evaluations, and editor-level contributions to the normative standard text.
    keyFigure: ''
    keyResult: ''
    participants: ''
    relatedLinks: []
  - title: 'Hybrid Vision Coding: A Unified Bitstream for Humans and Machines'
    period: 2025–
    description: |-
      We are pioneering **hybrid vision coding** — a compression framework that delivers both human-viewable reconstruction and machine task performance from a single bitstream, without the overhead of simulcast (compressing twice for two pipelines).

      Two interface paradigms are under investigation:

      **Feature-Input (FCM extension)**: Machine vision uses decoded features directly; a lightweight human decoder reconstructs a viewable image from the same features.

      **Image-Input**: Shared information is disentangled and recombined to serve both vision and reconstruction paths with high efficiency.

      We are coordinating a **joint contribution to MPEG WG2** (October 2026) with international partners (KHU, ZJU, SFU) to formally define use cases, requirements, and common test conditions — and to propose an official Exploration Experiment, the first formal step toward a new international standard for hybrid vision coding.
    keyFigure: ''
    keyResult: ''
    participants: ''
    relatedLinks: []
url: /about/vcm/
---

We develops compression technologies optimized
not for human perception, but for **machine vision models** (detection, segmentation, classification, etc.) — and for frameworks that serve _both_ simultaneously.

#### FCM: Feature Coding for Machines (MPEG-FCM)

Rather than compressing pixels, FCM compresses **intermediate feature maps** extracted by neural networks. In a _split inference_ pipeline, an edge device runs the front-end layers of a vision model, compresses the resulting features, and transmits them to a server that completes the task.

Our team has been a core contributor to the **MPEG-FCM international standard (MPEG-AI)** since its inception, attending every MPEG plenary and submitting proposals that have been adopted across ten successive Feature Coding Test Model (FCTM) versions.

#### Hybrid Vision Coding (Human & Machine)

A single bitstream that serves both human viewers and machine vision pipelines. Rather than compressing twice (simulcast), a unified codec delivers visual quality for human consumption while preserving task-critical information for AI models. We are coordinating a joint MPEG WG2 contribution with international partners to drive this toward a new international standard.
