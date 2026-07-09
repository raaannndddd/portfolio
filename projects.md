# Master Project & Experience Inventory
 
**Purpose:** This is your raw material file — a superset of your resume. Include every project worth mentioning, even ones not currently on your resume. When you bring a job description into chat, Claude pulls from here to pick the best-fitting projects and reframe them, rather than being limited to whatever's already written up.
 
Fill in as much as you can. Rough notes are fine — you don't need polished bullets. Leave a field blank rather than guessing; Claude won't fabricate numbers, so real (even approximate) figures are worth more than none.
 
**Note:** Per your preference, this inventory does not track academic grades/marks, or "currently on resume" status, for any project.
 
---
 
## How to fill this out
 
For each project or role, copy the block below and fill it in. Add as many blocks as you need — this file is meant to grow over time.
 
```
### [Project/Role Name]
 
- **Company/Context:** (employer, personal project, open source, hackathon, etc.)
- **Dates:** (Month Year – Month Year)
- **One-line description:** (what it was, in plain language — no internal jargon)
- **Your role:** (what YOU specifically did — not "we")
- **Technologies used:** (languages, frameworks, tools — only ones you actually touched hands-on)
- **Scale/scope facts:** (team size, users, requests/sec, data volume, number of dependent teams — whatever is relevant and real)
- **Impact/outcomes:** (metrics if you have them: % improvement, cost saved, latency reduced, revenue impact, test coverage, adoption numbers. If you don't have a number, describe the outcome in concrete terms and flag it as unquantified.)
- **Links:** (GitHub, live demo, article, talk — only if currently live/working)
- **Why it might matter for certain roles:** (optional — e.g. "good fit if a JD emphasizes distributed systems" or "shows frontend + design sensibility")
```
 
---
 
## Example (filled in)
 
```
### Internal Rate-Limiting Service
 
- **Company/Context:** Acme Corp, backend team
- **Dates:** March 2023 – November 2023
- **One-line description:** Built a shared rate-limiting service used by multiple internal APIs to prevent overload during traffic spikes.
- **Your role:** Designed the token-bucket algorithm, implemented the service, led rollout to 3 dependent teams.
- **Technologies used:** Go, Redis, gRPC, Kubernetes
- **Scale/scope facts:** Handled ~15k requests/sec at peak; adopted by 3 teams; 2 engineers reporting to me on rollout
- **Impact/outcomes:** Reduced downstream service timeouts by ~40% during peak traffic (measured via internal dashboards, not 100% precise but directionally solid)
- **Links:** none (internal, no public repo)
- **Why it might matter for certain roles:** Strong fit for backend/infra roles emphasizing scale or distributed systems; less relevant for frontend-focused JDs.
```
 
---
 
## Your Projects
 
### ELEC4713 Thesis B — Evaluating Fairness and Bias in AI-Powered Medical Chatbots (Solo Undergraduate Honours Thesis)
 
- **Company/Context:** University of Sydney, School of Electrical and Computer Engineering, Faculty of Engineering. ELEC4713 (Thesis B — the final thesis and presentation component; the preceding literature-review component is ELEC4712 Thesis A), submitted in partial fulfilment of a Bachelor of Engineering Honours degree. Solo thesis. Supervisor: Dr Shahadat Uddin.
- **Dates:** Semester 1, 2026. Submitted 30 May 2026.
- **One-line description:** A solo empirical honours thesis testing whether two deployed AI medical chatbots (Doctronic and Dr Khan) give equitable symptom-triage advice across patient race, gender, and age, versus whether the two systems simply behave differently from one another. Built a custom browser-automation pipeline to collect a factorial dataset of 1,546 single-turn responses and 22,936 turn-level observations across 2,029 multi-turn conversations, then applied four complementary analytical methods (confirmatory statistics, supervised ML classification, longitudinal trajectory modelling, and semantic embedding analysis) to test for demographic bias versus cross-system divergence.
- **Your role:** Solo — per your Statement of Achievement, you were responsible for the study design, dataset construction, automation pipeline development, statistical analysis, machine learning evaluation, longitudinal modelling, interpretation of findings, and writing the thesis. Concretely, this included:
  - Designing a within-prompt factorial experiment: 5 racial groups × 2 genders × 3 age cohorts × 10 symptom conditions × 3 severity levels, submitted identically to both chatbots.
  - Building a browser-automation data-collection pipeline with separate client modules per chatbot (Doctronic and Dr Khan have materially different onboarding/UI flows), including retry logic, resume-on-interruption via a progress record, and permanent logging of failed prompts for re-runs.
  - Building a multi-turn "patient simulator" for the longitudinal arm, using a locally-served Llama 3 model (temperature 0.7) prompted to stay in character as a patient with fixed demographics, hard-capped at 15 patient turns / 16 chatbot turns, with a scripted closing instruction to force a final diagnosis/recommendation.
  - Designing a hybrid feature-extraction pipeline for ten clinical features (urgency, referral behaviour, medication specificity, empathy, safety communication, diagnostic certainty, etc.), combining rule-based pattern matching with an opt-in semantic-similarity scorer, validated against a stratified human-annotated sample using Cohen's κ and Spearman convergent validity checks.
  - Running the confirmatory statistical analysis: Wilcoxon signed-rank and Mann-Whitney U tests, linear mixed-effects models, cumulative link mixed models (CLMMs) for ordinal outcomes (estimated via R's `ordinal` package, called from within the Python pipeline), PERMANOVA for the embedding analysis, and a joint Benjamini-Hochberg false-discovery-rate correction across all confirmatory tests.
  - Building and evaluating a 6-configuration supervised ML "distinguishability" pipeline (Logistic Regression, linear SVM, and Random Forest on TF-IDF features; Logistic Regression, SVM, and KNN on dense sentence-embedding features) to test whether chatbot identity is recoverable from response text alone.
  - Running longitudinal trajectory modelling (mixed-effects models with a chatbot-by-turn-number interaction) across the 16-turn conversations, and a PCA/UMAP semantic embedding analysis of inter-group and inter-chatbot response distances.
  - Interpreting all results and writing the full thesis. Supervisor Dr Shahadat Uddin met with you weekly and gave feedback, primarily on formatting and academic writing.
- **Technologies used:** Python (core analysis/orchestration), scikit-learn (Logistic Regression, linear SVM, Random Forest, KNN, TF-IDF vectorisation), sentence-transformers (`all-MiniLM-L6-v2`, 384-dimensional dense embeddings), PCA and UMAP (dimensionality reduction/visualisation), R's `ordinal` package for CLMMs (invoked from the Python pipeline), custom browser-automation framework (per-chatbot client modules, resume/retry logic), Llama 3 (served locally, used as an LLM-driven synthetic patient for multi-turn simulation), and a broad statistical toolkit: Wilcoxon signed-rank, Mann-Whitney U, linear mixed-effects models, cumulative link mixed models, PERMANOVA, Benjamini-Hochberg FDR correction, Shapiro-Wilk normality diagnostics, and Cohen's κ / Spearman correlation for inter-rater reliability.
- **Scale/scope facts:** 1,546 single-turn factorial responses; 22,936 turn-level observations across 2,029 multi-turn conversations (12,566 Doctronic turns, 10,352 Dr Khan turns); 5 × 2 × 3 × 10 × 3 factorial design; 10 clinically-relevant features extracted per response across four feature clusters (length/structure, clinical content, safety/urgency, empathy); a 6-classifier, 2-feature-representation distinguishability benchmark; automated feature extraction validated against a ~25-response stratified human-annotated sample with dual independent raters; 123-page thesis document.
- **Impact/outcomes:** Chatbot identity — not patient demographics — was the dominant driver of response variability: paired effect sizes between Doctronic and Dr Khan were consistently medium-to-large across length, urgency, warning-sign enumeration, and empathy, while no demographic variable (race, gender, age) produced a medium or large effect on any clinical feature after Benjamini-Hochberg correction. The supervised ML classifiers could distinguish which chatbot produced a given response with near-perfect accuracy (cross-validated macro-F1 between 0.963 and 0.999 across all six classifier/feature-representation combinations). The thesis frames this as an original contribution: the primary measurable inequity in consumer-facing medical chatbots is structural (between systems) rather than demographic (between patient groups within one system). You also presented these findings and fielded live questions in front of a panel of approximately 20 people on 4 June 2026.
- **Links:** https://github.com/raaannndddd/ELEC4713-Thesis-B (unit code ELEC4713 confirmed correct — the repo and this final-thesis component are both ELEC4713; ELEC4712 is the earlier Thesis A literature-review component).
- **Why it might matter for certain roles:** This is your strongest single piece of evidence for applied ML/data-science and AI-safety/fairness-adjacent roles: an end-to-end research pipeline you built entirely solo, spanning custom data collection (browser automation + LLM-simulated multi-turn dialogue), rigorous statistical methodology (mixed-effects models, multiple-comparison correction, cross-validated ML benchmarking), and a genuinely novel empirical finding about AI fairness in a real, deployed, safety-relevant domain (healthcare). The panel presentation (findings + live Q&A in front of ~20 people) adds a communication/defence component that's good evidence for interviews probing how you handle pushback on your own work.
 
---
 
### ELEC4712 Thesis A — Literature Review, Proposal & Early Technical Work, Evaluating Fairness and Bias in AI-Powered Medical Chatbots (Solo)
 
- **Company/Context:** University of Sydney, School of Electrical and Computer Engineering — ELEC4712 (Thesis A), the preceding literature-review/proposal component of the thesis sequence that leads into ELEC4713 Thesis B. Solo. Same topic and same supervisor (Dr Shahadat Uddin) as Thesis B.
- **Dates:** August – November 2025 (Semester 2, 2025).
- **One-line description:** A solo literature review (101 citations) surveying the existing research on fairness, bias, and clinical quality in AI-powered/LLM-based medical chatbots — bundled with a research proposal, methodology plan, and ethics application, and followed by early testing/technical work that fed directly into the Thesis B empirical study.
- **Your role:** Solo — researched and wrote the literature review, and authored the accompanying research proposal, methodology plan, and ethics application within the same Thesis A deliverable/final report. Once the written components were complete, carried out early testing and technical work (prototyping/exploration) that later informed the Thesis B pipeline and four-method design.
- **Technologies used:** Primarily a written/research deliverable (literature review, proposal, methodology plan, ethics application), plus early technical/prototyping work carried out after the writing that fed into the Thesis B pipeline. (Thesis B stack: Python, scikit-learn, sentence-transformers, PCA/UMAP, R `ordinal`, custom browser automation, locally-served Llama 3.)
- **Scale/scope facts:** 31-page deliverable; 101 citations reviewed and synthesised; deeply technical and detailed in scope; includes lit review + proposal + methodology plan + ethics application, plus early technical testing.
- **Impact/outcomes:** Directly scoped and de-risked Thesis B — the review, proposal, methodology plan, ethics approval, and early technical work established the foundation for the empirical study and its four-method analytical design.
- **Links:** No separate link (not published to a repo distinct from Thesis B).
- **Why it might matter for certain roles:** Demonstrates independent literature-review and research-scoping ability at a substantial scale (31 pages, 101 sources) plus the full front end of a research project — proposal writing, methodology planning, ethics approval, and early technical prototyping — relevant alongside Thesis B for any role or interview that wants evidence of a self-directed, end-to-end research process, not just the final empirical output.
 
---
 
### SOFT3888 Capstone — AI System for Advertising Effectiveness Analysis in Shopping Centres (Group Project)
 
- **Company/Context:** University of Sydney coursework, SOFT3888 (UG Capstone Project, Faculty of Engineering), team SOFT3888_M10_04, Project P03, real external client — WITS Consulting (technical client: Simon Chandler; project coordinator: Cian Byrne). Tutor: Lin Zhang. Team of 6: Rand Halasa, Min Jeong, Abigail Ong, Jun Lee, Gabriel Sahlieh, Anica Shen.
- **Dates:** Semester 2, 2024 (report submitted September 2024, project ran the full 13-week teaching semester).
- **One-line description:** As part of a 6-person capstone team, delivered an end-to-end AI system for a real external client to study advertising effectiveness in shopping centres — a React frontend, a video/camera "pipelining" backend running face detection and demographic classification on uploaded footage, and live-camera streaming integration — built under Extreme Programming (XP) practices with weekly rotating team roles and multiple formal client deliverables.
- **Your role:** Owned the **pipelining** workstream: implemented face detection (Dlib) and a PyTorch ResNet-based model to classify each detected face by age bracket (18–24, 25–34, 35–44, 45–54, 55–64, 65+) and gender (Male/Female), saving results to CSV; researched and incorporated YOLOv8/OpenCV approaches; later implemented live-camera/livestreaming integration into the website (prototyped in Node.js/Socket.io/ffmpeg, then reworked to integrate with the team's React frontend). Also rotated through every XP role across the semester (Programmer every week, plus Doomsayer, Tracker, Manager, Customer Liaison, and Tester) — including being the main point of contact with the technical client, writing meeting minutes, drafting/sending client follow-up emails, editing all team demo and presentation videos, writing 3 user stories with acceptance criteria, running UI/UX and functional testing on the frontend, and writing the system architecture/design and reflections/conclusion sections of the final report.
- **Technologies used:** Python, Dlib (face detection), PyTorch (ResNet-based demographic classification), OpenCV, YOLOv8, Node.js + Socket.io + ffmpeg (livestreaming prototype), React (frontend), Bitbucket (version control + wiki), Discord/Slack/Instagram (team & client communication), Extreme Programming (XP)/Agile practices.
- **Scale/scope facts:** 6-person team, 13-week client-facing capstone; client-provided video datasets (~10 min low-traffic, ~1.5 hr medium/high-traffic, ~20 min high-traffic clips, ~92 people crossing the monitored doorway in total); demographic pipeline classifying detected faces across 6 age brackets × 2 genders; deliverables included a project scope statement, first project report, progressive presentation, multiple client demo videos, a final report, a final presentation, and a final client deployment.
- **Impact/outcomes:** Final system and code were packaged and successfully delivered to the client and submitted; the demographic-detection pipeline (Dlib + ResNet) successfully processed the client's video datasets end-to-end, producing per-face age/gender predictions. Specific accuracy/evaluation metrics for the classifier aren't detailed in the individual report — let me know if you have them from the team's technical/final report.
- **Links:** [placeholder — add repo/report link if available]
- **Why it might matter for certain roles:** Real-client, full-lifecycle capstone experience combining applied computer vision (face detection + demographic classification), pipeline/systems-integration work, front-end integration (live camera streaming), and strong Agile/XP process experience — including managing a genuinely difficult, slow-to-respond client. Good evidence for ML/computer-vision, full-stack, or product-engineering roles, and for interviews that probe process resilience and teamwork under real-world constraints.
 
---
 
### Tomato Leaf-Disease Detection with a Custom Fourier-Domain Loss
 
- **Company/Context:** University coursework — ELEC5304 (Advanced Signal Processing with Deep Learning), University of Sydney, Assignment 3 (Option 2).
- **Dates:** April–May 2025 (Semester 1, 2025; leaf-detection model weights timestamped May 2025).
- **One-line description:** An anchor-free object detector that localizes and classifies seven tomato-leaf disease types, built on YOLOv8 and enhanced with a custom Fourier-domain loss term that improves detection of small, high-frequency disease lesions.
- **Your role:** Designed and implemented the full detection pipeline: a custom deeper/wider multi-scale YOLOv8 architecture config (depth 0.67 / width 0.75) tuned for small objects; a from-scratch Fourier loss (FourierLoss / FourierDetectionLoss) that subclasses Ultralytics' v8DetectionLoss, runs a centered 2D FFT over prediction/ground-truth objectness heatmaps, applies a cached circular high-frequency mask, and adds an L1 spectral-alignment penalty; a precision/mAP-gated checkpointing callback; and a hand-written COCO-style small-object metric (AP_small@0.50). Ran the data pipeline (Roboflow dataset, EDA on box sizes) and drove the model evolution — from an initial two-stage Tiny U-Net crop + Faster R-CNN/FPN detector (~10 iterations, capped below mAP@50 0.5) to the anchor-free YOLOv8 + Fourier-loss design. Also extended a separate from-scratch YOLOv8 implementation with a custom FourierTrainer.
- **Technologies used:** Python, PyTorch, Ultralytics YOLOv8, torch.fft, NumPy, PIL; YOLO/Roboflow dataset tooling; Jupyter
- **Scale/scope facts:** 7 disease classes; ~143 training / 31 validation images (119 labeled instances); custom loss integrated directly into a production detection framework's training loop; explored 3+ detector architectures before final design.
- **Impact/outcomes:** The Fourier-loss model beat the baseline on every metric — box precision 0.749 → 0.828 (+7.9 pts), class-weighted mAP@50 0.780 → 0.799, and small-object AP@0.50 0.679 → 0.706 (measured on the held-out validation set in the notebook).
- **Links:** [placeholder — add repo/demo link if available]
- **Why it might matter for certain roles:** Strong fit for ML / computer-vision / research-engineering roles — demonstrates custom loss-function design (frequency domain), integration into an existing deep-learning framework, rigorous evaluation-metric design, and disciplined iteration on model architecture.
 
---
 
### Image-Denoising Neural Network
 
- **Company/Context:** University coursework — ELEC5304 (Advanced Signal Processing with Deep Learning), University of Sydney, Assignment 1 / Project 1.
- **Dates:** April 2025 (Semester 1, 2025; denoising notebook timestamped April 2025).
- **One-line description:** A convolutional neural network in PyTorch that restores grayscale images corrupted by Gaussian or speckle noise, evaluated by PSNR.
- **Your role:** Implemented the full denoising pipeline: custom Dataset classes producing (noisy, clean) image-tensor pairs with a configurable noise process; a convolutional denoiser (Conv–BatchNorm–ReLU stack); and a training loop with the Adam optimizer (lr 0.001), batch size 32, up to 50 epochs, and PSNR-based early stopping (patience 5). Ran a comparison of noise types (Gaussian vs. speckle) and their effect on restoration quality, and authored the analysis/results.
- **Technologies used:** Python, PyTorch, torchvision, NumPy, PIL; Jupyter
- **Scale/scope facts:** 400 grayscale 180×180 images (350 train / 50 test); evaluated across noise types and sigma levels.
- **Impact/outcomes:** Raised test-set PSNR from a 28.22 dB noisy baseline to 30.38 dB restored on Gaussian noise (σ=25) — an improvement of ~2.5 dB.
- **Links:** [placeholder — add repo/demo link if available]
- **Why it might matter for certain roles:** Good evidence of deep-learning and image-restoration fundamentals in PyTorch — building data pipelines, training loops, and quantitative evaluation from scratch. Relevant for ML / computer-vision / applied-research roles.
 
---
 
### Swillow — ML-Powered Smart Pillowcase for Sleep Apnoea Screening (Group Project)
 
- **Company/Context:** University of Sydney coursework, ENGG3112 (Interdisciplinary Engineering), group project, group of 5 (Elaina Balassis, Andrei Agnew, Sam Gan, Emma Cook, Rand Halasa — you are Rand).
- **Dates:** Semester 1, 2025.
- **One-line description:** As part of a 5-person team, designed and specified Swillow — a non-invasive, machine-learning-powered smart pillowcase for early sleep apnoea screening — spanning embedded hardware (ESP32 microcontroller + microphone sensor), a companion diagnostic website (symptom questionnaire and audio-upload paths), an ML pipeline for apnoea risk classification, and a full business case (risk management, stakeholder management, Gantt chart, and costing/break-even analysis).
- **Your role:** The companion diagnostic **website** (symptom questionnaire and audio-upload paths) and the **ML pipeline** (audio feature extraction and apnoea risk classification).
- **Technologies used:** ESP32 microcontroller, OZN-15E analogue microphone, Python (`numpy`, `librosa`, `scikit-learn`), Random Forest / SVM / Logistic Regression classifiers, MFCC audio feature extraction, AES-128 encryption, CAD (case design), ISO 31000 risk-management framework.
- **Scale/scope facts:** Team of 5; ML classifier trained on the public PSG-AUDIO dataset achieved 91% test accuracy (0.90–0.92 precision, 0.84–0.95 recall, 0.94 F1 for apnoea detection); designed against Class IIa medical-device compliance targets (ISO 80601-2-61:2017, IEC 62304:2006, ISO 13485:2016); engineering calculations verified ~3–4 day battery life on a 2200mAh cell; full costing model with break-even at 898–1,744 units depending on production-cost scenario.
- **Impact/outcomes:** Random Forest classifier achieved 91% accuracy / 0.94 F1-score for apnoea detection on held-out test data.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Strong interdisciplinary evidence spanning embedded hardware, applied ML (audio feature extraction + classification), and full product/business case development (risk, stakeholder, and cost analysis) — relevant for hardware/IoT, ML engineering, or product-engineering roles, especially in health-tech.
 
---
 
### ELEC5619 — AI-Powered Online Fashion Store (Group Project, 4–5 people)
 
- **Company/Context:** University of Sydney, ELEC5619 (postgraduate/coursework unit), Group Project. Team of 4–5.
- **Dates:** Semester 2, 2025.
- **One-line description:** A full-stack AI-powered e-commerce fashion store built with Spring Boot and React, featuring LLM-generated review summaries and an intelligent product Q&A chatbot to reduce return rates and decision fatigue for online shoppers.
- **Your role:** Ideation and full-stack contribution (both backend and frontend) across the team's shared codebase, and specifically owned the **LLM and chat integration** (review summarisation, product Q&A, product-styling chat via the local Ollama LLM) and the **review system**.
- **Technologies used:** Backend: Spring Boot (Java), RESTful API architecture, Hibernate/JPA, SQLite. Frontend: React (Vite), JavaScript/JSX. Auth: custom token-based + OAuth2 (Google). AI integration: Ollama (local LLM) for review summarisation, product Q&A, and product-styling chat. Testing: Spring Test + MockMvc, JUnit 5, AssertJ, Hamcrest, JaCoCo coverage, Spotless/Checkstyle/PMD/SpotBugs static analysis, PIT mutation testing in CI.
- **Scale/scope facts:** 14 Spring REST controllers spanning products, users, cart, reviews, addresses, images, chat, checkout, dashboard, admin orders/users, and store config; 10 use-case groups covering customer- and admin-facing flows; test suite achieving 72% instruction coverage (2,692/9,781 missed) and 55% branch coverage per JaCoCo report; WCAG 2.1 AA accessibility compliance target.
- **Impact/outcomes:** Delivered a working end-to-end e-commerce platform demonstrating applied LLM integration (review summarisation, product Q&A, styling chat) alongside standard e-commerce fundamentals (cart, checkout with stock reservation, order lifecycle, admin dashboard/analytics). Comprehensive automated test coverage across unit and integration layers with mocked external side effects (email).
- **Links:** [placeholder — add repo/report link when available]
- **Why it might matter for certain roles:** Solid evidence of full-stack development ability (Spring Boot + React) combined with practical LLM integration in a real application context — useful for full-stack, backend, or applied-AI engineering roles, and for team-based collaboration questions in interviews.
 
---
 
### ELEC5622 Project 1 — Classifying Alzheimer's Disease Patients from Brain MRI (Group Project, 3 people)
 
- **Company/Context:** University of Sydney, ELEC5622, Project 1. Team of 3 (Jack, Gayatri, Rand — you).
- **Dates:** Semester 1, 2025.
- **One-line description:** A fully automated neuroimaging pipeline classifying subjects as Alzheimer's Disease (AD) or Normal Control (NC) from T1-weighted MRI scans, using FSL-based preprocessing and an SVM classifier trained on AAL-atlas grey-matter volume features.
- **Your role:** Per the report's contributions section — you were responsible for the UNIX shell automation pipeline (skull stripping, tissue segmentation, spatial registration, and feature-measurement scripts), Methodology sections 3.1–3.6, all four code appendices, and document layout. (Teammate Gayatri handled the SVM classification code and methodology 3.6–3.8; teammate Jack handled introduction, background, discussion, conclusion, and results writing.)
- **Technologies used:** UNIX/bash shell scripting, FSL (FMRIB Software Library) — BET (skull stripping), FAST (tissue segmentation), FLIRT/FNIRT (affine/non-linear registration), AAL atlas-based ROI feature extraction; scikit-learn SVM (linear kernel) for classification (teammate-authored); z-score standardisation, ANOVA F-statistic feature selection, 5-fold stratified cross-validation with grid search (C, k) — teammate-authored analysis layer built on your pipeline's output.
- **Scale/scope facts:** 50 T1-weighted MRI scans processed (40 training, 10 test); pipeline of 4 sequential automated shell scripts with built-in error handling, QC checks, and retry logic (e.g. adaptive BET fractional-intensity retry, GM mean sanity checks); volumetric features extracted across 90 AAL atlas regions per subject; final model achieved 100% cross-validation accuracy (30 features, C=0.1).
- **Impact/outcomes:** Built the reproducible data pipeline that transformed raw MRI scans into the anatomically-labelled, quantitative feature set the whole classification result depended on — the report explicitly frames pipeline automation and reproducibility (no manual/interactive steps, identical parameters across all subjects) as a key strength of the work.
- **Links:** [placeholder — add repo/submission link when available]
- **Why it might matter for certain roles:** Strong evidence of scientific/research computing skill: building robust, error-handled automation pipelines (bash) around specialist scientific software (FSL) for a real biomedical dataset. Good complement to your ML-heavier work (thesis, COMP3308) since it shows the "gets messy real-world data pipeline-ready" side of the skill set, distinct from the modelling side.
 
---
 
### ELEC5622 Lab 1 — Structural Brain MRI Pre-processing Pipeline (FSL) (Solo)
 
- **Company/Context:** University of Sydney, ELEC5622 (postgraduate/coursework unit), individual lab exercise.
- **Dates:** Semester 1, 2025.
- **One-line description:** A solo lab building a complete FSL-based pre-processing pipeline that transforms a raw T1-weighted MRI scan into quantitative grey matter volume measurements for two AAL-atlas-defined temporal lobe regions (Temporal_Mid_L and Temporal_Mid_R).
- **Your role:** Solo — performed every stage of the pipeline: inspecting the MNI152 template and AAL atlas in FSLeyes and generating binary ROI masks (fslmaths threshold + binarise); refined brain extraction with BET (tuning -f, -g, -c parameters); tissue segmentation into CSF/grey matter/white matter with FAST; producing a subject-specific grey matter image via voxel-wise masking (fslmaths -mul); affine and deformable (non-linear) registration of the MNI152 template to native space; transforming the AAL atlas and ROI masks into native space with reg_resample using nearest-neighbour interpolation; and final volume quantification with fslstats.
- **Technologies used:** FSL toolkit (FSLeyes, BET, FAST, fslmaths, FLIRT/FNIRT-based registration, reg_resample, fslstats), MNI152 standard template, AAL atlas, UNIX/bash command-line workflow.
- **Scale/scope facts:** Single-subject pipeline; extracted total regional volumes of 24,789 voxels / 26,693.74 mm³ (Temporal_Mid_L) and 23,024 voxels / 24,793.12 mm³ (Temporal_Mid_R); grey-matter-only volumes of 12,301 voxels / 13,246.19 mm³ (L) and 10,867 voxels / 11,702.00 mm³ (R).
- **Impact/outcomes:** Produced a working, reproducible single-subject version of the same FSL pipeline (BET → FAST → registration → AAL-based ROI extraction → fslstats) that was later scaled up to 50 subjects as the automation pipeline in the ELEC5622 Project 1 group project — evidence this was a skill you already had individually before applying it at scale in the team project.
- **Links:** [placeholder — add link when available]
- **Why it might matter for certain roles:** Demonstrates individual command-line/neuroimaging pipeline competency (FSL, registration, atlas-based ROI work) underlying your group project — useful to cite if asked "which parts of the group project pipeline did you personally know how to do beforehand?"
 
---
 
### ELEC5622 Lab 2 — MRI Visualization, Edge Detection, K-Means Clustering & SVM Classification (Solo)
 
- **Company/Context:** University of Sydney, ELEC5622, individual lab exercise.
- **Dates:** Semester 1, 2025.
- **One-line description:** A solo Python lab spanning four topics: multi-planar MRI visualization with correct voxel aspect ratio, classical edge detection (Sobel, Prewitt, Canny) and spatial frequency concepts, K-means clustering for unsupervised image segmentation, and SVM classification (with hyperparameter tuning) on the Pima Indians Diabetes dataset.
- **Your role:** Solo — wrote and ran all code and analysis: extracted and displayed axial/sagittal/coronal MRI slices with aspect-ratio correction for anisotropic voxels; implemented Sobel and custom Prewitt kernels plus Canny edge detection at multiple threshold settings and discussed spatial-frequency interpretation; implemented K-means segmentation of an MRI slice at k=4/8/20 and an inertia-vs-iterations convergence study, with discussion of run-to-run stability; built, trained, and evaluated a baseline RBF-kernel SVM on the Pima diabetes dataset, then ran a 5-fold grid search over C and gamma and compared tuned vs baseline performance.
- **Technologies used:** Python, NumPy, scikit-image (io, feature.canny), OpenCV (cv2.Sobel, cv2.filter2D), SciPy ndimage, Matplotlib, scikit-learn (KMeans, SVC, Pipeline, StandardScaler, GridSearchCV, train_test_split, classification metrics).
- **Scale/scope facts:** 3D MRI volume sliced along all three orthogonal planes; edge detection compared across 3 Canny threshold configurations; K-means run at k=4, 8, and 20 plus a 50-step iteration sweep; SVM trained/evaluated on the Pima Indians Diabetes dataset (67/33 train/test split) — baseline RBF SVM: accuracy 0.736, F1 0.511; grid-search-tuned SVM (best params C=1, gamma=0.01): accuracy 0.740, F1 0.507.
- **Impact/outcomes:** Built broad hands-on grounding across classical image processing (gradient/edge filters, spatial frequency), unsupervised learning (K-means, convergence behaviour, initialization sensitivity), and supervised learning with proper train/test evaluation and hyperparameter tuning via grid search — foundational technique overlap with both COMP3308 and the ML side of your thesis work.
- **Links:** [placeholder — add link when available]
- **Why it might matter for certain roles:** A compact, well-rounded demonstration of core ML/image-processing fundamentals (filters, clustering, classification, tuning, evaluation) in one artifact — good for early-career/graduate roles that probe ML fundamentals rather than research depth.
 
---
 
### ELEC5618 — Mindustry Software Quality & Verification/Validation (Applied QA on an Open-Source Game) (Group Project)
 
- **Company/Context:** University coursework — ELEC5618 (Safety-Critical / Software Quality), University of Sydney. Group project (5 members: you + 4 teammates). Applied to **Mindustry**, a large pre-existing open-source Java real-time-strategy game (you did *not* author the game — you applied software-quality and V&V techniques to its codebase).
- **Dates:** March 2025 – May 2025 (Semester 1, 2025)
- **One-line description:** Performed a full software-quality and verification/validation study on the open-source Mindustry game — producing quality-assurance plans, requirements/use-case specs, formal code inspections, and a suite of testing and reliability analyses (unit/integration testing, cyclomatic-complexity basis-path testing, finite-state-machine testing, and Markov-chain reliability modelling) against real game features.
- **Your role:**
  - Authored the team's **meeting policy** (§2) and the **QA items & mechanism** document (§4) defining how quality was tracked.
  - Wrote a section of the **Software Requirements Specification / use-case** deliverable (§6) and proposed feature improvements (§5).
  - Contributed to the **Fagan formal inspection** template — compliance and non-functional-requirements checklists (§7).
  - Performed **cyclomatic-complexity analysis** (§8): computed the complexity of a `Map.remove`-style method, derived its independent execution paths, and wrote **basis-path JUnit test cases** (one per path) covering each branch.
  - Wrote **bottom-up JUnit test suites** (§9) for core game classes — `MapTest`, `MapsTest`, and `RulesTest` — including mocking of global game state (`Vars`, `Core.settings`) to isolate units under test.
  - Designed a **finite-state-machine model and diagram** for the game's `RepairFieldAbility` and carried out **FSM-based testing** of its state transitions (§10).
  - Built a **Markov-chain reliability analysis** (§11): instrumented `RepairFieldAbility` as a 3-state FSM (waiting / healed / no-target) that logs every state transition to file, then wrote a separate log-parsing **analyser** that counts transitions and computes the empirical transition probabilities between states.
- **Technologies used:** Java, JUnit 5, Gradle, Git/GitHub; software-quality & V&V methods — cyclomatic complexity & CK metrics, basis-path testing, bottom-up integration testing, Fagan inspection, FSM testing, Markov-chain reliability modelling.
- **Scale/scope facts:** 5-person team working inside a large unfamiliar open-source codebase (Mindustry); deliverables spanning ~10 quality-engineering artifacts (meeting policy, QA mechanism, SRS/use-case, Fagan inspection, cyclomatic complexity, bottom-up testing, FSM testing, Markov reliability). Your personal contribution touched every phase from planning through testing and reliability analysis.
- **Impact/outcomes:** Delivered a complete, working test + reliability-analysis toolchain for real game features, including a runnable Markov transition-probability analyser over live gameplay logs.
- **Links:** [placeholder — add repo/demo link if available]
- **Why it might matter for certain roles:** Strong fit for QA / SDET / test-engineering and safety-critical/reliability-focused roles — demonstrates hands-on unit and integration testing (JUnit), structural test design (cyclomatic/basis-path), FSM and Markov-chain reliability modelling, formal code inspection, and the valued skill of working effectively inside a large third-party codebase you didn't write.
 
---
 
### COMP5348 Group Project — Microservices E-Commerce System (Bank, Store, DeliveryCo, Email)
 
- **Company/Context:** University of Sydney coursework, COMP5348, group project, group of 4 (Rui Yan, Rand Halasa, Weikai Xu, Andrei Agnew — all declared equal 100% contribution).
- **Dates:** Semester 2, 2025 (confirmed — consistent with your individual COMP5348 assignments from the same course).
- **One-line description:** As part of a 4-person team, designed and built a microservices-based online store integrating banking, delivery, and email services, using a hybrid synchronous-REST/asynchronous-RabbitMQ communication model, a database-per-service architecture (PostgreSQL), and a layered (controller/service/repository/domain) internal design within each service, with explicit fault-tolerance and graceful-degradation handling for partial service failures.
- **Your role:** Primary focus on the **Store service** and the **Saga/choreography pattern** coordinating the purchase flow across Bank, Store, and DeliveryCo, plus the fault-tolerance scenario for partial delivery-service failure (simulated packet loss).
- **Technologies used:** Java/Spring Boot, PostgreSQL (separate database per service), RabbitMQ (asynchronous messaging with persistent queues), REST APIs, Hibernate/JPA (repository pattern, lazy loading, DTOs), design patterns (Dependency Injection, Repository, DTO, Adapter/Integration, Saga/Choreography).
- **Scale/scope facts:** 4 independent microservices, each with its own database and running on a separate port; hybrid sync/async communication model; documented fault-tolerance behaviour for 4 distinct partial-failure scenarios (bank service outage, RabbitMQ outage, delivery-service partial failure with simulated packet loss, intermittent email-service failures with retry/backoff); ERDs across the Bank, Store, and DeliveryCo services.
- **Impact/outcomes:** Achieved 81% test coverage across the system. Delivered a working microservices e-commerce system with documented graceful-degradation behaviour under partial service failures.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Comprehensive, hands-on demonstration of microservices architecture, distributed fault-tolerance design (Saga pattern, degradation strategies), and quality-attribute trade-off reasoning (portability, scalability, performance) — strong fit for backend, distributed-systems, or software-architecture roles.
 
---
 
### COMP5348 Assignment 1 — Distributed System State, Cloud Cost Optimisation & Concurrency
 
- **Company/Context:** University of Sydney coursework, COMP5348 (Enterprise-Scale Software Development), Semester 2, 2025, solo assignment.
- **Dates:** Due 21 September 2025.
- **One-line description:** A three-part written assignment covering system-state design (resource vs. session state) for a hierarchical task/sub-task project-management platform, a cloud-VM cost/allocation optimisation problem across four pricing tiers, and a written explanation of concurrency-interference conditions beyond simple co-modification.
- **Your role:** Solo — proposed and classified the pieces of system state (resource state, session state, etc.) needed for a Jira-style project-management platform with nested tasks/sub-tasks, managers, team leads, and developers, and described how a developer would query their assigned/overdue tasks; solved a bin-packing-style cost/time optimisation problem allocating 40 Type-A and 80 Type-B compute tasks across 4 cloud VM instance tiers (D2/D4/D8/D16), both for a straightforward allocation and for the lowest-average-cost allocation (with justification); wrote an explanation of why concurrency interference isn't limited to cases where both activities can modify shared data.
- **Technologies used:** Distributed-systems state-management theory, cloud resource-allocation and cost modelling, concurrency theory.
- **Scale/scope facts:** 3-question written assignment; cloud cost-optimisation problem spanning 4 VM instance tiers and 120 total compute tasks.
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Demonstrates distributed-systems state design and quantitative cloud-cost/resource-allocation reasoning — relevant for backend, cloud infrastructure, or systems-design-interview-heavy roles.
 
---
 
### COMP5348 Assignment 2 — RESTful API Design, Transaction Throughput & System Reliability
 
- **Company/Context:** University of Sydney coursework, COMP5348, Semester 2, 2025, solo assignment.
- **Dates:** Due 26 October 2025.
- **One-line description:** A three-part written assignment covering RESTful resource/URI design for an app-store publishing-and-purchasing system, queueing-theory throughput/latency modelling for a mixed query/update database workload, and MTTF/MTTR/availability calculations for a 3-component system and its fully redundant 2-plex version.
- **Your role:** Solo — designed a RESTful resource/URI/HTTP-verb scheme for an app-store system (publishing apps, fetching developer/all/purchased apps, purchasing apps); calculated throughput and latency for a mixed 25%-update/75%-query transaction workload using low-load bounds across varying client counts, then determined the maximum client count supportable under a 2-second average response-time constraint, including a variant where the update-transaction percentage itself scales with client count; computed overall availability, MTTF, and MTTR for a 3-component system, then re-derived these for a fully redundant 2-plex (dual-instance) version of that system.
- **Technologies used:** RESTful API design principles, queueing-theory performance modelling (low-load bounds, throughput/latency analysis), reliability engineering (MTTF/MTTR/availability and redundancy modelling).
- **Scale/scope facts:** 3-question written assignment; full quantitative derivation of throughput/latency bottlenecks (CPU, disk I/O, archival-storage resource) and full availability/MTTF/MTTR modelling for both a single system and a 2-plex redundant system.
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Combines RESTful API design with quantitative performance and reliability-engineering skills (queueing theory, availability math) — relevant for backend, SRE, or systems-design-interview-heavy roles.
 
---
 
### ELEC3609/ELEC9609 Web Application — System Requirements, Design, Implementation & Deployment (Group Project)
 
- **Company/Context:** University of Sydney coursework, ELEC3609/ELEC9609, Lab 03 Group 05, Friday 1pm tutorial. Team of 5: Ishaan Chandra, Eden Cohen, Aerin Sharma, Aviral Singhal, Rand Halasa.
- **Dates:** Semester 2, 2024 (Assignment 2 — System Design Specification — is dated September 2024).
- **One-line description:** As part of a 5-person group, took a web application from concept through to a deployed, secured, and tested Django product across four linked assignments — Assignment 1 (System Requirements Analysis / SRS with wireframes and functional requirements), Assignment 2 (System Design Specification with a 9-entity ERD covering User, Profile, Post, Reply, Resource, Admin, Unit, Authenticator, and Upvote, plus full Django project structure and dependency stack), Assignment 3 (full Django implementation with authentication, RESTful API, and AJAX/CSS/JS frontend), and Assignment 4 (AWS EC2 deployment via Nginx + uWSGI, security hardening, and a backend unit-testing suite). Based on the data model, the product itself is an academic discussion and resource-sharing platform for software engineering students — organised by course "Units," with per-unit posts/replies/upvotes, uploadable "Resources" (e.g. study guides), an admin moderation layer, two-factor login via Google/Microsoft, and OpenAI-API-based content moderation.
- **Your role:** Ideation, and coding both backend and frontend. No standalone product name — the platform is described generically in the SDS as an academic discussion/resource-sharing platform.
- **Technologies used:** Django 4.2 (Python 3.9+), PostgreSQL 13+ (9-entity ERD, Crow's Foot notation, split settings for base/development/production/secrets), AWS EC2 + Nginx (reverse proxy/static files) + uWSGI, Git/GitHub (University Enterprise GitHub), RESTful API design (JSON, full CRUD), AJAX, React 18, custom CSS, JavaScript, Django's built-in auth plus Google/Microsoft OAuth 2FA, OpenAI API (content moderation), AWS S3 + django-storages (file storage), pytest-django + Jest (testing), PEP 8 + ESLint (style), Swagger (API docs).
- **Scale/scope facts:** SRS with wireframes for every functional requirement; SDS with a fully normalised 9-entity ERD including one-to-one (User↔Profile, User↔Authenticator), one-to-many, and many-to-many (Admin↔Post/Reply/Unit) relationships; working Django implementation with a custom (non-default) admin panel, ≥4 RESTful CRUD endpoints, ≥5 authenticated-user-only functions; production deployment on AWS EC2 meeting a defined security checklist (HTTPS/SSL, restricted DB-user permissions, no exposed source/secrets, SSH key-based auth); minimum 90% test coverage target (pytest-django/Jest).
- **Impact/outcomes:** [Not stated — happy to add what functionality shipped, whether deployment/demo went smoothly, or specific outcomes like final test coverage.]
- **Links:** [placeholder]
- **Why it might matter for certain roles:** End-to-end web-application delivery — requirements → design → implementation → cloud deployment → security hardening → testing — in a single project. Strong fit for full-stack or DevOps-adjacent roles, especially where "can you actually ship and secure something in production" matters.
 
---
 
### Comparative Performance of Classification Models on Diabetes and Occupancy Datasets (Pair Project)
 
- **Company/Context:** University of Sydney coursework, COMP3308 (Introduction to Artificial Intelligence), Assignment 2, completed with one partner (name not tracked, consistent with your preference elsewhere).
- **Dates:** Semester 1, 2025 — same semester as "Broken Printer."
- **One-line description:** Implemented Naive Bayes and k-Nearest Neighbour classifiers from scratch (plus a majority-vote ensemble of 1NN/7NN/NB), evaluated via 10-fold stratified cross-validation, and benchmarked them against Weka's ZeroR, 1R, Decision Tree, Random Forest, SVM, and MLP classifiers on the Pima Indian Diabetes dataset and a Room Occupancy sensor dataset.
- **Your role:** You are "Student 1" in the report — led the implementation/coding, including building the custom KNN, Naive Bayes, and ensemble classifiers, and discovering that distance-weighted voting substantially improved the custom KNN classifier's accuracy.
- **Technologies used:** Python (custom-built KNN, Naive Bayes, and ensemble classifiers), Weka (baseline classifiers), 10-fold stratified cross-validation.
- **Scale/scope facts:** Two datasets (768 instances / 8 attributes; 2,025 instances / 4 attributes); custom classifiers benchmarked against 8 additional Weka classifiers per dataset; distance-weighted KNN implementation (1NN and 7NN variants).
- **Impact/outcomes:** Custom Naive Bayes implementation matched Weka's built-in NB within ~0.3% across both datasets; best custom classifier reached 74.48% accuracy on the Diabetes dataset and 99.06% on the Occupancy dataset; distance-weighted KNN tuning was identified as the key lever that most improved custom-classifier accuracy.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Demonstrates first-principles understanding of core ML algorithms (not just library calls) plus disciplined benchmarking practice against an established toolkit — relevant for ML/data-science roles that probe fundamentals in interviews.
 
---
 
### Broken Printer — Multi-Strategy AI Search Solver
 
- **Company/Context:** University of Sydney coursework, COMP3308 (Introduction to Artificial Intelligence), solo.
- **Dates:** March 2025 (Semester 1, 2025).
- **One-line description:** Built a solo Python program that converts a starting k-bit colour into a "legal" colour by treating the problem as a graph-search task over bit-flip operations, implementing and comparing six search strategies — BFS, DFS, IDS, Greedy, A*, and Hill-climbing — under a strict, automatically-graded input/output and tie-breaking specification.
- **Your role:** Solo design and implementation of all six search algorithms sharing a common state-space representation; a Hamming-distance heuristic (smallest distance to any legal colour) used for Greedy, A*, and Hill-climbing; deterministic child-generation ordering (ascending bit-index) and tie-breaking (oldest node expands first); cycle-avoidance during fringe expansion; a 1,000-node expansion cap with defined "SEARCH FAILED" behaviour; and a custom parser for the input file format, including wildcard ("X") expansion for legal/unsafe state patterns.
- **Technologies used:** Python, classical AI search algorithm design (uninformed: BFS/DFS/IDS; informed: Greedy/A*; local search: Hill-climbing), heuristic design (Hamming distance).
- **Scale/scope facts:** Supports arbitrary colour bit-depth (k = 3 to 12, auto-detected from input); 6 distinct search strategies implemented against one shared problem representation; strict automated-grading contract (fixed CLI arguments, fixed two-line output format, defined tie-breaking and node-expansion-limit rules).
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Focused, rigorous demonstration of classical AI search algorithms (uninformed, informed, and local search) implemented to a strict, automatically-verified specification — good evidence for roles with an algorithms/AI-fundamentals interview component.
 
---
 
### Geometry Processing Pipeline — Point Generator & Triangle Searcher
 
- **Company/Context:** University coursework, COMP2017/9017 (Systems Programming), solo assignment (Assignment 1)
- **Dates:** Due 10 March 2024 (Semester 1, 2024)
- **One-line description:** Built a two-program geometry-processing pipeline: a point generator that creates randomized 2D points obeying a minimum-distance constraint, and a program that reads those points and determines the three closest points and whether they form a triangle, with the two programs connected via a Unix pipe.
- **Your role:** Designed and implemented both halves of the pipeline solo, both in C — the generator (command-line argument parsing, constrained random point generation, exit-code-based error handling; note the assignment allowed Java or Python for this part, but you chose to implement it in C as well) and the searcher (custom Euclidean nearest-neighbour/triangle-perimeter search over up to 1,000 points, strict input validation, no dynamic memory or VLAs allowed). Also wrote the Makefile-driven build/test harness and test cases.
- **Technologies used:** C, Makefile, git, gcc
- **Scale/scope facts:** Searcher processes up to 1,000 valid input points; enforces strict formatting/range validation with defined exit codes for each error condition; interoperable output/input contract between the two programs.
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder — add repo link if available]
- **Why it might matter for certain roles:** Good evidence of low-level C programming, defensive input validation, and basic computational geometry — relevant for systems, embedded, or foundational software engineering roles.
 
---
 
### Multi-Type Linked List Data Structure & CLI (C)
 
- **Company/Context:** University coursework, COMP2017/9017 (Systems Programming), solo assignment (Assignment 2)
- **Dates:** Due 28 March 2024 (Semester 1, 2024)
- **One-line description:** Designed and implemented a custom linked-list data structure in C that stores mixed-type elements (int, float, char, string, and nested list references) and built a command-driven program to create, inspect, and mutate these lists via stdin/stdout, including one level of list-within-list nesting.
- **Your role:** Solo design and implementation, completing all three parts of the assignment: basic command syntax (create/view/inspect/remove lists), in-place list mutation (insert/delete at arbitrary or negative indices), and nested lists (one level of list-within-list references, including automatic reversion to a simple list when all references are deleted). Built the value-tagged node type, the full command parser (NEW, VIEW, TYPE, VIEW ALL, REMOVE, INSERT, DELETE, VIEW-NESTED), strict type inference (int → float → char → string ordering), and manual memory management with cleanup on EOF.
- **Technologies used:** C, Makefile, git, valgrind/ASAN (recommended for memory-leak checking)
- **Scale/scope facts:** Supports 4 base element types plus one level of nested-list references; program organized across multiple C source/header files for modularity; full dynamic-memory lifecycle management (create/mutate/free); all three assignment parts completed.
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder — add repo link if available]
- **Why it might matter for certain roles:** Directly demonstrates data structure design and manual memory management in C — strong fit for systems programming, embedded, or backend infra roles that value fundamentals.
 
---
 
### ByteTide — P2P File-Transfer Client with Merkle-Tree Integrity Verification
 
- **Company/Context:** University coursework, COMP2017/9017 (Systems Programming), solo assignment (Assignment 3)
- **Dates:** Due 19 May 2024 (Semester 1, 2024)
- **One-line description:** Built a peer-to-peer file-transfer program in C with no central tracker or relay: peers connect directly, share and verify file "packages" using a custom Merkle-tree-based integrity check, and exchange fixed-size TCP packets under a custom application-layer protocol, all driven by a command-line interface.
- **Your role:** Solo design and implementation of the full assignment, including the optional high-distinction extension: a `.bpkg` package-file parser and a from-scratch Merkle tree used to verify file-chunk integrity and locate the minimal set of completed chunks; a configuration loader (directory/peer-limit/port validation); the custom TCP packet protocol (connect/accept/acknowledge/disconnect/request/response/ping-pong) including peer-list and package-list management; a CLI (CONNECT, DISCONNECT, ADDPACKAGE, REMPACKAGE, PACKAGES, PEERS, FETCH, QUIT) with defined error handling for every command; and the optional multithreaded/parallelized Merkle tree construction with an accompanying performance benchmark and report.
- **Technologies used:** C, TCP/IP sockets, multithreading/concurrency, SHA-256 hashing, Makefile, git
- **Scale/scope facts:** Fixed 4096-byte network packets; configurable peer limit up to 2,048 connections; Merkle tree integrity verification down to individual file chunks; includes the optional parallelized Merkle tree construction + benchmarking component (highest-tier extension).
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder — add repo link if available]
- **Why it might matter for certain roles:** Excellent fit for backend/distributed-systems/networking roles — covers custom network protocol design, concurrency, and data-integrity structures conceptually similar to those used in BitTorrent/blockchain-style systems.
 
---
 
### SOFT3202 — Software Testing Toolchain: Coverage Analysis, Fuzzing & Grammar-Based Test Generation (+ Quizzes)
 
- **Company/Context:** University of Sydney coursework, SOFT3202 ("Software Construction and Design 2"), solo. Includes the main assignment plus two smaller unit quizzes (Quiz 1 and Quiz 2) from the same course.
- **Dates:** Main assignment due 12 May 2024 (Semester 1, 2024); Quiz 1 and Quiz 2 both May 2024.
- **One-line description:** Built a suite of Python-based software testing tools for a software testing/construction unit — a statement/branch coverage analyser, a mutation-based fuzzer, and a grammar-based fuzzer — plus two related quizzes: a regular-expression-to-grammar converter, and a property/contract-based test suite (using `hypothesis` and `icontract`) for a small JSON library.
- **Your role:**
  - *Part 1 (Coverage):* Built `coverage.py` — took a target Python program plus a directory of `.in` test-input files, executed them, and reported statement coverage (count of statements executed) and branch coverage (count of intra-procedural branches/paths covered).
  - *Part 2 (Mutation Fuzzing) — implemented for practice:* Built `mutation_fuzzer.py` — mutated an initial set of text inputs against a target program, kept mutations that increased branch coverage, and iteratively grew a "population" of effective test inputs, writing the final maximised-coverage set back to the input file.
  - *Part 3 (Grammar-Based Fuzzing) — implemented for practice:* Built `grammar_fuzzer.py` — parsed a grammar specification (given as a Python variable) and generated a caller-specified number of structured input strings designed to exercise as many grammar rules/paths as possible and hit or exceed a branch-coverage threshold. (SOFT3202 only counts the higher-scoring of Parts 2/3, but you built both.)
  - *Quiz 1 ("Reggie" — regex-to-grammar converter):* Built `reggie.py` — read a single regular expression from stdin (supporting union, Kleene star, concatenation, and epsilon via `\`) and converted it into an equivalent grammar, serialising the alphabet and a production-rule dictionary (non-terminals in `<>` notation, starting at `<S>`) to a pickle file for automated grading.
  - *Quiz 2 (tinyJSON property-based testing):* Using `hypothesis` and `icontract`, wrote properties (general behavioural invariants checked against generated inputs) and contracts (pre/postconditions) for a provided JSON parsing/manipulation library ("tinyJSON"), aimed at maximising the statement-coverage achieved by the test suite.
- **Technologies used:** Python 3, `hypothesis` (property-based testing), `icontract` (design-by-contract), `pickle`, control-flow/coverage analysis, fuzzing (mutation-based and grammar-based), formal language theory (regex-to-grammar conversion). No external/pip-installed libraries permitted for the main assignment, per unit rules.
- **Scale/scope facts:** 3-part testing toolchain (coverage analysis, mutation fuzzing, grammar-based fuzzing) built entirely without external libraries; grammar fuzzer generates a caller-specified number of structured test strings per run; Quiz 1 converts arbitrary valid regexes (union, Kleene star, concatenation, epsilon) into a pickled formal grammar; Quiz 2 is a coverage-graded property/contract suite against a provided JSON library.
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder — add repo link if available]
- **Why it might matter for certain roles:** Fairly rare, focused evidence of software-testing engineering — white-box coverage analysis, fuzzing (mutation + grammar-based), and property/contract-based testing — directly relevant for SDET/QA engineering, test infrastructure, or security-adjacent roles (fuzzing is a core vulnerability-research technique); also shows formal-language/automata theory applied practically (regex-to-grammar).
 
---
 
### The Ecology of Harm — Socio-Economic & Environmental Predictors of Domestic Violence Assault Rates Across NSW LGAs
 
- **Company/Context:** Independent university research project, DATA4207, solo
- **Dates:** March – June 2026 (Semester 1, 2026).
- **One-line description:** An independent quantitative research project testing which socio-economic and environmental factors (income, unemployment, education, alcohol outlet density, remoteness) best predict domestic-violence-related assault rates across 129 NSW Local Government Areas, grounded in Social Disorganization Theory and the ecological model of violence.
- **Your role:** Solely designed the research questions and five directional hypotheses; sourced, cleaned, and merged three separate public datasets (BOCSAR crime statistics, ABS 2021 Census DataPacks, and Liquor & Gaming NSW licensing records) at the LGA level; performed the full statistical analysis (log-transform of a skewed outcome, OLS multiple regression, VIF multicollinearity checks, Breusch–Pagan heteroskedasticity test, HC3 robust standard errors); and authored the full written report including all figures and tables.
- **Technologies used:** R (regression modelling and diagnostics), statistical methods (OLS regression, VIF, Breusch–Pagan test, robust standard errors), data cleaning/reshaping/merging across multiple public data sources
- **Scale/scope facts:** Integrated 3 public datasets across 129 NSW LGAs; fitted a 6-predictor regression model; final model adjusted R² = 0.743, F(6,122) = 62.6, p < 0.001.
- **Impact/outcomes:** Model explained ~74% of cross-LGA variance in domestic violence assault rates; identified unemployment (+13.8% per percentage point) and educational attainment (−2.1% per percentage point) as the most robust, statistically significant predictors, net of other socio-economic and ecological factors.
- **Links:** [placeholder — add report/repo link if available]
- **Why it might matter for certain roles:** Strong fit for data analyst/data scientist roles emphasizing applied statistics, regression modelling, and working with real, messy public datasets; also demonstrates independent research design and social-impact/policy-relevant analysis.
 
---
 
### DATA4207 — Group Project 1: Quality of Life Factor Analysis & Regression (Group Project, 5 people)
 
- **Company/Context:** University of Sydney, DATA4207 (Data Analysis in the Social Sciences), postgraduate coursework unit — "Group 27". Assessable Group Task 1, completed across Lab 7 (theory + variable selection) and Lab 8 (factor analysis + regression + write-up). Group of 5, each member owning a different predictor/aspect of quality of life. (Note: same unit code, DATA4207, as "The Ecology of Harm" and Group Project 2 — a different project, same unit.)
- **Dates:** April 2026.
- **One-line description:** A group project constructing a quality-of-life measure for Australian survey respondents via factor analysis, then testing five theory-driven hypotheses about the drivers of quality of life using descriptive statistics, ANOVA, and linear regression on the 2018 Australian World Values Survey (WVS), with explicit reliability (Cronbach's alpha) and validity checks on the derived measure.
- **Your role:** One of 5 team members, each owning a different predictor. Your predictor was **sport and recreational organisation membership** — the physical-activity / social-participation strand, grounded in social capital theory (Putnam) — covering the theory, recoding, descriptive statistics, ANOVA, and regression for that variable within the shared model. (The dependent variable, quality of life, was a latent factor score built from five WVS items: happiness, health, freedom, life satisfaction, and financial satisfaction.)
- **Technologies used:** R, tidyverse, psych (factor analysis + Cronbach's alpha reliability), ggpubr (descriptive statistics/`get_summary_stats()`), ANOVA, OLS regression (individual + multivariate), R Markdown (RMD) for analysis and write-up.
- **Scale/scope facts:** ~1,813 respondents (2018 Australian WVS); quality-of-life outcome derived via single-factor analysis of 5 items (factor explained ~49% of variance; loadings 0.52–0.93; life satisfaction the strongest indicator); 5 predictors selected and justified against a group-developed theory; your sport-membership variable had n = 1,789 valid responses across three categories (non-member / inactive / active).
- **Impact/outcomes:** Your hypothesis held up. Sport and recreational organisation membership showed a clear monotonic gradient in quality of life — non-members lowest, inactive members in the middle, active members highest — with the ANOVA significant at conventional thresholds, and the predictor remained positive and statistically significant in the full multivariate model (i.e. not explained away by the other four predictors). Across the whole study, food security and psychological security were the strongest predictors, sport membership a robust positive contributor, family importance positive but weakened by a ceiling effect, and residential location the weakest (not robust once other predictors were controlled).
- **Links:** [placeholder — add repo/RMD/report link when available]
- **Why it might matter for certain roles:** Evidence of applied quantitative social-science skills — factor analysis, survey data cleaning, and regression modelling with a strong emphasis on justifying methodological choices and testing measurement validity. Good complement to your ML/pipeline-heavier entries — shows the "classical statistics on messy survey data" side of the skill set.
 
---
 
### DATA4207 — Group Project 2: Spatial Analysis of the US Opiate Prescription Crisis (Group Project, 5 people)
 
- **Company/Context:** University of Sydney, DATA4207, Group Project 2 (worth 8% of total unit marks) — "Group 27", same group of 5 as Group Project 1. (Note: same unit code, DATA4207, as "The Ecology of Harm" and Group Project 1 — a different project, same unit.)
- **Dates:** April 2026 (same team and period as Group Project 1).
- **One-line description:** A group project testing whether opiate prescription rates and poverty predict county-level mortality from drugs and alcohol across the United States — framed against the "deaths of despair" (Case & Deaton) and supply-side (Quinones; Alpert et al.) theses — combining US Census Bureau poverty data, CDC mortality data (1999–2016), CDC/CMS opioid prescribing rates, and county shapefiles, with nested OLS regression, robustness checks, spatial-autocorrelation testing, and choropleth maps.
- **Your role:** Owned the **regression modelling** and a substantial share of the **report writing** for the group.
- **Technologies used:** R, tidyverse (`dplyr` rename/mutate/select, merge/join workflows), `sf` (spatial data handling), `spdep` (Moran's I spatial autocorrelation), `lmtest` + `sandwich` (HC3 robust standard errors), `broom`, US county-level shapefiles (`cb_2016_us_county_20m`), FIPS-code concordance matching across mismatched county identifiers, z-score standardisation, choropleth mapping (viridis/magma), OLS regression.
- **Scale/scope facts:** Multi-source county-level data merge — ACS poverty data (~3,142 counties, 603 variables pre-selection), CDC drug/alcohol mortality data (~2,934 counties), and opioid prescribing-rate data, joined via recoded FIPS/county-name keys after resolving naming mismatches (including hand-fixes like Doña Ana, LaSalle, Oglala Lakota); four nested regression models built; report structured as Introduction, Theory, Data and Methods, Results, Discussion and Limitations, Conclusion.
- **Your regression approach (and why):** Used **nested Ordinary Least Squares (OLS)** because the outcome (drug/alcohol mortality per 100,000) is a continuous, approximately interval-scaled county-level rate, and the analysis is descriptive/explanatory rather than individual-level risk modelling. Four specifications: (1) poverty only; (2) poverty + 2016 prescribing rate; (3) the joint model on a **log-transformed** outcome with **z-scored predictors** (so coefficients read as ~% change in mortality per one-SD increase and are directly comparable); (4) the log/standardised model extended with unemployment-rate and rurality controls. Reported **HC3 robust standard errors** as a heteroskedasticity sensitivity check, and tested residuals for spatial autocorrelation with **Moran's I**.
- **Impact/outcomes:** Both hypotheses were supported: poverty and the 2016 opioid prescribing rate were each positive and highly statistically significant predictors of county mortality, individually and jointly, and remained significant under HC3 robust standard errors and after adding controls — consistent with the deaths-of-despair and supply-side mechanisms operating together rather than as alternatives. The two predictors were only modestly correlated, so each retained explanatory power in the joint model. The choropleth maps showed the highest-risk counties clustering sharply in central Appalachia (eastern Kentucky, West Virginia, southwestern Virginia), pockets of the industrial Midwest, and the desert Southwest, while prescribing had a partly overlapping but not identical geography (some Deep South counties were heavy prescribers without correspondingly elevated mortality — i.e. prescribing appears necessary but not sufficient). Moran's I confirmed significant positive spatial autocorrelation in the model residuals, indicating unmeasured local factors and flagging a spatial-error/spatial-lag model as the natural next step.
- **Links:** [placeholder — add repo/RMD/report link when available]
- **Why it might matter for certain roles:** Evidence of geospatial data analysis (shapefile joins, choropleth mapping) and multi-source data wrangling with mismatched keys and messy government data — a nice complement to your MRI pipeline entry, showing the same "gets messy real-world data pipeline-ready" skill applied to public-health/social data instead of biomedical imaging.
 
---
 
### INFO3616 Assignment 1 — Security Goals, Social Engineering & Access Control
 
- **Company/Context:** University of Sydney coursework, INFO3616 ("Cyber Security" style unit; also offered as CSEC3616/CSEC5616), solo assignment.
- **Dates:** Due Sunday, 1 September 2024 (Semester 2, 2024).
- **One-line description:** A four-part security assignment covering: analysis of the specific security goal compromised in 10 well-known real-world incidents (e.g. SolarWinds, Colonial Pipeline, Optus, Stuxnet, Poly Network); a social-engineering/vishing case-study analysis; a hands-on OSINT-and-password-guessing exercise against a fictitious social media profile; and access-control questions spanning authentication/authorisation theory, the Bell-LaPadula and Biba security policy models, and hands-on Linux access control (users/groups/permissions, `find`, SUID-bit vulnerabilities) on a provided Azure VM.
- **Your role:** Solo — analysed 10 historical security incidents to identify the specific compromised security goal (confidentiality, integrity, availability, authenticity, non-repudiation, etc.) and justify the reasoning for each; answered social-engineering questions identifying cognitive biases exploited in a vishing scenario and recommended mitigations; wrote a Python program that generates candidate password combinations from OSINT-derived keywords and programmatically attempts to unzip a target file; answered access-control theory and Bell-LaPadula/Biba security-policy-model questions against a given user/object clearance table; and completed hands-on Linux access-control tasks on an Azure VM (user/group lookups, permission-aware `find` usage, and demonstrating a SUID-bit privilege-escalation vulnerability).
- **Technologies used:** Python (password-combination generation, automated zip-cracking), Linux/Azure VM administration (`find`, permissions, SUID bits, `whoami`), security policy models (Bell-LaPadula, Biba), OSINT reconnaissance.
- **Scale/scope facts:** 10 distinct real-world incident case studies analysed; hands-on privilege-escalation demonstration via a SUID-bit vulnerability on a live VM; custom password-list-generation and zip-cracking tool.
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Broad, practical security-fundamentals evidence spanning incident analysis, social engineering awareness, OSINT, access-control theory, and hands-on Linux privilege escalation — relevant for security analyst, GRC, or security-engineering-adjacent roles.
 
---
 
### INFO3616 Assignment 2 — Classical & Modern Cryptography
 
- **Company/Context:** University of Sydney coursework, INFO3616, solo assignment, covering weeks 4–6.
- **Dates:** Due Sunday, 22 September 2024 (Semester 2, 2024).
- **One-line description:** A cryptography-focused assignment covering breaking a Vigenère cipher via Kasiski-style cryptanalysis, working through a CBC-CTS (cipher block chaining with ciphertext stealing) worked example, performing RSA key-generation/decryption-exponent calculations via the Extended Euclidean Algorithm, breaking a deliberately weak RSA setup using Fermat's Factorization, and analysing message authentication code (MAC) constructions and authenticated-encryption schemes.
- **Your role:** Solo — wrote original code (no online decryption tools) to cryptanalyse and break a given Vigenère ciphertext using ideas from the Kasiski Test to recover an unknown random key (<20 capital letters) and the original plaintext; manually computed a CBC-CTS worked example (4-bit blocks) including the intermediate XOR/encryption steps and final ciphertext; computed an RSA private key `d` via the Extended Euclidean Algorithm (filling in a step-by-step gcd/coefficient table) and performed modular-exponentiation encryption/decryption verification; wrote a program using `gmpy2` to factor an RSA modulus via Fermat's Factorization (since `p` and `q` were close together), derived φ(n) and the private key, decrypted a given ciphertext, and converted the recovered integer to readable ASCII plaintext; and answered MAC-vs-hash theory questions, including impersonation/replacement-attack probability calculations and the ordering of encryption vs. verification across four authenticated-encryption schemes.
- **Technologies used:** Python, `gmpy2` (arbitrary-precision integer arithmetic), classical cryptanalysis (Kasiski Test / frequency analysis), RSA (key generation, Extended Euclidean Algorithm, Fermat's Factorization attack), block cipher modes (CBC, CBC-CTS), message authentication code theory.
- **Scale/scope facts:** Recovered a full unknown Vigenère key (<20 characters) and meaningful plaintext from ciphertext alone; broke a real, poorly-configured RSA instance via Fermat's Factorization to recover a 20-character (160-bit) ASCII plaintext message; produced a full worked RSA key-generation table via the Extended Euclidean Algorithm.
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Strong applied cryptography evidence — classical cryptanalysis, RSA internals and a real attack technique (Fermat's Factorization), and block-cipher-mode mechanics — relevant for security engineering, applied cryptography, or roles with a security-fundamentals technical interview component.
 
---
 
### INFO3616 Assignment 3 — PKI/TLS, Key Exchange Protocols, IPSec & Firewalls
 
- **Company/Context:** University of Sydney coursework, INFO3616, solo assignment, covering weeks 7–9.
- **Dates:** Due Sunday, 20 October 2024 (Semester 2, 2024).
- **One-line description:** A network-security assignment covering inspection of a real X.509 certificate chain and TLS handshake via Wireshark packet captures, building a custom three-level (Root/Intermediate/End) X.509 certificate chain with OpenSSL, analysing and attacking a custom session-key-exchange protocol (including a reflection-based person-in-the-middle attack and a fix), IPSec AH/ESP/transport-vs-tunnel concepts and a Security Policy Database walkthrough, designing both stateful and stateless firewall rule sets for a given network topology, and a written case-study analysis of the 2022 Optus data breach.
- **Your role:** Solo — used `openssl` to inspect a provided full certificate chain and fill in issuer/subject details for each of 3 certificates; analysed two Wireshark TLS packet captures to identify IP addresses, explain the initial handshake packets, diagram the TLS handshake, identify the agreed cipher suite and its constituent cryptographic schemes (key exchange, authentication, encryption, MAC), and export/inspect the server's certificate chain from the capture; explained why a second, later-TLS-style capture didn't expose the server certificate in plaintext; built and submitted my own 3-level certificate chain (Root/Intermediate/End) via a sequence of OpenSSL commands, using my student ID in the Common Names; analysed a shared-key session-establishment protocol to explain the freshness/mutual-belief reasoning behind it, demonstrated a reflection attack allowing an adversary to impersonate the correspondent, and proposed a protocol fix; explained IPSec's AH vs. ESP modes and transport vs. tunnel modes, and interpreted every rule in a given Security Policy Database (SPD) table; designed both a stateful and an equivalent stateless firewall rule set (minimising rule count) enforcing a given outbound/inbound policy on a router serving an internal /16 network; and researched and wrote a structured analysis of the Optus data breach (attack vector, data exposed, Optus's technical/legal/PR response, and downstream risk to affected users).
- **Technologies used:** OpenSSL (certificate chain inspection and generation, X.509), Wireshark (TLS/packet capture analysis), TLS/PKI concepts (cipher suites, key exchange, Diffie-Hellman), IPSec (AH, ESP, transport/tunnel mode, SPD), stateful and stateless firewall rule design, protocol/security analysis (reflection attacks on key-exchange protocols).
- **Scale/scope facts:** Built and submitted a real, working 3-level OpenSSL certificate chain; analysed two full TLS handshakes captured live off a university homepage; produced both stateful and stateless firewall rule sets (minimal rule count) for a router serving a /16 internal network with defined inbound/outbound policies; full written incident analysis of a major real-world breach (Optus).
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder — add the generated certificate-chain artefact if available]
- **Why it might matter for certain roles:** Directly relevant to network/security-engineering roles — hands-on PKI/TLS, protocol-attack analysis, IPSec, and firewall design are all core skills for security engineering, network engineering, or SOC/security-operations-adjacent roles.
 
---
 
### ELEC3506 Communication Networks — Protocol Analysis Lab Series (Group Project)
 
- **Company/Context:** University of Sydney coursework, ELEC3506 ("Communication Networks"), group of 3 (you — Rand Halasa; plus Zhenyu Zhang and Tian Liang), equal 33% contribution declared across all lab reports.
- **Dates:** Semester 2, 2024 (packet captures/lab work dated September–October 2024).
- **One-line description:** As part of a 3-person team, completed a series of hands-on Wireshark/packet-capture lab reports progressively covering the core Internet protocol stack — ICMP and IP (including fragmentation), TCP (handshakes, RTT/congestion-control analysis, throughput), HTTP (GET/conditional-GET, embedded objects, authentication), and DHCP/DNS (lease lifecycle, query/response analysis) — each culminating in a written report analysing live captured traffic.
- **Your role:** Contributed equally with 2 teammates across all lab reports (33% contribution declared on each). Work included: capturing and analysing ICMP ping/traceroute exchanges and IP header fields (TTL, identification, fragmentation), including writing a custom Python UDP "ping" probe script; analysing TCP three-way handshakes, sequence/ACK numbers, estimated-RTT calculations, segment lengths, receiver buffer/flow-control behaviour, throughput calculations, and identifying slow-start vs. congestion-avoidance phases from a TCP flow graph; analysing HTTP GET/response and conditional-GET (If-Modified-Since/304) interactions, multi-segment long-document transfers, HTML pages with embedded objects, and HTTP Basic Authentication; and capturing/analysing a full DHCP lease lifecycle (Discover/Offer/Request/ACK/Release, transaction IDs, lease time, relay-agent field, ARP conflict-checking) and DNS query/response behaviour (record types, authoritative vs. non-authoritative answers, TCP handoff after DNS resolution).
- **Technologies used:** Wireshark (packet capture and protocol analysis), Python (custom UDP probe script), core networking protocols (ICMP, IP, TCP, UDP, HTTP, DHCP, DNS), command-line network tools (`ping`, `tracert`/`traceroute`, `ipconfig`/`nslookup`).
- **Scale/scope facts:** Covered 4 major protocol layers/areas across the lab series (ICMP/IP, TCP, HTTP, DHCP/DNS); analysed real live captures including multi-hop traceroutes crossing international links, multi-segment TCP transfers, and full DHCP lease/DNS resolution chains; group of 3 with equal (33%/33%/33%) declared contribution throughout.
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Strong, hands-on evidence of practical networking fundamentals and protocol-analysis skills (Wireshark, TCP/IP stack behaviour, DNS/DHCP internals) — relevant for network engineering, SRE/infrastructure, or roles with a networking-fundamentals component.
 
---
 
### ISYS2110/COMP9110 — NeighbourLink Car-Sharing Web Information System (Group Project)
 
- **Company/Context:** University of Sydney coursework, ISYS2110/COMP9110 ("Analysis and Design of Web Info System"), group project, group of 4. All members contributed across all work areas rather than splitting into fixed individual work-streams.
- **Dates:** February 2024 – May 2024 (Semester 1, 2024) — project released Week 3, oral presentation/interim milestone Week 9, final submission Week 12.
- **One-line description:** As part of a 4-person group, studied, researched, analysed, and designed a web-based car-sharing information system ("NeighbourLink") connecting drivers and riders around ride details, seat availability, vehicle type, accessibility features, and flexible petrol-contribution schemes, culminating in a requirements report, use case modelling, a working web prototype, and a sponsor-pitch video.
- **Your role:** Contributed across all areas of the project alongside the other 3 group members — requirements elicitation, use case/diagram modelling, prototype build, report writing, and video — rather than a single fixed work-stream.
- **Technologies used:** Web prototyping (site skeleton/CSS, navigation, sitemap), UML use case diagramming, requirements-elicitation methods (survey-based fact-finding), video production for a stakeholder pitch.
- **Scale/scope facts:** Group of 4; report included a minimum of 8 functional and 6 non-functional requirements, a 10+ respondent survey, and at least 3 fully worked use cases plus a use case diagram; final deliverables included a live web-based prototype (skeleton site, consistent CSS, navigation, sitemap) and a 5-minute sponsor-pitch video.
- **Impact/outcomes:** [Not provided — happy to add specific outcomes, e.g. survey findings or prototype feature set, if you'd like them included.]
- **Links:** [placeholder — add repo/prototype link if available]
- **Why it might matter for certain roles:** Demonstrates end-to-end requirements analysis and web system design in a group setting — from fact-finding/survey work through use-case modelling to a working prototype and stakeholder-facing pitch video — relevant for business-analyst, product, or full-stack roles involving requirements work.
 
---
 
### ISYS2110/COMP9110 UML Assignment — SuperFit Club Membership System
 
- **Company/Context:** University of Sydney coursework, ISYS2110/COMP9110, individual assessment (covering weeks 4–6 content), same semester as the NeighbourLink project above.
- **Dates:** Semester 1, 2024 (exact due date not stated).
- **One-line description:** Produced a full UML analysis and design package for a fictional gym membership system ("SuperFit Club") featuring flexible/conditional membership pricing, manager-driven renewal-rate overrides, usage reporting, and behaviour-based renewal/retention outreach.
- **Your role:** Solo — completed all parts of the assessment: a use case diagram; two activity diagrams (new member joining, and membership renewal including fee calculation); CRC (Class-Responsibility-Collaborator) cards for Member, Membership, and Club Visit; a structural (class) model; a sequence diagram for the Expired Member Renewal & Payment Process; a CRUDE (Create/Read/Update/Delete/Execute) analysis of object interactivity; and a behavioural state machine depicting a member's membership lifecycle — explicitly documenting assumptions throughout.
- **Technologies used:** UML modelling (use case, activity, class/structural, sequence, and state machine diagrams), CRC card design, CRUDE analysis.
- **Scale/scope facts:** Full-breadth UML deliverable spanning 7 distinct modelling techniques/diagram types for a single domain (use case diagram + activity diagrams, two activity diagrams, CRC cards, structural model, sequence diagram, CRUDE analysis, state machine).
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Broad, single-assessment demonstration of UML fluency across nearly every standard diagram type — relevant for roles emphasizing systems analysis, software design documentation, or business analysis.
 
---
 
### Space Invaders Game — UML Design, GoF-Pattern Implementation & Codebase Extension
 
- **Company/Context:** University coursework, SOFT2201 — three linked assignments (Assignment 1: UML design; Assignment 2: full Java implementation; Assignment 3: extension of a separate, pre-existing codebase not authored by you). Solo.
- **Dates:** September – November 2023 (Semester 2, 2023).
- **One-line description:** Modeled, built, and later extended a Java clone of the classic Space Invaders arcade game, moving from UML design (use case, sequence, and class diagrams) through a full implementation using object-oriented design patterns, to extending a completely different provided codebase with new features and different design patterns without breaking its existing structure.
- **Your role:**
  - *A1:* Authored a use case description + diagram, a sequence diagram, and a class diagram for the game, with a written rationale for design decisions grounded in OO theory (abstraction, encapsulation, inheritance, polymorphism).
  - *A2:* Implemented the entire game in Java from your own A1 design, driven by a JSON configuration file (board/bunker size and position, spaceship colour/position/speed/lives, enemy positions and projectile strategies). Required to apply the Factory Method (projectile creation), State (bunker damage/colour), Builder (enemy and bunker creation), and Strategy (enemy projectile behaviour) patterns.
  - *A3:* Took over a separate, pre-existing implementation (not your own A2 code) and extended it with three new features — selectable difficulty levels, an updating time/score display, and undo + two cheat operations — each implemented with at least one GoF pattern not already used in A2. Also wrote a code review of the given codebase (OOP/design principles, design patterns, documentation) and a report justifying your extensions against SOLID/GRASP.
- **Technologies used:** Java, JSON (configuration files), Gradle, UML modelling (use case/sequence/class diagrams), GoF design patterns (Factory Method, State, Builder, Strategy, plus 3+ additional patterns in A3)
- **Scale/scope facts:** Config-driven across 3 difficulty levels (easy/normal/hard); implementation spans at least 7 distinct GoF design patterns across A2 and A3 combined; A3 required working inside an unfamiliar codebase authored by someone else without breaking existing functionality.
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder — add repo/demo link if available]
- **Why it might matter for certain roles:** Strong evidence of applied OOP and design-pattern fluency (Java), plus the less common and often-valued skill of extending an unfamiliar third-party codebase without a rewrite — relevant for roles emphasizing software design, maintainability, or working in existing large codebases.
 
---
 
### SOFT2412 — Virtual Scroll Access System (VSAS) — Scrum Team Project
 
- **Company/Context:** University coursework, SOFT2412, group project run as a Scrum team
- **Dates:** August 2023 — 4-week project: a prep "Sprint 0" plus 3 one-week development sprints (weeks 9–12), individual oral quiz in week 13
- **One-line description:** As part of a Scrum team, built a Java file-sharing/digital-repository application ("Virtual Scroll Access System") with tiered user accounts (guest/registered/admin), hashed-password authentication, and file upload/download/search/preview functionality, using full Agile CI/CD tooling (Git/GitHub, Gradle, JUnit, Jenkins) across 3 sprints for a simulated client (the course tutor).
- **Your role:** Rotated through all three Scrum roles (Product Owner, Scrum Master, and Core Team member) across the project's sprints as the team rotated responsibilities, contributing to development throughout every sprint.
- **Technologies used:** Java, Gradle, JUnit, Jenkins (polling-triggered CI/CD), Git/GitHub (with tagged sprint releases), password hashing
- **Scale/scope facts:** 3 development sprints plus a prep sprint; required >75% unit-test code coverage; 3 distinct user account tiers with hashed-password authentication; sprint-by-sprint live client demos with tagged GitHub releases per sprint.
- **Impact/outcomes:** [Not provided — let me know client feedback or your completed feature set if you'd like it included.]
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Strong evidence of Agile/Scrum process experience across all Scrum roles (not just one), plus CI/CD tooling (Jenkins, JUnit, Git) in a team-delivery setting against evolving client requirements — relevant for roles emphasizing Agile teamwork or DevOps-adjacent practices.
 
---
 
### INFO1113/COMP9003 — Java Chess Variant with AI Opponent (Processing Library)
 
- **Company/Context:** University of Sydney coursework, INFO1113/COMP9003, solo assignment
- **Dates:** Due 14 May 2023 (Semester 1, 2023)
- **One-line description:** Built a 14×14 chess-variant game in Java using the Processing graphics library — full legal-move generation for 10 piece types (including non-standard pieces like Archbishop, Camel, Amazon, Chancellor), check/checkmate/pin detection, special moves (castling, pawn double-move, promotion), per-player timers, and a rule-based computer AI opponent.
- **Your role:** Solo design and implementation of the full game: board rendering and JSON-driven configuration (piece layout, time controls, movement speed), mouse-driven piece selection/movement with smooth animated transitions, a from-scratch check/checkmate/pin detection engine, and a heuristic AI (capture-value evaluation, safe-square preference, king-attack prioritization, checkmate-seeking). For the optional extension, implemented sound effects.
- **Technologies used:** Java, Processing (`processing.core`, `processing.data`), Gradle, JSON config, JUnit, Jacoco (code coverage)
- **Scale/scope facts:** 14×14 board (vs. standard 8×8) with 10 distinct piece types, each with unique movement rules; required >90% automated-test code coverage (measured via Jacoco); full check/pin/checkmate logic and AI built from scratch, not from a chess library; sound-effects extension added on top of the core requirements.
- **Impact/outcomes:** [Not provided — happy to add your achieved test coverage % if you'd like.]
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Strong demonstration of rules-engine/game-logic design, 2D graphics + audio programming, and rigorous automated testing in Java — relevant for game development, backend logic-heavy roles, or roles with an algorithmic-interview component.
 
---
 
### Personalized Gym Workout Program (gym.py)
 
- **Company/Context:** University of Sydney coursework, INFO1110, solo assignment (worth 5% of final grade)
- **Dates:** September – October 2022.
- **One-line description:** Built a command-line Python program that interviews a gym member (name, age, sex, fitness goal, training days/week) and generates a personalized weekly workout plan by alternating between goal-based and demographic-based exercise categories, with age-based intensity scaling for older members.
- **Your role:** Solo design and implementation of regex-based/range-checked input validation with retry-until-valid loops across 5 input fields; the day-by-day workout-assignment algorithm alternating between goal and demographic categories; and a 4-tier, age-based intensity-reduction formula (thresholds at 60/65/75/80 years) using `math.ceil()` rounding.
- **Technologies used:** Python 3.10
- **Scale/scope facts:** 10 predefined workout categories; 4-tier age-based intensity-reduction formula; full input-validation/error-loop handling across 5 separate fields; graded via automated public/hidden/private test cases.
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Demonstrates clean input validation, business-rule implementation, and defensive programming in Python — relevant for junior backend/software engineering roles.
 
---
 
### Chat Forum Moderator Program (moderator.py + test.py)
 
- **Company/Context:** University of Sydney coursework, INFO1110, solo assignment (worth 5% of final grade)
- **Dates:** October – November 2022.
- **One-line description:** Built a multi-mode command-line moderation tool for a text-based forum: it validates and parses custom forum/people/banned-word file formats, ranks users by a personality score, detects and censors banned words with punctuation-aware word-boundary matching, and computes dynamic personality-score adjustments from posting behaviour (engagement, expressiveness, offensiveness). Also wrote a black-box unit test suite for two core validation functions, designed to distinguish a correct implementation from deliberately buggy ones.
- **Your role:** Solo design and implementation across all parts: prioritized command-line argument validation and error reporting; strict, line-numbered file-format validators for forum/people/words files (including chronological-order validation across nested, tab-indented reply threads); a case-insensitive, punctuation-aware banned-word censor; and a `User` class modelling engagement/expressiveness/offensiveness that computes an engagement-capped personality score from message content. Also authored a black-box test suite (`test.py`) for `is_valid_name()` and `is_chronological()`.
- **Technologies used:** Python 3.10, black-box testing methodology, custom file-format parsing
- **Scale/scope facts:** Handles 3 distinct custom file formats with line-numbered error reporting; supports nested (tab-indented) reply threads with chronological-order validation; 4 program modes (`rank_people`, `validate_forum`, `censor_forum`, `evaluate_forum`).
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Strong evidence of parser/validator design and black-box test design (correct vs. buggy implementations) — relevant for backend, developer-tooling, or QA-adjacent roles.
 
---
 
### COMP2123 — Algorithms & Data Structures Assignments (1–5)
 
- **Company/Context:** University of Sydney coursework, COMP2123, solo assignments, Semester 1 2023
- **Dates:** February 2023 – May 2023 (Assignment 1 due 24 Mar 2023; Assignment 2 "Traversing Unordered Trees" due ~April 2023; Assignment 3 due 28 Apr 2023; Assignment 4 due 15 May 2023; Assignment 5 implementation task)
- **One-line description:** A series of five algorithms assignments spanning asymptotic algorithm analysis, custom O(1)-query data-structure design, a custom tree data structure supporting master-order traversal, graph algorithms and correctness proofs, and a divide-and-conquer geometric algorithm (interval/rectangle-union merging) implemented against provided scaffolds.
- **Your role:** Solo design, proof-writing, and implementation throughout. Specific work included:
  - *A1:* Asymptotic running-time analysis of a windowed-sum algorithm; designed a queue supporting an O(1) alternating-sum ("seeSaw") query and a colour-aware stack supporting O(1) longest-monochromatic-run queries, both in O(n) space.
  - *A2 — "Traversing Unordered Trees":* Implemented a custom unordered-tree data structure in Python (list-only, no dictionaries permitted) with `add_child()` and `min_pre_order_rank()` running in O(1) time, a `pre_order(M)` traversal parameterized by an arbitrary master order over all nodes running in O(n²) or better, and an `attach()` subtree-merge operation running in O(|T|) time.
  - *A3:* Designed a two-pointer "pinning pair" data structure over k sorted arrays supporting O(log k) navigation; proved correctness (or found a counterexample) for a binary-search-tree-verification algorithm; designed an O(n+m) graph algorithm to compute a vertex's "risk factor" (impact on graph connectivity if removed).
  - *A4:* Proved or disproved correctness of a modified-Prim binary-spanning-tree algorithm; designed an efficient cheapest-path algorithm over a timetabled transit network with per-line fares.
  - *A5:* Implemented the merge step of a divide-and-conquer algorithm for computing the union of axis-aligned rectangles stabbed by the y-axis, running in O(|union_left| + |union_right|) time.
- **Technologies used:** Algorithm design and proof techniques (worst-case analysis, correctness proofs, amortized analysis), Python (Assignments 2 and 5 implementations), `unittest`
- **Scale/scope facts:** 5 assignments spanning data-structure design (including a from-scratch tree structure built without dictionaries), graph algorithms, and divide-and-conquer geometric algorithms.
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Strong evidence of algorithmic problem-solving, complexity analysis, and rigorous correctness reasoning across a wide range of data structures and graph problems — highly relevant for roles with technical/algorithmic interviews or performance-sensitive engineering work.
 
---
 
### ELEC1005 — Cybersecurity in E-Commerce (Group Project, Assignments 1 & 2)
 
- **Company/Context:** University coursework, ELEC1005, group project ("Group 3," 5 members: Yilin, Kevin, Michael, Rand, Esra — declared equal contribution). You are Rand.
- **Dates:** Assignment 1 submitted 23 Apr 2023; Assignment 2 submitted 21 May 2023 (Semester 1, 2023)
- **One-line description:** As part of a 5-person team, researched, designed, and built a prototype e-commerce website (WordPress-based) adding third-party authentication and additional trust/security features — tiered account types (personal/group/business) with RSA/AES encryption and MFA, an email-verification and "verified user" system, a 3-tier trusted-seller rating system, and a many-to-many forum page replacing traditional product comments — delivered via an Agile/Scrum process with burnup/burndown-tracked sprints.
- **Your role:** Contributed across all areas of the project (analysis, design, and Agile documentation), rather than being confined to a single work-stream — despite the group's formal time-allocation table showing a nominal Analysis-heavy split for your name.
- **Technologies used:** WordPress, Figma (wireframing/prototyping), RSA and AES encryption concepts, Jira (sprint/task tracking), UML (activity, class, state-machine, sequence diagrams)
- **Scale/scope facts:** 31-respondent user survey informing feature prioritization; full budget analysis (~$88K across software/manpower/hardware for a 2-month build); 4 major features shipped across 2 one-week sprints; Blackbox/Whitebox/non-functional testing with external user-feedback rounds.
- **Impact/outcomes:** [Not provided — let me know if there are specific personal outcomes you'd like included.]
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Demonstrates end-to-end product thinking (user research → design → Agile delivery → verification/validation testing) with a security/trust focus, across the full project rather than a single work-stream — relevant for product-minded engineering roles or roles touching authentication/security UX.
 
---
 
### ISYS2120 Assignment 1 — ER-to-Relational Schema Design (Student Clubs Domain)
 
- **Company/Context:** University coursework, ISYS2120, group assignment — per your account, you completed all parts of this deliverable
- **Dates:** Due 27 Aug 2023 (Semester 2, 2023)
- **One-line description:** Translated a provided Entity-Relationship conceptual model (students, clubs, activities, meetings/competitions with an ISA hierarchy, plus membership/presidency/participation relationships) into a relational schema and PostgreSQL DDL, explicitly reasoning through ~20 edge-case data scenarios to confirm the schema neither over- nor under-constrains the domain.
- **Your role:** Completed the full deliverable: identified all tables, attributes, primary/foreign keys; wrote the PostgreSQL CREATE TABLE statements; and worked through all 20 documented edge-case scenarios (e.g. multi-club membership, activities with no participants) to confirm what each did or didn't allow.
- **Technologies used:** SQL (PostgreSQL DDL), relational schema design, ER-to-relational mapping
- **Scale/scope facts:** Schema covering 5 entity types and 5 relationship types (including an ISA hierarchy for Meeting/Competition as Activity subtypes); 20 documented edge-case scenarios checked against the schema's constraints.
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Directly demonstrates relational database design and constraint modelling — relevant for backend/data engineering roles.
 
---
 
### ISYS2120 Assignment 2 — Extended ER Conceptual Modelling (Accommodation Service Domain)
 
- **Company/Context:** University coursework, ISYS2120, group assignment — per your account, you completed all parts of this deliverable
- **Dates:** Due 17 Sep 2023
- **One-line description:** Designed an Extended Entity-Relationship (EER) conceptual model from a purely textual domain description of a rental-accommodation matching service (customers; houses/apartments/rooms under an ISA hierarchy; viewings, applications, offers, and leases), explicitly documenting and justifying assumptions made to resolve ambiguity in the brief.
- **Your role:** Completed the full EER model: identified all entities, relationships, attributes, and the accommodation-type ISA hierarchy; and documented the assumptions made to resolve ambiguities in the textual brief.
- **Technologies used:** EER modelling notation, conceptual data modelling
- **Scale/scope facts:** Domain covering 3 accommodation subtypes (house/apartment/room) under an ISA hierarchy, plus a multi-stage workflow (interest → viewing → application → offer → lease) modelled as relationships/entities.
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Shows the ability to translate ambiguous, real-world written requirements into a rigorous conceptual data model — relevant for business-analyst or data-modelling-adjacent roles.
 
---
 
### ISYS2120 Assignment 3 — Flask/PostgreSQL Web App Extension & Security Evaluation
 
- **Company/Context:** University coursework, ISYS2120, hybrid individual + group project — you were the team's "data owner"
- **Dates:** Due 22 Oct 2023
- **One-line description:** Extended a provided Flask + PostgreSQL public-transport web application with full CRUD functionality (list/filter/add/update/delete) plus custom aggregate reports for the OpalCards and TravelTimes tables, hosted the shared PostgreSQL database as the team's designated "data owner" (granting other members access to your schema), and contributed to a team-wide report evaluating the security of each member's implementation.
- **Your role:** Acted as the group's data owner — hosted the shared dataset and granted teammates database access. Implemented full CRUD (show all / filtered search / add / update / delete) plus a custom aggregate report for both the OpalCards table (cards expiring on a given date; count of cards by expiry date) and the TravelTimes table (path segments by stop count; longest expected travel time per starting station) — covering two tables rather than the single table allocated to most members.
- **Technologies used:** Python (Flask), PostgreSQL, SQL, HTML templates, database access-control/permissions
- **Scale/scope facts:** Full CRUD + custom aggregate-report functionality across 2 tables (OpalCards, TravelTimes); hosted the team's shared database as data owner; team-wide security evaluation covering database, web-app, and OS-level attack surfaces.
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Demonstrates full-stack CRUD web development against a real relational schema, database administration responsibility (as data owner), and applied security-evaluation thinking — relevant for full-stack, database-admin-adjacent, or security-adjacent backend roles.
 
---
 
### ISYS2120 Assignment 4 — Database Systems Concepts (Relational Algebra, Normalization, Indexing, Web Security)
 
- **Company/Context:** University coursework, ISYS2120, solo assignment
- **Dates:** Due 29 Oct 2023
- **One-line description:** A written problem set covering relational algebra query formulation, functional-dependency/BCNF decomposition of a ride-booking schema, index-selection reasoning for query optimization, and a security critique of a Flask web app's password-storage mechanism (from the Assignment 3 scaffold).
- **Your role:** Solo — wrote two logically equivalent relational algebra expressions for a multi-table join/filter query; computed an attribute closure and produced a lossless-join, dependency-reasoned BCNF decomposition of a ride-booking table; justified index-choice decisions (clustered vs. unclustered, hash vs. tree) for two sample queries; and critiqued the password-storage security of the previously-provided Flask scaffold.
- **Technologies used:** Relational algebra, functional-dependency theory / BCNF normalization, database indexing, web-app security analysis
- **Scale/scope facts:** Full BCNF decomposition with dependency-preservation and lossless-join justification for an 8-attribute schema; index-choice analysis for both range and equality queries.
- **Impact/outcomes:** Not tracked — grades excluded from this inventory per your preference.
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Strong theoretical database fundamentals (normalization, indexing trade-offs) — relevant for data-engineering or backend roles with a significant DB component.
 
---
 
### E-Textbook Usability Evaluation — Think-Aloud & Heuristic Evaluation (UX Book) — Group Project
 
- **Company/Context:** University of Sydney coursework, COMP4427 (Usability Engineering), group project (Assignment 1)
- **Dates:** March – June 2026 (Semester 1, 2026); Think-Aloud study run in an early-semester tutorial, per the brief.
- **One-line description:** As part of a group, evaluated the usability of an existing e-textbook — Hartson & Pyla's "The UX Book" — by designing user goals and tasks around one of four assigned themes (navigation, reading, content capture, or markup), then running a Think-Aloud study and a Heuristic Evaluation, and presenting findings via a short recorded video and a slide-deck report.
- **Your role:** Contributed to designing 5 user sub-goals and 10 corresponding user tasks for the group's assigned user goal; personally conducted at least one Think-Aloud session covering all 10 tasks (recruiting/running a participant, capturing background-questionnaire data, performance data, and qualitative observations); personally conducted a Heuristic Evaluation of the interface against usability heuristics for the group's assigned tasks, rating and documenting problems found; and contributed individual notes/slides to the team's report and appendix.
- **Technologies used:** Usability evaluation methods (Think-Aloud protocol, Heuristic Evaluation, SEQ/UMUX-lite-style questionnaires), slide-based reporting, screen/audio recording for the video demo
- **Scale/scope facts:** Group of up to 5 members, each running their own Think-Aloud session (≥5 participants total) and Heuristic Evaluation; 5 user sub-goals × 2 tasks = 10 user tasks; ≤7-minute narrated video demo with no faces shown.
- **Impact/outcomes:** [Not provided — happy to add specific usability issues found if you'd like them included.]
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Demonstrates hands-on UX research methodology (Think-Aloud studies, Heuristic Evaluation, structured usability reporting) — relevant for UX research, UX design, or product roles that value user testing.
 
---
 
### Nutrition E-Textbook Interactive Prototype — Vegetable-Serving Logger — Group Project
 
- **Company/Context:** University of Sydney coursework, COMP4427 (Usability Engineering) — same unit as the E-Textbook Usability Evaluation above (Assignment 2, builds directly on Assignment 1), group project
- **Dates:** March – June 2026 (Semester 1, 2026); spans roughly Week 8 through Week 13 of the semester, per the brief.
- **One-line description:** As part of a group, designed and prototyped a new interactive nutrition e-textbook combining a minimalist vegetable-serving logging interface with linked e-textbook learning content (serving-size estimation), then evaluated it across multiple prototype iterations using Think-Aloud studies and a Compact Cognitive Walkthrough.
- **Your role:** Contributed to designing the group's persona-based user goals and tasks (4 prescribed goals + 1 persona-specific goal, 10 user tasks total, aligned to the group's assigned Transtheoretical-Model behaviour-change stage); contributed to iterative prototyping from early Week 8/9 prototypes through to the final demo prototype; personally conducted a Think-Aloud evaluation session covering all 10 tasks; contributed to the group's Compact Cognitive Walkthrough of the 4 prescribed tasks; and contributed individual notes/slides to the team's report and appendix.
- **Technologies used:** Prototyping tools, Think-Aloud protocol, Cognitive Walkthrough, SEQ/UMUX-lite usability questionnaires, video demo production
- **Scale/scope facts:** 5 user goals / 10 user tasks total (4 prescribed + 1 persona-specific); ≥5 users (or full group size) tested via Think-Aloud, each completing all 10 tasks; multiple prototype iterations across the semester; ≤3-minute video demo with no AI voiceover and no faces shown.
- **Impact/outcomes:** [Not provided — happy to add specific findings from the Think-Aloud or Cognitive Walkthrough if you'd like them included.]
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Further hands-on UX design/evaluation evidence, in a behaviour-change/health-app design context — relevant for UX/product design roles, especially health-tech or education-tech.
 
---
 
### ELEC1601 — Autonomous Maze-Navigating Robot (Simulation + Physical Build)
 
- **Company/Context:** University coursework, ELEC1601, solo project
- **Dates:** August 2022
- **One-line description:** Designed and implemented autonomous maze-navigation logic for a simulated robot (forward/left/right sensors) in a custom SDL2-based C simulator, then ported the algorithm to a physical Arduino-style robot with IR sensors to navigate a real maze under strict, non-extendable lab-time constraints (only 3 lab sessions to port and test on hardware, no take-home access to robots).
- **Your role:** Solo — designed and implemented the entire solution yourself: the simulation navigation algorithm (`robotAutoMotorMove()` and supporting logic) and its full port to the physical Arduino-based robot with IR sensors.
- **Technologies used:** C, SDL2 (SDL2_gfxPrimitives), Arduino/embedded C, IR sensors
- **Scale/scope facts:** Simulated + physical maze with defined obstacle types (straight sections, 90° turns, T-junctions, side branches, one dead-end "object collection point"); physical robot used 3 fixed-range (~10–15cm) IR sensors; only 3 lab sessions available to port and validate the simulation code on real hardware.
- **Impact/outcomes:** [Not provided — did the robot successfully navigate the test maze introduced in Week 10? Happy to add a timing result if you have one.]
- **Links:** [placeholder]
- **Why it might matter for certain roles:** Good evidence of embedded systems / robotics fundamentals, done solo — sensor-driven control logic and porting simulated logic to real, imperfect hardware under tight constraints. Relevant for embedded, robotics, or IoT-adjacent roles.
 
---
 
---
 
## Professional / Client Work
 
### Jordan Language Academy — Website Rebuild & SEO Optimisation (Freelance/Client)
 
- **Company/Context:** Jordan Language Academy (JLA), an institute in Jordan specialising in teaching Arabic to foreign/non-native speakers. Real external client engagement (freelance), worked over the summer. Their existing site was a static HTML site originally built in 2009 (https://jordanla.com/user_site/site/home_page.aspx).
- **Dates:** November 2024 – January 2025.
- **One-line description:** Completely rebuilt and modernised the academy's dated 2009 static website, with a strong focus on technical SEO, on-page optimisation, site structure/information architecture, and overall user experience.
- **Your role:** Solo — rebuilt the site from the ground up and owned the full scope: technical SEO, on-page optimisation, restructuring the site's information architecture, and redesigning for a substantially improved user experience over the legacy static site. Deployed the new build to Vercel.
- **Technologies used:** Modern web front-end stack (rebuilt SPA/site deployed on Vercel), technical SEO, on-page optimisation, site structure / information architecture, UX design. [Open — confirm the exact framework/stack you used for the rebuild, e.g. Vue/React/Next/static-site generator, if you'd like it named precisely.]
- **Scale/scope facts:** Full single-site rebuild for a real client; replaced a ~15-year-old static HTML site; solo end-to-end delivery from rebuild through deployment.
- **Impact/outcomes:** Delivered a modernised, SEO-optimised replacement for the academy's legacy site with improved structure and user experience. (Concrete before/after metrics — e.g. search-ranking, traffic, or Lighthouse/PageSpeed improvements — not captured yet; add if you have them.)
- **Links:** New build: https://jla-website-green.vercel.app/ · Legacy site (for before/after contrast): https://jordanla.com/user_site/site/home_page.aspx
- **Why it might matter for certain roles:** Your first real client/freelance engagement — end-to-end ownership of a production website rebuild for an external stakeholder, with a concrete technical-SEO and UX mandate. Strong fit for front-end, web-development, or SEO/growth-adjacent roles, and useful evidence of working directly with a non-technical client to deliver a live, deployed product.
 
---
 
## Personal / Hobby Projects
 
### VolumeControl — Gesture-Controlled Laptop Volume (OpenCV + MediaPipe)
 
- **Company/Context:** Personal hobby project, built in free time. Also taught as a hands-on workshop.
- **Dates:** June 2025.
- **One-line description:** A solo computer-vision project that lets you control your laptop's system volume with hand gestures, tracking the pinch distance between thumb and index finger via a webcam.
- **Your role:** Solo — wrote all code: captured webcam frames with OpenCV, detected and tracked hand landmarks with MediaPipe, measured the thumb-to-index-finger pinch distance, mapped that distance to a system volume level, and set macOS volume via `osascript`.
- **Technologies used:** Python, OpenCV, MediaPipe (hand-landmark tracking), macOS `osascript` for system volume control.
- **Scale/scope facts:** Single-purpose real-time app; controls volume only (not brightness); works mainly on macOS. Taught in a 2-hour hands-on workshop with 30+ attendees.
- **Impact/outcomes:** Served as an accessible, engaging teaching artifact for introducing computer vision and real-time hand tracking — used to walk 30+ workshop attendees through building a working gesture-control app in two hours.
- **Links:** https://github.com/raaannndddd/VolumeControl
 
---
 
### Personal Portfolio Site (Vue 3 + Vite + Tailwind)
 
- **Company/Context:** Personal hobby project, built in free time.
- **Dates:** December 2024, with updates in December 2025.
- **One-line description:** A solo personal portfolio website with dark and light mode, built as a modern single-page Vue application and deployed to Vercel.
- **Your role:** Solo — designed and built the entire site: component structure, styling, and a dark/light mode toggle; configured the Vite build and deployed to Vercel.
- **Technologies used:** Vue 3, Vite, Tailwind CSS, Vercel (deployment).
- **Scale/scope facts:** Personal single-page portfolio site with a dark/light theme toggle.
- **Impact/outcomes:** Provides a self-hosted, self-maintained showcase of your work and front-end skills.
- **Links:** https://github.com/raaannndddd/portfolio (deployed at portfolio-hazel-kappa-84.vercel.app)
- **Why it might matter for certain roles:** Demonstrates modern front-end competency (Vue 3, Vite, Tailwind) and end-to-end ownership from build to deployment — useful for front-end or full-stack roles.
 
---
 
### RoastBot (AIRoaster) — Webcam AI Roast Generator
 
- **Company/Context:** Personal hobby project, built for the University of Sydney Artificial Intelligence Association orientation.
- **Dates:** February 2026.
- **One-line description:** A solo app that captures a webcam image, analyzes it with computer vision, and uses a locally-run large language model to generate a light-hearted "roast," with safety filtering to keep output appropriate.
- **Your role:** Solo — built the full stack: a FastAPI backend, webcam capture and image analysis with OpenCV/MediaPipe, integration with a local Ollama LLM (llama3.1) to generate roast text, and safety/content filtering on the output.
- **Technologies used:** Python, FastAPI, OpenCV, MediaPipe, Ollama (llama3.1, run locally).
- **Scale/scope facts:** Interactive real-time demo app; runs the language model locally via Ollama (no external LLM API); includes safety filtering on generated content.
- **Impact/outcomes:** Built as an engaging, approachable demo to draw students in at the Sydney Uni AI Association orientation — combining computer vision and a local LLM into a fun, self-contained interactive experience.
- **Links:** https://github.com/raaannndddd/AIRoaster
 
---
 
### ChartChat (AxiomChat) — Crypto Chart Chat Assistant Browser Extension
 
- **Company/Context:** Personal hobby project, built in free time.
- **Dates:** June – August 2025.
- **One-line description:** A solo Chrome extension that acts as a chat assistant over live crypto market data, pulling token/price information and letting the user ask questions answered by a locally-run LLM, with real-time updates and Google sign-in.
- **Your role:** Solo — built the whole project: a Next.js-based Chrome extension front end, real-time messaging via Socket.io, integration with a local Ollama LLM for answering user questions, crypto data pulled from the Dexscreener and CoinGecko APIs, and Google Sign-In for authentication.
- **Technologies used:** Next.js, Chrome extension APIs, Socket.io, Ollama (local LLM), Google Sign-In (OAuth), Dexscreener API, CoinGecko API. FinTech-focused.
- **Scale/scope facts:** Browser-extension app combining real-time market data feeds, a local LLM chat interface, and authentication.
- **Impact/outcomes:** A self-contained FinTech tool that brings a conversational LLM assistant directly into the browser alongside live crypto charts and market data.
- **Links:** https://github.com/raaannndddd/AxiomChat
- **Note (not for the résumé):** The committed README contains a hardcoded Google OAuth client ID — worth rotating/removing from the repo.
 
---
 
### Liver Patient Classification (repo named "CKD") — ML Classifier Comparison & Ensemble
 
- **Company/Context:** Personal hobby project, built in free time.
- **Dates:** September – November 2023.
- **One-line description:** A solo machine-learning project that predicts liver-patient status from a clinical dataset, comparing several classifiers and combining them into a soft-voting ensemble.
- **Your role:** Solo — did all data handling, modeling, and evaluation: trained and compared K-Nearest Neighbours, Logistic Regression, Gaussian Naive Bayes, and SVM classifiers, then combined them into a soft-voting ensemble and evaluated performance.
- **Technologies used:** Python, scikit-learn (KNN, Logistic Regression, GaussianNB, SVM, soft-voting ensemble), standard data-science stack (e.g. pandas/NumPy), Jupyter notebook.
- **Scale/scope facts:** Supervised classification on a liver-patient clinical dataset; four base classifiers compared plus a soft-voting ensemble. (Note: the repository is named "CKD / chronic kidney disease," but the actual code and dataset are liver-patient classification — the repo name is misleading and does not match the contents.)
- **Impact/outcomes:** Produced a side-by-side comparison of multiple classical ML classifiers and demonstrated ensemble learning (soft voting) to combine them on a real clinical dataset.
- **Links:** https://github.com/raaannndddd/CKD
 
---
 
## Stable context (fill in once)
 
- **Education:** University of Sydney, Bachelor of Engineering (Software) — Honours
- **Work authorization / visa status:** Australian Citizen
- **Remote preference:** Open to remote, on site, and hybrid work
- **Career break context, if any:** No career breaks
- **Career change context, if any:** No career change
- **Anything else that applies to every application:** N/A
 
---
 
## Notes for use in the Project
 
- Keep this file updated as you think of more projects — it's meant to be a living document.
- When starting a new application in chat, paste the job description and any per-application notes there — not here.
- If a number is approximate, say so explicitly (e.g., "~40%, estimated") so Claude represents it honestly rather than as a precise figure.
- Grades/marks and "currently on resume" status are intentionally excluded from this inventory per your preference — Claude won't ask for or include either going forward.
 