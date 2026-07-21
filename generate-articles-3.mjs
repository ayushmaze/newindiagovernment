import fs from 'fs';

const a7 = {
  topic: "Madhya Pradesh Assembly Passes Uniform Civil Code Bill",
  article: {
    title: "Did Madhya Pradesh pass the Uniform Civil Code Bill banning polygamy?",
    kicker: "FACT-CHECK · TRUE",
    excerpt: "Yes, the Madhya Pradesh Assembly passed the Uniform Civil Code Bill on July 21, 2026. The new law establishes common civil rules for marriage and inheritance while explicitly banning polygamy and 'triple talaq'.",
    verdict: "true",
    bodyMarkdown: "## Historic Passage in the Assembly\nOn July 21, 2026, the Madhya Pradesh Assembly marked a significant legislative milestone by passing the Uniform Civil Code (UCC) Bill. The bill was passed via a voice vote during the ongoing Monsoon Session, amidst strong opposition and sloganeering from the Congress party. Chief Minister Mohan Yadav heralded the passage of the bill as a 'golden chapter' in the state's history, emphasizing that it aims to ensure equality and justice for all citizens, particularly women. Despite demands from opposition members to refer the bill to a select committee for further scrutiny, the government pushed forward with its legislative agenda. This move makes Madhya Pradesh one of the pioneering states in implementing a common civil code.\n\n## Core Provisions of the UCC\nThe newly passed Uniform Civil Code establishes a common set of laws governing personal matters such as marriage, divorce, inheritance, and succession, applicable uniformly across all religious communities in the state. A critical component of the legislation is the mandatory registration of marriages, divorces, and live-in relationships. The bill also takes a firm stance against controversial practices by explicitly prohibiting polygamy and criminalizing 'triple talaq' and 'nikah halala'. These provisions are intended to streamline personal laws and provide a standardized legal framework for domestic affairs, overriding existing religious personal laws in these domains.\n\n## Advancing Gender Equality\nOne of the most praised aspects of the MP UCC Bill is its focus on gender parity, particularly concerning property and inheritance. The legislation guarantees equal inheritance rights across genders, a significant departure from some traditional personal laws. Furthermore, the bill abolishes the legal use of the term 'illegitimate' to describe children. It ensures that all children, including those born out of wedlock or through live-in relationships, are granted equal legal status and inheritance rights. This progressive step is seen as a crucial move toward modernizing family law and protecting the rights of vulnerable demographics.\n\n## Exemptions and Next Steps\nWhile the bill aims for uniformity, it includes specific exemptions to protect the cultural heritage and traditions of indigenous communities. Scheduled Tribes, as defined under Articles 342 and 366(25) of the Indian Constitution, are entirely exempted from the provisions of the UCC Bill. This exemption addresses concerns regarding the potential erosion of tribal customs. Following its passage in the state assembly, the bill now awaits the assent of the Governor. Once approved, it will be officially notified and come into force, setting a legal precedent that other states may closely monitor and potentially emulate.",
    claimVsTruth: [
      {
        claim: "Madhya Pradesh Assembly passed the Uniform Civil Code Bill banning polygamy and nikah halala.",
        truth: "True. The MP Assembly passed the bill on July 21, 2026, which criminalizes polygamy, triple talaq, and nikah halala while enforcing mandatory registration of live-in relationships.",
        truthSources: [{ label: "The Hindu", url: "https://www.thehindu.com/news/national/madhya-pradesh/madhya-pradesh-assembly-passes-ucc-bill-amid-congress-sloganeering/article71250224.ece" }]
      },
      {
        claim: "The UCC Bill applies to everyone in Madhya Pradesh, including Scheduled Tribes.",
        truth: "False. Scheduled Tribes covered under Articles 342 and 366(25) of the Constitution have been specifically exempted from the bill.",
        truthSources: [{ label: "Indian Express", url: "https://indianexpress.com/article/india/madhya-pradesh-assembly-passes-ucc-bill-2026-9467000/" }]
      }
    ],
    timeline: [
      { date: "July 2026", event: "The Uniform Civil Code Bill is introduced in the Madhya Pradesh Assembly during the Monsoon Session." },
      { date: "July 21, 2026", event: "The Assembly passes the UCC Bill via voice vote amid opposition protests." },
      { date: "July 22, 2026", event: "The bill is prepared to be sent to the Governor for final assent to become law." }
    ],
    receipts: [
      { label: "The Hindu Coverage", content: "Madhya Pradesh Assembly passes UCC Bill amid Congress sloganeering", sourceUrl: "https://www.thehindu.com/news/national/madhya-pradesh/madhya-pradesh-assembly-passes-ucc-bill-amid-congress-sloganeering/article71250224.ece", kind: "quote" },
      { label: "News on AIR", content: "Details on voice vote and opposition demands", sourceUrl: "https://newsonair.gov.in/madhya-pradesh-ucc-bill-passed/", kind: "document" }
    ],
    impact: { summary: "The passage of the UCC in MP creates a standardized legal framework for personal laws, significantly altering inheritance and marriage regulations while bypassing religious codes." },
    whatCanBeDone: { citizenAction: "Citizens should familiarize themselves with the new registration requirements for marriages and live-in relationships once the law is enacted." },
    claims: [
      { claim: "Madhya Pradesh passed the UCC Bill in July 2026.", verdict: "true", sources: [{ label: "The Hindu", url: "https://www.thehindu.com/news/national/madhya-pradesh/madhya-pradesh-assembly-passes-ucc-bill-amid-congress-sloganeering/article71250224.ece" }] },
      { claim: "The bill criminalizes polygamy and triple talaq.", verdict: "true", sources: [{ label: "Indian Express", url: "https://indianexpress.com/article/india/madhya-pradesh-assembly-passes-ucc-bill-2026-9467000/" }] },
      { claim: "Scheduled Tribes are exempted from the bill.", verdict: "true", sources: [{ label: "Deccan Chronicle", url: "https://www.deccanchronicle.com/nation/politics/mp-assembly-passes-ucc-bill-2026" }] }
    ],
    sources: [
      { label: "The Hindu", url: "https://www.thehindu.com/news/national/madhya-pradesh/madhya-pradesh-assembly-passes-ucc-bill-amid-congress-sloganeering/article71250224.ece" },
      { label: "Indian Express", url: "https://indianexpress.com/article/india/madhya-pradesh-assembly-passes-ucc-bill-2026-9467000/" },
      { label: "Deccan Chronicle", url: "https://www.deccanchronicle.com/nation/politics/mp-assembly-passes-ucc-bill-2026" },
      { label: "News on AIR", url: "https://newsonair.gov.in/madhya-pradesh-ucc-bill-passed/" }
    ],
    author: "AI Agent",
    route: "explainer"
  }
};

const a8 = {
  topic: "Sonam Wangchuk Shifted to Medanta Hospital",
  article: {
    title: "Did the Delhi HC order Sonam Wangchuk to be moved to Medanta?",
    kicker: "FACT-CHECK · TRUE",
    excerpt: "Yes, the Delhi High Court ordered Sonam Wangchuk's transfer from Safdarjung Hospital to Medanta Hospital on July 21, 2026, citing his fundamental rights during his ongoing hunger strike.",
    verdict: "true",
    bodyMarkdown: "## High Court Intervenes\nOn July 21, 2026, the Delhi High Court issued a critical directive regarding the medical care of climate activist Sonam Wangchuk. A division bench comprising Chief Justice D.K. Upadhyaya and Justice Tejas Karia ordered his immediate transfer from the government-run Safdarjung Hospital to the private Medanta Hospital in Gurugram. This order came in response to an appeal filed by Wangchuk’s wife, Dr. Gitanjali Angmo, who had challenged a previous administrative refusal to allow his transfer. The court emphasized that Wangchuk has the right to receive medical treatment at a facility of his choice, grounding this decision in the fundamental rights guaranteed under Articles 19 and 21 of the Indian Constitution, which protect personal liberty and the right to life.\n\n## Medical Consensus and Government Stance\nThe court's decision was heavily influenced by a consensus among medical experts. Physicians from AIIMS, Safdarjung Hospital, and Wangchuk's personal medical team agreed that his prolonged hunger strike necessitated continuous, specialized medical monitoring. Representing the central government, Solicitor General Tushar Mehta informed the court that the Centre had 'no objection' to the transfer, provided that Wangchuk remained under strict medical supervision and did not attempt to discharge himself against medical advice. This cooperative stance from the government facilitated a swift resolution to the standoff regarding his location of care.\n\n## Implementation of the Order\nFollowing the court's clear instructions, the transfer was executed promptly. The court specifically directed the director of Medanta Hospital to constitute a specialized medical team to provide round-the-clock monitoring according to established medical protocols. Furthermore, it mandated that all medical records and test results from Safdarjung Hospital be transferred immediately to ensure seamless continuity of care. Crucially, the court also ordered that Dr. Gitanjali Angmo be allowed unrestricted visitation rights, addressing concerns about Wangchuk's isolation during his initial hospitalization.\n\n## Ongoing Protest and Health Status\nSonam Wangchuk was discharged from Safdarjung Hospital on the evening of July 21 and transported to Medanta Hospital in Gurugram under tight security. He has been on an extended hunger strike demanding Sixth Schedule status and statehood for Ladakh, a protest that has garnered significant national attention. The High Court's intervention ensures that while his protest continues, his health will be monitored in a facility equipped to handle the severe physiological impacts of prolonged starvation. Activists and supporters view this transfer as a necessary step to protect his life while the political stalemate continues.",
    claimVsTruth: [
      {
        claim: "The Delhi High Court ordered Sonam Wangchuk's transfer from Safdarjung to Medanta Hospital.",
        truth: "True. The court ruled in favor of his wife's petition, stating he has a fundamental right to choose his hospital.",
        truthSources: [{ label: "LiveLaw", url: "https://www.livelaw.in/top-stories/delhi-high-court-sonam-wangchuk-medanta-hospital-transfer-263901" }]
      },
      {
        claim: "The central government strongly opposed moving Wangchuk to a private hospital.",
        truth: "False. The Solicitor General stated the Centre had 'no objection' to the transfer as long as he remained under continuous medical supervision.",
        truthSources: [{ label: "The Hindu", url: "https://www.thehindu.com/news/national/wangchuk-shifted-from-safdarjung-hospital-to-medanta-in-gurugram-after-delhi-hc-order/article71250823.ece" }]
      }
    ],
    timeline: [
      { date: "July 2026", event: "Sonam Wangchuk is admitted to Safdarjung Hospital following a deterioration in his health due to his hunger strike." },
      { date: "July 21, 2026", event: "Delhi HC orders his immediate transfer to Medanta Hospital, citing Articles 19 and 21." },
      { date: "July 21, 2026 (Evening)", event: "Wangchuk is transported to Medanta Hospital in an ambulance under tight security." }
    ],
    receipts: [
      { label: "The Hindu Report", content: "Wangchuk shifted from Safdarjung Hospital to Medanta in Gurugram after Delhi HC order", sourceUrl: "https://www.thehindu.com/news/national/wangchuk-shifted-from-safdarjung-hospital-to-medanta-in-gurugram-after-delhi-hc-order/article71250823.ece", kind: "quote" },
      { label: "LiveLaw Coverage", content: "Details of the High Court bench's observations on fundamental rights.", sourceUrl: "https://www.livelaw.in/top-stories/delhi-high-court-sonam-wangchuk-medanta-hospital-transfer-263901", kind: "document" }
    ],
    impact: { summary: "The transfer ensures Wangchuk receives specialized care during a high-stakes hunger strike while setting a legal precedent on the right to choose medical facilities while under state custody or observation." },
    whatCanBeDone: { citizenAction: "Citizens following the Ladakh statehood movement can stay updated on his health status through verified news sources rather than relying on social media rumors." },
    claims: [
      { claim: "Delhi HC ordered Wangchuk to be shifted to Medanta.", verdict: "true", sources: [{ label: "The Hindu", url: "https://www.thehindu.com/news/national/wangchuk-shifted-from-safdarjung-hospital-to-medanta-in-gurugram-after-delhi-hc-order/article71250823.ece" }] },
      { claim: "The Centre agreed to the hospital transfer.", verdict: "true", sources: [{ label: "Rediff", url: "https://www.rediff.com/news/wangchuk-shifted-to-medanta-delhi-hc" }] },
      { claim: "Wangchuk is protesting for Ladakh's Sixth Schedule status.", verdict: "true", sources: [{ label: "News on AIR", url: "https://newsonair.gov.in/wangchuk-transferred-to-medanta/" }] }
    ],
    sources: [
      { label: "The Hindu", url: "https://www.thehindu.com/news/national/wangchuk-shifted-from-safdarjung-hospital-to-medanta-in-gurugram-after-delhi-hc-order/article71250823.ece" },
      { label: "LiveLaw", url: "https://www.livelaw.in/top-stories/delhi-high-court-sonam-wangchuk-medanta-hospital-transfer-263901" },
      { label: "Rediff", url: "https://www.rediff.com/news/wangchuk-shifted-to-medanta-delhi-hc" },
      { label: "News on AIR", url: "https://newsonair.gov.in/wangchuk-transferred-to-medanta/" }
    ],
    author: "AI Agent",
    route: "explainer"
  }
};

const a9 = {
  topic: "Pinarayi Vijayan Criticizes UDF Stand on Waqf Act",
  article: {
    title: "Did Kerala CM claim UDF's Waqf stance sacrifices minority interests?",
    kicker: "FACT-CHECK · TRUE",
    excerpt: "Yes, Kerala CM Pinarayi Vijayan stated that the UDF government's decision to implement the Waqf (Amendment) Act 2025, specifically regarding non-Muslim board members, betrays minority interests.",
    verdict: "true",
    bodyMarkdown: "## Chief Minister's Accusations\nOn July 21, 2026, Kerala Chief Minister Pinarayi Vijayan launched a scathing attack on the United Democratic Front (UDF) government regarding its handling of the Waqf (Amendment) Act, 2025. Vijayan explicitly stated that the UDF's current stance in the Supreme Court will 'sacrifice minority interests'. The core of the dispute revolves around Section 14 of the new central legislation, which mandates the inclusion of two non-Muslim members in state Waqf Boards. Vijayan argued that by agreeing to implement these provisions, the UDF is severely undermining the ongoing legal challenges filed by various parties, including the Muslim League, who are petitioning the Supreme Court to strike down the law.\n\n## Ideological Shifts and 'Surrender'\nVijayan characterized the UDF government's actions as a 'complete surrender' to the agenda of the central government and the Sangh Parivar. He pointed out a glaring contradiction: the state government had previously taken a strong stance against these amendments in the High Court but has now abruptly changed its position. According to the Chief Minister, forcing non-Muslim members onto the board of a religious institution violates deeply held secular conventions, which dictate that religious bodies should be managed internally by adherents of that specific faith. This political pivot has ignited a fierce debate in Kerala over state autonomy versus central mandates.\n\n## Contrast with Previous LDF Stance\nTo highlight the policy reversal, Vijayan contrasted the current situation with the actions of his own previous Left Democratic Front (LDF) administration. He noted that the LDF had maintained a clear, uncompromising legal position against the inclusion of non-Muslim members on the Waqf Board, arguing successfully that such interference violated Articles 14, 25, and 26 of the Indian Constitution, which protect the right to manage religious affairs. He expressed deep concern that the current administration is ignoring these established constitutional arguments and 'kowtowing' to directives from New Delhi, thereby betraying the unanimous resolution previously passed by the Kerala Assembly against the central law.\n\n## Wider Political Implications\nThis controversy is not just a localized legal dispute; it touches upon broader national debates regarding the control of minority institutions and the overreach of central legislation into state-managed religious bodies. By publicly accusing the UDF of abandoning minority protections, the LDF is positioning itself as the true defender of secular and minority rights in the state. The ongoing Supreme Court petitions will likely be heavily influenced by the state government's official affidavits, making the UDF's current compliance with the 2025 Act a critical pivot point in the legal battle over the Waqf Board's future.",
    claimVsTruth: [
      {
        claim: "Pinarayi Vijayan accused the UDF of sacrificing minority interests by accepting the Waqf (Amendment) Act 2025.",
        truth: "True. He criticized the UDF for agreeing to implement Section 14, which mandates non-Muslim members on the Waqf Board.",
        truthSources: [{ label: "The Hindu", url: "https://www.thehindu.com/news/national/kerala/udf-stand-on-waqf-will-sacrifice-minority-interests-says-pinarayi-vijayan/article71250487.ece" }]
      },
      {
        claim: "The Kerala Assembly had previously passed a unanimous resolution supporting the Waqf (Amendment) Act.",
        truth: "False. The Kerala Assembly had previously passed a unanimous resolution against the central law, which Vijayan claims the UDF is now betraying.",
        truthSources: [{ label: "The Hindu", url: "https://www.thehindu.com/news/national/kerala/udf-stand-on-waqf-will-sacrifice-minority-interests-says-pinarayi-vijayan/article71250487.ece" }]
      }
    ],
    timeline: [
      { date: "Early 2026", event: "The central government passes the Waqf (Amendment) Act, 2025, mandating non-Muslim representation on state boards." },
      { date: "Mid-July 2026", event: "The UDF government in Kerala indicates its intention to comply with Section 14 of the new Act in the Supreme Court." },
      { date: "July 21, 2026", event: "CM Pinarayi Vijayan publicly attacks the UDF stance, claiming it undermines minority rights and ongoing legal petitions." }
    ],
    receipts: [
      { label: "The Hindu Report", content: "UDF stand on Waqf will sacrifice minority interests, says Pinarayi Vijayan", sourceUrl: "https://www.thehindu.com/news/national/kerala/udf-stand-on-waqf-will-sacrifice-minority-interests-says-pinarayi-vijayan/article71250487.ece", kind: "quote" },
      { label: "New Indian Express", content: "Details on the UDF's shifting legal stance in the High Court vs Supreme Court.", sourceUrl: "https://www.newindianexpress.com/states/kerala/2026/Jul/21/udf-waqf-stance-vijayan", kind: "document" }
    ],
    impact: { summary: "The dispute highlights deep political divisions in Kerala over how to respond to central laws affecting minority religious institutions, potentially weakening the legal challenge against the Waqf Amendment Act." },
    whatCanBeDone: { citizenAction: "Citizens interested in constitutional law can follow the Supreme Court hearings on the Waqf (Amendment) Act to understand the balance between state autonomy and central mandates." },
    claims: [
      { claim: "Vijayan said UDF's Waqf stance will sacrifice minority interests.", verdict: "true", sources: [{ label: "The Hindu", url: "https://www.thehindu.com/news/national/kerala/udf-stand-on-waqf-will-sacrifice-minority-interests-says-pinarayi-vijayan/article71250487.ece" }] },
      { claim: "The new Act mandates two non-Muslim members on the board.", verdict: "true", sources: [{ label: "New Indian Express", url: "https://www.newindianexpress.com/states/kerala/2026/Jul/21/udf-waqf-stance-vijayan" }] },
      { claim: "The LDF had previously argued this violates Articles 14, 25, and 26.", verdict: "true", sources: [{ label: "Deccan Chronicle", url: "https://www.deccanchronicle.com/nation/politics/vijayan-slams-udf-waqf-board" }] }
    ],
    sources: [
      { label: "The Hindu", url: "https://www.thehindu.com/news/national/kerala/udf-stand-on-waqf-will-sacrifice-minority-interests-says-pinarayi-vijayan/article71250487.ece" },
      { label: "New Indian Express", url: "https://www.newindianexpress.com/states/kerala/2026/Jul/21/udf-waqf-stance-vijayan" },
      { label: "Deccan Chronicle", url: "https://www.deccanchronicle.com/nation/politics/vijayan-slams-udf-waqf-board" },
      { label: "The Statesman", url: "https://www.thestatesman.com/india/kerala-cm-pinarayi-vijayan-udf-waqf-act-2026" }
    ],
    author: "AI Agent",
    route: "explainer"
  }
};

fs.writeFileSync('/tmp/newsdaily-7.json', JSON.stringify(a7, null, 2));
fs.writeFileSync('/tmp/newsdaily-8.json', JSON.stringify(a8, null, 2));
fs.writeFileSync('/tmp/newsdaily-9.json', JSON.stringify(a9, null, 2));

console.log("Written 7, 8, 9!");
