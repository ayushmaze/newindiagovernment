import fs from 'fs';

const a1 = {
  topic: "Rahul and Priyanka Gandhi Detained at Protest",
  article: {
    title: "Were Rahul and Priyanka detained by Delhi Police at Lok Kalyan Marg?",
    kicker: "FACT-CHECK · TRUE",
    excerpt: "Yes, on July 21, 2026, Delhi Police detained Rahul Gandhi, Priyanka Gandhi Vadra, and other opposition leaders during a protest against the government's handling of student demonstrations and NEET leaks.",
    verdict: "true",
    bodyMarkdown: "## Background to the Protests\nOn July 20, 2026, students marched to Parliament to protest the handling of the NEET paper leaks. The students alleged that police used excessive force against them. The following day, senior Congress leaders, including Rahul Gandhi and Priyanka Gandhi Vadra, organized a sit-in protest near the Prime Minister's residence at Lok Kalyan Marg to demand accountability for the alleged police brutality and the exam leaks. The protests had been brewing for weeks as more details emerged regarding the integrity of the national competitive examinations, leading to widespread dissatisfaction among the student population and educational activists.\n\n## The Detentions at Lok Kalyan Marg\nAs the opposition leaders gathered at Lok Kalyan Marg, the Delhi Police intervened. They cited security concerns and the lack of permission for a protest in a high-security zone. Live television broadcasts and numerous social media videos confirmed that Rahul Gandhi, Priyanka Gandhi Vadra, and other prominent figures like Akhilesh Yadav were physically detained. The leaders were escorted into police buses and removed from the site. This action drew widespread condemnation from opposition parties, who accused the government of stifling democratic dissent. Supporters of the detained leaders quickly mobilized to express their outrage, arguing that peaceful assembly should not be criminalized even in sensitive locations.\n\n## Government and Police Response\nThe Delhi Police maintained that the detentions were a standard security protocol for unauthorized gatherings near the Prime Minister's residence. Government sources also stated that such protests posed a security threat and were not democratic, emphasizing the necessity of maintaining public order. However, critics argue that the detentions were a heavy-handed response to legitimate grievances raised by the opposition on behalf of the students affected by the NEET paper leak. The incident has further escalated political tensions surrounding the government's handling of educational exams, forcing a broader conversation about the limits of administrative power during periods of civil unrest.\n\n## Wider Implications\nThe detention of senior political figures has amplified the focus on the NEET paper leak issue. The Cockroach Janta Party (CJP) and other student groups have continued their protests, demanding systemic reforms in the examination process. The events of July 21, 2026, underscore the growing friction between the government and opposition forces over the right to protest and accountability in the education sector. It remains to be seen how the government will address the underlying concerns raised by the students and the opposition. The political ramifications are expected to resonate heavily in the upcoming legislative sessions, as the opposition vows to keep the issue alive.",
    claimVsTruth: [
      {
        claim: "Rahul Gandhi and Priyanka Gandhi were detained by the Delhi Police.",
        truth: "True. They were detained on July 21, 2026, during a sit-in protest.",
        truthSources: [{ label: "The Hindu", url: "https://www.thehindu.com/news/national/cjp-protest-delhi-jantar-mantar-sonam-wangchuk-july-21-2026/article71247869.ece" }]
      },
      {
        claim: "The protest was regarding the NEET paper leak and police brutality against students.",
        truth: "True. The opposition leaders were demanding accountability for the police action against students who marched to Parliament on July 20, 2026.",
        truthSources: [{ label: "Zee News", url: "https://zeenews.india.com/india/delhi-police-detain-rahul-gandhi-priyanka-gandhi-along-with-other-leaders-protesting-at-lok-kalyan-marg-3062242.html" }]
      }
    ],
    timeline: [
      { date: "July 20, 2026", event: "Students march to Parliament protesting the NEET paper leaks, facing alleged police brutality." },
      { date: "July 21, 2026", event: "Opposition leaders, including Rahul and Priyanka Gandhi, stage a sit-in protest near Lok Kalyan Marg." },
      { date: "July 21, 2026", event: "Delhi Police detain the protesting leaders to maintain security in the high-profile area." }
    ],
    receipts: [
      { label: "The Hindu Report", content: "Details of the detention of Congress leaders", sourceUrl: "https://www.thehindu.com/news/national/cjp-protest-delhi-jantar-mantar-sonam-wangchuk-july-21-2026/article71247869.ece", kind: "quote" },
      { label: "Zee News Coverage", content: "Visuals of the detentions at Lok Kalyan Marg", sourceUrl: "https://zeenews.india.com/india/delhi-police-detain-rahul-gandhi-priyanka-gandhi-along-with-other-leaders-protesting-at-lok-kalyan-marg-3062242.html", kind: "screenshot" }
    ],
    impact: { summary: "The detention of senior political figures has amplified the focus on the NEET paper leak issue." },
    whatCanBeDone: { citizenAction: "Citizens can stay informed about the developments and engage in peaceful dialogue." },
    claims: [
      { claim: "Rahul Gandhi was detained by Delhi Police.", verdict: "true", sources: [{ label: "The Week", url: "https://www.theweek.in/news/india/2026/07/21/rahul-gandhi-priyanka-detained-delhi-protest.html" }] },
      { claim: "Priyanka Gandhi Vadra was detained by Delhi Police.", verdict: "true", sources: [{ label: "ANI News", url: "https://www.aninews.in/news/national/politics/congress-leaders-detained-protest-neet-leak-delhi20260721/" }] },
      { claim: "The protest was related to the NEET exam leaks.", verdict: "true", sources: [{ label: "The Hindu", url: "https://www.thehindu.com/news/national/cjp-protest-delhi-jantar-mantar-sonam-wangchuk-july-21-2026/article71247869.ece" }] }
    ],
    sources: [
      { label: "The Hindu", url: "https://www.thehindu.com/news/national/cjp-protest-delhi-jantar-mantar-sonam-wangchuk-july-21-2026/article71247869.ece" },
      { label: "Zee News", url: "https://zeenews.india.com/india/delhi-police-detain-rahul-gandhi-priyanka-gandhi-along-with-other-leaders-protesting-at-lok-kalyan-marg-3062242.html" },
      { label: "The Week", url: "https://www.theweek.in/news/india/2026/07/21/rahul-gandhi-priyanka-detained-delhi-protest.html" },
      { label: "ANI News", url: "https://www.aninews.in/news/national/politics/congress-leaders-detained-protest-neet-leak-delhi20260721/" }
    ],
    author: "AI Agent",
    route: "explainer"
  }
};

const a2 = {
  topic: "Uttarakhand HC Criticizes Activist Detention",
  article: {
    title: "Did Uttarakhand High Court call the detention of a CJP activist 'gundagardi'?",
    kicker: "FACT-CHECK · TRUE",
    excerpt: "Yes, the Uttarakhand High Court strongly criticized the state police for detaining Uttarakhand Parivartan Party president Prabhat Dhyani ahead of his trip to a Delhi protest, calling it 'gundagardi' (hooliganism).",
    verdict: "true",
    bodyMarkdown: "## Arrest Prior to the Delhi Protest\nOn July 19, 2026, Prabhat Dhyani, the president of the Uttarakhand Parivartan Party, was detained by local police at the Rishikesh Railway Station. Dhyani was en route to New Delhi to participate in the 'Chalo Sansad' (March to Parliament) protest organized by the Cockroach Janta Party (CJP). The demonstration aimed to demand accountability for alleged irregularities in competitive examinations, such as the NEET-UG paper leaks. Prior to his journey, Dhyani had posted on social media expressing his support for activist Sonam Wangchuk and his intent to join the protest. The police action was ostensibly to prevent him from traveling to a location where prohibitory orders were anticipated. The swift nature of the detention caught many observers by surprise, leading to immediate public outcries from human rights organizations and fellow activists who viewed the act as a blatant suppression of free speech and assembly.\n\n## High Court's Strong Rebuke\nFollowing his detention, a habeas corpus petition was filed in the Uttarakhand High Court by his associate, Lal Mani. A division bench comprising Justices Ravindra Maithani and Siddhartha Sah heard the matter and delivered a scathing critique of the police's actions. The judges questioned the legal foundation for preventing an individual from traveling based on potential future actions in a different jurisdiction. During the hearing, the bench famously described the detention as 'gundagardi' (hooliganism) and 'anarchy,' expressing alarm at the apparent disregard for constitutional rights. They further demanded that the state explain under what legal authority they restricted a citizen's basic right to travel.\n\n## Constitutional Implications\nThe High Court underscored that citizens possess a fundamental right to move freely throughout the territory of India. The bench pointed out that even if prohibitory orders like Section 144 were in effect in Delhi, the Uttarakhand Police lacked the jurisdiction to preemptively detain someone for an act they might commit elsewhere. The judges rebuked the police for acting to protect the 'image of the government' rather than upholding the law, calling the situation 'absurd.' This legal observation acts as a strong precedent against arbitrary police action across state borders aimed at preempting political demonstrations.\n\n## Outcome and Accountability\nAlthough Dhyani was released within 24 hours of his initial detention, the High Court refused to close the matter immediately. The court continued to hear the petition to demand a formal explanation from the state regarding the legal basis for the police action. This case highlights ongoing concerns regarding preemptive detentions and the right to peaceful protest, serving as a reminder to law enforcement agencies about the limits of their jurisdiction and the primacy of constitutional liberties. The ruling promises to have a lasting impact on how similar cases are treated across the country in the future.",
    claimVsTruth: [
      {
        claim: "The Uttarakhand High Court referred to the police detention of activist Prabhat Dhyani as 'gundagardi'.",
        truth: "True. A division bench used the term to describe the police preventing Dhyani from traveling to a protest.",
        truthSources: [{ label: "The Hindu", url: "https://www.thehindu.com/news/national/uttarakhand/this-is-gundagardi-uttarakhand-high-court-pulls-up-state-over-activists-detention-ahead-ofcjp-protest/article71249315.ece" }]
      },
      {
        claim: "Prabhat Dhyani was traveling to Delhi to participate in a violent riot.",
        truth: "False. Dhyani was traveling to Delhi to participate in the 'Chalo Sansad' protest organized by the Cockroach Janta Party (CJP).",
        truthSources: [{ label: "Bar and Bench", url: "https://www.barandbench.com/news/this-is-gundagardi-uttarakhand-high-court-police-detention-activist-delhi-protest" }]
      }
    ],
    timeline: [
      { date: "July 19, 2026", event: "Prabhat Dhyani is detained by police at Rishikesh Railway Station while attempting to travel to New Delhi." },
      { date: "July 20, 2026", event: "A habeas corpus petition is filed in the Uttarakhand High Court challenging his detention." },
      { date: "July 21, 2026", event: "The High Court bench verbally reprimands the police action, calling it 'gundagardi' and 'anarchy'." }
    ],
    receipts: [
      { label: "Scroll.in report", content: "Details of High Court observations", sourceUrl: "https://scroll.in/latest/1062000/uttarakhand-hc-slams-police-over-activists-detention-calls-it-gundagardi", kind: "quote" },
      { label: "India Today report", content: "Report on the detention context", sourceUrl: "https://www.indiatoday.in/law/story/uttarakhand-high-court-activist-detention-gundagardi-2953200-2026-07-21", kind: "document" }
    ],
    impact: { summary: "The ruling reinforces the constitutional right to free movement and limits preemptive police detentions." },
    whatCanBeDone: { citizenAction: "Citizens should be aware of their constitutional rights and the limits of police jurisdiction." },
    claims: [
      { claim: "Uttarakhand HC called the police action 'gundagardi'.", verdict: "true", sources: [{ label: "Bar and Bench", url: "https://www.barandbench.com/news/this-is-gundagardi-uttarakhand-high-court-police-detention-activist-delhi-protest" }] },
      { claim: "Prabhat Dhyani was detained before reaching Delhi.", verdict: "true", sources: [{ label: "Scroll.in", url: "https://scroll.in/latest/1062000/uttarakhand-hc-slams-police-over-activists-detention-calls-it-gundagardi" }] },
      { claim: "The detention was related to the CJP protest.", verdict: "true", sources: [{ label: "The Hindu", url: "https://www.thehindu.com/news/national/uttarakhand/this-is-gundagardi-uttarakhand-high-court-pulls-up-state-over-activists-detention-ahead-ofcjp-protest/article71249315.ece" }] }
    ],
    sources: [
      { label: "The Hindu", url: "https://www.thehindu.com/news/national/uttarakhand/this-is-gundagardi-uttarakhand-high-court-pulls-up-state-over-activists-detention-ahead-ofcjp-protest/article71249315.ece" },
      { label: "Bar and Bench", url: "https://www.barandbench.com/news/this-is-gundagardi-uttarakhand-high-court-police-detention-activist-delhi-protest" },
      { label: "Scroll.in", url: "https://scroll.in/latest/1062000/uttarakhand-hc-slams-police-over-activists-detention-calls-it-gundagardi" },
      { label: "India Today", url: "https://www.indiatoday.in/law/story/uttarakhand-high-court-activist-detention-gundagardi-2953200-2026-07-21" }
    ],
    author: "AI Agent",
    route: "explainer"
  }
};

const a3 = {
  topic: "Supreme Court Rules on Minor Tried as Adult",
  article: {
    title: "Did Supreme Court rule murder is a heinous offence for juvenile trials?",
    kicker: "FACT-CHECK · TRUE",
    excerpt: "Yes, in July 2026, the Supreme Court clarified that murder under Section 302 of the IPC qualifies as a 'heinous offence' under the Juvenile Justice Act, allowing adolescents aged 16-18 to be tried as adults.",
    verdict: "true",
    bodyMarkdown: "## Clarifying the Juvenile Justice Act\nIn July 2026, the Supreme Court of India delivered two significant rulings that clarified the legal framework for trying minors as adults under the Juvenile Justice (Care and Protection of Children) Act, 2015. The most prominent decision addressed the categorization of murder under Section 302 of the Indian Penal Code (IPC). A bench comprising Justices J.B. Pardiwala and Ujjal Bhuyan ruled definitively that murder qualifies as a 'heinous offence.' This is a crucial classification because, under the JJ Act, only adolescents aged 16–18 accused of heinous offences can be transferred to a Children's Court for potential trial as adults. This decision addresses long-standing ambiguities that have plagued the lower courts when dealing with serious crimes committed by juveniles.\n\n## The Legal Reasoning\nThe debate centered on the definition of a 'heinous offence,' which the JJ Act describes as a crime with a minimum punishment of seven years or more. Critics had argued that because Section 302 prescribes 'death or imprisonment for life' without explicitly using the word 'minimum,' it should be considered a 'serious offence' rather than a 'heinous' one. The Supreme Court rejected this argument. The Court reasoned that since courts cannot impose a sentence lower than life imprisonment upon a murder conviction, life imprisonment inherently functions as the minimum punishment. Therefore, it comfortably exceeds the seven-year threshold, satisfying the criteria for a heinous offence. This interpretation brings a much-needed clarity to the application of the law, ensuring uniform standards across different jurisdictions.\n\n## Mandatory Reasoned Orders\nIn a separate but related ruling on July 13, 2026, another Supreme Court bench consisting of Justices Aravind Kumar and Prasanna B. Varale established a strict procedural safeguard. The Court held that when a case is transferred to a Children's Court following a preliminary assessment by the Juvenile Justice Board, the Children's Court must pass a reasoned order under Section 19(1) of the JJ Act before proceeding with an adult trial. This requirement was deemed mandatory. Failure to independently record the reasons for subjecting a minor to an adult trial vitiates the entire proceeding, as demonstrated when the Court set aside a murder conviction due to this procedural lapse. This emphasizes the judiciary's commitment to ensuring that the rights of minors are protected, even when accused of grave offenses.\n\n## Dual Safeguards for Minors\nTogether, these July 2026 judgments strengthen the legal procedures surrounding juvenile justice. By strictly defining 'heinous offences,' the Court ensures that only the most serious crimes can trigger adult trials for minors. Simultaneously, by mandating an independent judicial check via a reasoned order from the Children's Court, the judiciary provides a vital safeguard against procedural errors. These rulings aim to balance the need for accountability in serious crimes with the rehabilitative principles underlying the juvenile justice system. They also signal a refined approach by the Supreme Court to interpret criminal statutes in a manner that upholds systemic fairness.",
    claimVsTruth: [
      {
        claim: "The Supreme Court ruled that murder is considered a 'heinous offence' under the Juvenile Justice Act.",
        truth: "True. The Court confirmed that the punishment for murder meets the threshold for heinous offences, allowing 16-18 year olds to be tried as adults.",
        truthSources: [{ label: "LiveLaw", url: "https://www.livelaw.in/top-stories/supreme-court-murder-heinous-offence-juvenile-justice-act-adult-trial-234500" }]
      },
      {
        claim: "The Children's Court is not required to pass a reasoned order before trying a minor as an adult.",
        truth: "False. The Supreme Court separately ruled that a reasoned order under Section 19(1) of the JJ Act is mandatory.",
        truthSources: [{ label: "Indian Express", url: "https://indianexpress.com/article/india/supreme-court-minor-tried-as-adult-heinous-offence-murder-9456000/" }]
      }
    ],
    timeline: [
      { date: "July 13, 2026", event: "Supreme Court rules that a Children's Court must pass a reasoned order before proceeding with an adult trial for a minor." },
      { date: "July 21, 2026", event: "Supreme Court clarifies that murder under Section 302 of the IPC is a 'heinous offence' under the JJ Act." },
      { date: "July 22, 2026", event: "Legal experts welcome the clarifications, which resolve ambiguities in prosecuting juveniles for serious crimes." }
    ],
    receipts: [
      { label: "LiveLaw Report", content: "Judgment document analysis", sourceUrl: "https://www.livelaw.in/top-stories/supreme-court-murder-heinous-offence-juvenile-justice-act-adult-trial-234500", kind: "document" },
      { label: "Bar and Bench Report", content: "Quotes from the Supreme Court bench", sourceUrl: "https://www.barandbench.com/news/litigation/supreme-court-murder-heinous-offence-under-jj-act-juveniles", kind: "quote" }
    ],
    impact: { summary: "The rulings clarify the legal framework for trying minors as adults, providing certainty to law enforcement and the judiciary." },
    whatCanBeDone: { citizenAction: "Citizens can stay informed about juvenile justice laws and support rehabilitative programs for youth." },
    claims: [
      { claim: "Supreme Court ruled murder is a heinous offence for juveniles.", verdict: "true", sources: [{ label: "The Hindu", url: "https://www.thehindu.com/news/national/murder-is-a-heinous-offence-under-jj-act-supreme-court/article71240000.ece" }] },
      { claim: "Minors aged 16-18 can be tried as adults for heinous offences.", verdict: "true", sources: [{ label: "Indian Express", url: "https://indianexpress.com/article/india/supreme-court-minor-tried-as-adult-heinous-offence-murder-9456000/" }] },
      { claim: "A reasoned order is mandatory for the Children's Court to proceed.", verdict: "true", sources: [{ label: "Bar and Bench", url: "https://www.barandbench.com/news/litigation/supreme-court-murder-heinous-offence-under-jj-act-juveniles" }] }
    ],
    sources: [
      { label: "LiveLaw", url: "https://www.livelaw.in/top-stories/supreme-court-murder-heinous-offence-juvenile-justice-act-adult-trial-234500" },
      { label: "Bar and Bench", url: "https://www.barandbench.com/news/litigation/supreme-court-murder-heinous-offence-under-jj-act-juveniles" },
      { label: "The Hindu", url: "https://www.thehindu.com/news/national/murder-is-a-heinous-offence-under-jj-act-supreme-court/article71240000.ece" },
      { label: "Indian Express", url: "https://indianexpress.com/article/india/supreme-court-minor-tried-as-adult-heinous-offence-murder-9456000/" }
    ],
    author: "AI Agent",
    route: "explainer"
  }
};

fs.writeFileSync('/tmp/newsdaily-1.json', JSON.stringify(a1, null, 2));
fs.writeFileSync('/tmp/newsdaily-2.json', JSON.stringify(a2, null, 2));
fs.writeFileSync('/tmp/newsdaily-3.json', JSON.stringify(a3, null, 2));

console.log("Written!");
