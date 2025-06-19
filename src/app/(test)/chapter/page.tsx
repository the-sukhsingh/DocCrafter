"use client"
import React from 'react'
import Chapters from '@/components/screens/Chapters'

const dummyChapters = [
    {
        "title": "Introduction and Project Overview",
        "description": "This chapter will provide a comprehensive introduction to the EduSphere project, outlining its purpose, goals, and scope, including the target audience and the problem it aims to solve in the field of personalized learning.",
        "_id": "6850212ec6425e150dd2b3a7"
    },
    {
        "title": "Requirements Analysis: Learning Platforms and Integrations",
        "description": "This chapter details the integration requirements for EduSphere, specifically outlining the chosen Learning Management Systems (LMS), the key technical specifications for these integrations (APIs, protocols, data transfer), and the associated security considerations (e.g., authentication via OAuth 2.0, API rate limits, data caching).",
        "_id": "6850212ec6425e150dd2b3a8"
    },
    {
        "title": "Technical Specifications and Methodology: AI Engine and Algorithms",
        "description": "This chapter will delve into the technical architecture of EduSphere's AI engine, describing the specific algorithms used for content recommendation (collaborative filtering, content-based filtering, reinforcement learning), performance prediction (random forests, gradient boosting, neural networks), and learning style identification (unsupervised clustering).",
        "_id": "6850212ec6425e150dd2b3a9"
    },
    {
        "title": "AI Engine Bias Mitigation and Validation",
        "description": "This chapter examines the strategies for mitigating potential bias in the AI algorithms used by EduSphere, focusing on fairness-aware machine learning techniques, ongoing performance monitoring, and accuracy validation using cross-validation, A/B testing, and diverse user cohorts.",
        "_id": "6850212ec6425e150dd2b3aa"
    },
    {
        "title": "Implementation: Multi-Language Support and Accessibility Features",
        "description": "This chapter describes the implementation details for multi-language support in EduSphere, encompassing the selection of prioritized languages (English, Hindi, Spanish), the technical NLP processing approaches (transformer models, localized translation), and accessibility features (text-to-speech, screen reader compatibility, WCAG 2.1 compliance).",
        "_id": "6850212ec6425e150dd2b3ab"
    },
    {
        "title": "System Design and Architecture",
        "description": "This chapter provides a detailed design of the EduSphere system, including the architecture for handling various user levels, content management, and real-time analytics, along with considerations for scaling the system to accommodate future growth and potential load spikes.",
        "_id": "6850212ec6425e150dd2b3ac"
    },
    {
        "title": "Infrastructure and Resource Requirements",
        "description": "This chapter details the anticipated resource requirements (compute power, storage, bandwidth) for EduSphere, addressing scalability concerns, the chosen cloud platforms, and the cost-effective management strategies employed to maintain efficiency as the user base grows.",
        "_id": "6850212ec6425e150dd2b3ad"
    },
    {
        "title": "Real-time Analytics and Reporting",
        "description": "This chapter details the development of the visualization tools and reports provided to educators to track student progress. It specifies the dashboards, reports, and data visualization techniques (D3.js, Chart.js, Redash) used to provide insights, identify learning patterns, and facilitate timely interventions.",
        "_id": "6850212ec6425e150dd2b3ae"
    },
    {
        "title": "Testing and Validation",
        "description": "This chapter will cover the testing methodologies and validation processes used to ensure the functionality, performance, and reliability of EduSphere.  It will include details on unit testing, integration testing, system testing, and user acceptance testing, along with how these procedures addressed accessibility and language considerations.",
        "_id": "6850212ec6425e150dd2b3af"
    },
    {
        "title": "Conclusion and Future Enhancements",
        "description": "This chapter will summarize the key findings and accomplishments of the project, emphasizing the project's contribution to the field of personalized learning and inclusive education.  It will also discuss potential future enhancements and areas for improvement.",
        "_id": "6850212ec6425e150dd2b3b1"
    },
    {
        "title": "Results and Deliverables",
        "description": "This chapter will present the key results of the EduSphere project, including quantitative metrics like student performance improvements, engagement rates, and platform adoption rates. It will also include qualitative feedback from users, highlighting the impact of EduSphere on bridging learning gaps and fostering inclusive education.",
        "_id": "6850212ec6425e150dd2b3b0"
    }
]

const ChapterTest = () => {

    const [chapters, setChapters] = React.useState(dummyChapters);

    const handleChaptersChange = (updatedChapters: any[]) => {
        setChapters(updatedChapters);
        console.log("Updated Chapters:", updatedChapters);
    };

  return (
    <div>
      <Chapters
        chapters={chapters}
        onChaptersChange={handleChaptersChange}
      />
    </div>
  )
}

export default ChapterTest